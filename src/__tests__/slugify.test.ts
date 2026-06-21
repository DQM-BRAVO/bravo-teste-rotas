import { slugify } from '../slugify';

describe('slugify', () => {
  // Exemplos da spec
  it('converte "Olá, Mundo!" em "ola-mundo"', () => {
    expect(slugify('Olá, Mundo!')).toBe('ola-mundo');
  });

  it('converte "  Foo__Bar  " em "foo-bar"', () => {
    expect(slugify('  Foo__Bar  ')).toBe('foo-bar');
  });

  it('converte "Ação & Reação" em "acao-reacao"', () => {
    expect(slugify('Ação & Reação')).toBe('acao-reacao');
  });

  // Casos de borda
  it('retorna string vazia para entrada vazia', () => {
    expect(slugify('')).toBe('');
  });

  it('retorna string vazia para string com apenas símbolos', () => {
    expect(slugify('!@#$%')).toBe('');
  });

  it('converte para minúsculas', () => {
    expect(slugify('HELLO WORLD')).toBe('hello-world');
  });

  it('remove acentos e diacríticos', () => {
    expect(slugify('éàüñç')).toBe('eaunc');
  });

  it('não deixa hífen no início', () => {
    expect(slugify('---foo')).toBe('foo');
  });

  it('não deixa hífen no final', () => {
    expect(slugify('foo---')).toBe('foo');
  });

  it('substitui múltiplos separadores por um único hífen', () => {
    expect(slugify('foo   bar')).toBe('foo-bar');
  });

  it('trata underscores como separadores', () => {
    expect(slugify('foo_bar')).toBe('foo-bar');
  });

  it('preserva números', () => {
    expect(slugify('Fase 2 do Projeto')).toBe('fase-2-do-projeto');
  });

  it('trata string com apenas espaços como vazia', () => {
    expect(slugify('   ')).toBe('');
  });
});
