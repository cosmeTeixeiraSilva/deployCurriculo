import Menu from "./_components/menu";
import Header from "../_componentsGerais/header";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col items-center justify-start sm:w-[90vw] w-screen bg-[#121212] h-screen  sm:border-orange-500 shadow-lg sm:shadow-orange-400 mx-auto overflow-hidden">
      <Menu />

      <div className="h-full">{children}</div>
    </div>
  );
}
