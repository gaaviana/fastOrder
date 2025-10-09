import { router, Stack, useLocalSearchParams } from "expo-router";
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




  if (loading) return <Loading />;

 

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

          <Pressable onPress={() => router.push(`/mesa/${id}/cardapio`)} style={estilos.btnAdicionar}>
            <Text style={estilos.textoBotao}>Adicionar Item</Text>
          </Pressable>
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
    flexWrap: 'wrap'
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
  btnAdicionar: {
    backgroundColor: "#504dffff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  textoBotao: { color: "#fff", fontWeight: "bold" },


  total: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "right",
    color: "#333",
  },
});
