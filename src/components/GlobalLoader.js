"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function GlobalLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // Show loader on initial mount and route changes
    setIsLoading(true);
    
    // Simulate loading time to show the beautiful animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, [pathname]);

  if (!isLoading) return null;

  return (
    <div className="global-loader-overlay">
      <div className="loader-nature">
        <div className="leaf leaf1"></div>
        <div className="leaf leaf2"></div>
        <div className="leaf leaf3"></div>
      </div>
      <div className="loader-text">Cargando...</div>
      
      <style jsx>{`
        .global-loader-overlay {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          width: 100vw;
          position: fixed;
          top: 0;
          left: 0;
          background-color: var(--bg);
          z-index: 999999;
          animation: fadeOut 0.5s ease-out 1.2s forwards;
        }

        .loader-nature {
          position: relative;
          width: 80px;
          height: 80px;
          margin-bottom: 2.5rem;
          animation: spin 3s linear infinite;
        }

        .leaf {
          position: absolute;
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, var(--secondary) 0%, var(--primary) 100%);
          border-radius: 0 100% 0 100%;
          box-shadow: 0 4px 10px rgba(30, 106, 109, 0.2);
          transform-origin: 100% 100%;
        }

        .leaf1 {
          top: 0;
          left: 0;
          animation: pulseLeaf1 1.5s ease-in-out infinite alternate;
        }

        .leaf2 {
          top: 0;
          left: 0;
          transform: rotate(120deg);
          animation: pulseLeaf2 1.5s ease-in-out 0.5s infinite alternate;
        }

        .leaf3 {
          top: 0;
          left: 0;
          transform: rotate(240deg);
          animation: pulseLeaf3 1.5s ease-in-out 1s infinite alternate;
        }

        .loader-text {
          font-family: var(--font-heading, sans-serif);
          font-size: 1.5rem;
          color: var(--primary);
          letter-spacing: 3px;
          text-transform: uppercase;
          animation: pulseText 2s ease-in-out infinite;
        }

        @keyframes fadeOut {
          from { opacity: 1; visibility: visible; }
          to { opacity: 0; visibility: hidden; }
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes pulseLeaf1 {
          0% { transform: scale(0.8) rotate(0deg); opacity: 0.7; }
          100% { transform: scale(1.1) rotate(0deg); opacity: 1; }
        }

        @keyframes pulseLeaf2 {
          0% { transform: scale(0.8) rotate(120deg); opacity: 0.7; }
          100% { transform: scale(1.1) rotate(120deg); opacity: 1; }
        }

        @keyframes pulseLeaf3 {
          0% { transform: scale(0.8) rotate(240deg); opacity: 0.7; }
          100% { transform: scale(1.1) rotate(240deg); opacity: 1; }
        }

        @keyframes pulseText {
          0% { opacity: 0.5; transform: scale(0.98); }
          50% { opacity: 1; transform: scale(1); }
          100% { opacity: 0.5; transform: scale(0.98); }
        }
      `}</style>
    </div>
  );
}
