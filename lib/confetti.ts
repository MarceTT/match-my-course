import confetti from "canvas-confetti";

export function launchConfettiBurst() {
  const duration = 1.5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { origin: { y: 0.6 } };

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      clearInterval(interval);
      return;
    }

    confetti({
      ...defaults,
      particleCount: 50,
      startVelocity: 30,
      spread: 70,
      ticks: 60,
      scalar: 1.2,
      colors: ['#e63946', '#f1faee', '#a8dadc', '#457b9d', '#1d3557'],
    });

    confetti({
      ...defaults,
      particleCount: 40,
      angle: 60,
      spread: 100,
      origin: { x: 0 },
    });

    confetti({
      ...defaults,
      particleCount: 40,
      angle: 120,
      spread: 100,
      origin: { x: 1 },
    });
  }, 250);
}
