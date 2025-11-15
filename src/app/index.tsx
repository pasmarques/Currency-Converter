import { Alert, Text, TouchableOpacity, View, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../components/Button";
import { currencies } from "../constants/currencies";
import { Input } from "../components/Input";
import { useState } from "react";
import { ResultCard } from "../components/ResultCard";
import { fetchExchangeRate } from "../services/api";
import { useQuery } from "@tanstack/react-query";


export default function App() {
  const [value, setValue] = useState("");
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [targetCurrency, setTargetCurrency] = useState("BRL");
  const [showResult, setShowResult] = useState(false);

  const {
    data: conversionResult,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["exchangeRate", baseCurrency, targetCurrency, value],
    queryFn: () =>
      fetchExchangeRate({ base: baseCurrency, target: targetCurrency, amount: parseFloat(value) || 0 }),
    enabled: false,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });

  const handleConvert = async () => {
    if (!value || parseFloat(value) <= 0) {
      Alert.alert("Erro", "Informe um valor maior que zero para converter");
      return;
    }

    setShowResult(false);
    const res = await refetch();
    if (res?.data) {
      setShowResult(true);
    } else {
      setShowResult(false);
      if (res?.error) {
        Alert.alert("Erro", `Falha na conversão: ${res.error.message || "Erro desconhecido"}`);
      }
    }
  };

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
                  <Button
                    variant="primary"
                    key={currencie.code}
                    currencieCode={currencie.code}
                    isSelected={baseCurrency === currencie.code}
                    onPress={() => setBaseCurrency(currencie.code)}
                  />
                ))}
              </View>
              <Input
                label="Valor: "
                value={value}
                onValueChange={(value) => setValue(value)}
              />
              <TouchableOpacity
                className="bg-inputBg py-4 px-6 rounded-[12px] mb-6 items-center justify-center"
                onPress={() => {
                  const temp = baseCurrency;
                  setBaseCurrency(targetCurrency);
                  setTargetCurrency(temp);
                }}
              >
                <Text className="text-textPrimary align-text-center font-extrabold text-lg">
                  ↑↓
                </Text>
              </TouchableOpacity>
              <Text className="text-textSecondary text-sm mb-2">Para: </Text>
              <View className="flex-row flex-wrap mx-[-4px] mb-3 justify-center items-center">
                {currencies.map(currencie => (
                  <Button
                    variant="secondary"
                    key={currencie.code}
                    currencieCode={currencie.code}
                    isSelected={targetCurrency === currencie.code}
                    onPress={() => setTargetCurrency(currencie.code)}
                  />
                ))}
              </View>
            </View>

            {value ? (
              <TouchableOpacity
                className={`py-4 px-6 rounded-[12px] mb-6 items-center justify-center ${
                  isFetching ? "bg-gray-500" : "bg-primary"
                }`}
                onPress={handleConvert}
                disabled={isFetching}
              >
                {isFetching ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <Text className="text-textPrimary align-text-center font-extrabold text-lg">
                    Converter
                  </Text>
                )}
              </TouchableOpacity>
            ) : (
              <TouchableOpacity className="bg-disabled py-4 px-6 rounded-[12px] mb-6 items-center justify-center">
                <Text className="text-textPrimary align-text-center font-extrabold text-lg">
                  Converter
                </Text>
              </TouchableOpacity>
            )}

            {isError && (
              <View className="bg-red-100 border-l-4 border-red-500 p-4 rounded mb-4">
                <Text className="text-red-700 font-bold">Erro na Conversão</Text>
                <Text className="text-red-600 text-sm mt-1">
                  {error?.message || "Falha ao buscar taxa de câmbio"}
                </Text>
              </View>
            )}

            {isFetching && value && (
              <View className="items-center justify-center py-8">
                <ActivityIndicator size="large" color="#3b82f6" />
                <Text className="text-textSecondary mt-2">Carregando taxa de câmbio...</Text>
              </View>
            )}

            {showResult && conversionResult && !isFetching && (
              <ResultCard
                originalValue={conversionResult.amount}
                convertedValue={conversionResult.convertedAmount}
                fromCurrency={conversionResult.from}
                toCurrency={conversionResult.to}
                rate={conversionResult.rate}
              />
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}


