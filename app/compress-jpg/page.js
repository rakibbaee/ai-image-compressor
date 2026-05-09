export const metadata = {
  title: 'Compress JPG Online Free | Rakib bae',
  description: 'Instantly compress your JPG image without losing quality. 100% Free online tool, no login required. Perfect for job applications and forms.',
  keywords: 'compress jpg, reduce jpg size, jpg compressor, resize jpg photo',
};

export default function CompressJPG() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-900">
      <div className="bg-slate-800/50 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-slate-700 max-w-2xl w-full text-center">
        <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          Compress JPG
        </h1>
        <p className="text-slate-300 mb-6 text-lg">
          Need to upload a photo for a job application or official form but the file size is too big? 
          Use our AI tool to perfectly compress your JPG image without losing quality!
        </p>

        <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-600 mb-8 text-left">
          <h2 className="text-xl font-bold text-white mb-3">🔥 Why use this tool?</h2>
          <ul className="text-sm text-slate-400 space-y-2">
            <li>✅ <strong>100% Free:</strong> No hidden charges or premium plans.</li>
            <li>✅ <strong>Zero Quality Loss:</strong> AI magic keeps your pixels sharp.</li>
            <li>✅ <strong>Instant Download:</strong> Compress and download in seconds.</li>
          </ul>
        </div>

        <a 
          href="/"
          className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(37,99,235,0.4)]"
        >
          Start Compressing Now 🪄
        </a>
      </div>
      <footer className="mt-10 text-slate-500 text-xs font-bold tracking-widest uppercase">
        Created by Rakib bae ⚡️
      </footer>
    </main>
  );
}
