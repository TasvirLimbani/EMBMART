// "use client"

// import { useSearchParams } from "next/navigation"
// import { useState } from "react"

// export default function ResetPasswordPage() {
//   const params = useSearchParams()
//   const token = params.get("token")

//   const [password, setPassword] = useState("")
//   const [confirm, setConfirm] = useState("")
//   const [msg, setMsg] = useState("")
//   const [loading, setLoading] = useState(false)

//   const handleReset = async (e: any) => {
//     e.preventDefault()

//     if (password !== confirm) {
//       setMsg("Passwords do not match")
//       return
//     }

//     setLoading(true)

//     const formData = new FormData()
//     formData.append("token", token || "")
//     formData.append("password", password)

//     const res = await fetch("https://embmart.soon.it/auth/resetpassword.php", {
//       method: "POST",
//       body: formData,
//     })

//     const data = await res.json()
//     setMsg(data.message)
//     setLoading(false)
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
//         <h2 className="text-2xl font-bold text-center mb-2">
//           Reset Password
//         </h2>
//         <p className="text-sm text-gray-500 text-center mb-6">
//           Enter your new password below
//         </p>

//         <form onSubmit={handleReset} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               New Password
//             </label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
//               placeholder="Enter new password"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Confirm Password
//             </label>
//             <input
//               type="password"
//               value={confirm}
//               onChange={(e) => setConfirm(e.target.value)}
//               required
//               className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
//               placeholder="Re-enter password"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-black text-white py-2 rounded-md font-medium hover:bg-gray-900 transition disabled:opacity-50"
//           >
//             {loading ? "Updating..." : "Update Password"}
//           </button>
//         </form>

//         {msg && (
//           <p
//             className={`mt-4 text-sm text-center ${
//               msg.toLowerCase().includes("success")
//                 ? "text-green-600"
//                 : "text-red-600"
//             }`}
//           >
//             {msg}
//           </p>
//         )}
//       </div>
//     </div>
//   )
// }
















"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ResetPasswordPage() {
  const params = useSearchParams();
  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      setMessage("❌ Invalid or expired reset link");
      return;
    }

    if (password.trim() !== confirm.trim()) {
      setMessage("❌ Passwords do not match");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/resetpassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          password: password.trim(),
        }),
      });

      const data = await res.json();

      // ✅ FIXED CONDITION
      if (res.ok) {
        setIsSuccess(true);
        setMessage("✅ Password reset successful! Redirecting...");

        // ✅ GUARANTEED REDIRECT
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      } else {
        setMessage(data.message || "❌ Something went wrong");
      }
    } catch {
      setMessage("❌ Server error. Try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-2">
          Reset Password
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Enter your new password below
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              New Password
            </label>
            <input
              type="password"
              className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-primary outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isSuccess}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-primary outline-none"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              disabled={isSuccess}
            />
          </div>

          <button
            type="submit"
            disabled={loading || isSuccess}
            className="w-full bg-primary text-white py-2 rounded-md font-medium transition disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 text-sm text-center ${
              isSuccess ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
