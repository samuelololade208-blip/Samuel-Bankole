import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface Props {
  isDark: boolean;
}

export const ShaderBackground: React.FC<Props> = ({ isDark }) => {
  // Track mouse coordinates for subtle, smooth desktop ambient parallax
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkViewport();
    window.addEventListener('resize', checkViewport, { passive: true });

    const handleMouseMove = (e: MouseEvent) => {
      // Only compute subtle interactive parallax on larger desktop screens
      if (window.innerWidth >= 1024) {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        setMousePos({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('resize', checkViewport);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none overflow-hidden transition-colors duration-700 select-none"
    >
      {/* 
        ========================================================================
        1. BASE LUXURY OBSIDIAN / CHARCOAL GRADIENT
        Pure, smooth, non-flat dark background with soft charcoal-violet depth
        ========================================================================
      */}
      {isDark ? (
        <div
          className="absolute inset-0 w-full h-full transition-opacity duration-700"
          style={{
            background: `
              radial-gradient(ellipse 100% 80% at 50% -10%, #110524 0%, transparent 65%),
              radial-gradient(ellipse 80% 60% at 85% 30%, #0d041c 0%, transparent 60%),
              radial-gradient(ellipse 70% 50% at 15% 70%, #0c031a 0%, transparent 60%),
              radial-gradient(ellipse 100% 60% at 50% 110%, #120526 0%, transparent 70%),
              #05020a
            `,
          }}
        />
      ) : (
        <div
          className="absolute inset-0 w-full h-full transition-opacity duration-700"
          style={{
            background: `
              radial-gradient(ellipse 90% 70% at 50% -5%, #f5edff 0%, transparent 70%),
              radial-gradient(ellipse 80% 60% at 90% 35%, #efe2fe 0%, transparent 60%),
              radial-gradient(ellipse 70% 50% at 10% 75%, #f3e8ff 0%, transparent 60%),
              #faf8fd
            `,
          }}
        />
      )}

      {/* 
        ========================================================================
        2. DESKTOP & LAPTOP AMBIENT PURPLE SHAPES & GLOWS (≥ 768px)
        Sophisticated, large, soft, abstract purple blobs placed behind key visual anchors
        ========================================================================
      */}
      {!isMobile && (
        <div className="hidden md:block absolute inset-0 w-full h-full overflow-hidden">
          {/* Blob 1: Hero Section Upper Right Ambient Glow (Complements 3D Crystal, doesn't touch left text) */}
          <motion.div
            animate={{
              x: mousePos.x * 0.8,
              y: mousePos.y * 0.8,
              scale: [1, 1.05, 1],
            }}
            transition={{
              x: { duration: 0.3, ease: 'easeOut' },
              y: { duration: 0.3, ease: 'easeOut' },
              scale: { duration: 9, repeat: Infinity, ease: 'easeInOut' },
            }}
            className="absolute -top-[10%] -right-[5%] w-[650px] lg:w-[800px] xl:w-[950px] h-[650px] lg:h-[800px] xl:h-[950px] rounded-full"
            style={{
              background: isDark
                ? 'radial-gradient(circle, rgba(147, 51, 234, 0.17) 0%, rgba(126, 34, 206, 0.08) 45%, rgba(15, 6, 29, 0) 70%)'
                : 'radial-gradient(circle, rgba(168, 85, 247, 0.22) 0%, rgba(192, 132, 252, 0.10) 45%, rgba(255, 255, 255, 0) 70%)',
              filter: 'blur(75px)',
            }}
          />

          {/* Blob 2: Mid-Left Services & Works Soft Atmospheric Glow (Tucked to outer margin) */}
          <motion.div
            animate={{
              x: mousePos.x * -0.5,
              y: mousePos.y * -0.5,
              scale: [1, 1.08, 1],
            }}
            transition={{
              x: { duration: 0.3, ease: 'easeOut' },
              y: { duration: 0.3, ease: 'easeOut' },
              scale: { duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1.5 },
            }}
            className="absolute top-[32%] -left-[12%] w-[580px] lg:w-[720px] h-[580px] lg:h-[720px] rounded-full"
            style={{
              background: isDark
                ? 'radial-gradient(circle, rgba(126, 34, 206, 0.14) 0%, rgba(91, 33, 182, 0.06) 50%, rgba(5, 2, 10, 0) 72%)'
                : 'radial-gradient(circle, rgba(192, 132, 252, 0.18) 0%, rgba(216, 180, 254, 0.08) 50%, rgba(255, 255, 255, 0) 72%)',
              filter: 'blur(85px)',
            }}
          />

          {/* Blob 3: About & Experience Lower-Right Violet Accent */}
          <motion.div
            animate={{
              x: mousePos.x * 0.6,
              y: mousePos.y * 0.6,
              scale: [1, 1.06, 1],
            }}
            transition={{
              x: { duration: 0.3, ease: 'easeOut' },
              y: { duration: 0.3, ease: 'easeOut' },
              scale: { duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 },
            }}
            className="absolute top-[62%] -right-[10%] w-[550px] lg:w-[680px] h-[550px] lg:h-[680px] rounded-full"
            style={{
              background: isDark
                ? 'radial-gradient(circle, rgba(147, 51, 234, 0.13) 0%, rgba(109, 40, 217, 0.05) 50%, rgba(5, 2, 10, 0) 70%)'
                : 'radial-gradient(circle, rgba(168, 85, 247, 0.16) 0%, rgba(192, 132, 252, 0.07) 50%, rgba(255, 255, 255, 0) 70%)',
              filter: 'blur(80px)',
            }}
          />

          {/* Blob 4: Bottom Contact CTA Aurora Highlight (Radiating upward beneath CTA) */}
          <div
            className="absolute -bottom-[15%] left-[20%] right-[20%] h-[420px] rounded-full"
            style={{
              background: isDark
                ? 'radial-gradient(ellipse 90% 70% at 50% 100%, rgba(147, 51, 234, 0.18) 0%, rgba(126, 34, 206, 0.08) 50%, rgba(5, 2, 10, 0) 75%)'
                : 'radial-gradient(ellipse 90% 70% at 50% 100%, rgba(168, 85, 247, 0.22) 0%, rgba(216, 180, 254, 0.10) 50%, rgba(255, 255, 255, 0) 75%)',
              filter: 'blur(75px)',
            }}
          />
        </div>
      )}

      {/* 
        ========================================================================
        3. MOBILE-SPECIFIC CLEAN RESPONSIVE BACKGROUND (< 768px: 360px - 430px)
        - NO static, NO grain, NO noise, NO dense speckles.
        - Minimal, delicate, low-intensity ambient glows placed strictly in perimeter margins.
        - Keeps the central reading column 100% clean deep obsidian for pristine readability.
        ========================================================================
      */}
      {isMobile && (
        <div className="block md:hidden absolute inset-0 w-full h-full overflow-hidden">
          {/* Mobile Top-Right Gentle Glow (Behind Hero corner, away from text) */}
          <div
            className="absolute -top-[5%] -right-[20%] w-[320px] h-[320px] rounded-full"
            style={{
              background: isDark
                ? 'radial-gradient(circle, rgba(147, 51, 234, 0.11) 0%, rgba(126, 34, 206, 0.04) 50%, rgba(5, 2, 10, 0) 70%)'
                : 'radial-gradient(circle, rgba(168, 85, 247, 0.14) 0%, rgba(192, 132, 252, 0.05) 50%, rgba(255, 255, 255, 0) 70%)',
              filter: 'blur(50px)',
            }}
          />

          {/* Mobile Mid-Page Subtle Left Glow (Tucked to left edge) */}
          <div
            className="absolute top-[45%] -left-[25%] w-[280px] h-[280px] rounded-full"
            style={{
              background: isDark
                ? 'radial-gradient(circle, rgba(126, 34, 206, 0.08) 0%, rgba(5, 2, 10, 0) 65%)'
                : 'radial-gradient(circle, rgba(192, 132, 252, 0.10) 0%, rgba(255, 255, 255, 0) 65%)',
              filter: 'blur(50px)',
            }}
          />

          {/* Mobile Bottom Footer Warm Glow */}
          <div
            className="absolute -bottom-[8%] left-[5%] right-[5%] h-[240px] rounded-full"
            style={{
              background: isDark
                ? 'radial-gradient(ellipse 90% 70% at 50% 100%, rgba(147, 51, 234, 0.12) 0%, rgba(5, 2, 10, 0) 70%)'
                : 'radial-gradient(ellipse 90% 70% at 50% 100%, rgba(168, 85, 247, 0.15) 0%, rgba(255, 255, 255, 0) 70%)',
              filter: 'blur(45px)',
            }}
          />
        </div>
      )}

      {/* 
        ========================================================================
        4. ULTRA-SUBTLE VIGNETTE TO FRAME EDGES
        Subtly darkens outermost viewport boundaries for luxury framing
        ========================================================================
      */}
      {isDark && (
        <div
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, transparent 60%, rgba(2, 1, 5, 0.4) 100%)',
          }}
        />
      )}
    </div>
  );
};
