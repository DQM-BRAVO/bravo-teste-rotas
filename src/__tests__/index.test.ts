import { saudacao, soma, capitalize, calcularFrete } from '../index';

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

describe('re-exports do index', () => {
  it('capitalize está acessível via index', () => {
    expect(capitalize('hello world')).toBe('Hello World');
  });

  it('calcularFrete está acessível via index', () => {
    expect(calcularFrete(0.5, '01310100', 50)).toBe(10.0);
  });
});
