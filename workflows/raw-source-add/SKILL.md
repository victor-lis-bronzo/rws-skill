---
name: raw-source-add
description: >-
  /raw-source:add — Ingere uma nova fonte primária (artigo, PDF, transcrição, print, dump,
  thread, doc) em raw/ e propaga o conhecimento para a wiki. Use quando o usuário trouxer
  material externo novo.
---

# /raw-source:add

**Entrada:** arquivo, URL, texto colado ou anexo. **Saída:** fonte imutável em `raw/` + wiki atualizada.

## Passos
1. **Checar duplicidade**: buscar no `wiki/index.md` (seção Fontes) e em `raw/`. Se já existe algo equivalente → oferecer `/raw-source:increment`.
2. **Gravar a fonte** em `raw/AAAA-MM-DD-<slug>.<ext>`:
   - Texto/markdown: preservar conteúdo **literal**; adicionar no topo o frontmatter de [raw-source-meta.md](../../templates/raw/raw-source-meta.md).
   - URL: salvar o conteúdo convertido para markdown (não apenas o link) + `origin_url`.
   - Binário (PDF, imagem): copiar o arquivo e criar `raw/AAAA-MM-DD-<slug>.meta.md` ao lado.
   - Imagens referenciadas: baixar para `raw/assets/` quando possível.
3. **A partir daqui o arquivo é imutável.**
4. **Ingest** conforme [lifecycle.md](../../core/lifecycle.md#ingest):
   - discutir takeaways com o usuário (exceto modo batch);
   - criar `wiki/sources/src-<slug>.md` com [source-summary.md](../../templates/wiki/source-summary.md);
   - `/wiki:add` / `/wiki:increment` nas páginas afetadas;
   - sinalizar contradições.
5. Atualizar `wiki/index.md` (seção Fontes + páginas novas).
6. Append em `wiki/log.md`:
   ```
   ## [AAAA-MM-DD] raw-source:add | <título>
   - Arquivo: raw/AAAA-MM-DD-<slug>.md
   - Páginas criadas: [[...]]
   - Páginas atualizadas: [[...]]
   ```

## Modo batch
`/raw-source:add --batch <pasta>`: processa várias fontes sem discutir uma a uma; ao final apresenta um relatório consolidado.
