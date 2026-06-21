# bravo-teste-rotas

Repositório de teste compartilhado para validação de todas as rotas do pipeline Squad BRAVO (dev, rapido, normal, backlog).

## Stack

- Node.js + TypeScript ~5.4 (strict)
- Jest ~29 + ts-jest (cobertura mínima 80%)

## Branches

| Branch | Finalidade |
|---|---|
| `main` | Produção — protegida, merge via PR |
| `homolog` | Homologação — protegida, merge via PR |
| `desenv` | Integração de features — livre |
| `feature/ISSUE-NNN-*` | Branches de trabalho dos devs — base: `desenv` |

## Comandos

```bash
npm install       # instalar dependências
npm test          # rodar testes com cobertura (mínimo 80%)
npm run build     # compilar TypeScript
```

## Convenções

- Commits: `feat(ISSUE-NNN): descrição`
- Branches de feature: `feature/ISSUE-NNN-descricao` (base: `desenv`)
- Nunca fazer push direto para `main` ou `homolog`

## Documentação

As docs de cada issue ficam em:
- `documentacoes/ISSUE-NNN-titulo/`
- `openspec/changes/ISSUE-NNN-titulo/`
