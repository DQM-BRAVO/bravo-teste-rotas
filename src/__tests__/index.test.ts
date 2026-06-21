import { saudacao, soma, slugify } from '../index';

describe('saudacao', () => {
  it('retorna saudação com o nome fornecido', () => {
    expect(saudacao('BRAVO')).toBe('Olá, BRAVO! Pipeline Squad BRAVO operacional.');
  });

  it('retorna saudação com nome vazio', () => {
    expect(saudacao('')).toBe('Olá, ! Pipeline Squad BRAVO operacional.');
  });
});

describe('soma', () => {
  it('soma dois números positivos', () => {
    expect(soma(2, 3)).toBe(5);
  });

  it('soma com zero', () => {
    expect(soma(0, 42)).toBe(42);
  });

  it('soma números negativos', () => {
    expect(soma(-1, -1)).toBe(-2);
  });
});

describe('slugify (re-export de index)', () => {
  it('converte texto com acento em slug via index', () => {
    expect(slugify('Olá, Mundo!')).toBe('ola-mundo');
  });
});
