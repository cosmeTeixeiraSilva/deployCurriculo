
import "./globals.css";
import Header from "./_componetes/header";
import Footer from "./_componetes/footer";
//Forçar não usar o cache
//export const dynamic = "force-dinamic";
export const revalidate = 30;
// Cache global padrão



export const metadata = {
  title: "Limpando o Cache",
  description: "Boas práticas para limpar o Cache da Aplicação ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="bg-black w-screen h-screen  flex-col justify-center items-center overflow-hidden mx-auto !tracking-[.5em]">
        <div className="w-full h-10 bg-orange-600 text-center flex items-center justify-center ">   <Header /></div>

        {children}
        <Footer />
      </body>
    </html>
  );
}
