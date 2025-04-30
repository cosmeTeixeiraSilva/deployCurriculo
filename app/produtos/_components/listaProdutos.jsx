import BotaoExcluir from "./botaoExcluir";

export default function ListagemProdutos({
  produtos,
  carregarProdutos,
  setMessage,
  setMessageBG,
}) {
  return (
    <div className="text-white text-start w-1/3 mt-8">
      <table className="w-full">
        <thead className="bg-orange-400 border ">
          <tr>
            <th className="text-start p-2">Produto</th>
            <th className="text-center">Quantidade</th>
            <th className="text-start">Fornecedor</th>
            <th className="text-center">Ações</th>
          </tr>
        </thead>
        <tbody className="space-y-4">
          {produtos.map((produto) => (
            <tr key={produto.id} className="text-xl border">
              <td className="px-2">{produto.descricao}</td>
              <td className="text-center leading-[60px] ">{produto.qtd}</td>
              <td className="text-start">{produto.fornecedor}</td>
              <td className="text-center hover:cursor-pointer border ">
                <BotaoExcluir
                  id={produto.id}
                  carregarProdutos={carregarProdutos}
                  setMessage={setMessage}
                  setMessageBG={setMessageBG}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
