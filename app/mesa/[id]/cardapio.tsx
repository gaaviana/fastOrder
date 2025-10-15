import { useMesa } from "@/src/hooks/useMesa";
import { formatarPreco } from "@/src/services/mesas-utils";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Cardapio() {
  const { id } = useLocalSearchParams();
  const { adicionarItem, todosItens: itensMesa } = useMesa(String(id));

  const [pesquisa, setPesquisa] = useState("");
  const [modalVisivel, setModalVisivel] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState<any>(null);
  const [quantidade, setQuantidade] = useState(1);

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

  const abrirModalQuantidade = (item: any) => {
    setItemSelecionado(item);
    setQuantidade(1);
    setModalVisivel(true);
  };

  const confirmarQuantidade = () => {
    if (itemSelecionado) {
      adicionarItem({ ...itemSelecionado, quantidade });
    }
    setModalVisivel(false);
    setItemSelecionado(null);
  };

  const cancelarModal = () => {
    setModalVisivel(false);
    setItemSelecionado(null);
    setQuantidade(1);
  };
  return (
    <>
   <Stack.Screen
  options={{
    headerTitle: ` Cardápio / Mesa ${id}`,
    headerLeft: () => (
      <Pressable
        onPress={() => {
          if (itensMesa.length === 0) {
            router.replace("/mesas");
          } else {
            router.replace(`/mesa/${id}`); 
          }
        }}
        style={{ marginRight: 25 }}
      >
         <Ionicons name="arrow-back" size={24} color="#fff" />
      </Pressable>
    ),
  }}
/>


      <SafeAreaView style={estilos.container}>
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
              onPress={() => abrirModalQuantidade(item)}
              style={estilos.cardItem}
            >
              <Text style={estilos.nome}>{item.nome}</Text>
              <Text style={estilos.preco}>{formatarPreco(item.preco)}</Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Modal para seleção de quantidade */}
        <Modal
          visible={modalVisivel}
          transparent={true}
          animationType="fade"
          onRequestClose={cancelarModal}
        >
          <View style={estilos.modalOverlay}>
            <View style={estilos.modalContent}>
              <Text style={estilos.modalTitulo}>Selecionar Quantidade</Text>
              
              {itemSelecionado && (
                <>
                  <Text style={estilos.modalItemNome}>{itemSelecionado.nome}</Text>
                  <Text style={estilos.modalItemPreco}>
                    {formatarPreco(itemSelecionado.preco)}
                  </Text>
                  
                  <View style={estilos.quantidadeContainer}>
                    <Pressable
                      style={estilos.quantidadeBtn}
                      onPress={() => setQuantidade(Math.max(1, quantidade - 1))}
                    >
                      <Ionicons name="remove" size={24} color="#fff" />
                    </Pressable>
                    
                    <Text style={estilos.quantidadeTexto}>{quantidade}</Text>
                    
                    <Pressable
                      style={estilos.quantidadeBtn}
                      onPress={() => setQuantidade(quantidade + 1)}
                    >
                      <Ionicons name="add" size={24} color="#fff" />
                    </Pressable>
                  </View>
                  
                  <Text style={estilos.totalTexto}>
                    Total: {formatarPreco(itemSelecionado.preco * quantidade)}
                  </Text>
                </>
              )}
              
              <View style={estilos.modalBotoes}>
                <Pressable
                  style={[estilos.modalBtn, estilos.btnCancelar]}
                  onPress={cancelarModal}
                >
                  <Text style={estilos.btnCancelarTexto}>Cancelar</Text>
                </Pressable>
                
                <Pressable
                  style={[estilos.modalBtn, estilos.btnConfirmar]}
                  onPress={confirmarQuantidade}
                >
                  <Text style={estilos.btnConfirmarTexto}>Adicionar</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
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
  
  // Estilos do modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 25,
    width: "85%",
    maxWidth: 400,
    alignItems: "center",
  },
  modalTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  modalItemNome: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 5,
    textAlign: "center",
  },
  modalItemPreco: {
    fontSize: 16,
    color: "#666",
    marginBottom: 25,
  },
  quantidadeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
   quantidadeBtn: {
     backgroundColor: "#FF9800",
     width: 45,
     height: 45,
     borderRadius: 22.5,
     justifyContent: "center",
     alignItems: "center",
   },
  quantidadeTexto: {
    fontSize: 24,
    fontWeight: "bold",
    marginHorizontal: 25,
    minWidth: 30,
    textAlign: "center",
  },
   totalTexto: {
     fontSize: 18,
     fontWeight: "bold",
     color: "#FF9800",
     marginBottom: 25,
   },
  modalBotoes: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  modalBtn: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  btnCancelar: {
    backgroundColor: "#f0f0f0",
  },
   btnConfirmar: {
     backgroundColor: "#FF9800",
   },
  btnCancelarTexto: {
    color: "#333",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  btnConfirmarTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
