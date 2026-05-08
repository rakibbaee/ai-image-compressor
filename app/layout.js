import './globals.css';

export const metadata = {
  title: 'AI Image Compressor | Free & Fast | Created by Rakib bae',
  description: 'Compress JPG, PNG, WEBP instantly without losing quality. 100% Free, no login required. Best AI smart compression tool.',
  keywords: 'image compressor, free image compression, ai image compressor, reduce image size, compress jpg, compress png, Rakib bae',
  openGraph: {
    title: 'AI Image Compressor - Free & Fast',
    description: 'Compress images in seconds without losing quality. No login required.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
