---
title: Regras da Camada de Negócio
type: schema
updated: AAAA-MM-DD
---

# Regras da Camada de Negócio — <projeto>

> Regras para tudo em `wiki/business/`. Gerado/evoluído por `/grill-business` via `/schema:add|increment`.
> Público-alvo: pessoas do negócio, sem conhecimento técnico. Se um stakeholder não entende a frase, ela está errada.

## 1. Estrutura
| Página | Caminho | `type` | Template |
|---|---|---|---|
| Catálogo (porta de entrada) | `wiki/business/catalogo.md` | `business-catalog` | `templates/wiki/business/catalogo.md` |
| Glossário | `wiki/business/glossario.md` | `glossary` | `templates/wiki/business/glossario.md` |
| Ator | `wiki/business/actors/<slug>.md` | `actor` | `templates/wiki/business/actor.md` |
| Processo | `wiki/business/processes/<slug>.md` | `process` | `templates/wiki/business/process.md` |
| Regra de negócio | `wiki/business/rules/br-###-<slug>.md` | `business-rule` | `templates/wiki/business/business-rule.md` |
| Requisito | `wiki/business/requirements/req-###-<slug>.md` | `requirement` | `templates/wiki/business/requirement.md` |
| Política | `wiki/business/policies/<slug>.md` | `policy` | `templates/wiki/business/policy.md` |

Toda página de negócio é listada em `wiki/index.md` → seção `## Negócio`, e toda regra/requisito aparece nas tabelas do [[catalogo]]. Operações são registradas em `wiki/log.md` com o nome `grill-business`.

## 2. Linguagem

### NEG-L1 — Linguagem 100% de negócio
- **Regra:** páginas em `wiki/business/` descrevem **o quê** e **por quê** do negócio, nunca **como** um sistema faz.
- **Motivo:** a camada precisa ser lida e validada por quem não é técnico.
- **Exemplo:** ✅ "O síndico não pode liberar a entrada de um visitante sem identificação." ❌ "O endpoint `/visitas` retorna 403 se o campo `documento` for nulo."

### NEG-L2 — Termos proibidos
Não usar (nem em exemplos ou tabelas):

| Categoria | Termos proibidos |
|---|---|
| Integração | endpoint, API, request, response, payload, JSON, XML, webhook, HTTP, status code |
| Dados | banco de dados, tabela (no sentido de armazenamento de dados), coluna, campo (no sentido técnico), registro (no sentido técnico), query, SQL, chave estrangeira, ID técnico |
| Arquitetura | microserviço, serviço (no sentido técnico), backend, frontend, servidor, fila, cache, cron, job |
| Interface | componente, tela, botão, modal, formulário (no sentido de UI), front |
| Entrega | deploy, build, pipeline, ambiente (dev/staging/prod), versão do sistema, branch |
| Código | função, método, classe, variável, booleano, null, flag, script |

**Permitidos:** "tabela de decisão" (formato de regra), "tabela" como quadro de valores do negócio (ex.: tabela de preços), "formulário" e "registro" quando forem documentos do negócio (ex.: "registro de ocorrência em livro").

Em caso de dúvida, troque o termo pela ação de negócio equivalente: "salvar no banco" → "registrar"; "a API valida" → "a regra exige".

### NEG-L3 — Sempre os termos do glossário
- **Regra:** todo substantivo de negócio usado em uma regra, requisito ou processo existe em [[glossario]], com a mesma grafia. Sinônimos listados como proibidos no glossário não são usados.
- **Motivo:** uma palavra, um significado; evita regras ambíguas.
- **Exemplo:** ✅ "morador" (termo do glossário) ❌ "condômino", "usuário", "cliente" para a mesma pessoa.
- Termo novo → entra primeiro no glossário, depois na regra.

## 3. Identificadores

### NEG-I1 — Formato
- Regras: `BR-###`; requisitos: `REQ-###`. Mínimo de 3 dígitos, maiúsculo, com zeros à esquerda (`BR-007`, `BR-1024`).
- O `id` do frontmatter casa com o prefixo do arquivo: `id: BR-012` ↔ `rules/br-012-<slug>.md`; `id: REQ-004` ↔ `requirements/req-004-<slug>.md`.

