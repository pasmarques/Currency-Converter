import { Alert, Text, TouchableOpacity, View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../components/Button";
import { currencies } from "../constants/currencies";
import { Input } from "../components/Input";
import { useState } from "react";
import { ResultCard } from "../components/ResultCard";

export default function App() {
  const [value, setValue] = useState("")
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
                {currencies.map(currencie => (
                  <Button variant="primary" key={currencie.code} currencieCode={currencie.code}></Button>
                ))}
              </View>
              <Input label="Valor: " value={value} onValueChange={(value)=>setValue(value)}></Input>
              <TouchableOpacity className="bg-inputBg py-4 px-6 rounded-[12px] mb-6 items-center justify-center">
                <Text className="text-textPrimary align-text-center font-extrabold text-lg">
                  ↑↓
                </Text>
              </TouchableOpacity>
              <Text className="text-textSecondary text-sm mb-2">Para: </Text>
              <View className="flex-row flex-wrap mx-[-4px] mb-3 justify-center items-center">
                {currencies.map(currencie => (
                  <Button variant="secondary" key={currencie.code} currencieCode={currencie.code}></Button>
                ))}
              </View>
            </View>

            {value ? <TouchableOpacity className="bg-primary py-4 px-6 rounded-[12px] mb-6 items-center justify-center">
              <Text className="text-textPrimary align-text-center font-extrabold text-lg">
                Converter
              </Text>
            </TouchableOpacity> : <TouchableOpacity className="bg-disabled py-4 px-6 rounded-[12px] mb-6 items-center justify-center">
              <Text className="text-textPrimary align-text-center font-extrabold text-lg">
                Converter
              </Text>
            </TouchableOpacity>}

            <ResultCard></ResultCard>

          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

