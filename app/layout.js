// app/layout.js
import './globals.css';

export const metadata = {
  title: 'Phước Đặng — Embedded & Edge AI Engineer',
  description: 'Portfolio của Đặng Như Phước',
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <head>
        {/* Google Font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&display=swap"
          src="https://cdn.jsdelivr.net/npm/chart.js"
          strategy="beforeInteractive"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
