---
name: ticket-add
description: >-
  /ticket:add — Adiciona/sincroniza somente a issue no GitHub a partir de uma task já existente
  na wiki (wiki/tasks/<slug>.md), aplicando as labels vertical:<nome> e status:<status>.
  Use quando a task já foi redigida na wiki e precisa de uma issue correspondente no GitHub.
---

# /ticket:add

**Objetivo:** exportar ou sincronizar uma task existente em `wiki/tasks/` para o GitHub Issues, mantendo a consistência de flags e links sem recriar o arquivo da wiki.

## Passos

1. **Localizar a Task**:
   - Localizar o arquivo `wiki/tasks/<slug>.md`.
   - Ler o frontmatter (`title`, `vertical`, `status`, `github_issue`).
   - Se já possuir `github_issue` válido (número inteiro), confirmar com o usuário se deseja reabrir ou manter a issue existente.

2. **Validar Metadados**:
   - Garantir que `vertical:` está definido (se não estiver, inferir pelo domínio ou perguntar ao usuário).
   - Determinar a flag de status inicial do GitHub (`status:planned` ou `status:in_progress` conforme o status do `.md`).

3. **Criar a Issue no GitHub**:
   - Verificar autenticação com `gh auth status`.
   - Executar:
     ```bash
     gh issue create --title "<title>" --body "Ref Wiki: [[wiki/tasks/<slug>.md]]&#10;&#10;$(cat wiki/tasks/<slug>.md)" --label "vertical:<vertical>,status:<status>"
     ```
   - Capturar o número da issue criada.

4. **Atualizar a Task na Wiki**:
   - Atualizar o frontmatter de `wiki/tasks/<slug>.md`:
     `github_issue: <número>`
     `updated: AAAA-MM-DD`

5. **Atualizar Index e Log**:
   - Atualizar a linha correspondente em `wiki/index.md` adicionando `· issue: #<número>`.
   - Append em `wiki/log.md`:
     `## [AAAA-MM-DD] ticket:add | <slug>`
     `- Issue #<número> criada no GitHub para a task [[<slug>]] (vertical: <vertical>).`
