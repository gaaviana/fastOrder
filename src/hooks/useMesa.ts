import { useState, useEffect, useCallback } from "react";
import { carregarMesa, salvarMesa, limparMesa } from "../services/storage-mesas";
import { adicionarItemLista, removerItemLista, calcularTotal } from "../services/mesas-utils";
import { enviarPedidos } from "../lib/pedidos";

export function useMesa(mesaId: string) {
  const [todosItens, setTodosItens] = useState<any[]>([]);
  const [itensNovos, setItensNovos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mesaCarregada, setMesaCarregada] = useState(false);

  const carregar = useCallback(async () => {
    setLoading(true);
    const data = await carregarMesa(mesaId);
    setTodosItens(data);
    setItensNovos(data); // Inicialmente todos os itens são novos
    setLoading(false);
    setMesaCarregada(true);
  }, [mesaId]);

  useEffect(() => {
    carregar();
  }, [carregar]);

  const adicionarItem = async (item: any) => {
    const novaListaTodos = adicionarItemLista(todosItens, item);
    const novaListaNovos = adicionarItemLista(itensNovos, item);
    
    setTodosItens(novaListaTodos);
    setItensNovos(novaListaNovos);
    alert("Item adicionado");
    await salvarMesa(mesaId, novaListaTodos);
  };

  const removerItem = async (itemId: number) => {
    const novaListaTodos = removerItemLista(todosItens, itemId);
    const novaListaNovos = removerItemLista(itensNovos, itemId);
    
    setTodosItens(novaListaTodos);
    setItensNovos(novaListaNovos);
    await salvarMesa(mesaId, novaListaTodos);
  };

  const total = calcularTotal(todosItens);

const enviarParaCozinha = async () => {
  if (itensNovos.length === 0) return alert("Não há itens novos para enviar!");

  try {
    await enviarPedidos(itensNovos, mesaId);
    
    // Limpar os itens novos após enviar
    setItensNovos([]);
    
    alert("Pedido enviado para a cozinha!");
  } catch (error) {
    alert(error);                   
  }
};

  const fecharConta = async () => {
    if (todosItens.length === 0) return alert("Mesa vazia!");
    
    await limparMesa(mesaId);
    setTodosItens([]);
    setItensNovos([]);
    alert("Conta fechada!");
  };

  return {
    todosItens,
    itensNovos,
    total,
    loading,
    mesaCarregada,
    adicionarItem,
    removerItem,
    enviarParaCozinha,
    fecharConta,
    recarregarMesa: carregar, 
  };
}
