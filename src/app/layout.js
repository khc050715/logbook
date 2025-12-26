// src/app/layout.js
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Header from "@/components/common/Header"; // 👈 경로 변경됨

export const metadata = {
  title: "logbook",
  description: "Personal Dev Blog",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <AuthProvider>
          <div className="container">
            <Header />
            <main>{children}</main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}