// script.js
document.addEventListener("DOMContentLoaded", function() {
    // Handle subject card clicks
    const subjectCards = document.querySelectorAll(".subject-card");
    subjectCards.forEach(card => {
        card.addEventListener("click", function() {
            const subject = this.getAttribute("data-subject");
            localStorage.setItem("selectedSubject", subject);
            window.location.href = "study.html";
        });
    });

    // Initialize study page if we're on it
    if (window.location.pathname.includes("study.html")) {
        initializeStudyPage();
    }
});
// script.js
window.onload = function() {
    loadNotesFromStorage();
};

function saveNotes() {
    const notesText = document.getElementById('notes').value;
    localStorage.setItem('notes', notesText);
    showNotification('تم حفظ الملاحظات');
}

function clearNotes() {
    document.getElementById('notes').value = '';
    localStorage.removeItem('notes');
    showNotification('تم مسح الملاحظات');
}

function loadNotesFromStorage() {
    const notesText = localStorage.getItem('notes');
    if (notesText) {
        document.getElementById('notes').value = notesText;
    }
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}
// script.js
window.onload = function() {
    loadNotesFromStorage();
};

function saveNotes() {
    const notesText = document.getElementById('notes').value;
    localStorage.setItem('notes', notesText);
    showNotification('تم حفظ الملاحظات');
}

function clearNotes() {
    document.getElementById('notes').value = '';
    localStorage.removeItem('notes');
    showNotification('تم مسح الملاحظات');
}

function loadNotesFromStorage() {
    const notesText = localStorage.getItem('notes');
    if (notesText) {
        document.getElementById('notes').value = notesText;
    }
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

function downloadNotes() {
    const notesText = localStorage.getItem('notes');
    if (notesText) {
        const downloadLink = document.createElement('a');
        downloadLink.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(notesText));
        downloadLink.setAttribute('download', 'notes.txt');
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        showNotification('تم تحميل الملاحظات');
    } else {
        showNotification('لا توجد ملاحظات لتحميلها');
    }
}

document.getElementById('saveNotes').addEventListener('click', saveNotes);
document.getElementById('downloadNotes').addEventListener('click', downloadNotes);

document.getElementById('saveNotes').addEventListener('click', saveNotes);
function initializeStudyPage() {
    const subject = localStorage.getItem("selectedSubject");
    if (!subject) return;

    const subjects = {
        math: { 
            title: "📐 الرياضيات", 
            pdf: "math.pdf",
            youtube: "https://youtu.be/lW9bsVtKHV4?si=71EEukTTB_nSuWYr",
            calculator: "standard"
        },
        physics: { 
            title: "⚡ الفيزياء", 
            pdf: "p.pdf",
            youtube: "https://www.youtube.com/watch?v=nrRNv16BT5E",
            calculator: "scientific" 
        },
        chemistry: { 
            title: "🧪 الكيمياء", 
            pdf: "chem.pdf",
            youtube: "https://www.youtube.com/watch?v=Rz1MxF4qLUE"
        },
        biology: { 
            title: "🧬 الأحياء", 
            pdf: "biology.pdf",
            youtube: "https://www.youtube.com/watch?v=WuUGWWrzNQ8"
        }
    };

    document.getElementById("subject-title").innerText = subjects[subject].title;
    
    // Set PDF source
    document.getElementById("pdf-frame").src = subjects[subject].pdf;
    
    // Check if there's a YouTube link for this subject
    if (subjects[subject].youtube) {
        // Show toggle buttons
        const contentToggle = document.getElementById("content-toggle");
        if (contentToggle) {
            contentToggle.style.display = "flex";
        }
        
        // Extract video ID from YouTube URL
        const videoUrl = subjects[subject].youtube;
        const videoId = extractYoutubeId(videoUrl);
        
        // Set the iframe src with the video ID
        const videoFrame = document.getElementById("youtube-frame");
        if (videoFrame) {
            videoFrame.src = `https://www.youtube.com/embed/${videoId}`;
        }
        
        // Add event listeners to toggle buttons
        document.getElementById("show-pdf").addEventListener("click", function() {
            toggleContent("pdf");
        });
        
        document.getElementById("show-video").addEventListener("click", function() {
            toggleContent("video");
        });
        
        // Default to showing PDF
        toggleContent("pdf");
    } else {
        // Hide toggle buttons and video container, show PDF
        const contentToggle = document.getElementById("content-toggle");
        const videoContainer = document.getElementById("video-container");
        const pdfSection = document.querySelector(".pdf-section");
        
        if (contentToggle) contentToggle.style.display = "none";
        if (videoContainer) videoContainer.style.display = "none";
        if (pdfSection) pdfSection.style.display = "block";
    }
    
    // Check if subject has calculator
    if (subjects[subject].calculator) {
        // Show notes/calculator toggle
        const notesCalcToggle = document.getElementById("notes-calc-toggle");
        if (notesCalcToggle) {
            notesCalcToggle.style.display = "flex";
        }
        
        // Initialize calculator based on type
        initializeCalculator(subjects[subject].calculator);
        
        // Add event listeners to notes/calculator toggle buttons
        document.getElementById("show-notes").addEventListener("click", function() {
            toggleNotesCalc("notes");
        });
        
        document.getElementById("show-calc").addEventListener("click", function() {
            toggleNotesCalc("calc");
        });
        
        // Default to showing notes
        toggleNotesCalc("notes");
    } else {
        // Hide calculator toggle and calculator container
        const notesCalcToggle = document.getElementById("notes-calc-toggle");
        const calculatorContainer = document.getElementById("calculator-container");
        
        if (notesCalcToggle) notesCalcToggle.style.display = "none";
        if (calculatorContainer) calculatorContainer.style.display = "none";
    }
    
    // Load saved notes
    const savedNotes = localStorage.getItem(`${subject}-notes`);
    if (savedNotes) {
        document.getElementById("notes").value = savedNotes;
    }

    // Initialize zoom level
    window.currentZoom = 100;
}

