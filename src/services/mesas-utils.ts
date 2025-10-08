export function adicionarItemLista(lista: any[], novoItem: any) {
  const i = lista.findIndex((item) => item.id === novoItem.id);

  if (i !== -1) {
    const novaLista = [...lista];
    novaLista[i].quantidade += 1;
    return novaLista;
  } else {
    return [...lista, { ...novoItem, quantidade: 1 }];
  }
}

export function removerItemLista(lista: any[], idItem: number) {
  const novaLista = lista
    .map((item) => {
      if (item.id === idItem) {
        if (item.quantidade > 1) {
          return { ...item, quantidade: item.quantidade - 1 };
        } else {
          return null;
        }
      }
      return item;
    })
    .filter(Boolean);
  return novaLista;
}

export function calcularTotal(lista: any[]) {
  return lista.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
}

export function formatarPreco(valor: number) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
