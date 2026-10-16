---
name: setup-green-space
description: >-
  /setup-green-space — Define e inicializa a arquitetura RWS (Raw Sources, Wiki & Schema)
  em um projeto novo (greenfield), sem código existente. Cria a estrutura de pastas, semeia os
  arquivos mestres a partir dos templates e orienta os próximos passos (/grill ou /raw-source:add).
---

# /setup-green-space

**Objetivo:** Inicializar a base de conhecimento RWS (Raw Sources, Wiki & Schema) em um
projeto novo (página em branco), criando a infraestrutura correta desde o primeiro dia.

Diferente do `/setup-brown-space` (que audita código legado), o `/setup-green-space` é
**direto e ágil**: coleta os parâmetros básicos, gera os arquivos e já prepara o agente para
o primeiro brainstorming com `/grill` ou ingestão inicial com `/raw-source:add`.

---

## Fase 0 — Pré-checagem
1. Verificar se `raw/`, `wiki/` ou `schema/` já existem no diretório atual.
   - Se já existirem: avisar ao usuário que a base RWS já está inicializada e sugerir `/rws:summary`.
2. Se o diretório contiver muito código legado e nenhuma documentação:
   - Alertar o usuário: *"Parece que este projeto já possui uma codebase existente. Deseja usar `/setup-brown-space` para auditá-la primeiro ou prefere continuar com o setup limpo (`/setup-green-space`)?"*

---

## Fase 1 — Parâmetros Rápidos (Interativo)
Faça as perguntas essenciais (máximo 2-3 perguntas objetivas com opções recomendadas):
1. **Nome e Propósito Geral**: *"Qual o nome do projeto e seu propósito principal em 1 frase?"*
2. **Idioma Principal da Wiki**: *"Qual o idioma da base de conhecimento?"* (Padrão recomendado: `pt-BR`).
3. **Localização da Base**: *"A base deve ficar na raiz (`./`) ou em uma pasta dedicada (ex.: `docs/rws/`)?"* (Padrão recomendado: raiz `./`).

---

## Fase 2 — Criação da Estrutura de Pastas (Scaffolding)
Criar as seguintes pastas no destino escolhido:

```
<raiz-do-projeto>/
├── raw/
│   ├── _archive/
│   └── assets/
├── wiki/
│   ├── entities/
│   ├── concepts/
│   ├── decisions/
│   ├── ui-specs/
│   ├── syntheses/
│   └── sources/
└── schema/
```

---

## Fase 3 — Semeadura dos Arquivos Mestres (Seeding)

Copiar e customizar os templates da RWS (`templates/`):

### 1. `schema/schema.md`
Baseado em `templates/schema/schema-rules.md`, ajustando:
- Título: `Schema do projeto <Nome do Projeto>`
- Raiz da base e idioma escolhido.
- Seção de regras pronta para receber as convenções de código e arquitetura.

### 2. `wiki/overview.md`
Criar a visão geral canônica do projeto:
```markdown
---
title: <Nome do Projeto> — Visão geral
type: overview
status: active
tags: [overview]
sources: []
related: []
created: AAAA-MM-DD
updated: AAAA-MM-DD
---

# <Nome do Projeto>

<Descrição do propósito principal fornecida pelo usuário na Fase 1>.

## Objetivos e Escopo Inicial
- 

## Arquitetura e Módulos Centrais
<!-- Será preenchido pelas primeiras sessões de /grill -->

## Próximos Passos
- Definir entidades e modelo de domínio via `/grill`.
```

### 3. `wiki/index.md`
Baseado em `templates/wiki/index.md`, já com a primeira linha em Visão Geral:
```markdown
---
title: Índice
type: index
updated: AAAA-MM-DD
---

# Índice

> Última atualização: AAAA-MM-DD · 1 página · 0 fontes

## Visão geral
- [[overview]] — <Descrição curta do projeto>.

## Entidades

## Conceitos

## Decisões

## UI Specs

## Sínteses

## Fontes

## Lacunas
```

### 4. `wiki/log.md`
Baseado em `templates/wiki/log.md`, gravando a primeira entrada:
```markdown
---
title: Log
type: log
---

# Log

> Append-only. Formato: `## [AAAA-MM-DD] <operação> | <título>`

## [AAAA-MM-DD] setup | Inicialização greenfield (setup-green-space)
- Base RWS inicializada para o projeto <Nome do Projeto>.
- Criados: [[overview]], wiki/index.md, wiki/log.md, schema/schema.md.
```

---

## Fase 4 — Configuração dos Adaptadores de Agente
Conforme o ambiente do usuário (Claude Code, Codex ou Antigravity), criar ou atualizar os arquivos na raiz do projeto com o bloco de acoplamento:

```markdown
## Base de conhecimento (RWS)
Este projeto é governado pela arquitetura **RWS (Raw Sources, Wiki & Schema)**.
- Antes de qualquer tarefa, leia sempre `schema/schema.md` e consulte `wiki/index.md`.
- Siga os comandos no formato `/<escopo>:<ação>` e consulte o router da skill (`/rws:summary`) para decidir ações.
- `raw/` é imutável. Toda alteração na wiki atualiza `wiki/index.md` e `wiki/log.md`.
```
*(Garantir a presença de `CLAUDE.md`, `AGENTS.md` ou `GEMINI.md`).*

---

## Fase 5 — Validação e Próximos Passos
1. Executar o linter interno:
   ```bash
   node <caminho-da-skill>/bin/lint-rws.js <raiz-do-projeto>
   ```
   Confirmar 0 erros.
2. Apresentar ao usuário a confirmação de que o projeto novo está pronto para receber conhecimento e oferecer o menu de ação imediata:
   - **Opção 1 (Recomendada para novas ideias/funcionalidades)**: Executar `/grill` para entrevistar sobre o domínio, arquitetura e primeiras entidades.
   - **Opção 2 (Se já houver briefings/atas/specs prontas)**: Executar `/raw-source:add` para colar ou anexar as primeiras fontes.
   - **Opção 3 (Se o foco inicial for interface)**: Executar `/grill-design` para conceber fluxos visuais e design tokens.
