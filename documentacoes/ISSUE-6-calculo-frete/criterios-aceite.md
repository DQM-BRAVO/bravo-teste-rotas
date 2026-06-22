# Critérios de Aceite — Serviço de Cálculo de Frete (ISSUE-6)

Função: `calcularFrete(pesoPedidoKg: number, cepDestino: string, valorCompraBRL: number): number`

---

## CA-01: Validação de peso — peso zero

**Given** que o sistema recebe uma chamada a `calcularFrete`
**When** `pesoPedidoKg` é igual a `0`
**Then** a função lança `Error` com mensagem `"peso deve ser maior que zero"`

---

## CA-02: Validação de peso — peso negativo

**Given** que o sistema recebe uma chamada a `calcularFrete`
**When** `pesoPedidoKg` é um valor negativo (ex.: `-1`)
**Then** a função lança `Error` com mensagem `"peso deve ser maior que zero"`

---

## CA-03: Validação de peso — peso acima do limite

**Given** que o sistema recebe uma chamada a `calcularFrete`
**When** `pesoPedidoKg` é maior que `30` (ex.: `30.001`)
**Then** a função lança `Error` com mensagem `"peso acima do limite de 30kg"`

---

## CA-04: Validação de CEP — comprimento insuficiente

**Given** que o sistema recebe uma chamada a `calcularFrete` com peso válido
**When** `cepDestino` após remover caracteres não-dígitos resulta em menos de 8 dígitos (ex.: `"1234567"`)
**Then** a função lança `Error` com mensagem `"CEP inválido"`

---

## CA-05: Validação de CEP — comprimento excedente

**Given** que o sistema recebe uma chamada a `calcularFrete` com peso válido
**When** `cepDestino` após remover caracteres não-dígitos resulta em mais de 8 dígitos (ex.: `"123456789"`)
**Then** a função lança `Error` com mensagem `"CEP inválido"`

---

## CA-06: Validação de CEP — apenas letras / não-dígitos

**Given** que o sistema recebe uma chamada a `calcularFrete` com peso válido
**When** `cepDestino` não contém dígitos suficientes após normalização (ex.: `"abcdefgh"`)
**Then** a função lança `Error` com mensagem `"CEP inválido"`

---

## CA-07: CEP aceito com hífen

**Given** que o sistema recebe uma chamada com peso e valor de compra válidos
**When** `cepDestino` é `"01310-100"` (CEP com hífen, Sudeste)
**Then** a função normaliza o CEP (remove o hífen), aceita como válido e retorna o frete calculado normalmente

---

## CA-08: Frete grátis — valor de compra exatamente R$ 200,00

**Given** que o sistema recebe uma chamada a `calcularFrete` com peso e CEP válidos
**When** `valorCompraBRL` é `200`
**Then** a função retorna `0` (frete grátis, independente de peso ou região)

---

## CA-09: Frete grátis — valor de compra acima de R$ 200,00

**Given** que o sistema recebe uma chamada a `calcularFrete` com peso e CEP válidos
**When** `valorCompraBRL` é `250.99`
**Then** a função retorna `0` (frete grátis)

---

## CA-10: Sem frete grátis — valor de compra abaixo de R$ 200,00

**Given** que o sistema recebe uma chamada a `calcularFrete` com peso e CEP válidos
**When** `valorCompraBRL` é `199.99`
**Then** a função aplica o cálculo normal de frete (não retorna 0)

---

## CA-11: Sem frete grátis — valor de compra zero

**Given** que o sistema recebe uma chamada a `calcularFrete` com peso e CEP válidos
**When** `valorCompraBRL` é `0`
**Then** a função aplica o cálculo normal de frete (frete grátis não se aplica)

---

## CA-12: Faixa de peso — até 1 kg, região Sudeste

**Given** que o sistema recebe uma chamada com CEP de região Sudeste (1º dígito 0–3, ex.: `"01310100"`) e `valorCompraBRL < 200`
**When** `pesoPedidoKg` é `0.5`
**Then** a função retorna `10.00` (frete base R$ 10,00 × multiplicador 1.0)

---

## CA-13: Faixa de peso — exatamente 1 kg, região Sudeste

**Given** que o sistema recebe uma chamada com CEP Sudeste e `valorCompraBRL < 200`
**When** `pesoPedidoKg` é `1`
**Then** a função retorna `10.00` (peso na faixa <=1 kg)

---

## CA-14: Faixa de peso — acima de 1 kg até 5 kg, região Sudeste

**Given** que o sistema recebe uma chamada com CEP Sudeste e `valorCompraBRL < 200`
**When** `pesoPedidoKg` é `3`
**Then** a função retorna `20.00` (frete base R$ 20,00 × 1.0)

---

## CA-15: Faixa de peso — exatamente 5 kg, região Sudeste

**Given** que o sistema recebe uma chamada com CEP Sudeste e `valorCompraBRL < 200`
**When** `pesoPedidoKg` é `5`
**Then** a função retorna `20.00` (peso na faixa >1 e <=5 kg)

---

## CA-16: Faixa de peso — acima de 5 kg até 10 kg, região Sudeste

**Given** que o sistema recebe uma chamada com CEP Sudeste e `valorCompraBRL < 200`
**When** `pesoPedidoKg` é `7`
**Then** a função retorna `35.00` (frete base R$ 35,00 × 1.0)

---

