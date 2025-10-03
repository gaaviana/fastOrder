import { Link, router, Stack, useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  Alert,
  Button,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const [senha, setSenha] = useState("");
  const router = useRouter();

  // tive que fazer para zerar o valor da senha apos voltar par a atela de login
  useFocusEffect(
    useCallback(() => {
      setSenha("");
    }, [])
  );

  const validacaoSimples = () => {
    if (senha === "1234") {
      router.push("/mesas");
    } else {
      Alert.alert("Erro", "Senha incorreta!");
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false, headerTitle: "Login" }} />

      <SafeAreaView style={estilos.container}>
        <View style={estilos.form}>
          <Image
            source={require("../assets/logoTxt.png")}
            style={estilos.imagem}
            resizeMode="contain"
          />
          <TextInput
            placeholder="Digite a senha de acesso"
            inputMode="numeric"
            style={estilos.input}
            value={senha}
            onChangeText={setSenha}
          />

          <View style={estilos.botao}>
            <Pressable style={{width: "100%", alignItems: 'center'}} onPress={validacaoSimples}>
              <Text style={estilos.txtBotao}>Entrar</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 20,
  },

  form: {
    width: "100%",
    maxWidth: 350,
  },

  imagem: {
    width: 350,
    height: 350,
    marginBottom: 30,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    backgroundColor: "#fff",
    fontSize: 16,
  },

  botao: {
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#FF9800",
    alignItems: "center",
    padding: 15,
    
  },

  txtBotao: {
    color: "#fff",
    fontSize: 16,
    fontWeight: 'bold'
  }
});
