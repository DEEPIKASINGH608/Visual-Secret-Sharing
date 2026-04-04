🛡️ XOR Visual Secret Sharing EngineA high-security, client-side image encryption tool built with React and Vite. This project implements a (2,2) Visual Threshold Scheme, allowing users to decompose a sensitive image into two mathematical noise components (Shares). Neither share contains any readable data alone; the secret is only revealed when the shares are combined using a bitwise XOR operation.

🚀 Features
Client-Side Processing: No images are uploaded to a server. All encryption/decryption happens locally in your browser for maximum privacy.
Adaptive Thresholding: Processes complex imagery (like the Hanuman artwork) into high-contrast binary maps.
Real-time Generation: Powered by Vite for lightning-fast UI updates and canvas rendering.
Cryptographic Security: Implements the "One-Time Pad" principle—shares are mathematically unbreakable without the corresponding key.

🛠️ Tech Stack
Framework: React 18Build
Tool: Vite
Styling: Tailwind CSS (Cyber-dark theme)
Icons: Lucide-React
Logic: Canvas API & Bitwise XOR Operations


📖 How It Works
1. Encryption (The Split)
The engine reads the source image and converts it into a binary state (Black/White).
Share 1 (The Key): Generated using a pseudo-random function. It is 100% noise.
Share 2 (The Lock): Calculated using the formula: $Share_2 = Original \oplus Share_1$.
2. Decryption (The Reveal)To recover the secret, the engine performs a bitwise comparison of the two noise shares:
Original = Share_1 \oplus Share_2$$Where the pixels match, the result is white; where they differ, the result is black, reconstructing the original shape.

⚙️ Installation & Setup
1. Clone the repository:
git clone https://github.com/your-username/visual-secret-sharing.git
cd visual-secret-sharing
2. Install dependencies:
npm install
3. Start the development server:
npm run dev
4. Build for production:
npm run build
📂 Project StructurePlaintext
├── src/
│   ├── utils/
│   │   └── vssLogic.js    # The mathematical engine (XOR Logic)
│   ├── App.jsx            # Main UI and Canvas Management
│   ├── index.css          # Tailwind & Cyber-grid styling
│   └── main.jsx           # React Entry point
├── public/                # Static assets
└── tailwind.config.js     # Styling configuration

