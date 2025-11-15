import { useQuery } from "@tanstack/react-query";

interface ExchangeRateResponse {
  success: boolean;
  timestamp: number;
  base: string;
  date: string;
  rates: Record<string, number>;
}

interface UseExchangeRateParams {
  base: string;
  target: string;
  amount: number;
}
const API_BASE_URL = "https://api.exchangerate-api.com/v4/latest";

export const fetchExchangeRate = async ({
  base,
  target,
  amount,
}: UseExchangeRateParams) => {
  if (!base || !target || !amount) {
    throw new Error("Base, target e amount são obrigatórios");
  }

  const response = await fetch(`${API_BASE_URL}/${base}`);

  if (!response.ok) {
    throw new Error(`Erro ao buscar taxa de câmbio: ${response.statusText}`);
  }

  const data: ExchangeRateResponse = await response.json();

  if (!data.success && !data.rates) {
    throw new Error("Resposta inválida da API");
  }

  const rate = data.rates[target];
  if (!rate) {
    throw new Error(`Taxa de câmbio não encontrada para ${target}`);
  }

  return {
    from: base,
    to: target,
    amount,
    convertedAmount: amount * rate,
    rate,
    timestamp: data.timestamp,
  };
};

/**
 * Hook para buscar taxa de câmbio usando React Query
 * 
 * @param base - Moeda de origem (ex: "USD")
 * @param target - Moeda de destino (ex: "BRL")
 * @param amount - Valor a converter
 * @returns { data, isLoading, isError, error }
 * 
 * @example
 * const { data, isLoading, isError, error } = useExchangeRate({
 *   base: "USD",
 *   target: "BRL",
 *   amount: 100,
 * });
 */
export const useExchangeRate = ({
  base,
  target,
  amount,
}: UseExchangeRateParams) => {
  return useQuery({
    queryKey: ["exchangeRate", base, target, amount],
    queryFn: () => fetchExchangeRate({ base, target, amount }),
    enabled: !!base && !!target && amount > 0,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};
