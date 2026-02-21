# Pokedex (Next.js 16 + React 19)

Aplicação web de Pokedex com foco em UX rápida para exploração de Pokémon, filtros avançados e dashboard analítico.

## Objetivo

Este projeto entrega:

- Listagem de Pokémon com filtros combinados por nome, tipo, geração, habilidade e estatística mínima.
- Página de detalhe por Pokémon com visual temático por tipo.
- Dashboard com métricas agregadas (médias de stats, top por total e distribuição de tipos).
- Suporte a tema claro/escuro com persistência via `next-themes`.

## Stack técnica

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19 + Tailwind CSS v4
- **Gráficos:** Recharts
- **Tema:** next-themes
- **Ícones:** lucide-react
- **Linguagem:** TypeScript

## Requisitos

- Node.js 20+
- npm 10+ (ou equivalente: pnpm/yarn/bun)

## Como rodar localmente

```bash
# 1) instalar dependências
npm install

# 2) subir ambiente de desenvolvimento
npm run dev

# 3) abrir no navegador
# http://localhost:3000
```

Scripts disponíveis:

- `npm run dev`: inicia ambiente de desenvolvimento
- `npm run build`: gera build de produção
- `npm run start`: inicia aplicação em modo produção
- `npm run lint`: executa lint com ESLint

## Rotas

- `/` → página principal com grid e filtros
- `/pokemon/[name]` → detalhe do Pokémon
- `/dashboard` → dashboard analítico (top 151)

## Arquitetura

### Estrutura principal

```text
app/
	page.tsx                  # Home (SSR) com lista de Pokémon
	dashboard/page.tsx        # Dashboard (SSR)
	pokemon/[name]/page.tsx   # Detalhe do Pokémon (SSR)
	layout.tsx                # Layout global + Header + Providers
	providers.tsx             # ThemeProvider

components/
	Header.tsx                # Navegação + toggle de tema
	PokemonGrid.tsx           # Filtros e grid (Client Component)
	PokemonCard.tsx           # Card de Pokémon
	DashboardCharts.tsx       # Gráficos (Client Component)

lib/
	pokeapi.ts                # Integração com PokeAPI e agregações
	type-theme.ts             # Mapeamento visual por tipo
	types.ts                  # Tipos de domínio
```

### Fluxo de dados

1. Páginas server-side (`app/.../page.tsx`) chamam funções de `lib/pokeapi.ts`.
2. Dados chegam tipados para componentes.
3. Filtros interativos e gráficos rodam em Client Components.
4. Tema visual por tipo é resolvido por `getTypeTheme`.

## Integração com PokeAPI

- Endpoint base: `https://pokeapi.co/api/v2/pokemon`
- Home usa `getPokemonList(386)` para cobrir até Gen 3.
- Dashboard usa `getPokemonDashboardData(151)` com `revalidate: 3600`.
- Página de detalhe busca por nome via `getPokemon(name)`.

## Decisões técnicas relevantes

- **App Router + async Server Components:** reduz custo de dados no cliente e melhora TTFB.
- **Filtros no cliente:** evita roundtrip para cada interação na listagem.
- **Tipagem forte de domínio:** facilita manutenção e evita regressões de contrato.
- **Tema por tipo centralizado:** remove duplicação de classes e mantém consistência visual.

## Limitações atuais

- `getPokemonList` faz múltiplas chamadas para enriquecer cada Pokémon (N+1 requests), o que pode impactar tempo de carregamento em limites altos.
- Não há camada de retry/backoff para falhas transitórias da API externa.
- Ainda não existem testes automatizados (unit/integration/e2e).

## Melhorias recomendadas (roadmap)

- Adicionar cache mais agressivo para listagens (ISR/cache tags).
- Introduzir tratamento de erro com estados de fallback por rota.
- Implementar testes para `lib/pokeapi.ts` e componentes críticos.
- Adicionar observabilidade básica (logs estruturados + métricas de tempo de resposta).

## Troubleshooting

Se o `npm run dev` falhar:

```bash
# limpar cache e artefatos
rd /s /q .next

# reinstalar dependências
rm -rf node_modules package-lock.json
npm install

# subir novamente
npm run dev
```

No PowerShell (sem `rm -rf`):

```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm install
npm run dev
```

## Deploy

Deploy recomendado em plataformas compatíveis com Next.js (ex.: Vercel).

Fluxo mínimo:

1. `npm run build`
2. `npm run start`
3. Configurar variáveis de ambiente (quando houver)

## Contribuição

Para PRs de qualidade:

1. Crie branch por feature/fix.
2. Mantenha escopo pequeno e coeso.
3. Rode `npm run lint` antes de abrir PR.
4. Documente impacto técnico e comportamento funcional.
