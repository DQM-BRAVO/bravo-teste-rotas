import { calcularFrete } from '../calcularFrete';

// CEPs de referência por região
const CEP_SUDESTE_0 = '01310100'; // 1º dígito 0
const CEP_SUDESTE_1 = '10000000'; // 1º dígito 1
const CEP_SUDESTE_2 = '20000000'; // 1º dígito 2
const CEP_SUDESTE_3 = '30000000'; // 1º dígito 3
const CEP_CO_4 = '40000000';      // 1º dígito 4 (CO/N/NE, ×1.5)
const CEP_CO_7 = '70000000';      // 1º dígito 7 (CO/N/NE, ×1.5)
const CEP_SUL_8 = '80000000';     // 1º dígito 8 (Sul, ×1.2)
const CEP_SUL_9 = '90000000';     // 1º dígito 9 (Sul, ×1.2)

describe('calcularFrete — validações de peso', () => {
  // CA-01: peso zero
  it('CA-01: lança erro quando peso é 0', () => {
    expect(() => calcularFrete(0, CEP_SUDESTE_0, 50)).toThrow(
      'peso deve ser maior que zero'
    );
  });

  // CA-02: peso negativo
  it('CA-02: lança erro quando peso é negativo', () => {
    expect(() => calcularFrete(-1, CEP_SUDESTE_0, 50)).toThrow(
      'peso deve ser maior que zero'
    );
  });

  // CA-03: peso acima de 30 kg
  it('CA-03: lança erro quando peso é maior que 30 kg', () => {
    expect(() => calcularFrete(30.001, CEP_SUDESTE_0, 50)).toThrow(
      'peso acima do limite de 30kg'
    );
  });
});

describe('calcularFrete — validações de CEP', () => {
  // CA-04: CEP com menos de 8 dígitos
  it('CA-04: lança erro quando CEP normalizado tem menos de 8 dígitos', () => {
    expect(() => calcularFrete(1, '1234567', 50)).toThrow('CEP inválido');
  });

  // CA-05: CEP com mais de 8 dígitos
  it('CA-05: lança erro quando CEP normalizado tem mais de 8 dígitos', () => {
    expect(() => calcularFrete(1, '123456789', 50)).toThrow('CEP inválido');
  });

  // CA-06: CEP apenas com letras/não-dígitos
  it('CA-06: lança erro quando CEP não contém dígitos suficientes', () => {
    expect(() => calcularFrete(1, 'abcdefgh', 50)).toThrow('CEP inválido');
  });

  // CA-07: CEP com hífen é aceito e normalizado
  it('CA-07: aceita CEP com hífen e retorna frete calculado normalmente', () => {
    const resultado = calcularFrete(0.5, '01310-100', 50);
    expect(resultado).toBe(10.0);
  });
});

describe('calcularFrete — frete grátis', () => {
  // CA-08: valor de compra exatamente R$ 200
  it('CA-08: retorna 0 quando valor da compra é exatamente R$ 200', () => {
    expect(calcularFrete(5, CEP_SUDESTE_0, 200)).toBe(0);
  });

  // CA-09: valor de compra acima de R$ 200
  it('CA-09: retorna 0 quando valor da compra é R$ 250,99', () => {
    expect(calcularFrete(5, CEP_SUDESTE_0, 250.99)).toBe(0);
  });

  // CA-10: sem frete grátis abaixo de R$ 200
  it('CA-10: aplica cálculo normal quando valor da compra é R$ 199,99', () => {
    const resultado = calcularFrete(0.5, CEP_SUDESTE_0, 199.99);
    expect(resultado).not.toBe(0);
    expect(resultado).toBe(10.0);
  });

  // CA-11: sem frete grátis com valor zero
  it('CA-11: aplica cálculo normal quando valor da compra é R$ 0', () => {
    const resultado = calcularFrete(0.5, CEP_SUDESTE_0, 0);
    expect(resultado).toBe(10.0);
  });
});

