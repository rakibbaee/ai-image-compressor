"use client";
import { useState, useRef } from "react";

export default function Home() {
  const [clicks, setClicks] = useState(0);
  const [showMsg, setShowMsg] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState(null);
  const fileInputRef = useRef(null);

  const handleAction = () => {
    if (clicks === 0) {
      window.open("https://www.profitablecpmratenetwork.com/fp88w4cu?key=2c0368f539be5d8cad3117658eb622aa", "_blank");
      setShowMsg(true);
      setClicks(1);
    } else {
      fileInputRef.current.click();
      setClicks(0);
      setShowMsg(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Convert to MB
    const originalSize = (file.size / 1024 / 1024).toFixed(2); 
    setIsLoading(true);
    setStats(null);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("/api/compress", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const blob = await res.blob();
        const compressedSize = (blob.size / 1024 / 1024).toFixed(2);

        // Auto Download Trigger
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "compressed_by_rakib_bae.webp";
        document.body.appendChild(a);
        a.click();
        a.remove();

        setStats({ original: originalSize, compressed: compressedSize });
      } else {
        alert("Compression failed! 🥲");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      e.target.value = null;
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="bg-slate-800/50 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-slate-700 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">AI Image Compressor</h1>
        <p className="text-sm text-slate-400 mb-6">No login required. 100% Free.</p>

        <div className="border-2 border-dashed border-slate-600 rounded-xl p-8 mb-6 hover:border-blue-500 transition-colors relative">
          <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" />
          
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-4">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mb-2"></div>
              <p className="text-blue-400 text-sm font-medium animate-pulse">AI is hacking the pixels...</p>
            </div>
          ) : (
            <button 
              onClick={handleAction}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg w-full transition-all transform hover:scale-105 shadow-[0_0_15px_rgba(37,99,235,0.5)]"
            >
              Upload Image
            </button>
          )}
        </div>

        {showMsg && (
          <p className="text-xs text-yellow-400 mt-4 animate-bounce">
            We know ads might be boring 🪴, but we need donations to run the project. Please watch the ad and support us. Click again to upload!
          </p>
        )}

        {stats && (
          <div className="mt-4 p-4 bg-slate-700/50 rounded-lg border border-slate-600 transform transition-all duration-500">
            <p className="text-green-400 font-bold mb-2">Success! 🎉</p>
            <div className="flex justify-between items-center text-sm font-medium">
              <span className="text-red-400">{stats.original} MB</span>
              <span className="text-slate-400 text-xl">➜</span>
              <span className="text-blue-400">{stats.compressed} MB</span>
            </div>
          </div>
        )}
      </div>
      <footer className="mt-8 text-slate-500 text-sm font-medium tracking-wider">
        Created by Rakib bae ⚡️
      </footer>
    </main>
  );
    }
    
