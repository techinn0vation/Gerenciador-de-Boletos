declare interface CustomerData {
  Nome: string
  CPF: string
  'Data de Nascimento': string
}

declare interface Pendency {
  Data: string
  'Tipo Financ.': string
  Aval: string
  'Valor (R$)': string
  Contrato: string
  Origem: string
  'Razão Social': string
  Cidade: string
}

declare interface Protests {
  'Data do protesto': string
  'Valor(R$)': string
  Cartório: string
  Cidade: string
  UF: string
}

declare interface QueryResponse {
  retorno: string
  msg: {
    IDENTIFICAÇÃO: CustomerData
    protestos: Protests[]
    debitos: Debits[]
  }
}