### NEG-I2 — Numeração
- Próximo número = **maior número existente + 1** (considerando também as páginas `deprecated`).
- **IDs nunca são reutilizados**, nem após remoção ou depreciação.
- Renomear o slug é permitido; o ID permanece.

## 4. Conteúdo obrigatório

### NEG-C1 — Fonte obrigatória
- **Regra:** toda `business-rule` tem pelo menos uma fonte em `raw/` no campo `sources`. Política deve ter o texto original (lei, contrato, regimento) em `raw/`.
- **Motivo:** regra sem origem não pode ser validada nem defendida.
- Sem fonte ainda → registrar a conversa como raw (`/raw-source:add`) antes de criar a regra.

### NEG-C2 — Exemplos obrigatórios
- **Regra:** toda `business-rule` tem a seção `## Exemplos` com pelo menos um caminho feliz e um caso de borda, no formato **Dado / Quando / Então**, com valores concretos.
- `## Tabela de decisão` é opcional; use quando a regra combina duas ou mais condições.
- Todo `requirement` tem `## Critérios de aceite` no formato **Dado / Quando / Então**.

### NEG-C3 — Uma regra = um enunciado
- **Regra:** o enunciado é uma única frase no formato "<Sujeito> deve/não pode <ação> quando <condição>."
- **Motivo:** regras compostas escondem decisões e dificultam a rastreabilidade.
- **Exemplo:** ✅ "O morador não pode reservar o salão de festas quando tiver taxa condominial em atraso." ❌ "O morador não pode reservar o salão em atraso **e** deve pagar caução de 10%." (duas regras)

### NEG-C4 — Tipo da regra (`rule_type`)
| Valor | Quando usar | Exemplo |
|---|---|---|
| `restricao` | Proíbe ou obriga algo | "O visitante não pode entrar sem autorização do morador." |
| `calculo` | Define como um valor é obtido | "A multa por atraso é 2% do valor da taxa mais 1% ao mês." |
| `derivacao` | Uma informação decorre de outras | "O morador é considerado inadimplente quando tiver duas taxas em atraso." |
| `habilitacao` | Um fato libera ou bloqueia uma ação | "A reserva só é confirmada quando a caução for paga." |
| `inferencia` | Uma conclusão é tirada a partir de fatos | "Se a encomenda não for retirada em 7 dias, considera-se abandonada." |

## 5. Ciclo de vida

### NEG-V1 — Depreciação, nunca exclusão
- Regra ou requisito que deixa de valer recebe `status: deprecated` e `superseded_by: "[[br-...]]"` (ou `"[[req-...]]"`) apontando para quem o substituiu, quando houver.
- A página **permanece** na wiki e no [[catalogo]] (com status `deprecated`) para preservar o histórico.
- Mudança de significado = nova regra com novo ID + depreciação da antiga. Ajustes de redação sem mudar o significado = `/wiki:increment` na mesma regra.

### NEG-V2 — Contradições
- Fontes conflitantes nunca são resolvidas em silêncio: registrar com `> [!CAUTION] Contradição` na regra e uma pergunta em *Perguntas em aberto* no [[catalogo]].

## 6. Rastreabilidade com a parte técnica

### NEG-T1 — Tasks referenciam regras via `implements`
- **Regra:** toda task (`wiki/tasks/`) que implementa ou altera comportamento de negócio declara no frontmatter `implements: [BR-012, REQ-004]` com os IDs atendidos.
- **Motivo:** permite saber quais regras já têm implementação e o que é afetado quando uma regra muda.
- A ligação é **unidirecional**: a task aponta para a regra; páginas de negócio nunca citam tasks, código ou arquivos técnicos.
- Quando uma regra é depreciada, as tasks que a implementam devem ser revisadas (`/ticket:new` para o ajuste).

## 7. Regras do projeto
<!-- Regras adicionais específicas do projeto, no formato:
### NEG-X<n> — <título>
- **Regra:**
- **Motivo:**
- **Exemplo:** ✅ / ❌
- **Origem:** [[pagina]] · AAAA-MM-DD
-->
