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