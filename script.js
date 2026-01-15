/* ================================
   CORE STATE & DOM REFERENCES
   ================================ */

// Menyimpan ekspresi matematika yang sedang diketik
let expression = "";

// Mengambil elemen tampilan hasil utama
const displayMain = document.getElementById("display-main");

// Mengambil elemen hasil kalkulasi realtime
const liveResult = document.getElementById("live-result");


/* ================================
   INPUT & EXPRESSION HANDLING
   ================================ */

function appendValue(value) {
    // Daftar operator yang diizinkan
    const operators = ['+', '-', '*', '/', '%'];

    // Karakter terakhir dari ekspresi
    const lastChar = expression.slice(-1);

    // Jika dua operator diketik berurutan, ganti operator terakhir
    if (operators.includes(value) && operators.includes(lastChar)) {
        expression = expression.slice(0, -1) + value;
    }
    // Mencegah ekspresi diawali operator kecuali "-"
    else if (expression === "" && operators.includes(value) && value !== '-') {
        return;
    }
    // Jika aman, tambahkan ke ekspresi
    else {
        expression += value;
    }

    // Update tampilan layar
    updateDisplay();

    // Hitung otomatis hasil sementara
    autoCalculate();
}


/* ================================
   DISPLAY UPDATE
   ================================ */

function updateDisplay() {
    // Jika kosong, tampilkan 0
    // Jika ada, ganti * dan / menjadi simbol matematika yang cantik
    displayMain.innerText = expression === "" ? "0" :
        expression.replace(/\*/g, "×").replace(/\//g, "÷");
}


/* ================================
   LIVE AUTO CALCULATION
   ================================ */

function autoCalculate() {
    // Jika kosong, hapus hasil live
    if (expression === "") {
        liveResult.innerText = "";
        return;
    }

    // Jika karakter terakhir adalah operator, jangan dihitung
    const lastChar = expression.slice(-1);
    if (['+', '-', '*', '/', '%'].includes(lastChar)) return;

    try {
        // Hitung ekspresi menggunakan eval
        let result = eval(expression);

        // Jika desimal, batasi hingga 4 digit
        if (!Number.isInteger(result)) {
            result = parseFloat(result.toFixed(4));
        }

        // Tampilkan hasil sementara
        liveResult.innerText = "= " + result;
    } catch (e) {
        // Jika error, kosongkan hasil
        liveResult.innerText = "";
    }
}


/* ================================
   CLEAR & FINAL CALCULATION
   ================================ */

// Tombol CLEAR
function clearDisplay() {
    expression = "";
    displayMain.innerText = "0";
    liveResult.innerText = "";
}

// Tombol "=" ditekan
function calculate() {
    try {
        let result = eval(expression);

        // Format hasil desimal
        if (!Number.isInteger(result)) result = parseFloat(result.toFixed(4));

        // Tampilkan hasil di layar utama
        displayMain.innerText = result;

        // Simpan hasil sebagai ekspresi baru
        expression = result.toString();

        // Hapus live result
        liveResult.innerText = "";

        // Jalankan efek ledakan
        triggerBigBlast();
    } catch (e) {
        // Jika error kalkulasi
        displayMain.innerText = "Error";
        expression = "";
        liveResult.innerText = "";
    }
}


/* ================================
   EQUAL BUTTON VISUAL BLAST
   ================================ */

function triggerBigBlast() {
    // Ambil posisi tombol "="
    const btnEqual = document.querySelector('.btn-equal');
    const rect = btnEqual.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // Shockwave luar
    const blast1 = document.createElement('div');
    blast1.classList.add('shockwave-equal');
    blast1.style.left = `${x}px`;
    blast1.style.top = `${y}px`;

    // Shockwave dalam
    const blast2 = document.createElement('div');
    blast2.classList.add('shockwave-equal-inner');
    blast2.style.left = `${x}px`;
    blast2.style.top = `${y}px`;

    // Flash putih layar
    const flash = document.createElement('div');
    flash.classList.add('screen-flash');

    // Efek goyang panel
    const panel = document.querySelector('.glass-panel');
    panel.classList.add('screen-shake');

    // Masukkan efek ke DOM
    document.body.appendChild(blast1);
    document.body.appendChild(blast2);
    document.body.appendChild(flash);

    // Hapus semua efek setelah animasi selesai
    setTimeout(() => {
        blast1.remove();
        blast2.remove();
        flash.remove();
        panel.classList.remove('screen-shake');
    }, 1500);
}


/* ================================
   BACKGROUND ORB SYSTEM
   ================================ */

// Container untuk orb
const container = document.getElementById('mesh-container');

// Jumlah orb animasi
const orbCount = 20;

// Menyimpan semua data orb
const orbs = [];

// Posisi mouse target
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

// Posisi interpolasi (biar smooth)
let interpX = mouseX;
let interpY = mouseY;

// Membuat orb satu per satu
for (let i = 0; i < orbCount; i++) {
    const orb = document.createElement('div');
    orb.classList.add('orb');

    // Palet warna orb
    const colors = ['#8a2be2', '#7f0df2', '#c77dff', '#9d4edd', '#5a189a'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    // Warna radial gradient orb
    orb.style.background = `radial-gradient(circle, ${randomColor}aa, transparent 75%)`;

    // Data fisika orb
    const data = {
        el: orb,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        factor: (Math.random() * 0.12) + 0.03,
        phase: Math.random() * Math.PI * 2
    };

    container.appendChild(orb);
    orbs.push(data);
}


/* ================================
   MOUSE TRACKING
   ================================ */

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});


