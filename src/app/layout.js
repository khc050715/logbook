import './globals.css';
import Header from '@/components/Header';

export const metadata = {
  title: 'logbook',
  description: 'Markdown Blog with Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <div className="container">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}