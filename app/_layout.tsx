import { Stack } from "expo-router";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Layout() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle={'default'} backgroundColor="#FF9800"/>
      <Stack 
        screenOptions={
          {
            headerStyle: {
              backgroundColor: '#FF9800'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold'
            }
          }
        }
      />

      <View style={estilos.rodape}>
        <Text style={estilos.textoRodape}>FastOrder Version Dev</Text>
      </View>
    </SafeAreaProvider>
  );
}''

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },

  rodape: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FF9800',
    padding: 15,
    alignItems: 'center'
  },

  textoRodape: {
    color: '#fff',
    fontWeight: 'bold'
  }
})
