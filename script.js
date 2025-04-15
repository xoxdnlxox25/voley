const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQj5oQD6hk873iPBShRwgUyJFb0fb90CdPwgNT7M-SmF3aUD6Yz2-UqI83l0kvx94vMnb9BqzQp0nvr/pub?output=csv';

async function fetchScores() {
  try {
    const res = await fetch(sheetUrl);
    const data = await res.text();
    const rows = data.trim().split('\n');
    const values = rows[1].split(',');

    document.getElementById('teamA').textContent = values[0];
    document.getElementById('teamB').textContent = values[1];
    document.getElementById('scoreA').textContent = values[2];
    document.getElementById('scoreB').textContent = values[3];
    document.getElementById('setsA').textContent = values[4];
    document.getElementById('setsB').textContent = values[5];
    document.getElementById('lastUpdated').textContent = 'Última actualización: ' + new Date().toLocaleTimeString();
  } catch (err) {
    console.error("Error al cargar los datos", err);
  }
}

fetchScores();
setInterval(fetchScores, 5000);
