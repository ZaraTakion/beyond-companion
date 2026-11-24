# Contribuindo

Obrigado por ajudar a melhorar o Beyond Companion. O projeto ainda está em fase inicial; priorize correção, rastreabilidade e simplicidade.

## Regras e conteúdo do jogo

- Use exclusivamente uma fonte autorizada e identificável para cadastrar regras.
- Inclua a versão do ruleset e a página de origem em cada registro de regra.
- Separe o que está explicitamente descrito da interpretação necessária à implementação.
- Registre ambiguidades em `docs/rules-audit/open-questions.md`; não transforme suposições em regras automáticas.
- Mantenha house rules e homebrew em pacotes separados dos dados oficiais.
- Não envie o PDF-fonte, ilustrações, logotipos ou reproduções extensas de conteúdo protegido.

## Código

- Mantenha a lógica de regras em funções TypeScript puras, fora dos componentes React.
- Adicione testes para cálculos, limites e casos extremos.
- Prefira componentes acessíveis, rótulos claros, foco visível e suporte a teclado.
- Não adicione serviços pagos, chaves secretas ou telemetria sem uma decisão documentada.

## Verificações antes de propor mudanças

```bash
npm run typecheck
npm test
npm run build
```

## Pull requests

Descreva o problema, a alteração, os testes realizados e, quando afetar regras, a fonte e as páginas verificadas. Marque explicitamente qualquer ponto ainda não confirmado.
