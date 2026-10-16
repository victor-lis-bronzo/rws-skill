# Issue 03: Atualizar instaladores e documentações

- **Status**: resolved
- **Assignee**: agent
- **Feature**: `distribution-packaging`

## Descrição
- Atualizar `bin/install.ps1` e `bin/install.sh` para consumir `skills/` diretamente (e manter retrocompatibilidade se `workflows/` for referenciado).
- Atualizar `README.md` com as seções de instalação:
  - `skills.sh`: `npx skills add <repo>`
  - Claude Code Marketplace: `claude plugin marketplace add ...` e `claude plugin install ...`
  - Antigravity: `agy plugin install ...` e one-liners com `irm` / `curl`.
- Atualizar referências em `SKILL.md`, `CLAUDE.md`, `GEMINI.md` e `AGENTS.md`.

## Critérios de Aceite
- [x] `bin/install.ps1` e `bin/install.sh` funcionam apontando para `skills/`.
- [x] `README.md` contém instruções claras para as 3 ferramentas.
- [x] Mapeamento em `SKILL.md`, `CLAUDE.md`, `GEMINI.md` e `AGENTS.md` atualizado.
