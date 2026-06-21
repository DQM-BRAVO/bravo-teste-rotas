/**
 * Módulo principal do repositório de teste de rotas Squad BRAVO.
 * Fornece utilitários simples usados nos testes de fumaça do pipeline.
 */

export function saudacao(nome: string): string {
  return `Olá, ${nome}! Pipeline Squad BRAVO operacional.`;
}

export function soma(a: number, b: number): number {
  return a + b;
}
