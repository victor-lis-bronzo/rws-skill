# Specification — Distribution Packaging (`skills.sh`, Claude Plugins, AGY)

## 1. Contexto & Problema
O repositório `rws-skill` organiza seus fluxos na pasta `workflows/` e possui scripts de instalação locais. Para que a skill possa ser instalada de forma zero-friction por ferramentas populares do ecossistema de agentes:
- **`skills.sh` (`npx skills`)**: Requer convenção de diretório `skills/<nome>/SKILL.md` ou arquivo raiz `SKILL.md`.
- **Claude Code (`claude plugin`)**: Requer o diretório `.claude-plugin/` com `plugin.json` (declarando skills e metadados) e `marketplace.json` (para disponibilização pública via marketplace Git).
- **Antigravity (`agy plugin`)**: Requer `plugin.json` na raiz ou compatibilidade com `.claude-plugin/plugin.json`, além de descobrir nativamente `skills/` e suportar one-liners via PowerShell/Bash direto do GitHub.

## 2. Metas & Requisitos
1. **Padronização da pasta `skills/`**:
   - Organizar cada workflow como uma skill modular em `skills/<nome>/SKILL.md`.
   - Incluir a skill mestra `rws` em `skills/rws/SKILL.md`.
   - Manter compatibilidade com links relativos (`../../core/`, `../../templates/`).
2. **Manifestos de Plugins**:
   - Criar `.claude-plugin/plugin.json` e `.claude-plugin/marketplace.json`.
   - Criar `plugin.json` na raiz para o Antigravity.
   - Criar diretório `rules/` com `rules/AGENTS.md` (espelhando/unificando as regras).
3. **Atualização dos Instaladores**:
   - Atualizar `bin/install.ps1` e `bin/install.sh` para instalar a partir da pasta canônica `skills/`.
4. **Documentação de Instalação e Distribuição**:
   - Atualizar `README.md` com comandos exatos de instalação para `skills.sh`, Claude Code, e Antigravity.
   - Atualizar adaptadores `AGENTS.md`, `CLAUDE.md`, `GEMINI.md` e `SKILL.md`.
5. **Verificação & Qualidade**:
   - Validar JSON de todos os manifestos (`plugin.json`, `marketplace.json`).
   - Validar integridade dos links dos `SKILL.md`.
   - Garantir que `bin/lint-rws.js` continue passando com 100% de sucesso.
