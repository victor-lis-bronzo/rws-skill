# Catálogo de Patterns de UI × Aplicações de Referência

Usado pelo `/grill-design` para **sugerir patterns nomeados** e **apps correlatos** a cada decisão.
Não é exaustivo: o agente deve complementar com conhecimento próprio e, se possível, pesquisa web.

## Como usar
1. Identifique o **problema de interface** (ex.: "usuário precisa achar 1 item entre milhares").
2. Encontre a categoria abaixo e ofereça **2-3 patterns** com prós/contras.
3. Cite **2-3 apps de referência** e diga exatamente **o que copiar** de cada um.
4. Recomende um, justificando pelo contexto do projeto (público, densidade, plataforma).

---

## Navegação e estrutura

| Pattern | Quando usar | Evitar quando | Referências |
|---|---|---|---|
| **Sidebar persistente** | Apps com 5+ seções e uso diário | Mobile-first, poucas seções | Linear, Notion, Slack |
| **Top nav + tabs** | Poucas seções, conteúdo largo | Hierarquia profunda | GitHub (repo), Vercel |
| **Bottom tab bar** | Mobile, 3-5 destinos principais | Desktop, >5 destinos | Instagram, Nubank, Spotify |
| **Command Palette (⌘K)** | Power users, muitas ações | Público leigo como único acesso | Linear, Raycast, VS Code, Vercel |
| **Breadcrumbs** | Hierarquias de 3+ níveis | Apps rasos | Google Drive, AWS Console |
| **Workspace switcher** | Multi-tenant / multi-org | Usuário com 1 conta | Slack, Vercel, Notion |

## Listas, dados e busca

| Pattern | Quando usar | Evitar quando | Referências |
|---|---|---|---|
| **Data table + filtros facetados** | Muitos registros, atributos comparáveis | Mobile, itens visuais | Stripe Dashboard, Airtable, Retool |
| **Master-Detail (split view)** | Navegar lista e ver detalhe sem perder contexto | Telas estreitas | Gmail, Linear, Apple Mail |
| **Kanban** | Itens com estados/fluxo | Muitos estados (>7) ou muitos itens por coluna | Trello, Linear (board), Jira |
| **Cards grid** | Itens visuais / heterogêneos | Comparar atributos | Airbnb, Dribbble, Notion gallery |
| **Infinite scroll** | Consumo de feed | Quando o usuário precisa "chegar ao fim" ou voltar | Twitter/X, Pinterest |
| **Paginação** | Dados tabulares, referência de posição | Feeds | Google Search, Stripe |
| **Saved views / filtros salvos** | Usuários repetem as mesmas consultas | Uso esporádico | Linear, Airtable, HubSpot |
| **Search-as-you-type** | Catálogos grandes | Backend lento sem debounce | Algolia demos, Spotify |

## Criação e edição

| Pattern | Quando usar | Evitar quando | Referências |
|---|---|---|---|
| **Wizard / Stepper** | Processo longo, ordem importa, onboarding | Usuários experientes editando 1 campo | Stripe onboarding, TurboTax |
| **Inline edit** | Edições pequenas e frequentes | Validação complexa | Notion, Airtable, Linear |
| **Modal / Dialog** | Tarefa curta e focada | Formulários longos | GitHub (novo repo), Figma |
| **Drawer / Side panel** | Editar mantendo contexto da lista | Conteúdo que precisa da tela inteira | Linear (issue peek), HubSpot |
| **Autosave + indicador** | Documentos, formulários longos | Ações com consequência financeira | Google Docs, Notion |
| **Optimistic UI** | Ações de alta frequência e baixa falha | Pagamentos, ações irreversíveis | Linear, Trello, Twitter likes |
| **Undo toast** (em vez de confirmação) | Ações destrutivas reversíveis | Irreversível de verdade | Gmail ("Desfazer"), Linear |
| **Slash commands no editor** | Editores ricos | Formulários simples | Notion, Slack, Linear |

## Feedback e estados

| Pattern | Quando usar | Referências |
|---|---|---|
| **Skeleton loading** | Layout previsível, carregamento < 3s | YouTube, LinkedIn, Facebook |
| **Spinner / progress** | Operação indeterminada / com % conhecido | macOS, uploads do Google Drive |
| **Empty state educativo** | Primeiro uso; mostrar valor + CTA | Linear, Notion, Dropbox |
| **Error state com ação** | Falha recuperável (retry, contato) | Stripe, Vercel deploy logs |
| **Toast / Snackbar** | Confirmação não-bloqueante | Gmail, Linear, Vercel |
| **Inline validation** | Formulários | Stripe Checkout, GOV.UK |
| **Status page / banner global** | Incidentes, manutenção | GitHub, Vercel |

## Onboarding e ativação

| Pattern | Quando usar | Referências |
|---|---|---|
| **Checklist de onboarding** | SaaS com vários passos de setup | Stripe, Vercel, Intercom |
| **Template gallery** | Página em branco intimida | Notion, Figma, Miro |
| **Sample data / sandbox** | Produto de dados | Stripe test mode, Metabase |
| **Progressive disclosure** | Produto com muitas features | Apple Settings, Figma |
| **Product tour (tooltips)** | Pouco recomendado; use com parcimônia | Intercom, Pendo |

## Dashboards e analytics

| Pattern | Quando usar | Referências |
|---|---|---|
| **KPI cards + tendência** | Visão executiva rápida | Stripe Home, Shopify, Vercel Analytics |
| **Seletor de período global** | Todos os gráficos compartilham o filtro | Google Analytics, Mixpanel, PostHog |
| **Drill-down** | Do agregado ao registro | Metabase, Amplitude |
| **Comparação com período anterior** | Métricas de negócio | Stripe, Plausible |

## Configurações, permissões e conta

| Pattern | Quando usar | Referências |
|---|---|---|
| **Settings com nav lateral agrupada** | Muitas configurações | GitHub Settings, Vercel, Linear |
| **Zona de perigo (danger zone)** | Ações destrutivas de conta/projeto | GitHub, Vercel |
| **Roles + matriz de permissões** | B2B multiusuário | Notion, Figma, Google Workspace |
| **Billing com plano atual + uso** | SaaS por assinatura | Vercel, OpenAI Platform, Supabase |

## E-commerce, checkout e marketplaces

| Pattern | Quando usar | Referências |
|---|---|---|
| **Checkout em uma página** | Compras simples | Shopify, Stripe Checkout |
| **Carrinho em drawer** | Continuar comprando | Shopify themes, Apple Store |
| **Filtros laterais + chips** | Catálogo grande | Amazon, Mercado Livre, Zalando |
| **Mapa + lista sincronizados** | Itens geolocalizados | Airbnb, Zillow, iFood |

## Mobile

| Pattern | Quando usar | Referências |
|---|---|---|
| **Bottom sheet** | Ações/contexto sem sair da tela | Google Maps, Uber, Apple Maps |
| **Pull-to-refresh** | Conteúdo que atualiza | Twitter/X, Gmail |
| **Swipe actions** | Ações rápidas em listas | Apple Mail, Gmail, Tinder |
| **FAB (Floating Action Button)** | Uma ação primária dominante | Gmail (escrever), Google Keep |

---

## Fontes para pesquisa adicional
- Mobbin (mobbin.com) — screenshots de apps reais por pattern
- Page Flows (pageflows.com) — gravações de fluxos
- UI Patterns (ui-patterns.com)
- Nielsen Norman Group (nngroup.com) — fundamentação de UX
- Refactoring UI — hierarquia visual e espaçamento
- Material Design / Apple HIG — guidelines de plataforma
