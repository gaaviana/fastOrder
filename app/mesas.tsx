import { router, Stack, useLocalSearchParams } from "expo-router";
import React, { useState, useCallback } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import Loading from "../src/components/Loading"; // ajuste o caminho se estiver diferente
import { useMesa } from "@/src/hooks/useMesa";

export default function Mesas() {
  const { id } = useLocalSearchParams();
  const { EscutarPedidos } = useMesa(String(id));
  const [loading, setLoading] = useState(false);
  const mesas = [1, 2, 3, 4, 5, 6];

  EscutarPedidos();

  // Reseta o loading toda vez que a tela volta a estar em foco
  useFocusEffect(
    useCallback(() => {
      setLoading(false);
    }, [])
  );

  const abrirMesa = (numero: number) => {
    setLoading(true);
    setTimeout(() => {
      router.push(`/mesa/${numero}`);
    }); // simula carregamento de 1.5s (opcional)
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: true, headerTitle: "Mesas" }} />

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
