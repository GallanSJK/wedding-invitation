// ==== CONFIG ====
// Ganti dengan URL Google Sheets Anda yang sudah di-publish sebagai CSV
// Format: https://docs.google.com/spreadsheets/d/ID_SPREADSHEET/gviz/tq?tqx=out:csv
const sheetUrl = "https://docs.google.com/spreadsheets/d/INI DI ISI DENGAN ID SPREADSHEET KAMU/gviz/tq?tqx=out:csv";
const delay = 7000; // jeda antar kirim (ms) — 7000 = 7 detik
const weddingLink = "https://gallansjk.github.io/wedding-invitation/?to=";

// ==== SCRIPT ====
async function sendInvitations() {
  const res = await fetch(sheetUrl);
  const csv = await res.text();

  // Parse CSV aman dari koma, tanda kutip, URL panjang
  const rows = csv
    .split(/\r?\n/)
    .map(row => row.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g))
    .filter(row => row && row.length >= 2);

  async function openWA(i) {
    if (i >= rows.length) {
      console.log("🎉 Semua pesan sudah dibuka.");
      alert("Selesai! Semua chat sudah dibuka ✅");
      return;
    }

    const [name, phone] = rows[i].map(x => x.replace(/^"|"$/g, '').trim());
    if (!name || !phone) {
      await openWA(i + 1);
      return;
    }

    const msg = encodeURIComponent(
      `Halo ${name}, kami mengundang Anda ke acara pernikahan kami 💍\nKlik di sini: ${weddingLink}${name}\nTerima kasih ya 🤍`
    );

    const waUrl = `https://wa.me/${phone}?text=${msg}`;
    console.log(`✅ Membuka chat ${i}/${rows.length - 1} → ${name} (${phone})`);
    window.open(waUrl, "_blank");

    setTimeout(() => openWA(i + 1), delay);
  }

  openWA(1); // mulai dari baris ke-2 (karena baris pertama adalah header)
}

sendInvitations();
