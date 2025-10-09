import { useMesa } from "@/src/hooks/useMesa";
import { formatarPreco } from "@/src/services/mesas-utils";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Pressable,
  SafeAreaViewBase,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";

export default function Cardapio() {
  const { id } = useLocalSearchParams();
  const { adicionarItem } = useMesa(String(id));

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

  const filtro = cardapio.filter((i) =>
    i.nome.toLowerCase().includes(pesquisa.toLowerCase())
  );
  return (
    <>
      <Stack.Screen options={{ headerTitle: `Cardapio` }} />

      <SafeAreaViewBase style={estilos.container}>
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
      </SafeAreaViewBase>
    </>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
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
});