/* ================================
   ORB ANIMATION LOOP
   ================================ */

function animate() {
    // Interpolasi mouse supaya gerakan halus
    interpX += (mouseX - interpX) * 0.06;
    interpY += (mouseY - interpY) * 0.06;

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    orbs.forEach((orb, i) => {
        // Posisi relatif mouse
        const mouseRelX = (interpX - vw / 2) / (vw / 2);
        const mouseRelY = (interpY - vh / 2) / (vh / 2);

        // Seberapa jauh orb bergerak
        const travelRange = vw * (orb.factor * 1.8);

        // Pergerakan berdasarkan mouse
        const shiftX = mouseRelX * travelRange;
        const shiftY = mouseRelY * travelRange;

        // Gerakan bergelombang
        const oscillate = Math.sin(Date.now() * 0.001 + orb.phase) * 40;

        // Posisi akhir orb
        const finalX = orb.x + shiftX + oscillate;
        const finalY = orb.y + shiftY + oscillate;

        // Terapkan ke CSS transform
        orb.el.style.transform = `translate3d(${finalX}px, 
                                ${finalY}px, 0) translate(-50%, -50%) 
                                scale(${1 + (i * 0.01)})`;
    });

    // Loop animasi
    requestAnimationFrame(animate);
}

animate();


/* ================================
   BUTTON CLICK VISUAL EFFECTS
   ================================ */

document.querySelectorAll('.glass-button').forEach(button => {
    button.addEventListener('click', function (e) {
        // Posisi klik relatif terhadap tombol
        const rect = this.getBoundingClientRect();
        const xInternal = e.clientX - rect.left;
        const yInternal = e.clientY - rect.top;

        // Posisi global klik
        const xGlobal = e.clientX;
        const yGlobal = e.clientY;

        // Ripple di dalam tombol
        const ripple = document.createElement('span');
        ripple.classList.add('ripple-internal');
        ripple.style.left = `${xInternal}px`;
        ripple.style.top = `${yInternal}px`;
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 500);

        // Shockwave luar
        const wave = document.createElement('div');
        wave.classList.add('shockwave-outer');
        wave.style.left = `${xGlobal}px`;
        wave.style.top = `${yGlobal}px`;

        document.body.appendChild(wave);

        // Efek tekan panel
        const panel = document.querySelector('.glass-panel');
        panel.style.transform = 'scale(0.998)';
        setTimeout(() => {
            panel.style.transform = 'scale(1)';
            wave.remove();
        }, 800);
    });
});
