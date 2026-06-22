# Design Técnico — Serviço de Cálculo de Frete (ISSUE-6)

## Visão Geral da Solução

Implementar uma função pura `calcularFrete` em TypeScript strict, sem dependências externas e sem I/O, que calcule o valor de frete de um pedido com base em peso, CEP de destino e valor da compra. A entrega é exclusivamente o módulo `src/calcularFrete.ts` acompanhado de testes Jest em `src/__tests__/calcularFrete.test.ts`.

## Componentes Envolvidos

| Arquivo | Papel |
|---|---|
| `src/calcularFrete.ts` | Função pura exportada — lógica de validação + cálculo |
| `src/__tests__/calcularFrete.test.ts` | Suíte Jest cobrindo todos os 30 critérios de aceite |

Sem rotas HTTP, sem banco, sem UI.

## Stack

Node.js LTS · TypeScript ~5.4 strict · Jest ~29 + ts-jest · cobertura mínima 80 %

## Estrutura de Dados Interna

### Tabela de faixas de peso (frete base)

Representada como array de objetos ordenado (avaliado de cima para baixo com `find`):

```
interface FreixaFaixaPeso {
  limiteInferior: number; // exclusivo
  limiteSuperior: number; // inclusivo
  freteBase: number;      // em reais (R$)
  proporcionalAcimaDe?: number; // kg de referência para calcular excedente
  valorPorKgExtra?: number;     // R$ por kg ceil do excedente
}
```

Faixas:
- 0 < peso <= 1   → R$ 10,00
- 1 < peso <= 5   → R$ 20,00
- 5 < peso <= 10  → R$ 35,00
- 10 < peso <= 30 → R$ 35,00 + R$ 4,00 × ceil(peso - 10)

A faixa acima de 10 kg usa ceil sobre o excedente fracionário antes de multiplicar (ex.: 12,3 kg → ceil(2,3) = 3 → 35 + 12 = 47).

### Tabela de multiplicadores regionais (1º dígito do CEP)

Representada como objeto de lookup direto (O(1)):

```
const MULTIPLICADOR_REGIONAL: Record<string, number> = {
  '0': 1.0, '1': 1.0, '2': 1.0, '3': 1.0,  // Sudeste
  '4': 1.5, '5': 1.5, '6': 1.5, '7': 1.5,  // CO / Norte / Nordeste
  '8': 1.2, '9': 1.2,                        // Sul
};
```

Lookup: `cepNormalizado[0]` após extração dos 8 dígitos.

## Fluxo de Dados

```
chamada: calcularFrete(pesoPedidoKg, cepDestino, valorCompraBRL)
         │
         ▼
[1] Validação de peso
    peso <= 0  → throw Error("peso deve ser maior que zero")
    peso > 30  → throw Error("peso acima do limite de 30kg")
         │
         ▼
[2] Normalização e validação do CEP
    cepNorm = cepDestino.replace(/\D/g, '')
    cepNorm.length !== 8 → throw Error("CEP inválido")
         │
         ▼
[3] Frete grátis
    valorCompraBRL >= 200 → return 0
         │
         ▼
[4] Cálculo do frete base (lookup na tabela de faixas)
    freteBase = faixa correspondente ao peso
         │
         ▼
[5] Multiplicador regional
    mult = MULTIPLICADOR_REGIONAL[cepNorm[0]]
    freteIntermediario = freteBase * mult
         │
         ▼
[6] Arredondamento half-up (2 casas decimais)
    return arredondarHalfUp(freteIntermediario)
```

## Estratégia de Validação e Mensagens de Erro

- Validações na ordem: peso → CEP → frete grátis (as validações têm precedência absoluta sobre a regra de negócio — CA-29 e CA-30).
- Mensagens de erro: strings literais exatas conforme proposal.md; nunca interpoladas.
- Sem validação de `valorCompraBRL` negativo (não está nos requisitos — valores negativos seguem o fluxo normal).

## Arredondamento Half-Up

JavaScript nativo `Math.round` implementa half-up para positivos. Para garantir precisão em ponto flutuante e evitar drift acumulado:

```typescript
function arredondarHalfUp(valor: number): number {
  return Math.round((valor + Number.EPSILON) * 100) / 100;
}
```

O `Number.EPSILON` compensa representações binárias como 1.005 → 1.0049999... que fariam `Math.round` arredondar para baixo erroneamente. Esta é a implementação mínima e padrão para half-up em 2 casas decimais sem lib externa.

## Decisões Técnicas

| Decisão | Escolha | Motivo |
|---|---|---|
| Estrutura das faixas | Array de objetos inline (sem arquivo externo) | Tabela pequena e estática; sem necessidade de configuração dinâmica |
| Lookup regional | `Record<string, number>` indexado por char | O(1), legível, sem switch/if-else longo |
| Arredondamento | `Math.round((v + EPSILON) * 100) / 100` | Sem dependências; corrige drift de float |
| Excedente acima de 10 kg | `Math.ceil(peso - 10)` | Especificação explícita de teto (ceil) |
| Módulo único | `src/calcularFrete.ts` exporta só a função | Escopo de entrega é exatamente uma função pura |

## Sem UI ou Endpoints

Nenhuma tela, nenhuma rota HTTP, nenhum controller. A função é consumida diretamente por outros módulos Node.js.
