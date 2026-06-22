issue: 6
titulo: Serviço de cálculo de frete
rota: normal
etapa_atual: Em Desenvolvimento
ultimo_agente: lider-tecnico
openspec_change: repos/bravo-teste-rotas/openspec/changes/issue-6-calculo-frete
tech_stacks: [nodejs]
repos:
  bravo-teste-rotas: https://github.com/DQM-BRAVO/bravo-teste-rotas
repo_path: repos/bravo-teste-rotas
docs_path: repos/bravo-teste-rotas/documentacoes/ISSUE-6-calculo-frete
openspec_path: repos/bravo-teste-rotas/openspec/changes/issue-6-calculo-frete
sub_issues:
  - id: 7
    titulo: "[ISSUE-6] Implementar calcularFrete e testes Jest"
    stack: nodejs
    task_id: T-01
    url: https://github.com/DQM-BRAVO/bravo-teste-rotas/issues/7
sub_issues_frontend: {}
desenv_tasks_merged: []
pr_homologacao: ~
pr_release: ~
code_review_homolog_pr: ~
qa_status: ~
figma_url: ~
blockers: nenhum

## Custo (ledger)

| # | Etapa | Agente | Modelo | Tokens | Tools | Tempo (s) |
|---|-------|--------|--------|--------|-------|-----------|

## Histórico

- **2026-06-22 09:30** — Coordenador criou a Issue #6 e estado.md inicial (rota normal, etapa Refinamento Negócio)
- **2026-06-22** — PM Fase 1: levantamento postado na Issue #6 (21 perguntas em 6 seções: unidades, faixas de peso, regiões/CEP, frete grátis, arredondamento, casos de borda). Aguardando respostas do Gerente (Gate 1).
- **2026-06-22** — PM Fase 2: PRD (proposal.md) e critérios de aceite (criterios-aceite.md) produzidos. openspec criado em repos/bravo-teste-rotas/openspec/changes/issue-6-calculo-frete. Ambiguidade arquitetural: não. Etapa avançada para Refinamento Técnico (Líder Técnico).
- **2026-06-22** — Líder Técnico: design.md, especificacao-tecnica.md e tasks.md produzidos. Sub-issue #7 criada (stack:nodejs, T-01). Etapa avançada para Em Desenvolvimento. Nota: pasta openspec usa minúsculo (issue-6-calculo-frete) divergindo do padrão ISSUE-NNN-titulo do CLAUDE.md — manter sem renomear.
- **2026-06-22 (Dev):** TDD implementado — `src/calcularFrete.ts` + `src/__tests__/calcularFrete.test.ts` + re-export em `src/index.ts`. 55 testes cobrindo CA-01 a CA-30 + extras de borda. Cobertura 100% em todas as métricas (statements/branches/functions/lines). Branch `feature/ISSUE-7-calcular-frete`. PR aberto para desenv.
