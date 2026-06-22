/**
 * Capitaliza a primeira letra de cada palavra e mantém o restante em minúsculas.
 *
 * - Faz trim nas pontas
 * - Divide por sequências de espaços (tratando múltiplos espaços como um separador)
 * - Cada palavra: primeira letra em maiúscula, demais em minúsculas
 *
 * @param texto - Texto de entrada
 * @returns Texto com cada palavra capitalizada
 */
export function capitalize(texto: string): string {
  const trimmed = texto.trim();
  if (trimmed === '') {
    return '';
  }
  return trimmed
    .split(/\s+/)
    .map((palavra) => palavra[0].toLocaleUpperCase('pt-BR') + palavra.slice(1).toLocaleLowerCase('pt-BR'))
    .join(' ');
}
