# Configurar o ambiente local

## Pré-requisitos

- Node.js 22 ou superior.
- npm compatível com a versão do Node.js instalada.
- Git.

## Clonar o projeto

```powershell
git clone https://github.com/ZaraTakion/beyond-companion.git
cd beyond-companion
```

## Instalar e executar

```powershell
npm install
npm run dev
```

O Vite exibirá o endereço local para abrir no navegador.

## Verificações locais

```powershell
npm run typecheck
npm test
npm run build
```

## Estrutura principal

- `src/`: interface, domínio e testes.
- `data/rulesets/`: pacotes de regras versionados.
- `docs/`: visão do produto, arquitetura, decisões e auditoria.

## Cuidados com a fonte

O PDF Quickstart fornecido pelo usuário não está incluído no repositório. Consulte o documento original para conferir a página citada. Não adicione ao GitHub o PDF, imagens, logotipos ou transcrições extensas protegidas por direitos autorais.
