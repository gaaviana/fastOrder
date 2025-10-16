import { useState, useEffect, useCallback } from "react";
import { carregarMesa, salvarMesa, limparMesa } from "../services/storage-mesas";
import { removerItemLista, calcularTotal } from "../services/mesas-utils";
import { enviarPedidos } from "../lib/pedidos";
import { supabase } from "../lib/supabase";
import { Alert, Vibration } from "react-native";

export function useMesa(mesaId: string) {
  const [todosItens, setTodosItens] = useState<any[]>([]);
  const [itensNovos, setItensNovos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mesaCarregada, setMesaCarregada] = useState(false);

  // Carrega os itens da mesa
  const carregar = useCallback(async () => {
    setLoading(true);
    const data = await carregarMesa(mesaId);

    setTodosItens(data);

    // Apenas itens que ainda não foram enviados
    const novos = data.filter((item: any) => !item.enviado);
    setItensNovos(novos);

    setLoading(false);
    setMesaCarregada(true);
  }, [mesaId]);

  useEffect(() => {
    carregar();
  }, [carregar]);

  // Log para debug
  useEffect(() => {
    console.log("Itens novos atualizados:", itensNovos);
  }, [itensNovos]);

  // Adiciona um item à mesa
  const adicionarItem = async (item: any) => {
    // Validação mínima
    if (!item.nome || item.preco === undefined) {
      return alert("Item inválido! Nome ou preço ausente.");
    }

    // Cria um novo registro (sempre separado, sem juntar)
    const novoRegistro = {
      ...item,
      quantidade: item.quantidade ?? 1,
      enviado: false,
    };

    const novaListaTodos = [...todosItens, novoRegistro];
    const novaListaNovos = [...itensNovos, novoRegistro];

    setTodosItens(novaListaTodos);
    setItensNovos(novaListaNovos);

    await salvarMesa(mesaId, novaListaTodos);
    alert("Item adicionado");
  };

  // Remove um item da mesa
  const removerItem = async (itemId: number) => {
    const novaListaTodos = removerItemLista(todosItens, itemId);
    const novaListaNovos = removerItemLista(itensNovos, itemId);

    setTodosItens(novaListaTodos);
    setItensNovos(novaListaNovos);

    await salvarMesa(mesaId, novaListaTodos);
  };

  const total = calcularTotal(todosItens);

  // Envia itens novos para a cozinha
 // Envia itens novos para a cozinha
const enviarParaCozinha = async () => {
  if (itensNovos.length === 0) return alert("Não há itens novos para enviar!");

  try {
    const pedidoUUID = `${mesaId}-${Date.now()}`;

    // Cria os itens a serem enviados, garantindo todos os campos
    const itensParaEnviar = itensNovos.map(item => ({
      mesa_id: String(mesaId),
      item_nome: item.nome ?? item.item_nome ?? "Item sem nome",
      preco: (item.preco ?? 0) * (item.quantidade ?? 1),
      quantidade: item.quantidade ?? 1,
      status: "pendente",
      pedido_uuid: pedidoUUID,
    }));

    console.log("Itens que serão enviados:", itensParaEnviar);

    // Envia para o banco passando mesaId e pedidoUUID
    await enviarPedidos(itensParaEnviar, mesaId, pedidoUUID);

    // Marca os itens como enviados no estado
    const atualizados = todosItens.map(item =>
      itensNovos.includes(item)
        ? { ...item, enviado: true, pedido_uuid: pedidoUUID }
        : item
    );

    setTodosItens(atualizados);
    setItensNovos([]);
    await salvarMesa(mesaId, atualizados);

    alert("Pedido enviado para a cozinha!");
  } catch (error: any) {
    console.log(error);
    alert(error.message || "Erro ao enviar pedido");
  }
};


  // Fecha a conta e limpa a mesa
  const fecharConta = async () => {
    if (todosItens.length === 0) return alert("Mesa vazia!");

    await limparMesa(mesaId);
    setTodosItens([]);
    setItensNovos([]);
    alert("Conta fechada!");
  };

  const EscutarPedidos = async () => {
  useEffect(() => {
    const canal = supabase
      .channel("pedidos-status")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "pedidos",
          filter: 'status=eq.pronto' // opcional: filtrar apenas "pronto"
        },
        (payload) => {
          const pedido = payload.new;
          console.log("Pedido atualizado:", pedido);

          // vibrar o celular
          Vibration.vibrate(500);

          // mostrar notificação simples
          Alert.alert("Pedido pronto!", `Mesa ${pedido.mesa_id} ficou pronta.`);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(canal);
    };
  }, []);
}

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
    EscutarPedidos,
  };
}
