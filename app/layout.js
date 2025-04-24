import "./globals.css";
import { poppins } from './fonts'
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "SenacX - CEP Lavras",
  description: "cosme.teixeira@gmail.com",
  icons: {
    icon: "/favicon.ico", // caminho relativo à pasta /public
  }
};
export default function RootLayout({ children }) {
  return (

    <html lang="pt-BR">
      <body className={`bg-[#121212] sm:bg-slate-200 flex items-center justify-center w-screen mx-auto tracking-widest overflow-x-hidden ${poppins.className}`}>

        {children}
        {/* Para o Toast Funcionar :-)  */}
        <Toaster position="top-center" />

      </body>
    </html>
  );
}
