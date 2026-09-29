function generateQuote() {
var clientCompany = document.getElementById('clientCompany').value;
var clientName = document.getElementById('clientName').value;
var participantsInput = document.getElementById('participants').value;
var participants = parseInt(participantsInput);
if (!clientCompany || !clientName || isNaN(participants) || participants < 1) {
alert("Ole hyvä ja täytä kaikki asiakastiedot sekä osallistujamäärä (vähintään 1).");
return;
}
var unitPrice = 199.00;
var taxRate = 0.255;
var priceNet = participants * unitPrice;
var taxAmount = priceNet * taxRate;
var priceTotal = priceNet + taxAmount;
var today = new Date().toLocaleDateString('fi-FI');
var formatOptions = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
document.getElementById('outDate').innerText = today;
document.getElementById('outClientCompany').innerText = clientCompany;
document.getElementById('outClientName').innerText = clientName;
document.getElementById('outParticipants').innerText = participants;
document.getElementById('outPriceNet').innerText = priceNet.toLocaleString('fi-FI', formatOptions);
document.getElementById('outTaxAmount').innerText = taxAmount.toLocaleString('fi-FI', formatOptions);
document.getElementById('outPriceTotal').innerText = priceTotal.toLocaleString('fi-FI', formatOptions);
var logoInput = document.getElementById('logoInput');
var outLogo = document.getElementById('outLogo');
var outputBox = document.getElementById('quoteOutput');
if (logoInput.files && logoInput.files[0]) {
var reader = new FileReader();
reader.onload = function(e) {
outLogo.src = e.target.result;
outLogo.style.display = 'block';
outputBox.style.display = 'block';
outputBox.scrollIntoView({ behavior: 'smooth' });
};
reader.readAsDataURL(logoInput.files[0]);
} else {
outLogo.style.display = 'none';
outputBox.style.display = 'block';
outputBox.scrollIntoView({ behavior: 'smooth' });
}
}
