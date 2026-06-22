# Especificação Técnica — Serviço de Cálculo de Frete (ISSUE-6)

## Assinatura do Contrato

```typescript
// src/calcularFrete.ts
export function calcularFrete(
  pesoPedidoKg: number,
  cepDestino: string,
  valorCompraBRL: number
): number
```

- Retorna `number` com 2 casas decimais (arredondamento half-up).
- Retorna `0` quando `valorCompraBRL >= 200` (frete grátis).
- Lança `Error` com mensagem exata nos casos de validação (ver abaixo).
- Sem efeitos colaterais; função pura síncrona.

## Schema de Dados de Entrada

| Parâmetro | Tipo | Restrições |
|---|---|---|
| `pesoPedidoKg` | `number` | `> 0` e `<= 30`; float permitido (ex.: `12.3`) |
| `cepDestino` | `string` | 8 dígitos após remover `\D`; com ou sem hífen |
| `valorCompraBRL` | `number` | float >= 0; sem validação de máximo |

## Erros — Mensagens Exatas (case-sensitive)

| Condição | Mensagem do Error |
|---|---|
| `pesoPedidoKg <= 0` | `"peso deve ser maior que zero"` |
| `pesoPedidoKg > 30` | `"peso acima do limite de 30kg"` |
| CEP com != 8 dígitos após normalização | `"CEP inválido"` |

Ordem de avaliação obrigatória: peso → CEP → frete grátis → cálculo.

## Tabela de Faixas de Peso

| Condição | Frete Base (R$) |
|---|---|
| `0 < peso <= 1` | `10.00` |
| `1 < peso <= 5` | `20.00` |
| `5 < peso <= 10` | `35.00` |
| `10 < peso <= 30` | `35.00 + Math.ceil(peso - 10) * 4.00` |

## Tabela de Multiplicadores Regionais

| 1º dígito do CEP | Região | Multiplicador |
|---|---|---|
| `0`, `1`, `2`, `3` | Sudeste | `1.0` |
| `4`, `5`, `6`, `7` | CO / Norte / Nordeste | `1.5` |
| `8`, `9` | Sul | `1.2` |

Derivação: `cepDestino.replace(/\D/g, '')[0]`

## Fórmula de Cálculo

```
freteBase = tabelaPeso(pesoPedidoKg)
mult      = tabelaRegiao(cepDestino[0])
resultado = arredondarHalfUp(freteBase * mult)

arredondarHalfUp(v) = Math.round((v + Number.EPSILON) * 100) / 100
```

## Exemplos de Cálculo Verificados

| Peso (kg) | CEP (1º dígito) | Valor (R$) | Frete Esperado (R$) | Derivação |
|---|---|---|---|---|
| 0.5 | `0` (SE) | 50 | `10.00` | 10 × 1.0 |
| 1.0 | `0` (SE) | 50 | `10.00` | 10 × 1.0 |
| 3.0 | `0` (SE) | 50 | `20.00` | 20 × 1.0 |
| 5.0 | `0` (SE) | 50 | `20.00` | 20 × 1.0 |
| 7.0 | `0` (SE) | 50 | `35.00` | 35 × 1.0 |
| 10.0 | `0` (SE) | 50 | `35.00` | 35 × 1.0 |
| 12.0 | `0` (SE) | 50 | `43.00` | (35 + ceil(2)×4) × 1.0 |
| 12.3 | `0` (SE) | 50 | `47.00` | (35 + ceil(2.3)×4) × 1.0 |
| 30.0 | `0` (SE) | 50 | `115.00` | (35 + ceil(20)×4) × 1.0 |
| 0.5 | `8` (Sul) | 50 | `12.00` | 10 × 1.2 |
| 0.5 | `4` (CO) | 50 | `15.00` | 10 × 1.5 |
| 12.3 | `8` (Sul) | 50 | `56.40` | 47 × 1.2 |
| 2.0 | `0` (SE) | 200 | `0.00` | frete grátis |
| 2.0 | `0` (SE) | 199.99 | `20.00` | abaixo do limiar |

## Padrões Obrigatórios

- TypeScript strict (`"strict": true` em `tsconfig.json`); sem `any` implícito.
- Sem dependências externas para a lógica de cálculo.
- Testes em `src/__tests__/calcularFrete.test.ts` com Jest + ts-jest.
- Cobertura mínima: **80 % em statements, branches, functions e lines** (threshold no `package.json`).
- Todos os 30 critérios de aceite (CA-01 a CA-30) devem ter ao menos um `test()` correspondente.
- Branch de feature: `feature/ISSUE-6-calculo-frete` (base: `desenv`).
- PR com título `feat(ISSUE-6): implementar calcularFrete`.

## Critérios de Pronto (Definition of Done)

- [ ] `src/calcularFrete.ts` exporta `calcularFrete` com assinatura exata.
- [ ] `npm test` passa sem erro de threshold (cobertura >= 80 % em todas as métricas).
- [ ] Zero erros de compilação TypeScript em modo strict.
- [ ] PR `feature/ISSUE-6-calculo-frete → desenv` aberto referenciando Issue #6.
