"use client";
import { useState, useRef } from "react";

export default function Home() {
  const [clicks, setClicks] = useState(0);
  const [showMsg, setShowMsg] = useState(false);
  const [filesData, setFilesData] = useState([]);
  const [quality, setQuality] = useState(80);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef(null);

  const triggerVibration = () => {
    if (typeof window !== "undefined" && navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  const handleAction = () => {
    triggerVibration();
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
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length === 0) return;

    triggerVibration();
    setIsProcessing(true);
    setShowMsg(false);

    // List to show on UI
    const newFilesData = selectedFiles.map((file, index) => ({
      id: Date.now() + index,
      name: file.name.length > 15 ? file.name.substring(0, 15) + "..." : file.name,
      originalSize: (file.size / 1024 / 1024).toFixed(2),
      compressedSize: null,
      status: 'waiting' 
    }));

    setFilesData(newFilesData);

    // Process sequentially so phone/Vercel doesn't crash
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const fileDataId = newFilesData[i].id;

      setFilesData(prev => prev.map(item => item.id === fileDataId ? { ...item, status: 'loading' } : item));

      const formData = new FormData();
      formData.append("image", file);
      formData.append("quality", quality);

      try {
        const res = await fetch("/api/compress", {
          method: "POST",
          body: formData,
        });

        if (res.ok) {
          const blob = await res.blob();
          const compressedSize = (blob.size / 1024 / 1024).toFixed(2);

          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `compressed_by_rakib_bae_${i}.webp`;
          document.body.appendChild(a);
          a.click();
          a.remove();

          setFilesData(prev => prev.map(item =>
            item.id === fileDataId ? { ...item, compressedSize, status: 'success' } : item
          ));
          triggerVibration();
        } else {
          setFilesData(prev => prev.map(item => item.id === fileDataId ? { ...item, status: 'error' } : item));
        }
      } catch (error) {
        setFilesData(prev => prev.map(item => item.id === fileDataId ? { ...item, status: 'error' } : item));
      }
    }
    
    setIsProcessing(false);
    e.target.value = null;
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="bg-slate-800/50 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-slate-700 max-w-md w-full text-center transform transition-all">
        <h1 className="text-3xl font-extrabold mb-2 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">AI Image Compressor</h1>
        <p className="text-sm text-slate-400 mb-8 font-medium">Batch Compress • No login • 100% Free</p>

        <div className="mb-8 text-left bg-slate-800/60 p-4 rounded-xl border border-slate-600">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-bold text-slate-300">AI Quality Engine</label>
            <span className="text-xs font-bold text-blue-400 bg-blue-500/20 px-2 py-1 rounded-md">{quality}%</span>
          </div>
          <input 
            type="range" 
            min="10" 
            max="100" 
            value={quality} 
            onChange={(e) => setQuality(e.target.value)}
            disabled={isProcessing}
            className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-blue-500 disabled:opacity-50"
          />
        </div>

        <div className="border-2 border-dashed border-slate-600 rounded-2xl p-8 mb-6 hover:border-blue-500 transition-all bg-slate-800/30 active:scale-95 relative">
          <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" multiple />
          
          <button 
            onClick={handleAction}
            disabled={isProcessing}
            className={`${isProcessing ? 'bg-slate-600' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500'} text-white font-bold py-4 px-6 rounded-xl w-full transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(37,99,235,0.4)]`}
          >
            {isProcessing ? 'Processing Batch...' : 'Upload Images'}
          </button>
        </div>

        {showMsg && (
          <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-xl animate-bounce">
            <p className="text-xs text-yellow-400 font-medium">
              We know ads might be boring 🪴, but we need donations to run the project. Please watch the ad and support us. Click again to upload!
            </p>
          </div>
        )}

        {filesData.length > 0 && (
          <div className="mt-6 text-left max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-600">
            {filesData.map((file) => (
              <div key={file.id} className="mb-3 p-3 bg-slate-700/50 rounded-lg border border-slate-600 text-sm">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-slate-300 font-medium">{file.name}</span>
                  {file.status === 'waiting' && <span className="text-slate-500">Waiting...</span>}
                  {file.status === 'loading' && <span className="text-blue-400 animate-pulse font-bold">Squeezing 🪄</span>}
                  {file.status === 'success' && <span className="text-green-400 font-bold">Done 🎉</span>}
                  {file.status === 'error' && <span className="text-red-400 font-bold">Failed</span>}
                </div>
                {(file.status === 'success' || file.status === 'loading') && (
                  <div className="flex justify-between items-center text-xs bg-slate-900/50 p-2 rounded">
                    <span className="text-red-400">{file.originalSize} MB</span>
                    <span className="text-slate-500">➜</span>
                    <span className="text-blue-400">{file.compressedSize ? `${file.compressedSize} MB` : '...'}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <footer className="mt-10 text-slate-500 text-xs font-bold tracking-widest uppercase">
        Created by Rakib bae ⚡️
      </footer>
    </main>
  );
}
