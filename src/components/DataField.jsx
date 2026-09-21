import React, { useEffect, useRef } from 'react';

export default function DataField({ theme = 'light' }) {
  const canvasRef = useRef(null);
  const isLight = theme === 'light';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = canvas.parentElement.clientHeight);

    let mouse = {
      x: -1000,
      y: -1000,
      radius: 140,
      active: false
    };

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
      initNodes();
    };

    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.active = false;
    };

    const container = canvas.parentElement;
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    // Node generation
    const isMobile = window.innerWidth < 768;
    const nodeCount = isMobile ? 35 : 75;
    let nodes = [];

    class Node {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : Math.random() > 0.5 ? 0 : height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 1.5 + 1;
        this.alpha = Math.random() * 0.35 + 0.15;
        this.isSpecial = Math.random() > 0.82; // cyan data point
        this.pulsePhase = Math.random() * Math.PI * 2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.pulsePhase += 0.02;

        // Bounce off edges smoothly
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Cursor interaction - gentle pull/deflection
        if (mouse.active) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius && distance > 0) {
            const force = (1 - distance / mouse.radius) * 0.7;
            this.x -= (dx / distance) * force * 1.1;
            this.y -= (dy / distance) * force * 1.1;
          }
        }
      }

      draw() {
        ctx.save();
        const pulse = Math.sin(this.pulsePhase) * 0.2 + 0.8;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * (this.isSpecial ? 1.2 : 1), 0, Math.PI * 2);
        
        if (isLight) {
          if (this.isSpecial) {
            ctx.fillStyle = `rgba(0, 191, 239, ${this.alpha * pulse * 1.2})`;
            ctx.shadowColor = 'rgba(0, 191, 239, 0.4)';
            ctx.shadowBlur = 4;
          } else {
            ctx.fillStyle = `rgba(18, 50, 74, ${this.alpha * 0.45})`;
          }
        } else {
          if (this.isSpecial) {
            ctx.fillStyle = `rgba(32, 212, 255, ${this.alpha * pulse * 1.4})`;
            ctx.shadowColor = '#20D4FF';
            ctx.shadowBlur = 8;
          } else {
            ctx.fillStyle = `rgba(145, 160, 174, ${this.alpha * 0.6})`;
          }
        }
        ctx.fill();
        ctx.restore();
      }
    }

    const initNodes = () => {
      nodes = [];
      for (let i = 0; i < nodeCount; i++) {
        nodes.push(new Node());
      }
    };

    initNodes();

    // Data scanline sweep
    let scanY = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle background grid coordinates
      const gridSize = 60;
      ctx.strokeStyle = isLight ? 'rgba(18, 50, 74, 0.04)' : 'rgba(255, 255, 255, 0.018)';
      ctx.lineWidth = 1;
      
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw subtle horizontal scanning beam
      scanY = (scanY + 0.35) % height;
      const scanGrad = ctx.createLinearGradient(0, scanY - 30, 0, scanY + 30);
      if (isLight) {
        scanGrad.addColorStop(0, 'rgba(0, 191, 239, 0)');
        scanGrad.addColorStop(0.5, 'rgba(0, 191, 239, 0.035)');
        scanGrad.addColorStop(1, 'rgba(0, 191, 239, 0)');
      } else {
        scanGrad.addColorStop(0, 'rgba(32, 212, 255, 0)');
        scanGrad.addColorStop(0.5, 'rgba(32, 212, 255, 0.03)');
        scanGrad.addColorStop(1, 'rgba(32, 212, 255, 0)');
      }
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanY - 30, width, 60);

      // Connect nodes within threshold
      const maxDistance = isMobile ? 85 : 120;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const proximityAlpha = (1 - dist / maxDistance) * (isLight ? 0.08 : 0.15);
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            
            if (isLight) {
              ctx.strokeStyle = (nodes[i].isSpecial || nodes[j].isSpecial)
                ? `rgba(0, 191, 239, ${proximityAlpha * 1.8})`
                : `rgba(83, 101, 117, ${proximityAlpha * 0.7})`;
            } else {
              ctx.strokeStyle = (nodes[i].isSpecial || nodes[j].isSpecial)
                ? `rgba(32, 212, 255, ${proximityAlpha * 1.5})`
                : `rgba(145, 160, 174, ${proximityAlpha * 0.8})`;
            }
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Connect cursor to closest nodes
      if (mouse.active) {
        for (let i = 0; i < nodes.length; i++) {
          const dx = mouse.x - nodes[i].x;
          const dy = mouse.y - nodes[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const proximityAlpha = (1 - dist / mouse.radius) * (isLight ? 0.2 : 0.35);
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(nodes[i].x, nodes[i].y);
            ctx.strokeStyle = isLight
              ? `rgba(0, 191, 239, ${proximityAlpha})`
              : `rgba(32, 212, 255, ${proximityAlpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Update and draw all nodes
      for (let i = 0; i < nodes.length; i++) {
        nodes[i].update();
        nodes[i].draw();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [theme, isLight]);

  return (
    <div className="absolute inset-0 pointer-events-auto overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ opacity: isLight ? 0.95 : 0.85 }}
      />
      {/* Light subtle radial vignette to blend naturally */}
      {isLight ? (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-[#F6F8FA]/20 via-transparent to-[#F6F8FA] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(0,191,239,0.06)_0%,rgba(246,248,250,0)_65%)] pointer-events-none" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-[#081018]/40 via-transparent to-[#081018] pointer-events-none" />
          <div className="absolute inset-0 bg-radial-gradient pointer-events-none" />
        </>
      )}
    </div>
  );
}
