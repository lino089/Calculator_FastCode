let expression = ""; 
const displayMain = document.getElementById("display-main");
const liveResult = document.getElementById("live-result");

function appendValue(value) {
    const operators = ['+', '-', '*', '/', '%'];
    const lastChar = expression.slice(-1);

    // Mencegah operator ganda berurutan
    if (operators.includes(value) && operators.includes(lastChar)) {
        expression = expression.slice(0, -1) + value;
    } 
    // Mencegah mulai dengan operator (kecuali minus)
    else if (expression === "" && operators.includes(value) && value !== '-') {
        return;
    }
    else {
        // Jika ekspresi terlalu panjang, kita bisa atur ukuran font nantinya
        expression += value;
    }

    updateDisplay();
    autoCalculate();
}

function updateDisplay() {
    // Tampilkan seluruh deretan angka di display utama (besar)
    // Gunakan replace agar simbol matematika terlihat lebih bagus (× dan ÷)
    displayMain.innerText = expression === "" ? "0" : 
        expression.replace(/\*/g, "×").replace(/\//g, "÷");
}

function autoCalculate() {
    if (expression === "") {
        liveResult.innerText = "";
        return;
    }

    const lastChar = expression.slice(-1);
    // Jangan hitung jika karakter terakhir adalah operator
    if (['+', '-', '*', '/', '%'].includes(lastChar)) return;

    try {
        let result = eval(expression);

        if (!Number.isInteger(result)) {
            result = parseFloat(result.toFixed(4));
        }

        // Tampilkan hasil sementara di baris bawah dengan tanda "="
        liveResult.innerText = "= " + result;
    } catch (e) {
        liveResult.innerText = "";
    }
}

function clearDisplay() {
    expression = "";
    displayMain.innerText = "0";
    liveResult.innerText = "";
}

function calculate() {
    try {
        let result = eval(expression);
        if (!Number.isInteger(result)) result = parseFloat(result.toFixed(4));
        
        // Saat tekan "=", hasil naik ke atas, baris bawah kosong
        displayMain.innerText = result;
        expression = result.toString();
        liveResult.innerText = "";
    } catch (e) {
        displayMain.innerText = "Error";
        expression = "";
        liveResult.innerText = "";
    }
}

const container = document.getElementById('mesh-container');
const orbCount = 20; // Tambah sedikit untuk kepadatan warna
const orbs = [];

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let interpX = mouseX;
let interpY = mouseY;

for (let i = 0; i < orbCount; i++) {
    const orb = document.createElement('div');
    orb.classList.add('orb');
    
    const colors = ['#8a2be2', '#7f0df2', '#c77dff', '#9d4edd', '#5a189a'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    orb.style.background = `radial-gradient(circle, ${randomColor}aa, transparent 75%)`;
    
    // Distribusi merata di seluruh layar lebar
    const data = {
        el: orb,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        factor: (Math.random() * 0.12) + 0.03, // Variasi kecepatan yang lebih halus
        phase: Math.random() * Math.PI * 2
    };
    
    container.appendChild(orb);
    orbs.push(data);
}

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animate() {
    // Naikkan ke 0.06 agar respon terasa instan dan ringan
    interpX += (mouseX - interpX) * 0.06;
    interpY += (mouseY - interpY) * 0.06;

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    orbs.forEach((orb, i) => {
        const mouseRelX = (interpX - vw / 2) / (vw / 2);
        const mouseRelY = (interpY - vh / 2) / (vh / 2);

        // Jangkauan gerak dibuat lebih luas (1.8) agar terasa sangat responsif
        const travelRange = vw * (orb.factor * 1.8); 

        const shiftX = mouseRelX * travelRange;
        const shiftY = mouseRelY * travelRange;
        
        const oscillate = Math.sin(Date.now() * 0.001 + orb.phase) * 40;

        // JANGAN gunakan Math.round agar gerakan tidak lengket.
        // Biarkan desimal mengalir, tapi gunakan translate3d agar di-handle GPU.
        const finalX = orb.x + shiftX + oscillate;
        const finalY = orb.y + shiftY + oscillate;

        orb.el.style.transform = `translate3d(${finalX}px, ${finalY}px, 0) translate(-50%, -50%) scale(${1 + (i * 0.01)})`;
    });

    requestAnimationFrame(animate);
}

animate();