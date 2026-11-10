# /grill-business

**Objetivo:** desenvolver **regras de negócio, requisitos e processos** sem falar de implementação,
e registrá-los em `wiki/business/` em **linguagem 100% de negócio** — documentos que um
stakeholder não técnico (gestor, jurídico, operação, cliente) consegue ler, validar e assinar embaixo.

> O `/grill-business` responde **"o que deve ser verdade no negócio"**. O **"como o sistema faz"**
> fica para o [/grill](./grill.md) e o **"como o usuário vê"** para o [/grill-design](./grill-design.md).

## Preparação (silenciosa)
1. Ler `schema/business-rules.md`. Se não existir, anotar para **propor no gate** a criação a partir do
   template [business-rules.md](../templates/schema/business-rules.md).
2. Ler `wiki/business/catalogo.md`, `wiki/business/glossario.md` e as páginas já existentes em
   `wiki/business/` (atores, processos, regras, requisitos, políticas) ligadas ao tema.
3. Ler as fontes relevantes em `raw/`: atas, transcrições de entrevistas, contratos, regimentos,
   leis/normas, planilhas e e-mails do negócio.
4. **Não ler código.** Regra de negócio nasce do negócio, não da implementação atual — se o código
   divergir da regra, isso é uma pendência técnica, não uma fonte.
5. Levantar o próximo ID livre de cada série (`BR-###`, `REQ-###`): **maior ID existente + 1**,
   incluindo páginas `deprecated`. IDs nunca são reutilizados.

## Regras de condução
1. **Uma pergunta por vez.** Nunca despeje um questionário.
2. **Toda pergunta traz sua recomendação** e o porquê. Ofereça 2-4 opções (use a ferramenta de
   pergunta múltipla escolha se o agente tiver), **com a recomendada primeiro**.
3. **Proibido falar de código, arquitetura, banco de dados, API ou telas.** Se o assunto surgir
   (do usuário ou do agente), registre em **"Pendências técnicas"** e volte ao negócio; essas
   pendências alimentam um `/grill` ou `/grill-design` posterior.
4. **Exemplos concretos primeiro** (*Specification by Example*): peça casos reais
   (*"me conte a última vez que isso aconteceu"*), derive a regra a partir deles e **confirme o
   enunciado** com o usuário. Cada regra sai com ao menos um exemplo Dado/Quando/Então.
5. **Vigie o vocabulário.** Todo termo novo ou ambíguo vai para o glossário. Aponte sinônimos
   conflitantes (*"você disse 'cliente' e 'morador' — são a mesma pessoa?"*) e feche um termo canônico.
6. **Separe política de regra.** Política = diretriz ampla (*"priorizamos a segurança do condômino"*);
   regra = atômica e verificável (*"visitante só entra com autorização do morador"*). Uma política
   costuma originar várias regras.
7. **Uma regra = uma afirmação.** Se o enunciado tem "e"/"ou" escondendo duas regras, divida.
8. **Se a resposta está na wiki ou em `raw/`, não pergunte** — apenas confirme (*"A ata de 12/03 diz X; ainda vale?"*).
9. Aponte contradições entre regras, com a wiki ou com fontes (contratos, leis) — com educação.
10. Mantenha visível um **mapa de decisões** (resolvidas ✅ / pendentes ⏳) a cada ~5 perguntas.
11. Pare de perguntar quando novas respostas não mudarem mais as regras.

## Árvore de decisão (percorrer o que for relevante, nesta ordem)

| Ramo | Perguntas típicas |
|---|---|
| **Objetivo do negócio** | Que resultado o negócio quer? Qual dor resolve? Como saber que deu certo? |
| **Atores** | Quem participa (pessoas, papéis, áreas, parceiros)? Quem decide, quem executa, quem é afetado? |
| **Glossário** | O que significa exatamente cada termo? Há sinônimos? Algum termo muda de sentido por área? |
| **Processos** | Como é feito hoje (passo a passo)? Como deve passar a ser? O que dispara e o que encerra o processo? |
| **Regras por processo** | O que é obrigatório, proibido ou permitido em cada passo? Quem pode fazer o quê? |
| **Exceções e casos de borda** | E quando falta informação? E fora do horário? E se duas coisas acontecem ao mesmo tempo? Quem aprova a exceção? |
| **Cálculos, prazos e limites** | Como se calcula (valores, multas, descontos)? Quais prazos? Quais limites mínimos/máximos? Arredondamento? |
| **Políticas e conformidade** | LGPD, contratos, regimentos, normas do setor: o que exigem? Por quanto tempo guardar? Quem pode ver? |
| **Requisitos e critérios de aceite** | O que o negócio precisa que exista? Prioridade (must/should/could/wont)? Como o stakeholder aceita? |
| **Fora de escopo** | O que, explicitamente, não será tratado agora? |

## Classificando regras (`rule_type`)

