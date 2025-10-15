// Sempre adiciona o item como um novo registro, sem acumular quantidade
export function adicionarItemLista(lista: any[], novoItem: any) {
  return [...lista, { ...novoItem, quantidade: 1 }];
}

// Remove um item da lista completamente
export function removerItemLista(lista: any[], idItem: number) {
  return lista.filter(item => item.id !== idItem);
}

// Calcula o total normalmente
export function calcularTotal(lista: any[]) {
  return lista.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
}

// Formata o preço
export function formatarPreco(valor: number) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
