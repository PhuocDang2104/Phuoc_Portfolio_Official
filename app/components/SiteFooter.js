'use client';

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer>
      © {year} Phước Đặng — Built with HTML/CSS/JS · Hosted on GitHub Pages
    </footer>
  );
}
