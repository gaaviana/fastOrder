import { router, Stack } from "expo-router";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Loading from "../src/components/Loading"; // ajuste o caminho se estiver diferente

export default function Mesas() {
  const [loading, setLoading] = useState(false);
  const mesas = [1, 2, 3, 4, 5, 6];

  const abrirMesa = (numero: number) => {
    setLoading(true); // ativa o loading
    // simula tempo de processamento ou envio de dados
    setTimeout(() => {
      router.push(`/mesa/${numero}`);
    }, 1500); // 1.5 segundos de delay (ajuste se necessário)
  };

  // Mostra o componente de loading enquanto `loading` for true
  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: true, headerTitle: "mesas" }} />

      <SafeAreaView style={estilos.container}>
        <View style={estilos.grid}>
          {mesas.map((mesa) => (
            <View key={mesa} style={estilos.cardMesa}>
              <Text style={estilos.numeroMesa}>Mesa {mesa}</Text>
              <Pressable style={estilos.botao} onPress={() => abrirMesa(mesa)}>
                <Text style={estilos.textoBotao}>Acessar</Text>
              </Pressable>
            </View>
          ))}
        </View>
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

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  cardMesa: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    alignItems: "center",
  },

  numeroMesa: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000",
  },

  botao: {
    backgroundColor: "#FF9800",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },

  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
  },
});
