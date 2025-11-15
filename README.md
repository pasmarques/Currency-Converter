# 💱 Currency Converter

Um aplicativo mobile simples e rápido para conversão de moedas em tempo real.

## 🎯 Features

- ✅ Conversão de moedas em tempo real
- ✅ Interface intuitiva com Tailwind CSS (NativeWind)
- ✅ Gerenciamento de cache com React Query
- ✅ Suporte para iOS, Android e Web

## 🚀 Quick Start

```bash
# Instalar dependências
npm install

# Iniciar servidor Expo
npm start

# Escanear QR code no Expo Go (celular)
# Ou rodar no emulador:
npm run android    # Android
npm run ios        # iOS
npm run web        # Web
```

## 📁 Estrutura

```
src/
├── app/
│   ├── _layout.tsx        # Layout raiz
│   └── index.tsx          # Tela principal
├── components/
│   ├── Button/            # Seletor de moeda
│   ├── Input/             # Campo de valor
│   └── ResultCard/        # Resultado
├── constants/
│   └── currencies.ts      # Lista de moedas
├── providers/
│   └── QueryProvider.tsx  # Provider React Query
└── services/
    └── api.ts             # Lógica de requisição
```

## 🔄 Como Funciona a Conversão

### 1. **Estrutura da API**

A API usada é `exchangerate-api.com` e **não requer chave de API** para uso básico.

**Endpoint**: `https://api.exchangerate-api.com/v4/latest/{moeda}`

### 2. **Fluxo da Requisição**

Quando você clica em "Converter", a função `fetchExchangeRate` monta a URL assim:

```typescript
// Em src/services/api.ts
const API_BASE_URL = "https://api.exchangerate-api.com/v4/latest";

const fetchExchangeRate = async ({
  base,      // "USD" (moeda de origem)
  target,    // "BRL" (moeda de destino)
  amount,    // 100 (valor a converter)
}: UseExchangeRateParams) => {
  
  // 1. Monta a URL com a moeda de ORIGEM
  const response = await fetch(`${API_BASE_URL}/${base}`);
  // Exemplo: https://api.exchangerate-api.com/v4/latest/USD
  
  // 2. Recebe as taxas de câmbio para TODAS as moedas
  const data = await response.json();
  // data.rates = {
  //   "BRL": 5.25,
  //   "EUR": 0.85,
  //   "GBP": 0.73,
  //   ...
  // }
  
  // 3. Extrai a taxa da moeda de DESTINO
  const rate = data.rates[target];  // 5.25 (se target="BRL")
  
  // 4. Calcula o valor convertido
  const convertedAmount = amount * rate;  // 100 * 5.25 = 525
  
  // 5. Retorna o objeto com a conversão
  return {
    from: "USD",
    to: "BRL",
    amount: 100,
    convertedAmount: 525,
    rate: 5.25,
    timestamp: 1630669509
  };
};
```

### 3. **Exemplo Prático**

```
Entrada:
- Moeda origem: USD
- Moeda destino: BRL
- Valor: 100

URL da requisição:
https://api.exchangerate-api.com/v4/latest/USD

Resposta da API (simplificada):
{
  "base": "USD",
  "rates": {
    "BRL": 5.25,
    "EUR": 0.85,
    ...
  }
}

Cálculo:
rate = 5.25 (extraído de rates["BRL"])
convertedAmount = 100 * 5.25 = 525

Resultado mostrado:
100 USD = 525 BRL
Taxa: 1 USD = 5.25 BRL
```

### 4. **React Query - Cache e Gerenciamento**

```typescript
// Em src/app/index.tsx
const { data: conversionResult, isFetching, refetch } = useQuery({
  queryKey: ["exchangeRate", baseCurrency, targetCurrency, value],
  queryFn: () => fetchExchangeRate({ 
    base: baseCurrency, 
    target: targetCurrency, 
    amount: parseFloat(value) 
  }),
  enabled: false,           // Só faz requisição ao chamar refetch()
  staleTime: 1000 * 60 * 5, // Cache válido por 5 minutos
  retry: 2,                 // Tenta 2x em caso de erro
});

// Quando clica em "Converter":
const handleConvert = async () => {
  const res = await refetch();  // Faz a requisição
  if (res?.data) {
    setShowResult(true);        // Mostra o resultado
  }
};
```

## 🎯 Fluxo de Uso

1. **Selecione moedas** → USD e BRL
2. **Digite valor** → 100
3. **Clique em Converter** → faz requisição e mostra resultado
4. **Resultado é cacheado** → próxima conversão USD→BRL usa cache (5 min)

## 🌐 Moedas Suportadas

Veja em `src/constants/currencies.ts`. A API suporta 160+ moedas.

## 🚨 Troubleshooting

| Erro | Solução |
|---|---|
| "Conexão recusada" | Verifique WiFi e se Expo está rodando |
| "Taxa não encontrada" | Moeda inválida — use código ISOCODE (USD, BRL, etc) |

## 📝 Licença

MIT

---

**v1.0.0** | Desenvolvido com React Native + Expo + React Query

