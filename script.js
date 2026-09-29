function generateQuote() {
    // Haetaan muuttuvat asiakastiedot lomakkeesta
  const clientCompany = document.getElementById('clientCompany').value;
const clientName = document.getElementById('clientName').value;
const participants = parseInt(document.getElementById('participants').value);
// 2. Varmistetaan että pakolliset kentät on täytetty oikein
if (!clientCompany || !clientName || isNaN(participants) || participants < 1) {
alert("Ole hyvä ja täytä kaikki asiakastiedot sekä osallistujamäärä (vähintään 1).");
return;
}
// Piilotetaan ja nollataan näkymä hetkeksi varmistaaksemme uuden päivityksen ajon
const outputBox = document.getElementById('quoteOutput');
outputBox.style.display = 'none';
// 3. Kiinteät hinnoitteluperusteet
const unitPrice = 199.00;
const taxRate = 0.255;
// 4. Laskutoimitukset automaattisesti joka klikkauksella uudestaan
const priceNet = participants * unitPrice;
const taxAmount = priceNet * taxRate;
const priceTotal = priceNet + taxAmount;
const today = new Date().toLocaleDateString('fi-FI');
// 5. Käsitellään logo-kuva tiedostosta
const logoInput = document.getElementById('logoInput');
const outLogo = document.getElementById('outLogo');
if (logoInput.files && logoInput.files[0]) {
const reader = new FileReader();
reader.onload = function(e) {
outLogo.src = e.target.result;
outLogo.style.display = 'block';
}
reader.readAsDataURL(logoInput.files[0]);
} else {
outLogo.style.display = 'none';
}
const formatOptions = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
// 6. Sijoitetaan upouudet päivitetyt arvot tulostusalueelle
document.getElementById('outDate').innerText = today;
document.getElementById('outClientCompany').innerText = clientCompany;
document.getElementById('outClientName').innerText = clientName;
document.getElementById('outParticipants').innerText = participants;
document.getElementById('outPriceNet').innerText = priceNet.toLocaleString('fi-FI', formatOptions);
document.getElementById('outTaxAmount').innerText = taxAmount.toLocaleString('fi-FI', formatOptions);
document.getElementById('outPriceTotal').innerText = priceTotal.toLocaleString('fi-FI', formatOptions);
// 7. Tuodaan juuri laskettu uusi tarjous näkyviin
outputBox.style.display = 'block';
outputBox.scrollIntoView({ behavior: 'smooth' });
}
