# Tasks — Serviço de Cálculo de Frete (ISSUE-6)

## Decisão de Breakdown

A entrega é uma única função pura (`calcularFrete`) com sua suíte de testes. Implementação e testes são inseparáveis: o threshold de cobertura é validado no mesmo `npm test`. Uma única sub-issue garante o ciclo completo sem fragmentar o trabalho de forma artificial.

**Total: 1 sub-issue** (T-01)

---

## T-01 — Implementar `calcularFrete` e testes Jest

**Sub-issue:** a ser criada como `[ISSUE-6] Implementar calcularFrete e testes Jest`
**Stack:** nodejs (Node.js LTS + TypeScript + Jest)
**Branch:** `feature/ISSUE-6-calculo-frete` (base: `desenv`)

### Contexto Técnico

Implementar a função pura `calcularFrete(pesoPedidoKg, cepDestino, valorCompraBRL)` em `src/calcularFrete.ts` seguindo exatamente o contrato da especificação técnica (ver `documentacoes/ISSUE-6-calculo-frete/especificacao-tecnica.md`) e do design (ver `openspec/changes/issue-6-calculo-frete/design.md`).

Pontos de atenção:
- Ordem de avaliação: validação de peso → validação de CEP → frete grátis → cálculo.
- Normalização de CEP: `cepDestino.replace(/\D/g, '')` antes de qualquer checagem de comprimento.
- Faixa acima de 10 kg: usar `Math.ceil(peso - 10)` (teto do excedente, não do peso total).
- Arredondamento: `Math.round((valor + Number.EPSILON) * 100) / 100` para evitar drift de float.
- Lookup regional por `cepNorm[0]` (1º char do CEP normalizado).
- Sem dependências externas para a lógica; sem qualquer I/O.

### Critérios de Aceite

Todos os 30 CAs de `documentacoes/ISSUE-6-calculo-frete/criterios-aceite.md` (CA-01 a CA-30) devem ter cobertura de teste explícita.

Resumo por grupo:
- **CA-01 a CA-06:** validações de peso (0, negativo, >30) e CEP (7 dígitos, 9 dígitos, só letras).
- **CA-07:** CEP com hífen aceito e normalizado.
- **CA-08 a CA-11:** frete grátis (=200, >200, 199.99, valor=0).
- **CA-12 a CA-20:** faixas de peso (0.5, 1, 3, 5, 7, 10, 12, 12.3, 30) — região Sudeste.
- **CA-21 a CA-26:** multiplicadores regionais (Sul 8, Sul 9, CO 4, CO 7, SE 0, SE 3).
- **CA-27:** combinação peso >10 + Sul com resultado 56.40.
- **CA-28:** arredondamento half-up (verificar comportamento em X.005).
- **CA-29 a CA-30:** validações têm precedência sobre frete grátis.

### Definição de Pronto

- [ ] `src/calcularFrete.ts` exporta `calcularFrete` com assinatura exata e zero erros TypeScript strict.
- [ ] `src/__tests__/calcularFrete.test.ts` cobre CA-01 a CA-30.
- [ ] `npm test` passa sem erro de threshold (>= 80 % em statements, branches, functions, lines).
- [ ] PR `feature/ISSUE-6-calculo-frete → desenv` aberto com referência a Issue #6 e sub-issue.
