import { supabase } from "./supabase";

export async function enviarPedidos(itensPendentes, mesaId, pedidoUUID) {
  if (itensPendentes.length === 0) return;

  // Cada item novo vira um registro separado
  const pedidos = itensPendentes.map(item => ({
    mesa_id: String(mesaId),
    item_nome: item.item_nome,
    preco: item.preco,
    status: "pendente",
    quantidade: item.quantidade,
    pedido_uuid: pedidoUUID, 
  }));

  const { error } = await supabase.from("pedidos").insert(pedidos);

  if (error) {
    console.log(error);
    
    throw new Error("Não foi possível enviar os pedidos. Tente novamente");
  }
}
