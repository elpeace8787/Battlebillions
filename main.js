// Function to show the section and load dynamic content where needed
function showSection(sectionId) {
  document.querySelectorAll('.page-section').forEach(section => {
    section.classList.remove('active');
  });
  document.getElementById(sectionId).classList.add('active');

  if (sectionId === 'leaderboard') {
    loadLeaderboard();
  }
}

// Load leaderboard content dynamically
function loadLeaderboard() {
  fetch('leaderboard.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('leaderboardContent').innerHTML = data;
    })
    .catch(error => {
      console.error('Error loading leaderboard:', error);
      document.getElementById('leaderboardContent').innerHTML = '<p>Failed to load leaderboard.</p>';
    });
}

// Round popup animation
function showRoundPopup(round) {
  const roundPopup = document.getElementById('roundPopup');
  roundPopup.textContent = `Round ${round}!`;
  roundPopup.classList.add('show');
  setTimeout(() => {
    roundPopup.classList.remove('show');
  }, 1500);
}

// Start battle timer with rounds and popup
function startBattleTimer(durationInSeconds, rounds) {
  let timer = durationInSeconds;
  let round = 1;

  const battleTimerEl = document.getElementById('battleTimer');
  const roundsBoardEl = document.getElementById('roundsBoard');

  showRoundPopup(round); // Show Round 1 popup

  const interval = setInterval(() => {
    const minutes = String(Math.floor(timer / 60)).padStart(2, '0');
    const seconds = String(timer % 60).padStart(2, '0');
    battleTimerEl.textContent = `${minutes}:${seconds}`;

    if (timer <= 0) {
      if (round < rounds) {
        round++;
        roundsBoardEl.textContent = `Round ${round} of ${rounds}`;
        showRoundPopup(round);
        timer = durationInSeconds;
      } else {
        clearInterval(interval);
        battleTimerEl.textContent = "00:00";
        roundsBoardEl.textContent = "Battle Over!";
        showRoundPopup("Battle Over");
      }
    } else {
      timer--;
    }
  }, 1000);
}

// Event Listeners for Navigation Buttons
document.getElementById('homeBtn').addEventListener('click', () => showSection('home'));
document.getElementById('profileBtn').addEventListener('click', () => showSection('profile'));
document.getElementById('messagesBtn').addEventListener('click', () => showSection('messages'));
document.getElementById('battleBtn').addEventListener('click', () => showSection('battle'));
document.getElementById('leaderboardBtn').addEventListener('click', () => showSection('leaderboard'));
document.getElementById('walletBtn').addEventListener('click', () => showSection('wallet'));
document.getElementById('settingsBtn').addEventListener('click', () => showSection('settings'));

// Logout Button
document.getElementById('logoutBtn').addEventListener('click', () => {
  alert('Logged out successfully!');
});

// Initialize with Battle Timer: 3 minutes per round, 5 rounds
startBattleTimer(180, 5);
