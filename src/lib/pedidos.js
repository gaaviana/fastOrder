import { supabase } from "./supabase";

export async function enviarPedidos(itensPendentes, mesaId, pedidoUUID) {
  if (itensPendentes.length === 0) return;

  // Cada item novo vira um registro separado
  const pedidos = itensPendentes.map(item => ({
    mesa_id: String(mesaId),
    item_nome: item.nome,
    preco: item.preco * item.quantidade,
    status: "pendente",
    quantidade: item.quantidade,
    pedido_uuid: pedidoUUID, 
  }));

  const { error } = await supabase.from("pedidos").insert(pedidos);

  if (error) {
    throw new Error("Não foi possível enviar os pedidos. Tente novamente");
  }
}
