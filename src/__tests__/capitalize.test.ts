import { capitalize } from '../capitalize';

describe('capitalize', () => {
  // Exemplos da spec
  it('capitaliza a primeira letra de cada palavra em texto minúsculo', () => {
    expect(capitalize('olá mundo')).toBe('Olá Mundo');
  });

  it('normaliza texto em maiúsculas para title case', () => {
    expect(capitalize('JOÃO da SILVA')).toBe('João Da Silva');
  });

  it('faz trim das pontas e capitaliza cada palavra', () => {
    expect(capitalize('  foo   bar ')).toBe('Foo Bar');
  });

  // Casos de borda
  it('retorna string vazia para entrada vazia', () => {
    expect(capitalize('')).toBe('');
  });

  it('retorna string vazia para string com apenas espaços', () => {
    expect(capitalize('   ')).toBe('');
  });

  it('capitaliza palavra única', () => {
    expect(capitalize('hello')).toBe('Hello');
  });

  it('normaliza palavra já em uppercase para capitalizada', () => {
    expect(capitalize('HELLO')).toBe('Hello');
  });

  it('capitaliza palavra já capitalizada corretamente (sem dupla maiúscula)', () => {
    expect(capitalize('Hello')).toBe('Hello');
  });

  it('trata múltiplos espaços internos separando as palavras', () => {
    expect(capitalize('foo   bar   baz')).toBe('Foo Bar Baz');
  });

  it('capitaliza palavras com acentos', () => {
    expect(capitalize('ação reação')).toBe('Ação Reação');
  });

  it('preserva apenas a primeira letra em maiúscula e o resto em minúsculas', () => {
    expect(capitalize('jOãO')).toBe('João');
  });
});
