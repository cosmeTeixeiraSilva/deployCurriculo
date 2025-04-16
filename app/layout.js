import { AuthProvider } from "@/context/autContext";
import "./globals.css";




export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body
        className="w-screen  bg-[#121212]  flex items-center justify-center "
      >
        <AuthProvider className="bg-[#121212] h-screen ">
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
