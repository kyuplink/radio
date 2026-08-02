// ==========================================
// 1. TAB SWITCHING LOGIC (Kept Intact)
// ==========================================
const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.tab-content');

tabs.forEach(selectedTab => {
    selectedTab.addEventListener('click', () => {
        tabs.forEach(tab => tab.classList.remove('active'));
        panels.forEach(panel => panel.classList.remove('active-content'));
        
        selectedTab.classList.add('active');
        
        const targetTabName = selectedTab.getAttribute('data-tab');
        const matchingPanel = document.getElementById(`${targetTabName}-panel`);
        
        if (matchingPanel) {
            matchingPanel.classList.add('active-content');
        }
    });
});

// ==========================================
// 2. LIVE DATA SHIPPING ENGINE (Fixed Selectors)
// ==========================================
// FIX: Changed from 'interaction-form' to 'interact-form' to match HTML
const form = document.getElementById('interact-form'); 
// FIX: Changed from '.submit-btn' to '.submit-button' to match HTML
const submitBtn = document.querySelector('.submit-button'); 

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyF2NcmtbNAc56I5HfrfeqKQdqW8FSr4_5dRScFukPdEIXIIoB98IoKPHMn8ldSsI5e/exec';

form.addEventListener('submit', (event) => {
    // This will now stop the reload successfully because the form is correctly targeted
    event.preventDefault();

    // Visual loading state updates
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    const activeTab = document.querySelector('.tab.active').getAttribute('data-tab');
    const formData = new FormData(form);
    const rawData = Object.fromEntries(formData.entries());

    // Normalize different input configurations into universal columns
    let finalPayload = { type: activeTab };

    if (activeTab === 'confessions') {
        finalPayload.mainText = rawData.confession_text;
        finalPayload.metaDetails = rawData.confession_author || "Anonymous";
    } else if (activeTab === 'song') {
        finalPayload.mainText = rawData.song_track;
        finalPayload.metaDetails = rawData.song_recipient || "The Vibe";
    } else if (activeTab === 'feedback') {
        finalPayload.mainText = rawData.feedback_text;
        finalPayload.metaDetails = "N/A";
    }

    // Ship data payload using form-urlencoded formatting to bypass CORS limitations
    fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', 
        headers: { 
            'Content-Type': 'application/x-www-form-urlencoded' 
        },
        body: new URLSearchParams(finalPayload).toString()
    })
    .then(() => {
        alert("Success! Your submission was recorded.");
        form.reset();
    })
    .catch(error => {
        console.error('Transmission Failure:', error);
        alert("Transmission dropped. Please try again.");
    })
    .finally(() => {
        // Restore interactive state buttons
        submitBtn.textContent = "Submit";
        submitBtn.disabled = false;
    });
});

    // Normalize different input configurations into universal columns
    let finalPayload = { type: activeTab };

    if (activeTab === 'confessions') {
        finalPayload.mainText = rawData.confession_text;
        finalPayload.metaDetails = rawData.confession_author || "Anonymous";
    } else if (activeTab === 'song') {
        finalPayload.mainText = rawData.song_track;
        finalPayload.metaDetails = rawData.song_recipient || "The Vibe";
    } else if (activeTab === 'feedback') {
        finalPayload.mainText = rawData.feedback_text;
        finalPayload.metaDetails = "N/A";
    } 
    // === ADD THIS NEW BLOCK BELOW ===
    else if (activeTab === 'senior') {
        finalPayload.mainText = rawData.senior_text;
        finalPayload.metaDetails = rawData.senior_author || "Anonymous";
    }