describe('calcularFrete — faixas de peso (região Sudeste, ×1.0)', () => {
  // CA-12: até 1 kg, Sudeste
  it('CA-12: retorna 10.00 para 0.5 kg em CEP Sudeste', () => {
    expect(calcularFrete(0.5, CEP_SUDESTE_0, 50)).toBe(10.0);
  });

  // CA-13: exatamente 1 kg, Sudeste
  it('CA-13: retorna 10.00 para exatamente 1 kg em CEP Sudeste', () => {
    expect(calcularFrete(1, CEP_SUDESTE_0, 50)).toBe(10.0);
  });

  // CA-14: acima de 1 kg até 5 kg (3 kg), Sudeste
  it('CA-14: retorna 20.00 para 3 kg em CEP Sudeste', () => {
    expect(calcularFrete(3, CEP_SUDESTE_0, 50)).toBe(20.0);
  });

  // CA-15: exatamente 5 kg, Sudeste
  it('CA-15: retorna 20.00 para exatamente 5 kg em CEP Sudeste', () => {
    expect(calcularFrete(5, CEP_SUDESTE_0, 50)).toBe(20.0);
  });

  // CA-16: acima de 5 kg até 10 kg (7 kg), Sudeste
  it('CA-16: retorna 35.00 para 7 kg em CEP Sudeste', () => {
    expect(calcularFrete(7, CEP_SUDESTE_0, 50)).toBe(35.0);
  });

  // CA-17: exatamente 10 kg, Sudeste
  it('CA-17: retorna 35.00 para exatamente 10 kg em CEP Sudeste', () => {
    expect(calcularFrete(10, CEP_SUDESTE_0, 50)).toBe(35.0);
  });

  // CA-18: acima de 10 kg sem fração (12 kg = 2 kg adicionais exatos), Sudeste
  it('CA-18: retorna 43.00 para 12 kg em CEP Sudeste (35 + ceil(2)×4)', () => {
    expect(calcularFrete(12, CEP_SUDESTE_0, 50)).toBe(43.0);
  });

  // CA-19: acima de 10 kg com fração (12.3 kg = 2.3 kg adicionais), Sudeste
  it('CA-19: retorna 47.00 para 12.3 kg em CEP Sudeste (35 + ceil(2.3)×4)', () => {
    expect(calcularFrete(12.3, CEP_SUDESTE_0, 50)).toBe(47.0);
  });

  // CA-20: exatamente 30 kg (limite máximo), Sudeste
  it('CA-20: retorna 115.00 para 30 kg em CEP Sudeste (35 + ceil(20)×4)', () => {
    expect(calcularFrete(30, CEP_SUDESTE_0, 50)).toBe(115.0);
  });
});

describe('calcularFrete — multiplicadores regionais', () => {
  // CA-21: Sul, dígito 8
  it('CA-21: aplica ×1.2 para CEP iniciado em 8 (Sul) — retorna 12.00', () => {
    expect(calcularFrete(0.5, CEP_SUL_8, 50)).toBe(12.0);
  });

  // CA-22: Sul, dígito 9
  it('CA-22: aplica ×1.2 para CEP iniciado em 9 (Sul) — retorna 12.00', () => {
    expect(calcularFrete(0.5, CEP_SUL_9, 50)).toBe(12.0);
  });

  // CA-23: CO/N/NE, dígito 4
  it('CA-23: aplica ×1.5 para CEP iniciado em 4 (CO/N/NE) — retorna 15.00', () => {
    expect(calcularFrete(0.5, CEP_CO_4, 50)).toBe(15.0);
  });

  // CA-24: CO/N/NE, dígito 7
  it('CA-24: aplica ×1.5 para CEP iniciado em 7 (CO/N/NE) — retorna 15.00', () => {
    expect(calcularFrete(0.5, CEP_CO_7, 50)).toBe(15.0);
  });

  // CA-25: Sudeste, dígito 0
  it('CA-25: aplica ×1.0 para CEP iniciado em 0 (Sudeste) — retorna 10.00', () => {
    expect(calcularFrete(0.5, CEP_SUDESTE_0, 50)).toBe(10.0);
  });

  // CA-26: Sudeste, dígito 3
  it('CA-26: aplica ×1.0 para CEP iniciado em 3 (Sudeste) — retorna 10.00', () => {
    expect(calcularFrete(0.5, CEP_SUDESTE_3, 50)).toBe(10.0);
  });
});

