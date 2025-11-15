import { Stack } from "expo-router";
import "../../global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { QueryProvider } from "../providers/QueryProvider";

export default function RootLayout() {
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            staleTime: 1000 * 60 * 5, 
          },
        },
      }),
    []
  );

  return (
    <SafeAreaProvider>
      <QueryProvider client={queryClient}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </QueryProvider>
    </SafeAreaProvider>
  );
}

