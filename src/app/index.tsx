import { Alert, Text, TouchableOpacity, View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../components/Button";
import { currencies } from "../constants/currencies";

export default function App() {
  return (
    <SafeAreaView className="flex-1 bg-bg">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View className="flex-1 px-6 pb-6 pt-[80px]">
            <View className="mb-8">
              <Text className="text-4xl font-bold text-textPrimary mb-2">Conversor de Moedas</Text>
              <Text className="text-base text-textSecondary">Converta valores entre diferentes moedas</Text>
            </View>

            <View className="bg-cardBg rounded-2xl p-6 m-6">
              <Text className="text-textSecondary mb-2 text-sm">De:</Text>
              <View className="flex-row flex-wrap mx-[-4px] mb-3 justify-center items-center">
                {currencies.map(currencie=>(
                  <Button variant ="primary" key = {currencie.code} currencieCode={currencie.code}></Button>
                ))}
              </View>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

