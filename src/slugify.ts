/**
 * Converte um texto em slug URL-safe.
 *
 * - Minúsculas
 * - Remove acentos/diacríticos (normalize NFD + remove marcas de combinação)
 * - Substitui espaços e caracteres não-alfanuméricos por hífen único
 * - Remove hífens nas pontas
 *
 * @param texto - Texto de entrada
 * @returns Slug URL-safe
 */
export function slugify(texto: string): string {
  return texto
    .normalize('NFD')                   // decompõe caracteres acentuados
    .replace(/[̀-ͯ]/g, '')    // remove marcas de diacríticos
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')       // substitui tudo que não for alnum por hífen
    .replace(/^-+|-+$/g, '');          // remove hífens nas pontas
}
