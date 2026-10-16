# Issue 02: Criar manifestos `.claude-plugin/plugin.json`, `marketplace.json` e raiz `plugin.json`

- **Status**: resolved
- **Assignee**: agent
- **Feature**: `distribution-packaging`

## Descrição
Criar a especificação de empacotamento para Claude Code e Antigravity:
- `.claude-plugin/plugin.json` (apontando skills e metadados)
- `.claude-plugin/marketplace.json` (declarando repositório para distribuição comunitária)
- `plugin.json` na raiz (para instalação nativa no Antigravity CLI e IDE)
- `rules/AGENTS.md` (unificação de regras para o pacote de plugin)

## Critérios de Aceite
- [x] `.claude-plugin/plugin.json` válido sintaticamente.
- [x] `.claude-plugin/marketplace.json` válido sintaticamente.
- [x] `plugin.json` válido sintaticamente.
- [x] `rules/AGENTS.md` presente e coerente.
