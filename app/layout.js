import './globals.css';

export const metadata = {
  title: 'AI Image Compressor | Free & Fast | Created by Rakib bae',
  description: 'Compress JPG, PNG, WEBP instantly without losing quality. 100% Free, no login required. Best AI smart compression tool.',
  keywords: 'image compressor, free image compression, ai image compressor, reduce image size, compress jpg, compress png, Rakib bae',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* ডাইরেক্ট ব্রেইন ইনজেকশন হ্যাক: টেলউইন্ড সিডিএন */}
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
