import { Text, View, TextInput } from "react-native";

type InputProps = {
  value?: string;
  onValueChange?: (text: string) => void;
  label?: string
};
export function Input({value,onValueChange, label}:InputProps) {
    return (
        <View className="mb-4">
            <Text className="text-textSecondary text-sm mb-2">
                {label}
            </Text>
                <TextInput className="bg-inputBg text-textPrimary text-2xl font-bold p-4 rounded-lg"
                placeholder="0.00"
                placeholderTextColor="#94a3b8"
                value={value}
                onChangeText={onValueChange}
                keyboardType="numeric">
                </TextInput>
            
        </View>
    )
}