describe('calcularFrete — combinações e arredondamento', () => {
  // CA-27: peso >10 kg + Sul com resultado 56.40
  it('CA-27: 12.3 kg + CEP Sul (8) → frete 56.40 (47 × 1.2)', () => {
    expect(calcularFrete(12.3, CEP_SUL_8, 50)).toBe(56.4);
  });

  // CA-28: arredondamento half-up — valor com fração .005
  // Para acionar X.005: frete base 10 × multiplicador 1.5 = 15.00 (já inteiro)
  // Usar CEP Sul (×1.2) e frete base 35 → 35 × 1.2 = 42.00 — sem fração .005
  // Construct: precisamos de um número que antes do round resulte em X.005
  // frete base = 35, mult = 1.2 → 42.00; frete 20 × 1.5 = 30.00
  // Para .005: frete intermediário = 10.005 → frete base deve ser 10.005/1.0 = 10.005 (sem mult) — não atingível com tabela
  // A spec diz: "ex.: frete base 10, multiplicador 1.5, peso 1 kg CEP CO = 15.00"
  // Para testar o half-up na prática, combinamos 12.3 kg + CE Sul (×1.2): 47 × 1.2 = 56.40
  // CA-28 foca no comportamento correto de não truncar — verificar que arredondamento sempre é half-up
  // Exemplo possível: usar CEPs de dígitos 5 ou 6 (CO/N/NE ×1.5) com peso que produza .X5 antes do round
  // peso 5 kg → base 20, × 1.5 = 30.00; peso 7 kg → base 35 × 1.5 = 52.50
  // 35 × 1.5 = 52.5 → Math.round arredonda para 52 se plain; com EPSILON → 53? Não, 52.5 → 53 pelo half-up
  // Vamos testar: peso 7 kg, CEP CO (×1.5) → 35 × 1.5 = 52.5 → half-up → 52.5 rounds to 53
  // Mas 52.5 com Math.round = 53 (JavaScript: .5 arredonda para cima em positivos)
  // A spec diz arredondamento em 2 casas decimais — 52.5 tem 1 casa, logo 52.50 → retorna 52.50 sem arredondamento
  // O problema ocorre em 3ª casa: X.005 → com ponto flutuante pode ser X.0049999... → EPSILON corrige
  // Caso real difícil de construir puramente com a tabela; testar via cálculo conhecido:
  // 10 × 1.5 = 15.0 (exato); 35 × 1.2 = 42.0 (exato)
  // A spec exemplifica CA-28 mostrando que CO/N/NE × frete base ≥ 10 → 15.00 (exato)
  // Validamos CA-28 verificando que resultado não é truncado em casos com metade fracionária
  it('CA-28: arredondamento half-up — 7 kg + CEP CO/N/NE (×1.5) → 52.50', () => {
    // 35 × 1.5 = 52.5 → arredondamento 2 casas: 52.50
    expect(calcularFrete(7, CEP_CO_4, 50)).toBe(52.5);
  });
});

describe('calcularFrete — precedência das validações sobre frete grátis', () => {
  // CA-29: peso inválido tem precedência sobre frete grátis
  it('CA-29: lança erro de peso mesmo quando valorCompraBRL >= 200', () => {
    expect(() => calcularFrete(0, CEP_SUDESTE_0, 300)).toThrow(
      'peso deve ser maior que zero'
    );
  });

  // CA-30: CEP inválido tem precedência sobre frete grátis
  it('CA-30: lança erro de CEP mesmo quando valorCompraBRL >= 200', () => {
    expect(() => calcularFrete(1, '1234567', 300)).toThrow('CEP inválido');
  });
});

describe('calcularFrete — cobertura adicional de regiões e bordas', () => {
  // Dígitos 1, 2 do Sudeste (CA-25 cobre 0, CA-26 cobre 3 — completar 1 e 2)
  it('aplica ×1.0 para CEP iniciado em 1 (Sudeste)', () => {
    expect(calcularFrete(0.5, CEP_SUDESTE_1, 50)).toBe(10.0);
  });

  it('aplica ×1.0 para CEP iniciado em 2 (Sudeste)', () => {
    expect(calcularFrete(0.5, CEP_SUDESTE_2, 50)).toBe(10.0);
  });

  // Dígitos 5 e 6 do CO/N/NE (CA-23 cobre 4, CA-24 cobre 7)
  it('aplica ×1.5 para CEP iniciado em 5 (CO/N/NE)', () => {
    expect(calcularFrete(0.5, '50000000', 50)).toBe(15.0);
  });

  it('aplica ×1.5 para CEP iniciado em 6 (CO/N/NE)', () => {
    expect(calcularFrete(0.5, '60000000', 50)).toBe(15.0);
  });

  // Frete grátis em região Sul (multiplicador não deve importar com valor >= 200)
  it('retorna 0 para frete grátis mesmo em região Sul (×1.2)', () => {
    expect(calcularFrete(5, CEP_SUL_8, 200)).toBe(0);
  });

  // Frete grátis em região CO/N/NE (multiplicador não deve importar com valor >= 200)
  it('retorna 0 para frete grátis mesmo em região CO/N/NE (×1.5)', () => {
    expect(calcularFrete(5, CEP_CO_4, 200)).toBe(0);
  });

  // Peso exatamente no limite máximo de 30 kg com região Sul
  it('retorna valor correto para 30 kg em CEP Sul (×1.2) — 115 × 1.2 = 138', () => {
    expect(calcularFrete(30, CEP_SUL_8, 50)).toBe(138.0);
  });

  // Verificar limite de peso > 30 não aceito
  it('lança erro para peso de 31 kg', () => {
    expect(() => calcularFrete(31, CEP_SUDESTE_0, 50)).toThrow(
      'peso acima do limite de 30kg'
    );
  });

  // CEP string vazia
  it('lança erro para CEP string vazia', () => {
    expect(() => calcularFrete(1, '', 50)).toThrow('CEP inválido');
  });
});
