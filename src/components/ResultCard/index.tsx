import { View, Text } from "react-native";

type ResultCardProps = {
  originalValue: number;
  convertedValue: number;
  fromCurrency: string;
  toCurrency: string;
  rate: number;
}

export function ResultCard({
  originalValue,
  convertedValue,
  fromCurrency,
  toCurrency,
  rate,
}: ResultCardProps) {
  return (
    <View className="bg-cardBg rounded-2xl p-6 m-6">
      <Text className="text-textSecondary text-sm mb-4">Resultado da Conversão:</Text>
      
      <View className="mb-4">
        <Text className="text-textSecondary text-xs mb-1">De:</Text>
        <Text className="text-2xl font-bold text-textPrimary">
          {originalValue.toFixed(2)} {fromCurrency}
        </Text>
      </View>

      <View className="items-center mb-4">
        <Text className="text-textSecondary text-xs">Taxa de câmbio:</Text>
        <Text className="text-lg font-semibold text-textPrimary">
          1 {fromCurrency} = {rate.toFixed(4)} {toCurrency}
        </Text>
      </View>

      <View>
        <Text className="text-textSecondary text-xs mb-1">Para:</Text>
        <Text className="text-3xl font-bold text-primary">
          {convertedValue.toFixed(2)} {toCurrency}
        </Text>
      </View>
    </View>
  );
}
