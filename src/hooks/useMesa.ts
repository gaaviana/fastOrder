import { useEffect, useState } from "react";
import {
  carregarMesa,
  limparMesa,
  salvarMesa,
} from "../services/storage-mesas";
import {
  adicionarItemLista,
  calcularTotal,
  formatarPreco,
  removerItemLista,
} from "../services/mesas-utils";

export function useMesa(id: string) {
  const [itensMesa, setItensMesa] = useState<any[]>([]);
  const [itensNovos, setItensNovos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    const buscarMesa = async () => {
      const itens = await carregarMesa(id);
      setItensMesa(itens);
    };
    buscarMesa();
  }, [id]);

  useEffect(() => {
    if (id) salvarMesa(id, itensMesa);
  }, [id, itensMesa]);

  const adicionarItem = (item: any) => {
    setItensMesa((lista) => adicionarItemLista(lista, item));
    setItensNovos((lista) => adicionarItemLista(lista, item));
  };

  const removerItem = (idItem: number) => {
    setItensMesa((lista) => removerItemLista(lista, idItem));
  };

  const limpar = async () => {
    setLoading(true);
    await limparMesa(id);
    setItensMesa([]);
    setTimeout(() => setLoading(false), 1000);
  };
  
  const fecharConta = async () => {
    setLoading(true);
    await limparMesa(String(id));
    setItensMesa([]);

    setTimeout(() => {
      setLoading(false);
      alert(`Conta da Mesa ${id} fechada. Total: ${formatarPreco(total)}`);
      console.log("Histórico da mesa:", itensMesa);
    }, 1500);
  };

  const total = calcularTotal(itensMesa);

  return {
    itensMesa,
    itensNovos,
    total,
    loading,
    adicionarItem,
    removerItem,
    fecharConta,
    limpar,
    setItensNovos,
  };
}
