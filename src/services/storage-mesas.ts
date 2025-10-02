import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_MESAS = 'mesa_'

export const salvarMesa = async (mesaId: string, itens: any[]) => {
    try {
        await AsyncStorage.setItem(`${STORAGE_MESAS}${mesaId}`, JSON.stringify(itens))
    } catch (error) {
        console.error('Erro ao salvar mesa: ', error);
    }
}

export const carregarMesa = async (mesaId: string) => {
    try {
        const data = await AsyncStorage.getItem(`${STORAGE_MESAS}${mesaId}`);
        return data ? JSON.parse(data) : []
    } catch (error) {
        console.error('Erro ao carregar a mesa: ', error);
        return []
    }
}

export const limparMesa = async (mesaId: string) => {
    try {
        await AsyncStorage.removeItem(`${STORAGE_MESAS}${mesaId}`)
    } catch (error) {
        console.error('Erro ao limpar a mesa: ', error);
        
    }
}