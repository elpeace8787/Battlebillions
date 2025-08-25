let battleState = {
  totalRounds: 3,
  currentRound: 1,
  turn: 'A',
  turnSeconds: 30,
  t: null,
};

function renderBattle(){
  const view = document.getElementById('view');
  view.innerHTML = `
    <div class="battle-wrap">
      <div class="streams">
        <div class="stream" id="streamA">
          <video id="videoA" autoplay playsinline muted></video>
          <div class="dim" id="dimA"></div>
        </div>
        <div class="stream" id="streamB">
          <video id="videoB" autoplay playsinline muted></video>
          <div class="dim" id="dimB"></div>
        </div>
      </div>
      <div class="overlay-controls" id="controls">
        <span class="pill">Round <b id="roundNow">${battleState.currentRound}</b>/${battleState.totalRounds}</span>
        <span class="pill">Turn: <b id="whoseTurn">${battleState.turn}</b></span>
        <span class="pill timer">⏱ <b id="timeLeft">${battleState.turnSeconds}</b>s</span>
        <button class="pill" id="btnStart">Start</button>
        <button class="pill" id="btnSwitch">Switch</button>
        <button class="pill" id="btnNextRound">Next Round</button>
      </div>
    </div>`;

  wireBattleButtons();
  applyTurnDim();
}

function wireBattleButtons(){
  document.getElementById('btnStart').onclick = ()=> {startTurn(); autoHideControls();};
  document.getElementById('btnSwitch').onclick = ()=> {switchTurn(); autoHideControls();};
  document.getElementById('btnNextRound').onclick = ()=> {nextRound(); autoHideControls();};
}

function applyTurnDim(){
  const dimA = document.getElementById('dimA');
  const dimB = document.getElementById('dimB');
  const aActive = battleState.turn === 'A';
  dimA.classList.toggle('active', !aActive);
  dimB.classList.toggle('active', aActive);
}

function tick(){
  const el = document.getElementById('timeLeft');
  if(!el) return;
  let v = parseInt(el.textContent, 10) - 1;
  el.textContent = v;
  if(v <= 0){ clearInterval(battleState.t); battleState.t=null; }
}

function startTurn(){
  const el = document.getElementById('timeLeft');
  if(battleState.t) clearInterval(battleState.t);
  el.textContent = battleState.turnSeconds;
  battleState.t = setInterval(tick,1000);
  applyTurnDim();
}

function switchTurn(){
  battleState.turn = battleState.turn === 'A' ? 'B':'A';
  document.getElementById('whoseTurn').textContent = battleState.turn;
  startTurn();
}

function nextRound(){
  if(battleState.currentRound < battleState.totalRounds){
    battleState.currentRound++;
    document.getElementById('roundNow').textContent = battleState.currentRound;
    battleState.turn = 'A';
    startTurn();
  }
}

function autoHideControls(){
  const controls = document.getElementById('controls');
  setTimeout(()=> controls.classList.add('hide'), 2000);
}

export async function attachMedia(){
  const a = document.getElementById('videoA');
  const b = document.getElementById('videoB');
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video:true,audio:true });
    a.srcObject = stream;
    b.srcObject = stream;
  }catch(err){ console.error(err); }
}

export function mountBattle(){
  renderBattle();
  attachMedia();
}
