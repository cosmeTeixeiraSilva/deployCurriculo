
//recarregando o cache em 10 segundos 
export const revalidate = 10;
export default function Home() {
  return (
    <div className="flex flex-col justify-center items-start">
      {/*buton1*/}

      <a href={"/cliente"} className="bg-blue-800 rounded p-3 m-3">clientes </a>


    </div>
  );
}
