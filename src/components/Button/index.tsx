import { TouchableOpacity, View, Text} from "react-native";

type ButtonProps = {
  variant?: "primary" | "secondary";
  onPress?: () => void;
  currencieCode: string;
  isSelected?: boolean;
};

const variants = {
  primary: "bg-primary",
  secondary: "bg-secondary",
};

export function Button({ variant = "primary", onPress, currencieCode, isSelected = false }: ButtonProps) {
  const bgClass = isSelected ? variants[variant] : "bg-inputBg";
  const textClass = isSelected ? "text-textPrimary font-bold" : "text-textPrimary";

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`${bgClass} py-2 px-4 m-1 rounded-lg`}
    >
      <Text className={`${textClass}`}>{currencieCode}</Text>
    </TouchableOpacity>
  );
}
