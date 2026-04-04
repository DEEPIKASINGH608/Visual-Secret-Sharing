import React, { useRef, useState } from 'react';
import { splitImage, reconstructImage } from './utils/vssLogic';
import { Upload, ShieldCheck, Unlock, Layers } from 'lucide-react';

function App() {
  const canvasRef = useRef(null);
  const [shares, setShares] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [decryptedImage, setDecryptedImage] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        const ratio = Math.min(canvas.width / img.width, canvas.height / img.height);
        ctx.drawImage(img, (canvas.width - img.width * ratio) / 2, (canvas.height - img.height * ratio) / 2, img.width * ratio, img.height * ratio);
        setPreviewUrl(event.target.result);
        setShares([]);
        setDecryptedImage(null);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleEncrypt = () => {
    const results = splitImage(canvasRef.current);
    setShares(results);
  };

  const handleDecrypt = () => {
    if (shares.length < 2) return;
    const recovered = reconstructImage(shares[0], shares[1]);
    setDecryptedImage(recovered);
  };

  return (
    <div className="min-h-screen p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-indigo-400">XOR Secret Sharing Engine</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
          <h2 className="flex items-center gap-2 mb-4 font-bold"><Upload size={18}/> 1. Source</h2>
          <input type="file" onChange={handleFileUpload} className="mb-4 block w-full text-sm text-slate-500" />
          <canvas ref={canvasRef} width={400} height={300} className="w-full rounded-lg border border-white/10 bg-black" />
          <button onClick={handleEncrypt} className="w-full mt-4 bg-indigo-600 py-3 rounded-xl font-bold">Generate Shares</button>
        </div>

        {/* Shares Section */}
        <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
          <h2 className="flex items-center gap-2 mb-4 font-bold"><Layers size={18}/> 2. Shares</h2>
          <div className="grid grid-cols-2 gap-4">
            {shares.map((s, i) => (
              <canvas key={i} ref={el => { if(el) el.getContext('2d').putImageData(s,0,0) }} width={400} height={300} className="w-full rounded border border-white/5" />
            ))}
          </div>
          {shares.length > 0 && (
            <button onClick={handleDecrypt} className="w-full mt-4 bg-cyan-600 py-3 rounded-xl font-bold flex items-center justify-center gap-2">
              <Unlock size={18}/> Decrypt / Reveal Secret
            </button>
          )}
        </div>
      </div>

      {/* Decryption Result */}
      {decryptedImage && (
        <div className="mt-8 bg-white/5 p-6 rounded-2xl border border-cyan-500/30 text-center">
          <h2 className="text-cyan-400 font-bold mb-4">Reconstructed Original Image</h2>
          <canvas ref={el => { if(el) el.getContext('2d').putImageData(decryptedImage,0,0) }} width={400} height={300} className="mx-auto rounded-lg shadow-[0_0_30px_rgba(6,182,212,0.2)]" />
        </div>
      )}
    </div>
  );
}

export default App;

