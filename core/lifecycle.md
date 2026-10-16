# Ciclo de vida: Ingest, Query, Lint, Compounding

## Ingest

Disparado por `/raw-source:add` (ou `/setup-brown-space`).

1. Ler a fonte inteira (texto primeiro; imagens referenciadas depois, separadamente).
2. **Discutir com o usuário** os 3-7 principais takeaways e o que enfatizar (pular se ele pediu modo batch).
3. Criar `wiki/sources/src-<slug>.md` (resumo da fonte).
4. Para cada entidade/conceito tocado: `/wiki:increment` se existe, `/wiki:add` se não existe.
   Uma única fonte costuma tocar 5-15 páginas.
5. Sinalizar contradições com páginas existentes (ver [conventions.md](./conventions.md#contradições)).
6. Atualizar `wiki/index.md` e `wiki/overview.md` se o panorama mudou.
7. Append em `wiki/log.md`.

## Query

1. Ler `wiki/index.md`, escolher páginas relevantes.
2. Ler as páginas; descer para `raw/` só para confirmar detalhes ou citar literalmente.
3. Responder com citações (`[[pagina]]`, `raw/arquivo#secao`, `arquivo.ts:linha`).
4. A resposta pode ter a forma que fizer sentido: texto, tabela, diagrama mermaid, checklist.
5. **Compounding**: se a resposta for reutilizável (comparação, análise, conexão nova), pergunte:
   *"Quer que eu salve isso como [[syntheses/<slug>]]?"* → `/wiki:add`.
6. Opcional: append `query` em `log.md` quando a consulta gerou página ou revelou lacuna.

## Lint

Disparado por `/rws:lint` ou periodicamente (sugerir a cada ~10 ingestões).

1. Rodar `node <caminho-da-skill>/bin/lint-rws.js <raiz-do-projeto>` (checagens mecânicas):
   - links quebrados, páginas órfãs, páginas fora do index, entradas do index sem arquivo,
   - frontmatter ausente/incompleto, cabeçalhos do log fora do padrão, sources apontando para raw inexistente.
2. Checagens semânticas (agente):
   - contradições entre páginas;
   - claims superados por fontes mais novas;
   - conceitos mencionados sem página própria → seção *Lacunas* do index;
   - cross-references faltando;
   - perguntas novas que valeria investigar / fontes que valeria buscar.
3. Apresentar relatório ao usuário, corrigir com `/wiki:increment` / `/wiki:remove` após aprovação.
4. Append `lint` em `log.md`.

## Compounding

O valor da RWS cresce porque **nada se perde no histórico do chat**:
- Decisões de `/grill` → `wiki/decisions/`.
- Specs de `/grill-design` → `wiki/ui-specs/`.
- Respostas valiosas → `wiki/syntheses/`.
- Regras aprendidas → `schema/`.

Ao final de uma sessão longa, o agente deve perguntar:
*"Algo desta conversa deveria virar página na wiki ou regra no schema?"*
