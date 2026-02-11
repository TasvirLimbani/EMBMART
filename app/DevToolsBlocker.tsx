"use client";

import { useEffect } from "react";

export default function DevToolsBlocker() {
  useEffect(() => {
    // Disable right-click
    const disableContextMenu = (e: MouseEvent) => e.preventDefault();
    document.addEventListener("contextmenu", disableContextMenu);

    // Disable inspect keys
    const disableKeys = (e: KeyboardEvent) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key)) ||
        (e.ctrlKey && e.key.toLowerCase() === "u")
      ) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    document.addEventListener("keydown", disableKeys);

    // DevTools detection (basic)
    const threshold = 160;
    const interval = setInterval(() => {
      if (
        window.outerWidth - window.innerWidth > threshold ||
        window.outerHeight - window.innerHeight > threshold
      ) {
        // Replace body with styled overlay
        document.body.innerHTML = `
          <div style="
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            width: 100vw;
            background-color: #1f1f1f;
            color: #fff;
            font-family: 'Segoe UI', sans-serif;
            text-align: center;
            padding: 20px;
          ">
            <h1 style="font-size: 4rem; margin-bottom: 1rem;">🚫 Access Denied</h1>
            <p style="font-size: 1.5rem; max-width: 600px;">
              Developer Tools have been detected. 
              For security reasons, this page is blocked.
            </p>
            <p style="margin-top: 2rem; font-size: 1rem; color: #aaa;">
              Please close DevTools to continue using the website.
            </p>
          </div>
        `;
      }
    }, 500);

    return () => {
      document.removeEventListener("contextmenu", disableContextMenu);
      document.removeEventListener("keydown", disableKeys);
      clearInterval(interval);
    };
  }, []);

  return null;
}
