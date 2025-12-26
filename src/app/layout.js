// src/app/layout.js
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Header from "@/components/common/Header"; // 👈 경로 변경됨

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "logbook",
  description: "Personal Dev Blog",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <AuthProvider>
          <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
            <Header />
            <main>{children}</main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}