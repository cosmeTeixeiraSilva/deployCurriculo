import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetClose
  } from "@/components/ui/sheet"
  
  import { Button } from "@/components/ui/button"
  
  export function VotosSheet() {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="secondary" className="fixed bottom-24 left-4 z-50">
            Ver Votos Computados
          </Button>
        </SheetTrigger>
  
        <SheetContent
          side="bottom"
          className="h-[80%] rounded-t-2xl px-4 pt-6 pb-8 bg-neutral-900 text-white overflow-y-auto"
        >
          <SheetHeader>
            <SheetTitle className="text-xl">Votos Computados</SheetTitle>
            <SheetDescription className="text-sm">
              3 de 7 quesitos — Total: <span className="font-bold text-orange-400">21 pontos</span>
            </SheetDescription>
          </SheetHeader>
  
          <div className="mt-6 space-y-4">
            {[
              { nome: "Criatividade", nota: 7 },
              { nome: "Técnica", nota: 8 },
              { nome: "Apresentação", nota: 6 },
            ].map((voto, i) => (
              <div
                key={i}
                className="flex justify-between items-center border-b border-gray-700 pb-2"
              >
                <span>{voto.nome}</span>
                <div className="flex items-center gap-3">
                  <span className="text-orange-400 font-semibold">{voto.nota}</span>
                  <Button variant="ghost" className="text-blue-400 text-sm px-2 py-1">
                    Alterar
                  </Button>
                </div>
              </div>
            ))}
          </div>
  
          <SheetClose asChild>
            <Button className="mt-6 w-full" variant="outline">
              Fechar
            </Button>
          </SheetClose>
        </SheetContent>
      </Sheet>
    )
  }
  