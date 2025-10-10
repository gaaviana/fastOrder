import { useState, useEffect, useCallback } from "react";
import { carregarMesa, salvarMesa, limparMesa } from "../services/storage-mesas";
import { adicionarItemLista, removerItemLista, calcularTotal } from "../services/mesas-utils";
import { enviarPedidos } from "../lib/pedidos";

export function useMesa(mesaId: string) {
  const [itensMesa, setItensMesa] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mesaCarregada, setMesaCarregada] = useState(false);

  const carregar = useCallback(async () => {
    setLoading(true);
    const data = await carregarMesa(mesaId);
    setItensMesa(data);
    setLoading(false);
    setMesaCarregada(true);
  }, [mesaId]);

  useEffect(() => {
    carregar();
  }, [carregar]);

  const adicionarItem = async (item: any) => {
    const novaLista = adicionarItemLista(itensMesa, item);
    setItensMesa(novaLista);
    alert("Item adicionado")
    await salvarMesa(mesaId, novaLista);
  };

  const removerItem = async (itemId: number) => {
    const novaLista = removerItemLista(itensMesa, itemId);
    setItensMesa(novaLista);
    await salvarMesa(mesaId, novaLista);
  };

  const total = calcularTotal(itensMesa);

const enviarParaCozinha = async () => {
  if (itensMesa.length === 0) return alert("Não há itens para enviar!");

  try {
    await enviarPedidos(itensMesa, mesaId); 
    await limparMesa(mesaId);               
    setItensMesa([]);                        
    alert("Pedido enviado para a cozinha!");
  } catch (error) {
    alert(error);                   
  }
};

  const fecharConta = async () => {
    if (itensMesa.length === 0) return alert("Mesa vazia!");
    
    await limparMesa(mesaId);
    setItensMesa([]);
    alert("Conta fechada!");
  };

  return {
    itensMesa,
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
