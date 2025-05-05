import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

//criando uma função de atraso 
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

//Escolha do componente pelo tamanho da Tela de Acordo tamanho da Tela 
export default function Mobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Define mobile se for menor que 768px
    };

    handleResize(); // Chamada inicial
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? true : false;
}

//Converte Data ISO para Brasileira 
export function formatarData(dataISO) {

  const data = new Date(dataISO);
  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const ano = data.getFullYear();

  const horas = String(data.getHours()).padStart(2, "0");
  const minutos = String(data.getMinutes()).padStart(2, "0");
  console.log("Atualizando Dados...");
  return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
}
