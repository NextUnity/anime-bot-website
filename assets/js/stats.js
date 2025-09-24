// Beispiel: Hier definierst du die API‑URL, von der du deine Statistikdaten holst
const statsApiUrl = '/api/stats';  // passe das an

// IDs der Elemente, in die du die Werte einsetzen willst
const statElements = {
  servers: document.getElementById('stat-servers'),
  users: document.getElementById('stat-users'),
  commands: document.getElementById('stat-commands'),
};

// Funktion, um Zahlen formatiert darzustellen (z. B. mit Kommas)
function formatNumber(num) {
  return num.toLocaleString('de-DE');
}

// Funktion, um Statistikdaten zu laden
async function loadStats() {
  try {
    const resp = await fetch(statsApiUrl);
    if (!resp.ok) {
      throw new Error(`Fehler beim Laden: ${resp.status}`);
    }
    const data = await resp.json();
    // Beispiel-JSON erwartet:
    // { "servers": 123, "users": 4567, "commands": 89012 }

    statElements.servers.textContent = formatNumber(data.servers ?? 0);
    statElements.users.textContent = formatNumber(data.users ?? 0);
    statElements.commands.textContent = formatNumber(data.commands ?? 0);

  } catch (err) {
    console.error('Stats laden fehlgeschlagen:', err);
    // Fallback-Werte (optional)
    statElements.servers.textContent = '—/—';
    statElements.users.textContent = '—/—';
    statElements.commands.textContent = '—/—';
  }
}

// Beim Laden der Seite Statistik laden
window.addEventListener('DOMContentLoaded', () => {
  loadStats();
  // Optional: regelmäßig aktualisieren (z. B. alle 30 Sekunden)
  setInterval(loadStats, 30000);
});
