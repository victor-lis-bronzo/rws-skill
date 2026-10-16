---
name: wiki-remove
description: >-
  /wiki:remove — Remove (ou deprecia) uma página da wiki mantendo a integridade referencial:
  redireciona ou limpa wikilinks, atualiza index.md e log.md. Use para páginas obsoletas,
  duplicadas ou fundidas em outra.
---

# /wiki:remove

> Ação destrutiva: **confirmar com o usuário** antes.

## Escolher a estratégia
| Situação | Estratégia |
|---|---|
| Conteúdo histórico ainda útil (ex.: decisão revogada) | **Depreciar**: `status: deprecated`, aviso no topo apontando o substituto. Mantém o arquivo. |
| Página duplicada / fundida | **Fundir**: mover conteúdo útil para a página destino (`/wiki:increment`), depois remover. |
| Página errada / sem valor | **Remover** de fato. |

Recomendação padrão: **depreciar** decisões; **fundir** duplicatas; **remover** só lixo.

## Passos (fundir/remover)
1. Encontrar todos os links de entrada (`[[slug]]` e `[[slug|...]]`) em `wiki/`.
2. Apresentar a lista e a estratégia; aguardar confirmação.
3. Para cada link: substituir pelo destino (fusão) ou remover/reescrever a frase (remoção).
4. Remover o slug de `related:` de outras páginas.
5. Apagar o arquivo (o histórico fica no git).
6. Remover a linha do `wiki/index.md`.
7. Append em `wiki/log.md`: `## [AAAA-MM-DD] wiki:remove | <título>` com estratégia, destino (se houver) e páginas tocadas.
8. Rodar a checagem de links do `/rws:lint` para garantir zero links quebrados.
