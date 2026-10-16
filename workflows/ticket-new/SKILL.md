---
name: ticket-new
description: >-
  /ticket:new — Cria uma nova task persistente na wiki (wiki/tasks/<slug>.md) E abre a issue
  sincronizada no GitHub via gh CLI com as labels vertical:<nome> e status:planned.
  Use após sessões de /grill ou para planejar novos trabalhos.
---

# /ticket:new

**Objetivo:** formalizar um plano de trabalho ou feature gerando documentação persistente na wiki (`wiki/tasks/`) e criando a respectiva issue no GitHub com rastreabilidade bidirecional.

## Passos

1. **Definir metadados da Task**:
   - Título em formato imperativo (ex.: `Implementar Webhook do Stripe`);
   - Slug em kebab-case (`implementar-webhook-stripe`);
   - Verticalidade (`vertical`): módulo ou domínio a que pertence na wiki (ex.: `billing`, `auth`, `ui`, `core`);
   - Prioridade (`priority`): `high`, `medium` ou `low`;
   - Dependências (`depends_on`): lista de wikilinks para tasks pré-requisito (ex.: `["[[criar-tabela-assinaturas]]"]`);
   - Fontes e decisões de origem (`sources` / `related`): links para decisões (`wiki/decisions/`) ou conceitos (`wiki/concepts/`).

2. **Criar o arquivo na Wiki**:
   - Criar `wiki/tasks/<slug>.md` a partir do template [task.md](../../templates/wiki/task.md).
   - Preencher frontmatter inicial com `status: planned`.
   - Detalhar critérios de aceite em checklist acionável, contratos esperados, casos de borda e arquivos impactados previstos.

3. **Abrir a Issue no GitHub**:
   - Verificar se o GitHub CLI está disponível (`gh auth status`).
   - Se autenticado, executar:
     ```bash
     gh issue create --title "<título>" --body "Ref Wiki: [[wiki/tasks/<slug>.md]]&#10;&#10;### Critérios de Aceite&#10;<critérios>" --label "vertical:<vertical>,status:planned"
     ```
   - Obter o número retornado da issue e atualizar o frontmatter de `wiki/tasks/<slug>.md` com `github_issue: <número>`.
   - *Fallback*: se o `gh` não estiver instalado ou autenticado, registrar `github_issue: pending-auth` e emitir aviso sem travar a execução.

4. **Conectar na Wiki**:
   - Adicionar `[[<slug>]]` na seção `related:` ou corpo das decisões/conceitos relacionados via `/wiki:increment` leve.

5. **Indexar**:
   - Adicionar linha em `wiki/index.md` sob a seção `## Tasks de Implementação`:
     `- [[<slug>]] — <resumo> · vertical: <v> · status: planned · issue: #<id>`

6. **Logar**:
   - Append em `wiki/log.md`:
     `## [AAAA-MM-DD] ticket:new | <título>`
     `- Criado: [[<slug>]] (issue #<id>, vertical: <vertical>)`

7. **Próximo passo sugerido**:
   - `/implement <slug>` (ou `/ticket:tdd <slug>`) para iniciar a construção.
