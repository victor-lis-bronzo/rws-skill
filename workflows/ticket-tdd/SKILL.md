---
name: ticket-tdd
description: >-
  /ticket:tdd — Fase RED do desenvolvimento orientado a testes. Lê a task (wiki/tasks/<slug>.md),
  atualiza o status para in_progress na wiki e no GitHub, e escreve os testes automatizados
  cobrindo critérios de aceite e casos de borda, garantindo que falhem pelo motivo esperado.
---

# /ticket:tdd

**Objetivo:** iniciar a implementação de uma task com disciplina de TDD (Fase RED), garantindo que os testes existam, representem os critérios de aceite e falhem estritamente porque a lógica ainda não foi escrita.

## Passos

1. **Carregar o Contexto**:
   - Ler a task em `wiki/tasks/<slug>.md` (critérios de aceite, contratos, casos de borda).
   - Ler `schema/schema.md` para identificar convenções de teste (framework, localização de arquivos de teste, padrões de mocks/fixtures).
   - Se a task depender de outras (`depends_on`), verificar se as dependências já estão com `status: completed`. Se não estiverem, alertar o usuário.

2. **Mudar Status para `in_progress`**:
   - Atualizar o frontmatter de `wiki/tasks/<slug>.md`:
     `status: in_progress`
     `updated: AAAA-MM-DD`
   - Atualizar a linha correspondente em `wiki/index.md` para refletir `status: in_progress`.
   - Se houver `github_issue` associado e o GitHub CLI estiver disponível:
     ```bash
     gh issue edit <id> --add-label "status:in_progress" --remove-label "status:planned"
     ```

3. **Escrever os Testes Automatizados**:
   - Criar ou estender arquivos de teste segundo o padrão do projeto (ex.: `tests/<vertical>/...` ou `__tests__/...`).
   - Para cada item da seção `Critérios de Aceite` e `Casos de Borda e Erros`, escrever um caso de teste claro e independente.
   - **Regra de ouro do TDD**: não escreva o código de produção nesta etapa; limite-se aos contratos mínimos necessários para compilação/importação se o idioma for estaticamente tipado.

4. **Executar a Suíte e Validar a Fase RED**:
   - Executar o runner de testes do projeto (ex.: `npm test`, `pytest`, `go test`, `cargo test`).
   - Confirmar que os testes recém-criados **falham** (RED).
   - Garantir que a falha é uma asserção esperada (ex.: `expected 200 but received 404/undefined`), e não erro de sintaxe ou problema no ambiente de testes.

5. **Logar**:
   - Append em `wiki/log.md`:
     `## [AAAA-MM-DD] ticket:tdd | <slug>`
     `- Testes criados para [[<slug>]] (Fase RED confirmada). Status alterado para in_progress.`

6. **Próximo passo sugerido**:
   - Executar [/ticket:code](../ticket-code/SKILL.md) para construir a implementação e alcançar a fase GREEN.