// Function to toggle between PDF and video content
function toggleContent(contentType) {
    const pdfSection = document.querySelector(".pdf-section");
    const videoContainer = document.getElementById("video-container");
    const pdfButton = document.getElementById("show-pdf");
    const videoButton = document.getElementById("show-video");
    
    if (contentType === "pdf") {
        pdfSection.style.display = "block";
        videoContainer.style.display = "none";
        pdfButton.classList.add("active");
        videoButton.classList.remove("active");
    } else if (contentType === "video") {
        pdfSection.style.display = "none";
        videoContainer.style.display = "block";
        pdfButton.classList.remove("active");
        videoButton.classList.add("active");
    }
}

// Function to toggle between notes and calculator
function toggleNotesCalc(contentType) {
    const notesSection = document.querySelector(".notes-content");
    const calculatorContainer = document.getElementById("calculator-container");
    const notesButton = document.getElementById("show-notes");
    const calcButton = document.getElementById("show-calc");
    
    if (contentType === "notes") {
        notesSection.style.display = "block";
        calculatorContainer.style.display = "none";
        notesButton.classList.add("active");
        calcButton.classList.remove("active");
    } else if (contentType === "calc") {
        notesSection.style.display = "none";
        calculatorContainer.style.display = "block";
        notesButton.classList.remove("active");
        calcButton.classList.add("active");
    }
}

// Initialize calculator based on type
function initializeCalculator(type) {
    const calculatorContainer = document.getElementById("calculator-container");
    if (!calculatorContainer) return;
    
    // Clear previous calculator
    calculatorContainer.innerHTML = "";
    
    if (type === "standard") {
        setupStandardCalculator(calculatorContainer);
    } else if (type === "scientific") {
        setupScientificCalculator(calculatorContainer);
    }
}

// Setup standard calculator
function setupStandardCalculator(container) {
    container.innerHTML = `
        <div class="calculator standard-calculator">
            <div class="calculator-display">
                <input type="text" id="calc-display" readonly>
            </div>
            <div class="calculator-buttons">
                <button class="calc-btn" onclick="clearCalc()">C</button>
                <button class="calc-btn" onclick="appendToCalc('(')">(</button>
                <button class="calc-btn" onclick="appendToCalc(')')">)</button>
                <button class="calc-btn operator" onclick="appendToCalc('/')">÷</button>
                
                <button class="calc-btn" onclick="appendToCalc('7')">7</button>
                <button class="calc-btn" onclick="appendToCalc('8')">8</button>
                <button class="calc-btn" onclick="appendToCalc('9')">9</button>
                <button class="calc-btn operator" onclick="appendToCalc('*')">×</button>
                
                <button class="calc-btn" onclick="appendToCalc('4')">4</button>
                <button class="calc-btn" onclick="appendToCalc('5')">5</button>
                <button class="calc-btn" onclick="appendToCalc('6')">6</button>
                <button class="calc-btn operator" onclick="appendToCalc('-')">-</button>
                
                <button class="calc-btn" onclick="appendToCalc('1')">1</button>
                <button class="calc-btn" onclick="appendToCalc('2')">2</button>
                <button class="calc-btn" onclick="appendToCalc('3')">3</button>
                <button class="calc-btn operator" onclick="appendToCalc('+')">+</button>
                
                <button class="calc-btn" onclick="appendToCalc('0')">0</button>
                <button class="calc-btn" onclick="appendToCalc('.')">.</button>
                <button class="calc-btn" onclick="backspaceCalc()">⌫</button>
                <button class="calc-btn equals" onclick="calculateResult()">=</button>
            </div>
        </div>
    `;
}

