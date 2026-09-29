function generateQuote() {
    // 1. Haetaan muuttuvat asiakastiedot lomakkeesta
    const clientCompany = document.getElementById('clientCompany').value;
    const clientName = document.getElementById('clientName').value;
    const participants = parseInt(document.getElementById('participants').value);

    // 2. Varmistetaan, että pakolliset kentät on täytetty oikein
    if (!clientCompany || !clientName || isNaN(participants) || participants < 1) {
        alert("Ole hyvä ja täytä kaikki asiakastiedot sekä osallistujamäärä (vähintään 1).");
        return;
    }

    // Piilotetaan näkymä hetkeksi varmistaaksemme uuden päivityksen
    const outputBox = document.getElementById('quoteOutput');
    outputBox.style.display = 'none';

    // 3. Kiinteät hinnoitteluperusteet
    const unitPrice = 199.00;
    const taxRate = 0.255; // ALV 25,5 %

    // 4. Laskutoimitukset automaattisesti joka klikkauksella
    const priceNet = participants * unitPrice;
    const taxAmount = priceNet * taxRate;
    const priceTotal = priceNet + taxAmount;
    
    // Haetaan kuluva päivämäärä suomalaisessa muodossa
    const today = new Date().toLocaleDateString('fi-FI');

    // 5. Muotoillaan ja sijoitetaan tekstitiedot tulostusalueelle
    const formatOptions = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
    
    document.getElementById('outDate').innerText = today;
    document.getElementById('outClientCompany').innerText = clientCompany;
    document.getElementById('outClientName').innerText = clientName;
    document.getElementById('outParticipants').innerText = participants;
    
    document.getElementById('outPriceNet').innerText = priceNet.toLocaleString('fi-FI', formatOptions);
    document.getElementById('outTaxAmount').innerText = taxAmount.toLocaleString('fi-FI', formatOptions);
    document.getElementById('outPriceTotal').innerText = priceTotal.toLocaleString('fi-FI', formatOptions);

    // 6. Käsitellään logo-kuva tiedostosta ja näytetään tarjous
    const logoInput = document.getElementById('logoInput');
    const outLogo = document.getElementById('outLogo');

    if (logoInput.files && logoInput.files[0]) {
        const reader = new FileReader();
        
        // Odotetaan, että kuva on ladattu muistiin ennen tarjouksen avaamista
        reader.onload = function(e) {
            outLogo.src = e.target.result;
            outLogo.style.display = 'block';
            
            // Näytetään tarjous vasta kun kuva on valmis
            outputBox.style.display = 'block';
            outputBox.scrollIntoView({ behavior: 'smooth' });
        };
        
        reader.readAsDataURL(logoInput.files[0]);
    } else {
        // Jos logoa ei ole ladattu, piilotetaan logon paikka ja näytetään tarjous heti
        outLogo.style.display = 'none';
        outLogo.src = '';
        
        outputBox.style.style.display = 'block';
        outputBox.scrollIntoView({ behavior: 'smooth' });
    }
}
