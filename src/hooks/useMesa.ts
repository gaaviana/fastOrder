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
import { enviarPedidos } from "../lib/pedidos";

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
    setItensNovos((lista) => removerItemLista(lista, idItem));
  };

  const enviarParaCozinha = async () => {
    if (itensNovos.length === 0) {
      alert("Nenhum item novo para enviar.");
      return;
    }
    setLoading(true);
    await enviarPedidos(itensNovos, id);
    console.log(itensNovos);
    setItensNovos([]);
    setTimeout(() => {
      setLoading(false);
      alert(`Itens enviados para a cozinha!`);
    });
  };

  const limpar = async () => {
    setLoading(true);
    await limparMesa(id);
    setItensMesa([]);
    setItensNovos([]);
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
    });
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
    enviarParaCozinha,
    limpar,
    setItensNovos,
  };
}
