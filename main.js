// --- Mocked Data API ---
const api = {
  async getProfile() {
    await new Promise(res => setTimeout(res, 200));
    return { username: "alex", email: "alex@demo.com", joined: "2022-03-01" };
  },
  async getMessages() {
    await new Promise(res => setTimeout(res, 180));
    return [
      { from: "Blake", text: "Ready for a battle?", time: "10:32 am" },
      { from: "Casey", text: "Congrats on your top score!", time: "Yesterday" }
    ];
  },
  async getLeaderboard() {
    await new Promise(res => setTimeout(res, 150));
    return [
      { name: "Alex", score: 950 },
      { name: "Blake", score: 870 },
      { name: "Casey", score: 730 },
    ];
  },
  async getWallet() {
    await new Promise(res => setTimeout(res, 100));
    return {
      credits: 1000,
      transactions: [
        { date: '2025-07-25', amount: "+500", desc: "Battle win" },
        { date: '2025-06-22', amount: "-200", desc: "Skin purchase" }
      ]
    };
  }
};

// --- Page Renderers ---

async function HomePage(container) {
  container.innerHTML = `
    <h1>Home</h1>
    <p>Welcome to your Periscope dashboard!</p>
    <ul style="margin-top:1.6em;list-style:none;padding-left:0;">
      <li>• View your <b>profile</b> and status</li>
      <li>• Check <b>messages</b> and <b>battles</b></li>
      <li>• See who's leading the <b>leaderboard</b></li>
      <li>• Manage your <b>wallet</b> and <b>settings</b></li>
    </ul>
  `;
}

async function ProfilePage(container) {
  container.innerHTML = "<h1>Profile</h1><p>Loading profile...</p>";
  const p = await api.getProfile();
  container.innerHTML = `
    <h1>Profile</h1>
    <p><b>Username:</b> ${p.username}</p>
    <p><b>Email:</b> ${p.email}</p>
    <p><b>Member since:</b> ${p.joined}</p>
  `;
}

async function MessagesPage(container) {
  container.innerHTML = "<h1>Messages</h1><p>Loading messages...</p>";
  const msgs = await api.getMessages();
  container.innerHTML = `
    <h1>Messages</h1>
    <ul style="margin:0;padding:0;list-style:none;">
      ${msgs.map(m => `
        <li style="margin-bottom:1em; background:#f6f6f8;padding:12px 10px;border-radius:8px;">
          <b>${m.from}</b>:<br/>
          <span>${m.text}</span>
          <div style="color:#aaa; font-size:12px; margin-top:4px;">${m.time}</div>
        </li>
      `).join('')}
    </ul>
  `;
}

async function BattlePage(container) {
  container.innerHTML = `
    <h1>Battle</h1>
    <p>Challenge, join or spectate a battle event.</p>
    <button style="background: #4a4e69; color:white; border:0; border-radius:8px; padding:12px 20px; margin-top:24px; font-size:16px;">Start New Battle</button>
    <div style="margin-top:20px;font-size:14px;color:#444;">
      Feature coming soon!
    </div>
  `;
}

async function LeaderboardPage(container) {
  container.innerHTML = "<h1>Leaderboard</h1><p>Loading leaderboard...</p>";
  const scores = await api.getLeaderboard();
  container.innerHTML = `
    <h1>Leaderboard</h1>
    <table>
      <thead>
        <tr><th>Name</th><th>Score</th></tr>
      </thead>
      <tbody>
        ${scores.map(user =>
          `<tr><td>${user.name}</td><td>${user.score}</td></tr>`
        ).join('')}
      </tbody>
    </table>
  `;
}

async function WalletPage(container) {
  container.innerHTML = "<h1>Wallet</h1><p>Loading wallet...</p>";
  const wallet = await api.getWallet();
  container.innerHTML = `
    <h1>Wallet</h1>
    <p>Your balance: <b>${wallet.credits} credits</b></p>
    <button style="margin:12px 0 24px 0; background: #4a4e69;color:white;border:0;border-radius:8px;padding:10px 18px;">Add Funds</button>
    <h2 style="font-size: 17px;">Transactions</h2>
    <table>
      <thead><tr><th>Date</th><th>Amount</th><th>Description</th></tr></thead>
      <tbody>
        ${wallet.transactions.map(tx => `
          <tr><td>${tx.date}</td><td>${tx.amount}</td><td>${tx.desc}</td></tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

async function SettingsPage(container) {
  container.innerHTML = `
    <h1>Settings</h1>
    <form id="settings-form" style="margin-top:14px;">
      <label>
        <span style="font-weight:500;">Notifications:</span><br>
        <select style="margin-top:5px;padding:6px 12px;">
          <option>Enable</option>
          <option>Disable</option>
        </select>
      </label>
      <br><br>
      <label>
        <span style="font-weight:500;">Privacy:</span><br>
        <select style="margin-top:5px;padding:6px 12px;">
          <option>Public</option>
          <option>Friends Only</option>
          <option>Private</option>
        </select>
      </label>
      <br><br>
      <button type="submit" style="background:#4a4e69;color:white;border:0;border-radius:8px;padding:11px 19px;">Save</button>
    </form>
  `;
  document.getElementById('settings-form').addEventListener('submit', function(e){
    e.preventDefault();
    alert('Settings saved!');
  });
}

// --- Router ---

const pageFunctions = {
  home: HomePage,
  profile: ProfilePage,
  messages: MessagesPage,
  battle: BattlePage,
  leaderboard: LeaderboardPage,
  wallet: WalletPage,
  settings: SettingsPage,
};

function loadPage(page) {
  window.scrollTo(0,0);
  document.querySelectorAll('.nav-btn').forEach(
    b => b.classList.toggle('active', b.dataset.page === page)
  );
  pageFunctions[page](document.getElementById('main-content'));
}

// --- Navigation ---

document.addEventListener('DOMContentLoaded', () => {
  loadPage('home');
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => loadPage(btn.dataset.page));
  });
});

            
