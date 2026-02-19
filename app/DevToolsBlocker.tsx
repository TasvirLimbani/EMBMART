// "use client";

// import { useEffect, useState } from "react";

// export default function DevToolsBlocker() {
//   const [blocked, setBlocked] = useState(false);

//   useEffect(() => {
//     const disableContextMenu = (e: MouseEvent) => e.preventDefault();
//     document.addEventListener("contextmenu", disableContextMenu);

//     const disableKeys = (e: KeyboardEvent) => {
//       if (
//         e.key === "F12" ||
//         (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key)) ||
//         (e.ctrlKey && e.key.toLowerCase() === "u")
//       ) {
//         e.preventDefault();
//         e.stopPropagation();
//       }
//     };
//     document.addEventListener("keydown", disableKeys);

//     const threshold = 160;

//     const interval = setInterval(() => {
//       if (
//         window.outerWidth - window.innerWidth > threshold ||
//         window.outerHeight - window.innerHeight > threshold
//       ) {
//         setBlocked(true);
//         clearInterval(interval); // ✅ stop loop after detected
//       }
//     }, 500);

//     return () => {
//       document.removeEventListener("contextmenu", disableContextMenu);
//       document.removeEventListener("keydown", disableKeys);
//       clearInterval(interval);
//     };
//   }, []);

//   if (blocked) {
//     return (
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "100vh",
//           width: "100vw",
//           backgroundColor: "#1f1f1f",
//           color: "#fff",
//           textAlign: "center",
//           padding: "20px",
//         }}
//       >
//         <h1 style={{ fontSize: "4rem", marginBottom: "1rem" }}>
//           🚫 Access Denied
//         </h1>
//         <p style={{ fontSize: "1.5rem", maxWidth: "600px" }}>
//           Developer Tools have been detected. For security reasons, this page is blocked.
//         </p>
//         <p style={{ marginTop: "2rem", fontSize: "1rem", color: "#aaa" }}>
//           Please close DevTools to continue using the website.
//         </p>
//       </div>
//     );
//   }

//   return null;
// }


"use client";

import { useEffect, useState } from "react";

export default function DevToolsBlocker() {
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const threshold = 150;

    const detectDevTools = () => {
      const widthDiff = window.outerWidth - window.innerWidth;
      const heightDiff = window.outerHeight - window.innerHeight;

      if (widthDiff > threshold || heightDiff > threshold) {
        setBlocked(true);
      }
    };

    const interval = setInterval(detectDevTools, 500);

    window.addEventListener("resize", detectDevTools);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", detectDevTools);
    };
  }, []);

  if (blocked) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center text-white z-[9999]">
        <div className="text-center p-6">
          <h1 className="text-5xl font-bold mb-4">🚫 Access Denied</h1>
          <p className="text-lg">
            Developer Tools detected. Please close DevTools.
          </p>
        </div>
      </div>
    );
  }

  return null;
}
