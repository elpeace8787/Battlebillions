<script type="module">
import { db, auth } from "./firebase.js";
import {
  doc, setDoc, getDoc, updateDoc, onSnapshot, collection, addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

let pc, localStream, remoteStream, localVideoEl, remoteVideoEl, role = "A";
const iceServers = [
  { urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"] }
  // For reliability in the wild, add a TURN service (e.g., Twilio or your own coturn)
];

function createPeer(){
  pc = new RTCPeerConnection({ iceServers });
  remoteStream = new MediaStream();
  pc.ontrack = (e)=>{ e.streams[0].getTracks().forEach(t=> remoteStream.addTrack(t)); };
  pc.onicecandidate = async (event)=>{
    if(!event.candidate || !window.__roomRef) return;
    const coll = collection(db, "rooms", window.__roomRef.id, role==="A" ? "callerCandidates" : "calleeCandidates");
    await addDoc(coll, event.candidate.toJSON());
  };
}

export async function initArena(opts){
  const { aEl, bEl, roomId, myRole } = opts;
  role = myRole || "A";
  localVideoEl = role==="A" ? aEl : bEl;
  remoteVideoEl= role==="A" ? bEl : aEl;

  createPeer();

  // Attach existing local stream (if any)
  if(localStream){
    localStream.getTracks().forEach(t=> pc.addTrack(t, localStream));
  }

  // Join / create room doc
  const ref = doc(db, "rooms", roomId);
  let snap = await getDoc(ref);
  if(!snap.exists()){
    await setDoc(ref, { createdAt: Date.now(), members: [auth.currentUser?.uid || "anon"] });
    snap = await getDoc(ref);
  }else{
    const data = snap.data();
    const members = Array.from(new Set([...(data.members||[]), auth.currentUser?.uid || "anon"]));
    await updateDoc(ref, { members });
  }
  window.__roomRef = ref;

  // Candidate watchers
  const unsubCaller = onSnapshot(collection(db, "rooms", ref.id, "callerCandidates"), (qs)=>{
    if(role==="A") return;
    qs.docChanges().forEach(ch => ch.type==="added" && pc.addIceCandidate(new RTCIceCandidate(ch.doc.data())).catch(()=>{}));
  });
  const unsubCallee = onSnapshot(collection(db, "rooms", ref.id, "calleeCandidates"), (qs)=>{
    if(role==="B") return;
    qs.docChanges().forEach(ch => ch.type==="added" && pc.addIceCandidate(new RTCIceCandidate(ch.doc.data())).catch(()=>{}));
  });

  // SDP negotiation via room doc
  onSnapshot(ref, async (d)=>{
    const data = d.data() || {};
    if(role==="A" && data.answer && !pc.currentRemoteDescription){
      await pc.setRemoteDescription(new RTCSessionDescription(data.answer)).catch(()=>{});
    }
    if(role==="B" && data.offer && !pc.currentRemoteDescription){
      await pc.setRemoteDescription(new RTCSessionDescription(data.offer)).catch(()=>{});
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      await updateDoc(ref, { answer: answer.toJSON() });
    }
  });

  // If A: create offer
  if(role==="A"){
    const offer = await pc.createOffer({ offerToReceiveVideo:true, offerToReceiveAudio:true });
    await pc.setLocalDescription(offer);
    await updateDoc(ref, { offer: offer.toJSON() });
  }

  // Show streams
  if(localStream){ localVideoEl.srcObject = localStream; localVideoEl.muted = true; await localVideoEl.play().catch(()=>{}); }
  remoteVideoEl.srcObject = remoteStream; await remoteVideoEl.play().catch(()=>{});
}

export async function toggleCamera(){
  if(!localStream){
    // Request vertical (portrait)
    localStream = await navigator.mediaDevices.getUserMedia({
      video: { width: {ideal:1080}, height:{ideal:1920}, aspectRatio: 9/16, facingMode: "user" },
      audio: true
    });
    // Add to PC
    localStream.getTracks().forEach(t=> pc.addTrack(t, localStream));
    if(localVideoEl){ localVideoEl.srcObject = localStream; localVideoEl.muted = true; await localVideoEl.play().catch(()=>{}); }
    return true;
  }else{
    localStream.getTracks().forEach(t=> t.stop());
    localStream = null;
    if(localVideoEl){ localVideoEl.srcObject = null; }
    // (We keep the PC; A can re-enable camera to re-add tracks)
    return false;
  }
}

export function toggleMic(){
  if(!localStream) return false;
  const aud = localStream.getAudioTracks()[0];
  if(!aud) return false;
  aud.enabled = !aud.enabled;
  return aud.enabled;
}

export async function switchCamera(){
  if(!localStream) return;
  const cur = localStream.getVideoTracks()[0];
  const curFacing = cur.getSettings().facingMode || "user";
  const nextFacing = curFacing === "environment" ? "user" : "environment";
  const newStream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: { exact: nextFacing }, width:{ideal:1080}, height:{ideal:1920}, aspectRatio:9/16 },
    audio: true
  });
  // Replace track on the sender
  const newVideoTrack = newStream.getVideoTracks()[0];
  const sender = pc.getSenders().find(s=> s.track && s.track.kind==="video");
  await sender.replaceTrack(newVideoTrack);
  // Update local stream for UI
  localStream.removeTrack(cur); cur.stop();
  localStream.addTrack(newVideoTrack);
  if(localVideoEl){ localVideoEl.srcObject = localStream; }
}

export async function uploadVideo(file){
  // For MVP you can play the file locally instead of live camera:
  const url = URL.createObjectURL(file);
  if(localVideoEl){
    localVideoEl.srcObject = null;
    localVideoEl.src = url;
    await localVideoEl.play().catch(()=>{});
  }
}
</script>