| Tipo | Quando usar | Exemplo |
|---|---|---|
| `restricao` | Obriga ou proíbe algo | "Visitante só entra com autorização do morador." |
| `calculo` | Produz um valor por fórmula | "A multa por atraso é 2% do valor mais 1% ao mês." |
| `derivacao` | Deduz um fato/estado de outros fatos | "Unidade com 3 boletos em aberto é considerada inadimplente." |
| `habilitacao` | Libera (ou dispara) uma ação quando a condição é verdadeira | "Morador adimplente pode reservar o salão de festas." |
| `inferencia` | Conclui uma classificação/decisão a partir de critérios | "Encomenda não retirada em 30 dias é considerada abandonada." |

Regras com muitas combinações de condições viram **tabela de decisão** (condições × resultado).

## Síntese
Ao final, apresente:

```markdown
# Síntese do grill-business: <tema>

## Objetivo do negócio

## Atores
| Ator | Papel | Página |
|---|---|---|

## Glossário (novos / alterados)
| Termo | Definição | Sinônimos a evitar | Ação |
|---|---|---|---|

## Processos
<!-- como é hoje → como deve ser; mermaid flowchart em linguagem de negócio, se ajudar -->

## Regras
| ID | Enunciado | Tipo | Origem | Exemplos |
|---|---|---|---|---|
| BR-012 | <afirmação atômica e verificável> | restricao | raw/AAAA-MM-DD-ata-x.md | Dado/Quando/Então (resumo) |

## Tabelas de decisão
| Condição A | Condição B | Resultado |
|---|---|---|

## Requisitos
| ID | Necessidade | Prioridade | Regras |
|---|---|---|---|
| REQ-004 | <o que o negócio precisa> | must | BR-012, BR-013 |

## Políticas
## Fora de escopo
## Perguntas em aberto
## Pendências técnicas (para /grill ou /grill-design)

## O que será gravado
| Destino | Arquivo | Ação |
|---|---|---|
| wiki | wiki/business/rules/br-012-<slug>.md | /wiki:add |
| wiki | wiki/business/requirements/req-004-<slug>.md | /wiki:add |
| wiki | wiki/business/processes/<slug>.md | /wiki:add ou /wiki:increment |
| wiki | wiki/business/actors/<slug>.md | /wiki:add ou /wiki:increment |
| wiki | wiki/business/policies/<slug>.md | /wiki:add |
| wiki | wiki/business/catalogo.md · glossario.md | /wiki:increment |
| schema | schema/business-rules.md | /schema:add (1ª vez) ou /schema:increment |
| raw | raw/AAAA-MM-DD-grill-business-<slug>.md (opcional) | transcrição |
```

## Aprovação explícita (gate)
Pergunte: **"Aprova a síntese e as gravações de regras, requisitos e glossário? (sim / ajustar)"**.
Só aceite como aprovação respostas inequívocas ("sim", "aprovado", "1", "pode gravar").
Sem aprovação → **não grave nada**; continue ajustando.

> O `/grill-business` **não cria tasks nem issues**. Levar regras à solução técnica é papel do `/grill`.

## Formalização (após aprovação)
1. Se aprovado, criar `schema/business-rules.md` a partir do template
   [business-rules.md](../templates/schema/business-rules.md) via [/schema:add](./schema-add.md)
   (ou ajustar via [/schema:increment](./schema-increment.md)).
2. Opcional: salvar a transcrição resumida como `raw/AAAA-MM-DD-grill-business-<slug>.md` —
   **as respostas do usuário são fonte primária** e as regras podem citá-la em `sources`.
3. Executar [/wiki:add](./wiki-add.md) para cada página nova, a partir dos templates em
   `templates/wiki/business/` ([actor](../templates/wiki/business/actor.md),
   [process](../templates/wiki/business/process.md),
   [business-rule](../templates/wiki/business/business-rule.md),
   [requirement](../templates/wiki/business/requirement.md),
   [policy](../templates/wiki/business/policy.md)):
   - regra → `wiki/business/rules/br-###-<slug>.md`, `id: BR-###` igual ao nome do arquivo,
     `rule_type`, `sources` apontando para `raw/` (obrigatório) e seção `## Exemplos` (Dado/Quando/Então);
   - requisito → `wiki/business/requirements/req-###-<slug>.md`, `id: REQ-###`, `priority`,
     `rules: ["[[br-...]]"]` e seção `## Critérios de aceite`.
   - IDs alocados como **maior existente + 1**; nunca reutilizar.
4. Executar [/wiki:increment](./wiki-increment.md) nas páginas existentes afetadas. Regra que mudou
   de sentido **não é apagada**: marcar `status: deprecated` com `superseded_by` apontando para a nova.
5. Atualizar `wiki/business/catalogo.md` (todas as regras/requisitos com ID, enunciado e status) e
   `wiki/business/glossario.md` (termos novos/alterados). Se não existirem, criar a partir dos templates
   [catalogo](../templates/wiki/business/catalogo.md) e [glossario](../templates/wiki/business/glossario.md).
6. Atualizar `wiki/index.md`, seção `## Negócio`.
7. Append em `wiki/log.md`: `## [AAAA-MM-DD] grill-business | <tema>` listando os arquivos tocados
   e os IDs criados/alterados.
8. Sugerir próximo passo: `/grill` (levar as regras à solução técnica e às tasks, com `implements: [BR-..., REQ-...]`
   — começando pelas *Pendências técnicas*), `/grill-design` (se houver jornada de usuário relevante), `/rws:lint`.