// Setup scientific calculator
function setupScientificCalculator(container) {
    container.innerHTML = `
        <div class="calculator scientific-calculator">
            <div class="calculator-display">
                <input type="text" id="calc-display" readonly>
            </div>
            <div class="calculator-buttons scientific">
                <button class="calc-btn" onclick="clearCalc()">C</button>
                <button class="calc-btn" onclick="appendToCalc('(')">(</button>
                <button class="calc-btn" onclick="appendToCalc(')')">)</button>
                <button class="calc-btn operator" onclick="appendToCalc('/')">÷</button>
                <button class="calc-btn function" onclick="calcFunction('sqrt')">√</button>
                
                <button class="calc-btn function" onclick="calcFunction('sin')">sin</button>
                <button class="calc-btn" onclick="appendToCalc('7')">7</button>
                <button class="calc-btn" onclick="appendToCalc('8')">8</button>
                <button class="calc-btn" onclick="appendToCalc('9')">9</button>
                <button class="calc-btn operator" onclick="appendToCalc('*')">×</button>
                
                <button class="calc-btn function" onclick="calcFunction('cos')">cos</button>
                <button class="calc-btn" onclick="appendToCalc('4')">4</button>
                <button class="calc-btn" onclick="appendToCalc('5')">5</button>
                <button class="calc-btn" onclick="appendToCalc('6')">6</button>
                <button class="calc-btn operator" onclick="appendToCalc('-')">-</button>
                
                <button class="calc-btn function" onclick="calcFunction('tan')">tan</button>
                <button class="calc-btn" onclick="appendToCalc('1')">1</button>
                <button class="calc-btn" onclick="appendToCalc('2')">2</button>
                <button class="calc-btn" onclick="appendToCalc('3')">3</button>
                <button class="calc-btn operator" onclick="appendToCalc('+')">+</button>
                
                <button class="calc-btn function" onclick="calcFunction('log')">log</button>
                <button class="calc-btn" onclick="appendToCalc('0')">0</button>
                <button class="calc-btn" onclick="appendToCalc('.')">.</button>
                <button class="calc-btn" onclick="backspaceCalc()">⌫</button>
                <button class="calc-btn equals" onclick="calculateResult()">=</button>
            </div>
        </div>
    `;
}

// Calculator functions
function appendToCalc(value) {
    const display = document.getElementById("calc-display");
    display.value += value;
}

function clearCalc() {
    const display = document.getElementById("calc-display");
    display.value = "";
}

function backspaceCalc() {
    const display = document.getElementById("calc-display");
    display.value = display.value.slice(0, -1);
}

function calculateResult() {
    const display = document.getElementById("calc-display");
    try {
        display.value = eval(display.value);
    } catch (error) {
        display.value = "Error";
        setTimeout(() => {
            display.value = "";
        }, 1500);
    }
}

function calcFunction(func) {
    const display = document.getElementById("calc-display");
    const value = parseFloat(display.value);
    
    if (isNaN(value)) {
        display.value = `${func}(`;
        return;
    }
    
    try {
        switch (func) {
            case 'sin':
                display.value = Math.sin(value * Math.PI / 180);
                break;
            case 'cos':
                display.value = Math.cos(value * Math.PI / 180);
                break;
            case 'tan':
                display.value = Math.tan(value * Math.PI / 180);
                break;
            case 'log':
                display.value = Math.log10(value);
                break;
            case 'sqrt':
                display.value = Math.sqrt(value);
                break;
        }
    } catch (error) {
        display.value = "Error";
        setTimeout(() => {
            display.value = "";
        }, 1500);
    }
}

// Function to extract YouTube video ID from URL
function extractYoutubeId(url) {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : url;
}

function adjustZoom(direction) {
    const frame = document.getElementById("pdf-frame");
    const zoomLevel = document.getElementById("zoom-level");
    
    if (direction === 'in' && window.currentZoom < 200) {
        window.currentZoom += 10;
    } else if (direction === 'out' && window.currentZoom > 50) {
        window.currentZoom -= 10;
    }
    
    frame.style.transform = `scale(${window.currentZoom / 100})`;
    zoomLevel.textContent = `${window.currentZoom}%`;
}

function saveNotes() {
    const subject = localStorage.getItem("selectedSubject");
    const notes = document.getElementById("notes").value;
    localStorage.setItem(`${subject}-notes`, notes);
    showNotification("تم حفظ الملاحظات بنجاح");
}

function clearNotes() {
    if (confirm("هل أنت متأكد من مسح جميع الملاحظات؟")) {
        document.getElementById("notes").value = "";
        saveNotes();
    }
}

function downloadNotes() {
    const subject = localStorage.getItem("selectedSubject");
    const notes = document.getElementById("notes").value;
    
    if (!notes.trim()) {
        showNotification("لا توجد ملاحظات للتحميل", "error");
        return;
    }

    const blob = new Blob([notes], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ملاحظات-${subject}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

function showNotification(message, type = "success") {
    const notification = document.getElementById("notification");
    notification.textContent = message;
    notification.style.backgroundColor = type === "success" ? "var(--success)" : "var(--error)";
    notification.classList.add("show");
    
    setTimeout(() => {
        notification.classList.remove("show");
    }, 3000);
}

function goBack() {
    window.location.href = "index.html";
}

// Toggle view layout
document.getElementById("toggleView")?.addEventListener("click", function() {
    const layout = document.querySelector(".study-layout");
    layout.style.gridTemplateColumns = 
        layout.style.gridTemplateColumns === "1fr" ? "2fr 1fr" : "1fr";
});
