import { supabase } from "./supabase";

export async function enviarPedidos(itensPendentes, mesaId) {
  if (itensPendentes.length === 0) return;

  const pedidos = itensPendentes.map((item) => ({
    mesa_id: String(mesaId),
    item_nome: item.nome,
    preco: item.preco * item.quantidade,
    status: "pendente",
    quantidade: item.quantidade,
  }))

  const {error} = await supabase.from("pedidos").insert(pedidos)

  if (error) {
    throw new Error("Não foi possivel enviar os pedidos. tente novamente")
  }
}