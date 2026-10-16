# Distribution Packaging Feature Map

- **Feature**: `distribution-packaging`
- **Objective**: Padronizar e empacotar o repositório `rws-skill` para distribuição universal e instalação automatizada via `skills.sh` (`npx skills`), plugins do Claude Code (`claude plugin`) e Antigravity (`agy plugin install` e installers).
- **Status**: Planning & Specification
- **Created**: 2026-10-16

## Issues

| Issue ID | Slug | Title | Status |
|---|---|---|---|
| 01 | `restructure-skills-directory` | Migrar/estruturar diretório `skills/` padronizado para `skills.sh` e AGY | resolved |
| 02 | `create-plugin-manifests` | Criar manifestos `.claude-plugin/plugin.json`, `marketplace.json` e raiz `plugin.json` | resolved |
| 03 | `update-installers-and-docs` | Atualizar `install.ps1`, `install.sh` e documentações (`README.md`, `CLAUDE.md`, `GEMINI.md`, `AGENTS.md`) | resolved |
| 04 | `validation-and-lint` | Validação de sintaxe dos manifestos, links relativos e execução do `lint-rws.js` | resolved |
