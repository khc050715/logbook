// src/app/layout.js
import './globals.css';
import Header from '@/components/Header';
import { AuthProvider } from '@/context/AuthContext'; // 👈 추가

export const metadata = {
  title: 'logbook',
  description: 'Markdown Blog with Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <AuthProvider> {/* 👈 AuthProvider로 감싸기 */}
          <div className="container">
            <Header />
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}