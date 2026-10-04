/**
 * =========================================================================
 * LIGHT CANVAS — ANIMAÇÃO DE LUZ SINÁPTICA & HORIZONTE DOURADO
 * Partículas sutis harmonizadas com o fundo Azul Meia-Noite (#000d21)
 * =========================================================================
 */

(function () {
  'use strict';

  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId;
  let width, height;
  let particles = [];

  // Configuração das partículas
  const PARTICLE_COUNT = 38;
  const COLORS = [
    'rgba(242, 199, 121, ', // Dourado solar quente
    'rgba(255, 226, 168, ', // Dourado claro brilhante
    'rgba(196, 139, 82, ',  // Bronze
    'rgba(168, 85, 247, ',  // Roxo sináptico
    'rgba(56, 189, 248, '   // Ciano celeste
  ];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 10;
      this.radius = Math.random() * 1.9 + 0.6;
      this.speedY = -(Math.random() * 0.35 + 0.15);
      this.speedX = (Math.random() - 0.5) * 0.22;
      this.alpha = 0;
      this.targetAlpha = Math.random() * 0.5 + 0.2;
      this.colorBase = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.fadeIn = true;
      this.life = Math.random() * 220 + 160;
      this.age = 0;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.age++;

      if (this.fadeIn) {
        this.alpha += 0.008;
        if (this.alpha >= this.targetAlpha) {
          this.fadeIn = false;
        }
      } else if (this.age > this.life) {
        this.alpha -= 0.006;
      }

      if (this.y < -20 || this.alpha <= 0 && !this.fadeIn) {
        this.reset();
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.colorBase + this.alpha + ')';
      ctx.shadowBlur = 10;
      ctx.shadowColor = this.colorBase + (this.alpha * 0.9) + ')';
      ctx.fill();
    }
  }

  function init() {
    resize();
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Conexões sinápticas sutis
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 115) {
          const lineAlpha = (1 - dist / 115) * 0.09 * Math.min(particles[i].alpha, particles[j].alpha);
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(242, 199, 121, ${lineAlpha})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    animationFrameId = requestAnimationFrame(render);
  }

  window.addEventListener('resize', () => {
    resize();
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animationFrameId);
    } else {
      render();
    }
  });

  init();
  render();
})();
