let expression = "";
const displayMain = document.getElementById("display-main");
const liveResult = document.getElementById("live-result");

function appendValue(value) {
    const operators = ['+', '-', '*', '/', '%'];
    const lastChar = expression.slice(-1);

    if (operators.includes(value) && operators.includes(lastChar)) {
        expression = expression.slice(0, -1) + value;
    } else if (expression === "" && operators.includes(value) && value !== '-') {
        return;
    } else {
        expression += value;
    }

    updateDisplay();
    autoCalculate();
}

function updateDisplay() {
    displayMain.innerText = expression === "" ? "0" :
        expression.replace(/\*/g, "×").replace(/\//g, "÷");
}

function autoCalculate() {
    if (expression === "") {
        liveResult.innerText = "";
        return;
    }

    const lastChar = expression.slice(-1);
    if (['+', '-', '*', '/', '%'].includes(lastChar)) return;

    try {
        let result = eval(expression);

        if (!Number.isInteger(result)) {
            result = parseFloat(result.toFixed(4));
        }

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

        displayMain.innerText = result;
        expression = result.toString();
        liveResult.innerText = "";

        triggerBigBlast();
    } catch (e) {
        displayMain.innerText = "Error";
        expression = "";
        liveResult.innerText = "";
    }
}

function triggerBigBlast() {
    const btnEqual = document.querySelector('.btn-equal');
    const rect = btnEqual.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const blast1 = document.createElement('div');
    blast1.classList.add('shockwave-equal');
    blast1.style.left = `${x}px`;
    blast1.style.top = `${y}px`;

    const blast2 = document.createElement('div');
    blast2.classList.add('shockwave-equal-inner');
    blast2.style.left = `${x}px`;
    blast2.style.top = `${y}px`;

    const flash = document.createElement('div');
    flash.classList.add('screen-flash');

    const panel = document.querySelector('.glass-panel');
    panel.classList.add('screen-shake');

    document.body.appendChild(blast1);
    document.body.appendChild(blast2);
    document.body.appendChild(flash);

    setTimeout(() => {
        blast1.remove();
        blast2.remove();
        flash.remove();
        panel.classList.remove('screen-shake');
    }, 1500);
}

const container = document.getElementById('mesh-container');
const orbCount = 20;
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

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animate() {
    interpX += (mouseX - interpX) * 0.06;
    interpY += (mouseY - interpY) * 0.06;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    orbs.forEach((orb, i) => {
        const mouseRelX = (interpX - vw / 2) / (vw / 2);
        const mouseRelY = (interpY - vh / 2) / (vh / 2);
        const travelRange = vw * (orb.factor * 1.8);
        const shiftX = mouseRelX * travelRange;
        const shiftY = mouseRelY * travelRange;
        const oscillate = Math.sin(Date.now() * 0.001 + orb.phase) * 40;
        const finalX = orb.x + shiftX + oscillate;
        const finalY = orb.y + shiftY + oscillate;
        orb.el.style.transform = `translate3d(${finalX}px, 
                                ${finalY}px, 0) translate(-50%, -50%) 
                                scale(${1 + (i * 0.01)})`;
    });

    requestAnimationFrame(animate);
}

animate();

document.querySelectorAll('.glass-button').forEach(button => {
    button.addEventListener('click', function (e) {
        const rect = this.getBoundingClientRect();
        const xInternal = e.clientX - rect.left;
        const yInternal = e.clientY - rect.top;
        const xGlobal = e.clientX;
        const yGlobal = e.clientY;

        const ripple = document.createElement('span');
        ripple.classList.add('ripple-internal');
        ripple.style.left = `${xInternal}px`;
        ripple.style.top = `${yInternal}px`;
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 500);

        const wave = document.createElement('div');
        wave.classList.add('shockwave-outer');
        wave.style.left = `${xGlobal}px`;
        wave.style.top = `${yGlobal}px`;

        document.body.appendChild(wave);

        const panel = document.querySelector('.glass-panel');
        panel.style.transform = 'scale(0.998)';
        setTimeout(() => {
            panel.style.transform = 'scale(1)';
            wave.remove();
        }, 800);
    });
});