# Walkthrough — Distribution Packaging

## Resumo da Entrega
Implementação da padronização e empacotamento universal do repositório `rws-skill` para permitir instalação automatizada e descoberta em:
1. **`skills.sh`** (`npx skills add <user>/rws-skill` e `npx skills add <user>/rws-skill --skill <nome>`)
2. **Claude Code** (`claude plugin marketplace add ...` e `claude plugin install rws@rws-marketplace`)
3. **Antigravity** (`agy plugin install ...`, PowerShell / Bash one-liners remotos e scripts locais)

## Mudanças Realizadas
1. **Diretório Canônico `skills/`**:
   - Criada a pasta `skills/` contendo todas as 19 skills de workflows (`skills/<nome>/SKILL.md`) mais a skill mestra `skills/rws/SKILL.md`.
   - Ajustados links relativos em `skills/rws/SKILL.md` apontando para `../../core/` e `../../templates/`.
2. **Manifestos de Plugins e Regras**:
   - Criado `.claude-plugin/plugin.json` (declarando skills e metadados).
   - Criado `.claude-plugin/marketplace.json` (registro do repositório como marketplace comunitário).
   - Criado `plugin.json` na raiz (compatibilidade com instalador de plugins do Antigravity CLI e IDE).
   - Criado `rules/AGENTS.md` (regras consolidadas e invioláveis do ecossistema RWS).
3. **Instaladores Automatizados**:
   - Atualizados `bin/install.ps1` e `bin/install.sh` para consumir primariamente a pasta `skills/` (com fallback elegante para `workflows/`).
4. **Documentações**:
   - `README.md` enriquecido com diagramas da árvore de arquivos e seções detalhadas de instalação para `skills.sh`, Claude Code, Antigravity e Codex.
   - Atualizados adaptadores `SKILL.md`, `CLAUDE.md`, `GEMINI.md` e `AGENTS.md`.

## Verificações de Qualidade
- Sintaxe JSON validada via script Node.js (`.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`, `plugin.json`).
- Execução do linter RWS: `node bin/lint-rws.js examples/demo` aprovada com 0 erros e 0 avisos.
- Teste ponta a ponta do instalador `bin/install.ps1` em diretório temporário isolado registrando com sucesso todas as 20 skills.
