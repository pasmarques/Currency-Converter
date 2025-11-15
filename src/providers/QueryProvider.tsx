import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

interface QueryProviderProps {
  client: QueryClient;
  children: ReactNode;
}
export const QueryProvider = ({ client, children }: QueryProviderProps) => {
  return (
    <QueryClientProvider client={client}>
      {children}
    </QueryClientProvider>
  );
};

