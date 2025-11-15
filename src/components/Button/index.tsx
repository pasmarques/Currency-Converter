import { TouchableOpacity, View, Text} from "react-native";

type ButtonProps = {
  variant?: "primary" | "secondary";
  onPress?: () => void;
  currencieCode: string
};

const variants = {
  primary: "bg-primary",
  secondary: "bg-secondary",
};

export function Button({ variant = "primary", onPress, currencieCode}: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`${variants[variant]} py-2 px-4 m-1 rounded-lg`}
    >
      <Text className="text-textPrimary font-medium">{currencieCode}</Text>
    </TouchableOpacity>
  );
}