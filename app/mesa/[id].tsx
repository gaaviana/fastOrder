import { Stack, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Loading from "../../src/components/Loading";
import { enviarPedidos } from "@/src/lib/pedidos";
import { useMesa } from "@/src/hooks/useMesa";
import { formatarPreco, removerItemLista } from "@/src/services/mesas-utils";

export default function Mesa() {
  const { id } = useLocalSearchParams();
  const {
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
  } = useMesa(String(id));

  const [pesquisa, setPesquisa] = useState("");

  const cardapio = [
    { id: 1, nome: "Pizza Margherita", preco: 30 },
    { id: 2, nome: "Refrigerante", preco: 5 },
    { id: 3, nome: "Hambúrguer", preco: 25 },
    { id: 4, nome: "Batata frita", preco: 15 },
    { id: 5, nome: "Batata frita", preco: 15 },
    { id: 6, nome: "Batata frita", preco: 15 },
    { id: 7, nome: "Batata frita", preco: 15 },
    { id: 8, nome: "Batata frita", preco: 15 },
    { id: 9, nome: "Batata frita", preco: 15 },
    { id: 10, nome: "Batata frita", preco: 15 },
    { id: 11, nome: "Batata frita", preco: 15 },
    { id: 12, nome: "Batata frita", preco: 15 },
    { id: 13, nome: "Batata frita", preco: 15 },
    { id: 14, nome: "Batata frita", preco: 15 },
  ];

  if (loading) return <Loading />;

  const filtro = cardapio.filter((i) =>
    i.nome.toLowerCase().includes(pesquisa.toLowerCase())
  );

  return (
    <>
      <Stack.Screen options={{ headerTitle: `Mesa ${id}` }} />

      <SafeAreaView style={estilos.container}>
        <Text>Mesas/Mesa {id}</Text>
        <View style={estilos.mesa}>
          <Text style={estilos.titulo}>Itens adicionados</Text>
          {itensMesa.length === 0 ? (
            <Text style={estilos.vazio}>Nenhum item adicionado</Text>
          ) : (
            itensMesa.map((item, id) => (
              <View key={id} style={estilos.itemMesa}>
                <Text style={estilos.itemSelecionado}>
                  {item.nome} - {formatarPreco(item.preco)} ({item.quantidade}x)
                </Text>

                <Pressable onPress={() => removerItem(item.id)}>
                  <Text style={estilos.remover}>X</Text>
                </Pressable>
              </View>
            ))
          )}
          <Text style={estilos.total}>Total: {formatarPreco(total)}</Text>
        </View>

        <View style={estilos.botoes}>
          <Pressable onPress={enviarParaCozinha} style={estilos.btnEnviar}>
            <Text style={estilos.textoBotao}>Enviar</Text>
          </Pressable>
          <Pressable onPress={fecharConta} style={estilos.btnFechar}>
            <Text style={estilos.textoBotao}>Fechar Conta</Text>
          </Pressable>
        </View>

        <TextInput
          placeholder="Pesquisar no cardápio..."
          value={pesquisa}
          onChangeText={setPesquisa}
          style={estilos.pesquisa}
        />

        <ScrollView style={estilos.cardapio}>
          <Text style={estilos.titulo}>Cardápio</Text>
          {filtro.map((item) => (
            <Pressable
              key={item.id}
              onPress={() => adicionarItem(item)}
              style={estilos.cardItem}
            >
              <Text style={estilos.nome}>{item.nome}</Text>
              <Text style={estilos.preco}>{formatarPreco(item.preco)}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  mesa: {
    backgroundColor: "#B3BB3",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },

  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  vazio: {
    fontSize: 14,
    color: "#555",
  },

  itemMesa: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
    marginVertical: 5,
  },

  itemSelecionado: {
    fontSize: 16,
  },

  remover: {
    color: "#FF4D4D",
    fontWeight: "bold",
  },

  botoes: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  btnEnviar: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 5,
    alignItems: "center",
  },
  btnFechar: {
    backgroundColor: "#FF4D4D",
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginLeft: 5,
    alignItems: "center",
  },
  textoBotao: { color: "#fff", fontWeight: "bold" },

  pesquisa: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 15,
  },

  cardapio: { flex: 1 },
  cardItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nome: { fontSize: 16 },
  preco: { fontSize: 16, fontWeight: "bold" },
  total: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "right",
    color: "#333",
  },
});
