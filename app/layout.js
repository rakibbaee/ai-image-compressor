import './globals.css';

export const metadata = {
  title: 'AI Image Compressor | Rakib bae',
  description: 'No login required. 100% Free AI Image Compression.',
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
