const confettiBtn = document.getElementById('home-title');
const confettiCanvas = document.getElementById('confetti-canvas');
const ctx = confettiCanvas.getContext('2d');


confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

// Define the number of confetti pieces
const confettiCount = 300;
const COLORS = ['hsl(175,45%,30%)','hsl(30,45%,45%)','hsl(45,90%,60%)','hsl(185,30%,35%)','hsl(10,60%,40%)'];
const confetti = []; 
let animationId; 
let isAnimating = false; 


function random(min, max) {
    return Math.random() * (max - min) + min;
}


function initConfetti() {
    confetti.length = 0; 
    for (let i = 0; i < confettiCount; i++) {
        confetti.push({
            x: random(0, confettiCanvas.width), 
            y: random(0, confettiCanvas.height) - confettiCanvas.height, 
            r: random(2, 6), 
            d: random(15, 25), 
            color: COLORS[Math.floor(Math.random() * COLORS.length)], 
            tilt: random(-10, 10), 
            tiltAngleIncremental: random(0.05, 0.12),
            tiltAngle: 0 
        });
    }
}

function drawConfetti() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height); 
    confetti.forEach((c, i) => {
        c.tiltAngle += c.tiltAngleIncremental; 
        c.y += (Math.cos(c.d) + 1 + c.r) / 2; 
        c.x += Math.sin(c.d); 


        ctx.beginPath();
        ctx.lineWidth = c.r;
        ctx.strokeStyle = c.color;
        ctx.moveTo(c.x + c.tilt + c.r / 4, c.y);
        ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r / 4);
        ctx.stroke();

        
        if (c.y > confettiCanvas.height) {
            confetti[i] = {
                x: random(0, confettiCanvas.width),
                y: random(0, confettiCanvas.height) - confettiCanvas.height,
                r: c.r,
                d: c.d,
                color: c.color,
                tilt: c.tilt,
                tiltAngleIncremental: c.tiltAngleIncremental,
                tiltAngle: c.tiltAngle
            };
        }
    });
}


function updateConfetti() {
    drawConfetti(); 
    animationId = requestAnimationFrame(updateConfetti); 
}

function fadeOutConfetti() {
    let opacity = 1.0;
    const fadeInterval = setInterval(() => {
        opacity -= 0.02;
        confettiCanvas.style.opacity = opacity;
        if (opacity <= 0) {
            clearInterval(fadeInterval);
            if (animationId) cancelAnimationFrame(animationId);
            isAnimating = false;

            
            confetti.length = 0;
            ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

            
            confettiCanvas.style.display = 'none';
            confettiCanvas.style.opacity = 1.0;
        }
    }, 50);
}


confettiBtn.addEventListener('click', () => {
    if (isAnimating) return;
    isAnimating = true;


    confettiCanvas.style.display = 'block';
    confettiCanvas.style.opacity = 1;

    initConfetti(); 
    updateConfetti(); 

    setTimeout(() => {
        fadeOutConfetti();
    }, 4500);
});

