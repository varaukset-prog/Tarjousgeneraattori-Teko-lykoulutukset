 // ==========================================
    // VAIHE 1: HAETAAN LOMAKKEEN TIEDOT
    // ==========================================

    const clientCompanyInput = document.getElementById('clientCompany');
    const clientNameInput = document.getElementById('clientName');
    const participantsInput = document.getElementById('participants');

    const clientCompany = clientCompanyInput.value.trim();
    const clientName = clientNameInput.value.trim();
    const participants = parseInt(participantsInput.value, 10);


    // ==========================================
    // VALIDOINTI
    // ==========================================

    if (
        clientCompany === '' ||
        clientName === '' ||
        Number.isNaN(participants) ||
        participants < 1
    ) {
        alert(
            'Ole hyvä ja täytä kaikki asiakastiedot sekä osallistujamäärä (vähintään 1).'
        );

        return;
    }


    // ==========================================
    // HINNOITTELU
    // ==========================================

    const unitPrice = 199.00;
    const taxRate = 0.255;

    const priceNet = participants * unitPrice;
    const taxAmount = priceNet * taxRate;
    const priceTotal = priceNet + taxAmount;


    // ==========================================
    // PÄIVÄMÄÄRÄ
    // ==========================================

    const today = new Date().toLocaleDateString('fi-FI');

    const formatOptions = {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    };


    // ==========================================
    // SIJOITETAAN TIEDOT TARJOUKSEEN
    // ==========================================

    document.getElementById('outDate').textContent = today;

    document.getElementById('outClientCompany').textContent =
        clientCompany;

    document.getElementById('outClientName').textContent =
        clientName;

    document.getElementById('outParticipants').textContent =
        participants;

    document.getElementById('outPriceNet').textContent =
        priceNet.toLocaleString('fi-FI', formatOptions);

    document.getElementById('outTaxAmount').textContent =
        taxAmount.toLocaleString('fi-FI', formatOptions);

    document.getElementById('outPriceTotal').textContent =
        priceTotal.toLocaleString('fi-FI', formatOptions);


    // ==========================================
    // LOGO
    // ==========================================

    const logoInput = document.getElementById('logoInput');
    const outLogo = document.getElementById('outLogo');

    if (
        logoInput &&
        logoInput.files &&
        logoInput.files.length > 0
    ) {

        const reader = new FileReader();

        reader.onload = function (event) {

            outLogo.src = event.target.result;
            outLogo.style.display = 'block';

            // Kun logo on luettu,
            // siirrytään seuraavaan vaiheeseen.
            showQuoteStep();
        };

        reader.onerror = function () {

            // Vaikka logon lukeminen epäonnistuisi,
            // tarjous voidaan silti näyttää.
            outLogo.src = '';
            outLogo.style.display = 'none';

            showQuoteStep();
        };

        reader.readAsDataURL(logoInput.files[0]);

    } else {

        // Logo ei ole pakollinen
        outLogo.src = '';
        outLogo.style.display = 'none';

        showQuoteStep();
    }
}


// ==========================================
// VAIHE 2: NÄYTÄ VALMIS TARJOUS
// ==========================================

function showQuoteStep() {

    const formStep = document.getElementById('formStep');
    const quoteOutput = document.getElementById('quoteOutput');

    // Piilotetaan ensimmäinen vaihe
    formStep.style.display = 'none';

    // Näytetään tarjous
    quoteOutput.style.display = 'block';

    // Siirrytään sivun alkuun
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}


// ==========================================
// PALUU MUOKKAAMAAN TARJOUSTA
// ==========================================

function editQuote() {

    const formStep = document.getElementById('formStep');
    const quoteOutput = document.getElementById('quoteOutput');

    // Piilotetaan tarjous
    quoteOutput.style.display = 'none';

    // Näytetään lomake uudelleen
    formStep.style.display = 'block';
