---
issue: 2
titulo: "[rapido] Função utilitária capitalize()"
rota: rapido
docs_path: repos/bravo-teste-rotas/documentacoes/ISSUE-2-capitalize
etapa_atual: "Code Review"
ultimo_agente: dev
openspec_change: ~
tech_stacks: []
repos:
  bravo-teste-rotas: repos/bravo-teste-rotas
repo_path: repos/bravo-teste-rotas
openspec_path: ~
sub_issues: []
desenv_tasks_merged: []
sub_issues_frontend: {}
pr_homologacao: ~
pr_release: ~
code_review_homolog_pr: ~
qa_status: ~
figma_url: ~
blockers: nenhum
---

## Descrição
Implementar função utilitária `capitalize(texto: string): string` em `src/capitalize.ts` (TypeScript) que capitaliza a primeira letra de cada palavra e mantém o restante em minúsculas.

**Exemplos:**
- "olá mundo" → "Olá Mundo"
- "JOÃO da SILVA" → "João Da Silva"
- "  foo   bar " → "Foo Bar"

**Critérios:**
- Implementação com TDD
- Rota: rapido (vai a produção)

## Custo (ledger)
| # | Etapa | Agente | Modelo | Tokens | Tools | Tempo_s |
|---|---|---|---|---|---|---|
|   |       |        |        |        |       |         |

**Totais:** tokens: 0 | tempo proc.: 0 min | decorrido: 0 min

## Histórico
- **2026-06-22 (Coordenador):** Issue #2 criada, estado.md inicializado, label `rapido` aplicado.
- **2026-06-22 (Dev):** TDD implementado — `src/capitalize.ts` + `src/__tests__/capitalize.test.ts` + re-export em `src/index.ts`. 16/16 testes passando, cobertura 100% em capitalize.ts. Commit `4792ac6` na branch `feature/ISSUE-2-capitalize`. PR #3 aberto (feature/ISSUE-2-capitalize → desenv).
