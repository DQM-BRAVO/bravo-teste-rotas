# bravo-teste-rotas

## Stack
Node.js LTS, TypeScript ~5.4 (strict), Jest ~29 + ts-jest (cobertura mínima 80%)

## Convenções
- Arquivos em kebab-case; funções/classes em camelCase/PascalCase
- Código-fonte em `src/`; testes em `src/__tests__/` (extensão `.test.ts`)
- Commits: `feat(ISSUE-NNN): descrição` | `fix(ISSUE-NNN): descrição` | `test(ISSUE-NNN): descrição`
- Instalar dependências via `npm install` (nunca yarn ou pnpm)

## Branches
- `feature/ISSUE-NNN-descricao` → `desenv` → `homolog` → `main`
- Base de toda branch de feature: `desenv`
- Nunca fazer PR direto para `main` ou `homolog` sem passar por `desenv`
- `main` e `homolog`: protegidas (PR obrigatório, enforce_admins, sem force-push, sem deleção)
- `desenv`: livre (push direto permitido)

## Testes
- Rodar com: `npm test` (executa `jest --coverage`)
- Cobertura mínima: 80% em statements, branches, functions e lines
- Threshold configurado no `package.json` (campo `jest.coverageThreshold`)
- Rodar sempre antes de abrir PR

## Documentação
- Docs de cada issue: `documentacoes/ISSUE-NNN-titulo/`
- OpenSpec de cada issue: `openspec/changes/ISSUE-NNN-titulo/`
- Estado autoritativo da issue ativa: `documentacoes/ISSUE-NNN-titulo/estado.md`
