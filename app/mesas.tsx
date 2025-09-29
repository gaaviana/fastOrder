import { Stack } from "expo-router";
import React from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Mesas() {
  const mesas = [1, 2, 3, 4, 5, 6];

  const abrirMesa = (numero: number) => {
    Alert.alert(`Mesa ${numero}`, `Abrindo mesa ${numero}...`);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: true, headerTitle: "mesas" }} />

      <SafeAreaView style={estilos.container}>
        <View style={estilos.grid}>
          {mesas.map((mesa) => (
            <View key={mesa} style={estilos.cardMesa}>
              <Text style={estilos.numeroMesa}>Mesa</Text>
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
    backgroundColor: "#f9f9f9",
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
  },

  botao: {
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },

  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
  },
});
