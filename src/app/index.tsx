import { Alert, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white"> 
      <View >
        <Text className="text-secondary text-xl font-normal">Conversor de Moedas</Text>
        <Text className="text-red-500">Teste</Text>
        <Text className="text-xl font-bold text-blue-500">Converta valore entre diferentes moedas</Text>
      </View>
      <View>
        <Text>De: </Text>
        <TouchableOpacity onPress={()=>Alert.alert('sou um botao')}>
          <Text>Botao</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
