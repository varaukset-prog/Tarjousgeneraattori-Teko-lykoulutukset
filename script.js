function generateQuote() {
    const clientCompany = document.getElementById('clientCompany').value.trim();
    const clientName = document.getElementById('clientName').value.trim();
    const participants = parseInt(
        document.getElementById('participants').value,
        10
    );

    // Validointi
    if (!clientCompany || !clientName || isNaN(participants) || participants < 1) {
        alert("Täytä yrityksen nimi, yhteyshenkilö ja osallistujamäärä.");
        return;
    }

    const unitPrice = 199.00;
    const taxRate = 0.255;

    const priceNet = participants * unitPrice;
    const taxAmount = priceNet * taxRate;
    const priceTotal = priceNet + taxAmount;

    const today = new Date().toLocaleDateString('fi-FI');

    const formatOptions = {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    };

    // Täytetään tarjous
    document.getElementById('outDate').textContent = today;
    document.getElementById('outClientCompany').textContent = clientCompany;
    document.getElementById('outClientName').textContent = clientName;
    document.getElementById('outParticipants').textContent = participants;

    document.getElementById('outPriceNet').textContent =
        priceNet.toLocaleString('fi-FI', formatOptions);

    document.getElementById('outTaxAmount').textContent =
        taxAmount.toLocaleString('fi-FI', formatOptions);

    document.getElementById('outPriceTotal').textContent =
        priceTotal.toLocaleString('fi-FI', formatOptions);

    const outputBox = document.getElementById('quoteOutput');
    const logoInput = document.getElementById('logoInput');
    const outLogo = document.getElementById('outLogo');

    // Näytetään tarjous heti
    outputBox.style.display = 'block';

    // Jos logo on valittu, ladataan se
    if (logoInput && logoInput.files && logoInput.files.length > 0) {
        const reader = new FileReader();

        reader.onload = function(event) {
            outLogo.src = event.target.result;
            outLogo.style.display = 'block';
        };

        reader.readAsDataURL(logoInput.files[0]);
    } else {
        outLogo.src = '';
        outLogo.style.display = 'none';
    }

    // Vieritetään tarjoukseen
    setTimeout(function() {
        outputBox.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }, 50);
}
