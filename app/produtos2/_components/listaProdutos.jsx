import BotaoEditar from "./botaoEditar";
import BotaoExcluir from "./botaoExcluir";
import BotaoEditar2 from "./botaoEditar2";

export default function ListagemProdutos({ produtos, carregarProdutos }) {
  return (
    <div className="text-white text-start w-[60vw] mt-8">
      <table className="w-full ">
        <thead className="bg-orange-400 border text-xl">
          <tr>
            <th className="text-start p-2">Produto</th>
            <th className="text-center">Quantidade</th>
            <th className="text-start">Fornecedor</th>
            <th className="text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => (
            <tr key={produto.id} className="text-xl leading-[40px]  ">
              <td className="p-1 ">{produto.descricao}</td>
              <td className="text-center  ">{produto.qtd}</td>
              <td className="text-start">{produto.fornecedor}</td>
              <td className="hover:cursor-pointer  flex items-center justify-around ">
                <BotaoExcluir
                  id={produto.id}
                  carregarProdutos={carregarProdutos}
                />
                <BotaoEditar
                  id={produto.id}
                  carregarProdutos={carregarProdutos}
                />
                <BotaoEditar2
                  id={produto.id}
                  carregarProdutos={carregarProdutos}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
