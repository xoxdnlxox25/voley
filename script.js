const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQj5oQD6hk873iPBShRwgUyJFb0fb90CdPwgNT7M-SmF3aUD6Yz2-UqI83l0kvx94vMnb9BqzQp0nvr/pub?output=csv';

let currentScores = {
  scoreA: 0,
  scoreB: 0,
  setsA: 0,
  setsB: 0,
  periodo: 0
};

async function fetchScores() {
  try {
    const res = await fetch(sheetUrl);
    const data = await res.text();
    const rows = data.trim().split('\n');
    const values = rows[1].split(',');

    const newData = {
      teamA: values[0],
      teamB: values[1],
      scoreA: parseInt(values[2]),
      scoreB: parseInt(values[3]),
      setsA: parseInt(values[4]),
      setsB: parseInt(values[5]),
      periodo: parseInt(values[6])
    };

    // ✅ Solo actualiza si los datos son más recientes
    const marcadorAvanzo =
      newData.scoreA >= currentScores.scoreA &&
      newData.scoreB >= currentScores.scoreB &&
      newData.setsA >= currentScores.setsA &&
      newData.setsB >= currentScores.setsB &&
      newData.periodo >= currentScores.periodo;

    if (marcadorAvanzo) {
      // DOM updates
      document.getElementById('teamA').textContent = newData.teamA;
      document.getElementById('teamB').textContent = newData.teamB;
      document.getElementById('scoreA').textContent = newData.scoreA.toString().padStart(2, '0');
      document.getElementById('scoreB').textContent = newData.scoreB.toString().padStart(2, '0');
      document.getElementById('setsA').textContent = newData.setsA;
      document.getElementById('setsB').textContent = newData.setsB;
      document.getElementById('periodo').textContent = newData.periodo;
      document.getElementById('lastUpdated').textContent = 'Actualizado: ' + new Date().toLocaleTimeString();

      // Guardamos este marcador como el más reciente
      currentScores = { ...newData };
    }

  } catch (err) {
    console.error("Error al cargar los datos", err);
    document.getElementById('lastUpdated').textContent = 'Error al conectar';
  }
}

fetchScores();
setInterval(fetchScores, 500);
