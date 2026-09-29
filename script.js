function generateQuote() {
    // Haetaan muuttuvat asiakastiedot lomakkeesta
    const clientCompany = document.getElementById('clientCompany').value;
    const clientName = document.getElementById('clientName').value;
    const participants = parseInt(document.getElementById('participants').value);

    // Varmistetaan että pakolliset kentät on täytetty oikein
    if (!clientCompany || !clientName || isNaN(participants) || participants < 1) {
        alert("Ole hyvä ja täytä kaikki asiakastiedot sekä osallistujamäärä (vähintään 1).");
        return;
    }

    // Kiinteät hinnoitteluperusteet (199 € / osallistuja ja ALV 25,5 %)
    const unitPrice = 199.00;
    const taxRate = 0.255; 

    // Automaattiset laskutoimitukset
    const priceNet = participants * unitPrice;
    const taxAmount = priceNet * taxRate;
    const priceTotal = priceNet + taxAmount;

    // Haetaan kuluva päivämäärä suomalaisessa muodossa
    const today = new Date().toLocaleDateString('fi-FI');

    // Käsitellään ladattava logo-kuva
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

    // Valuutan muotoiluasetukset (esim. 1 990,00)
    const formatOptions = { minimumFractionDigits: 2, maximumFractionDigits: 2 };

    // Sijoitetaan laskelmat ja tiedot tarjouksen tulostusalueelle
    document.getElementById('outDate').innerText = today;
    document.getElementById('outClientCompany').innerText = clientCompany;
    document.getElementById('outClientName').innerText = clientName;
    document.getElementById('outParticipants').innerText = participants;
    
    document.getElementById('outPriceNet').innerText = priceNet.toLocaleString('fi-FI', formatOptions);
    document.getElementById('outTaxAmount').innerText = taxAmount.toLocaleString('fi-FI', formatOptions);
    document.getElementById('outPriceTotal').innerText = priceTotal.toLocaleString('fi-FI', formatOptions);

    // Tehdään valmis tarjous näkyväksi ja rullataan näkymä sen kohdalle
    document.getElementById('quoteOutput').style.display = 'block';
    document.getElementById('quoteOutput').scrollIntoView({ behavior: 'smooth' });
}
