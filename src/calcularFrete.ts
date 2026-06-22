/**
 * Serviço de cálculo de frete — ISSUE-6
 * Função pura, sem I/O e sem dependências externas.
 */

/**
 * Multiplicadores regionais pelo 1º dígito do CEP.
 * 0–3: Sudeste (×1.0) | 4–7: CO/Norte/Nordeste (×1.5) | 8–9: Sul (×1.2)
 */
const MULTIPLICADOR_REGIONAL: Record<string, number> = {
  '0': 1.0,
  '1': 1.0,
  '2': 1.0,
  '3': 1.0,
  '4': 1.5,
  '5': 1.5,
  '6': 1.5,
  '7': 1.5,
  '8': 1.2,
  '9': 1.2,
};

/**
 * Arredondamento half-up com 2 casas decimais.
 * O Number.EPSILON compensa drift de ponto flutuante (ex.: 1.005 → 1.0049999...).
 */
function arredondarHalfUp(valor: number): number {
  return Math.round((valor + Number.EPSILON) * 100) / 100;
}

/**
 * Calcula o frete de um pedido com base em peso, CEP de destino e valor da compra.
 *
 * @param pesoPedidoKg - Peso do pedido em kg (> 0 e <= 30; frações permitidas)
 * @param cepDestino   - CEP de destino (com ou sem hífen; 8 dígitos após normalização)
 * @param valorCompraBRL - Valor total da compra em reais
 * @returns Valor do frete em reais (2 casas decimais, half-up). Retorna 0 se frete grátis.
 * @throws Error se peso <= 0, peso > 30 ou CEP inválido
 */
export function calcularFrete(
  pesoPedidoKg: number,
  cepDestino: string,
  valorCompraBRL: number
): number {
  // [1] Validação de peso
  if (pesoPedidoKg <= 0) {
    throw new Error('peso deve ser maior que zero');
  }
  if (pesoPedidoKg > 30) {
    throw new Error('peso acima do limite de 30kg');
  }

  // [2] Normalização e validação do CEP
  const cepNorm = cepDestino.replace(/\D/g, '');
  if (cepNorm.length !== 8) {
    throw new Error('CEP inválido');
  }

  // [3] Frete grátis
  if (valorCompraBRL >= 200) {
    return 0;
  }

  // [4] Cálculo do frete base por faixa de peso
  let freteBase: number;

  if (pesoPedidoKg <= 1) {
    freteBase = 10;
  } else if (pesoPedidoKg <= 5) {
    freteBase = 20;
  } else if (pesoPedidoKg <= 10) {
    freteBase = 35;
  } else {
    // Acima de 10 kg: R$ 35,00 + R$ 4,00 × ceil(excedente acima de 10 kg)
    freteBase = 35 + Math.ceil(pesoPedidoKg - 10) * 4;
  }

  // [5] Multiplicador regional pelo 1º dígito do CEP normalizado
  const mult = MULTIPLICADOR_REGIONAL[cepNorm[0]];
  const freteIntermediario = freteBase * mult;

  // [6] Arredondamento half-up em 2 casas decimais
  return arredondarHalfUp(freteIntermediario);
}
