const pages = {
  home: `
    <h1>Home</h1>
    <p>Welcome to your dashboard!</p>
  `,
  profile: `
    <h1>Profile</h1>
    <p>View or edit your user details here.</p>
  `,
  messages: `
    <h1>Messages</h1>
    <p>Check your direct messages and notifications.</p>
  `,
  battle: `
    <h1>Battle</h1>
    <p>Start or join a battle with other users!</p>
  `,
  leaderboard: `
    <h1>Leaderboard</h1>
    <table id="leaderboard-table" style="width:100%;margin-top:1em;">
      <thead>
        <tr><th>Name</th><th>Score</th></tr>
      </thead>
      <tbody id="leaderboard-body">
        <!-- Leaderboard data will be loaded here -->
      </tbody>
    </table>
  `,
  wallet: `
    <h1>Wallet</h1>
    <p>Your current wallet balance: <b>1000 credits</b></p>
    <button style="margin-top:10px;">Add Funds</button>
  `,
  settings: `
    <h1>Settings</h1>
    <p>Adjust your preferences and privacy options.</p>
  `
};

const leaderboardData = [
  {name: "Alex", score: 950},
  {name: "Blake", score: 870},
  {name: "Casey", score: 730},
];

document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', function(){
    // Set active state
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Load page
    const page = btn.dataset.page;
    document.getElementById('main-content').innerHTML = pages[page];

    // If leaderboard, populate scores
    if(page === "leaderboard"){
      const tbody = document.getElementById('leaderboard-body');
      if(tbody){
        tbody.innerHTML = "";
        leaderboardData.sort((a,b) => b.score - a.score)
          .forEach(player => {
            tbody.innerHTML += `<tr><td>${player.name}</td><td>${player.score}</td></tr>`;
          });
      }
    }
  });
});
