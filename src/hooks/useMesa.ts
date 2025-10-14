import { useState, useEffect, useCallback } from "react";
import { carregarMesa, salvarMesa, limparMesa } from "../services/storage-mesas";
import { adicionarItemLista, removerItemLista, calcularTotal } from "../services/mesas-utils";
import { enviarPedidos } from "../lib/pedidos";

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
    // Atualiza todos os itens da mesa (soma quantidade se existir)
    const novaListaTodos = adicionarItemLista(todosItens, item);

    // Cria um novo registro em itensNovos
    const novoRegistro = {
      ...item,
      quantidade: 1,
      enviado: false,
      // pedido_uuid será gerado no momento do envio
    };
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
  const enviarParaCozinha = async () => {
    if (itensNovos.length === 0) return alert("Não há itens novos para enviar!");

    try {
      // Gera um pedido_uuid único para este envio
      const pedidoUUID = `${mesaId}-${Date.now()}`;

      // Adiciona pedido_uuid a cada item novo
      const itensParaEnviar = itensNovos.map(item => ({
        ...item,
        pedido_uuid: pedidoUUID
      }));

      console.log("Itens que serão enviados:", itensParaEnviar);

      // Envia para o banco
      await enviarPedidos(itensParaEnviar, mesaId, pedidoUUID);

      // Marca os itens como enviados
      const atualizados = todosItens.map(item =>
        itensParaEnviar.find(i => i.nome === item.nome && !item.enviado)
          ? { ...item, enviado: true, pedido_uuid: pedidoUUID }
          : item
      );
      setTodosItens(atualizados);

      // Limpa apenas os itens novos
      setItensNovos([]);

      await salvarMesa(mesaId, atualizados);
      alert("Pedido enviado para a cozinha!");
    } catch (error: any) {
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
