---
name: wiki-increment
description: >-
  /wiki:increment — Enriquece ou corrige uma página existente da wiki com novas informações,
  fontes, conexões ou resolução de contradições, mantendo frontmatter, index e log em dia.
  Use quando há algo novo sobre um assunto que já tem página.
---

# /wiki:increment

## Passos
1. Ler a página inteira **antes** de editar.
2. Classificar a mudança:
   - **Acréscimo** → nova seção/parágrafo/linha de tabela no lugar lógico (não apenas no final).
   - **Correção** → reescrever o trecho; se contradiz fonte anterior, usar o bloco de contradição de [conventions.md](../../core/conventions.md#contradições) em vez de apagar silenciosamente.
   - **Estado** → atualizar `status` (ex.: decisão implementada, feature entregue).
   - **Conexão** → adicionar wikilinks e `related:`.
3. Atualizar frontmatter: `updated:` para hoje; adicionar novas fontes em `sources:`.
4. Manter o resumo inicial coerente com o corpo (reescrever se o sentido mudou).
5. Se a mudança cria/relaciona outros assuntos → links bidirecionais (incrementos leves nas páginas vizinhas).
6. Se o resumo de uma linha mudou → atualizar a linha no `wiki/index.md`.
7. Append em `wiki/log.md`: `## [AAAA-MM-DD] wiki:increment | <título>` com 1-3 bullets do que mudou e a fonte.

> Incrementos leves (só adicionar um link de volta) feitos como parte de outro comando
> não precisam de entrada própria no log — basta listá-los na entrada do comando principal.
