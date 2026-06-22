# Proposal — Serviço de Cálculo de Frete (ISSUE-6)

## Objetivo

Implementar a função `calcularFrete` em TypeScript (backend, sem UI) que calcule o valor do frete de um pedido de e-commerce com base no peso total do pedido, na região de destino (derivada do primeiro dígito do CEP) e na política de frete grátis para compras acima de R$ 200,00.

## Usuários / Consumidores

- Backend do e-commerce (chamada interna, sem exposição direta ao usuário final).
- Futuros serviços que orquestrem checkout, simulação de frete ou relatórios logísticos.

## Assinatura da Função

```typescript
calcularFrete(pesoPedidoKg: number, cepDestino: string, valorCompraBRL: number): number
```

- **pesoPedidoKg**: peso total do pedido em quilogramas (float).
- **cepDestino**: CEP de destino como string, com ou sem hífen (ex.: `"01310-100"` ou `"01310100"`). Normalização: remover caracteres não-dígitos; exigir exatamente 8 dígitos após normalização.
- **valorCompraBRL**: valor total da compra em reais, já líquido de descontos (float com centavos, ex.: `153.90`).
- **Retorno**: valor do frete em reais como número (float), arredondado para 2 casas decimais. Frete grátis retorna `0`.

## Regras de Negócio

### 1. Validações (pré-cálculo — lançam Error antes de qualquer cálculo)

| Condição | Exceção lançada |
|---|---|
| peso <= 0 | `Error("peso deve ser maior que zero")` |
| peso > 30 | `Error("peso acima do limite de 30kg")` |
| CEP com comprimento != 8 dígitos (após normalização) | `Error("CEP inválido")` |

Nota: peso negativo também dispara o erro de peso <= 0 (mesma mensagem).

### 2. Frete Grátis

Se `valorCompraBRL >= 200`, retornar `0` (independente de peso ou região). Avaliado **após** as validações.

### 3. Tabela de Frete por Peso (frete base)

| Faixa de peso | Frete base |
|---|---|
| 0 < peso <= 1 kg | R$ 10,00 |
| 1 kg < peso <= 5 kg | R$ 20,00 |
| 5 kg < peso <= 10 kg | R$ 35,00 |
| 10 kg < peso <= 30 kg | R$ 35,00 + R$ 4,00 × ceil(peso - 10) |

Para a faixa acima de 10 kg: os kg adicionais acima de 10 kg são arredondados para cima (teto) antes de multiplicar por R$ 4,00. Exemplo: 12,3 kg → ceil(12,3 - 10) = ceil(2,3) = 3 → R$ 35,00 + 3 × R$ 4,00 = R$ 47,00.

### 4. Multiplicador Regional (aplicado sobre o frete base)

Derivado do **primeiro dígito** do CEP normalizado:

| Primeiro dígito do CEP | Região | Multiplicador |
|---|---|---|
| 0, 1, 2, 3 | Sudeste | 1.0 |
| 4, 5, 6, 7 | Centro-Oeste / Norte / Nordeste | 1.5 |
| 8, 9 | Sul | 1.2 |

Frete final (antes do arredondamento) = frete_base × multiplicador_regional.

### 5. Arredondamento

Arredondar o frete final para 2 casas decimais usando a regra **half-up** (matemática padrão: 0.005 arredonda para cima). Ex.: R$ 25,005 → R$ 25,01.

## Casos de Borda Documentados

| Entrada | Comportamento esperado |
|---|---|
| peso = 0 | `Error("peso deve ser maior que zero")` |
| peso = -1 | `Error("peso deve ser maior que zero")` |
| peso = 30.001 | `Error("peso acima do limite de 30kg")` |
| cepDestino = "1234567" (7 dígitos) | `Error("CEP inválido")` |
| cepDestino = "123456789" (9 dígitos) | `Error("CEP inválido")` |
| cepDestino = "abcdefgh" | `Error("CEP inválido")` |
| valorCompraBRL = 0, peso = 2, cep = "01310100" | Frete normal (não aplica frete grátis) |
| valorCompraBRL = 200, peso = 2, cep = "01310100" | Frete grátis → 0 |
| valorCompraBRL = 199.99, peso = 2, cep = "01310100" | Frete normal (< 200) |

## Restrições

- Linguagem: TypeScript com modo `strict` ativado.
- Sem dependências externas para a lógica de cálculo (math puro).
- Sem chamadas de rede, banco de dados ou I/O — função puramente síncrona.
- Cobertura mínima de testes: 80% em statements, branches, functions e lines (conforme `CLAUDE.md` do repo).
- Sem UI ou endpoint HTTP — entrega apenas o módulo/função.

## Definição de Pronto

- [ ] Função `calcularFrete` implementada em `src/` seguindo a assinatura exata.
- [ ] Todos os critérios de aceite (Given/When/Then) cobertos por testes Jest em `src/__tests__/`.
- [ ] Cobertura >= 80% em todas as métricas (`npm test` passa sem erro de threshold).
- [ ] Sem `any` implícito; compilação TypeScript sem erros em modo strict.
- [ ] PR `feature/ISSUE-6-calculo-frete → desenv` aberto com descrição referenciando esta Issue.
