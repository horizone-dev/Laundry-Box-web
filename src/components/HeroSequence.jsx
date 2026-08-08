import React, { useEffect, useRef, useState } from 'react';

export default function HeroSequence() {
  const canvasRef = useRef(null);
  const totalFrames = 225;
  const imagesRef = useRef([]);
  const [loadedPercent, setLoadedPercent] = useState(0);

  const getFramePath = (index) => {
    const padded = String(index).padStart(3, '0');
    return new URL(`../assets/herosection/ezgif-frame-${padded}.png`, import.meta.url).href;
  };

  useEffect(() => {
    let loadedCount = 0;
    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loadedCount++;
        setLoadedPercent(Math.round((loadedCount / totalFrames) * 100));
        if (i === 1 && canvasRef.current) {
          drawFrame(1);
        }
      };
      imagesRef.current[i] = img;
    }
  }, []);

  const drawFrame = (frameIndex) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const img = imagesRef.current[frameIndex];

    if (img && img.complete) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Enable high-quality image smoothing
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      
      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;
      let drawWidth = canvas.width;
      let drawHeight = canvas.height;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasRatio < 1.0) {
        // Mobile screen (portrait orientation e.g. 375x667, 390x844, 430x932)
        // Cover full mobile viewport seamlessly as a subtle background layer
        drawHeight = canvas.height;
        drawWidth = canvas.height * imgRatio;
        if (drawWidth < canvas.width) {
          drawWidth = canvas.width;
          drawHeight = canvas.width / imgRatio;
        }
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = (canvas.height - drawHeight) / 2;
      } else if (canvasRatio > imgRatio) {
        drawHeight = canvas.width / imgRatio;
        offsetY = (canvas.height - drawHeight) / 2;
      } else {
        drawWidth = canvas.height * imgRatio;
        offsetX = (canvas.width - drawWidth) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollMax = 2000; // scrub over 1200px scroll
      const progress = Math.min(Math.max(scrollTop / scrollMax, 0), 1);
      const frameIndex = Math.min(Math.floor(progress * (totalFrames - 1)) + 1, totalFrames);
      drawFrame(frameIndex);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadedPercent]);

  useEffect(() => {
    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      
      const scrollTop = window.scrollY;
      const scrollMax = 2000;
      const progress = Math.min(Math.max(scrollTop / scrollMax, 0), 1);
      const frameIndex = Math.min(Math.floor(progress * (totalFrames - 1)) + 1, totalFrames);
      drawFrame(frameIndex);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [loadedPercent]);

  // Mouse Move Parallax Offset Transform
  useEffect(() => {
    const handleMouseMove = (e) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const x = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const y = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      canvas.style.transform = `scale(1.05) translate(${x * 12}px, ${y * 12}px)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (loadedPercent > 0) {
      const scrollTop = window.scrollY;
      const scrollMax = 2000;
      const progress = Math.min(Math.max(scrollTop / scrollMax, 0), 1);
      const frameIndex = Math.min(Math.floor(progress * (totalFrames - 1)) + 1, totalFrames);
      drawFrame(frameIndex);
    }
  }, [loadedPercent]);

  return (
    <>
      {loadedPercent < 15 && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: '#070E10',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 99,
          gap: '12px'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid rgba(255,255,255,0.1)',
            borderTopColor: 'var(--framer-lime)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          <span style={{ fontSize: '0.8rem', color: 'var(--framer-text-dim)', fontFamily: 'IBM Plex Mono' }}>
            Preloading 3D Animation... {loadedPercent}%
          </span>
        </div>
      )}

      <canvas 
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 1,
          pointerEvents: 'none',
          opacity: 1.0,
          willChange: 'transform',
          transition: 'transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)'
        }}
      />
    </>
  );
}