## CA-17: Faixa de peso — exatamente 10 kg, região Sudeste

**Given** que o sistema recebe uma chamada com CEP Sudeste e `valorCompraBRL < 200`
**When** `pesoPedidoKg` é `10`
**Then** a função retorna `35.00` (peso na faixa >5 e <=10 kg, sem componente proporcional)

---

## CA-18: Faixa de peso — acima de 10 kg (sem fração adicional), região Sudeste

**Given** que o sistema recebe uma chamada com CEP Sudeste e `valorCompraBRL < 200`
**When** `pesoPedidoKg` é `12` (2 kg adicionais exatos acima de 10)
**Then** a função retorna `43.00` (35 + ceil(2) × 4 = 35 + 8 = 43)

---

## CA-19: Faixa de peso — acima de 10 kg (com fração), região Sudeste

**Given** que o sistema recebe uma chamada com CEP Sudeste e `valorCompraBRL < 200`
**When** `pesoPedidoKg` é `12.3` (2,3 kg adicionais acima de 10)
**Then** a função retorna `47.00` (35 + ceil(2.3) × 4 = 35 + 3 × 4 = 47)

---

## CA-20: Faixa de peso — exatamente 30 kg (limite máximo), região Sudeste

**Given** que o sistema recebe uma chamada com CEP Sudeste e `valorCompraBRL < 200`
**When** `pesoPedidoKg` é `30`
**Then** a função retorna `115.00` (35 + ceil(20) × 4 = 35 + 80 = 115)

---

## CA-21: Multiplicador regional — Sul (primeiro dígito 8)

**Given** que o sistema recebe uma chamada com `valorCompraBRL < 200` e peso na faixa <=1 kg
**When** `cepDestino` começa com dígito `8` (ex.: `"80000000"`, região Sul)
**Then** a função aplica multiplicador 1.2 e retorna `12.00` (10 × 1.2)

---

## CA-22: Multiplicador regional — Sul (primeiro dígito 9)

**Given** que o sistema recebe uma chamada com `valorCompraBRL < 200` e peso na faixa <=1 kg
**When** `cepDestino` começa com dígito `9` (ex.: `"90000000"`, região Sul)
**Then** a função aplica multiplicador 1.2 e retorna `12.00` (10 × 1.2)

---

## CA-23: Multiplicador regional — CO/N/NE (primeiro dígito 4)

**Given** que o sistema recebe uma chamada com `valorCompraBRL < 200` e peso na faixa <=1 kg
**When** `cepDestino` começa com dígito `4` (ex.: `"40000000"`, região CO/N/NE)
**Then** a função aplica multiplicador 1.5 e retorna `15.00` (10 × 1.5)

---

## CA-24: Multiplicador regional — CO/N/NE (primeiro dígito 7)

**Given** que o sistema recebe uma chamada com `valorCompraBRL < 200` e peso na faixa <=1 kg
**When** `cepDestino` começa com dígito `7` (ex.: `"70000000"`, região CO/N/NE)
**Then** a função aplica multiplicador 1.5 e retorna `15.00` (10 × 1.5)

---

## CA-25: Multiplicador regional — Sudeste (primeiro dígito 0)

**Given** que o sistema recebe uma chamada com `valorCompraBRL < 200` e peso na faixa <=1 kg
**When** `cepDestino` começa com dígito `0` (ex.: `"01310100"`, região Sudeste)
**Then** a função aplica multiplicador 1.0 e retorna `10.00`

---

## CA-26: Multiplicador regional — Sudeste (primeiro dígito 3)

**Given** que o sistema recebe uma chamada com `valorCompraBRL < 200` e peso na faixa <=1 kg
**When** `cepDestino` começa com dígito `3` (ex.: `"30000000"`, região Sudeste)
**Then** a função aplica multiplicador 1.0 e retorna `10.00`

---

## CA-27: Combinação peso >10 kg + região Sul (com arredondamento)

**Given** que o sistema recebe uma chamada com `valorCompraBRL < 200` e CEP Sul
**When** `pesoPedidoKg` é `12.3` e `cepDestino` começa com `8`
**Then** a função calcula frete base `47.00`, aplica multiplicador 1.2 e retorna `56.40` (47 × 1.2)

---

## CA-28: Arredondamento half-up — resultado com fração exata 0.005

**Given** que o sistema recebe uma chamada que produz um frete intermediário com casa decimal exatamente em 0.005
**When** o frete base × multiplicador resulta em valor com a terceira decimal igual a 5 (ex.: frete base 10, multiplicador 1.5, peso 1 kg CEP CO = 15.00; exemplo explícito: frete que resulte em X.005)
**Then** a função arredonda para cima na segunda casa decimal (half-up), nunca trunca

---

## CA-29: Frete grátis — validações de peso e CEP têm precedência

**Given** que o sistema recebe uma chamada com `valorCompraBRL = 300` (elegível para frete grátis)
**When** `pesoPedidoKg` é `0` (inválido)
**Then** a função lança `Error("peso deve ser maior que zero")` antes de verificar o frete grátis

---

## CA-30: Frete grátis — CEP inválido tem precedência

**Given** que o sistema recebe uma chamada com `valorCompraBRL = 300` e `pesoPedidoKg = 1`
**When** `cepDestino` é `"1234567"` (7 dígitos — inválido)
**Then** a função lança `Error("CEP inválido")` antes de retornar frete grátis
