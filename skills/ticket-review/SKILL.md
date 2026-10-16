---
name: ticket-review
description: >-
  /ticket:review — Fase REFACTOR e fechamento de ciclo. Executa linters, limpa o código
  mantendo os testes verdes, gera commit convencional estrito, atualiza o status na wiki para
  completed (com /wiki:increment nas entidades afetadas) e fecha a issue no GitHub.
---

# /ticket:review

**Objetivo:** finalizar o ciclo de entrega garantindo qualidade estática de código, conformidade com o schema, histórico Git padronizado via commits convencionais, persistência da nova realidade na wiki e encerramento da issue.

## Passos

1. **Qualidade Estática e Refatoração (REFACTOR)**:
   - Executar os comandos de lint e checagem de tipos do projeto (ex.: `npm run lint`, `tsc --noEmit`, `flake8`, `golangci-lint`).
   - Refatorar duplicações de código, nomes confusos ou estruturas complexas introduzidas na fase de código, sem alterar comportamento.
   - Reexecutar os testes para garantir que tudo permanece 100% verde após a refatoração.

2. **Commit Convencional Estrito**:
   - Respeitar a especificação [Conventional Commits](https://www.conventionalcommits.org/):
     `<tipo>(<vertical>): <mensagem no imperativo> [referência à issue]`
   - Tipos válidos: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`, `perf`.
   - Exemplos:
     - `feat(billing): implementar endpoint de webhook do stripe (#42)`
     - `fix(auth): validar expiração de token jwt com fuso utc (#15)`
   - Executar o commit:
     ```bash
     git add .
     git commit -m "<tipo>(<vertical>): <mensagem> (#<issue>)"
     ```

3. **Atualizar a Wiki**:
   - Alterar frontmatter de `wiki/tasks/<slug>.md`:
     `status: completed`
     `updated: AAAA-MM-DD`
   - Marcar todos os critérios de aceite concluídos na task (`- [x] ...`).
   - Se a implementação alterou o comportamento real de entidades ou conceitos, executar [/wiki:increment](../wiki-increment/SKILL.md) nas páginas correspondentes (ex.: adicionar endpoint em `wiki/entities/api-gateway.md`).
   - Atualizar a linha correspondente em `wiki/index.md` marcando `status: completed`.

4. **Fechar a Issue no GitHub**:
   - Se houver `github_issue` associado e o GitHub CLI estiver disponível:
     ```bash
     gh issue edit <id> --add-label "status:done" --remove-label "status:in_progress"
     gh issue close <id> --comment "Implementado e validado via /ticket:review. Testes 100% verdes e wiki atualizada."
     ```

5. **Logar**:
   - Append em `wiki/log.md`:
     `## [AAAA-MM-DD] ticket:review | <slug>`
     `- Task [[<slug>]] concluída. Commit convencional gerado, issue #<id> fechada e wiki sincronizada.`

6. **Próximo passo sugerido**:
   - Se houver outras tasks na vertical ou roadmap, sugerir [/implement](../implement/SKILL.md) para a próxima. Caso contrário, rodar `/rws:lint`.
