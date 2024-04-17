declare interface CustomerData {
  'Nome do Cliente': string;
  'CPF/CNPJ': string;
}

declare interface Serasa {
  'Data Primeira Ocorrência': string;
  'Data Última Ocorrência': string;
  'Quantidade Ocorrências': string;
}

declare interface Pendency {
  Data: string;
  'Tipo Financ.': string;
  Aval: string;
  'Valor (R$)': string;
  Contrato: string;
  Origem: string;
  'Razão Social': string;
  Cidade: string;
}

declare interface SCPC {
  'Dt Ocorr': string;
  'Tp Devedor': string;
  Nome: string;
  'Vr Dívida': string;
  Cidade: string;
  UF: string;
  Contrato: string;
  'Dt Disp': string;
}

declare interface Protests {
  Data: string;
  'Valor Protesto': string;
  Cartório: string;
  Cidade: string;
  UF: string;
}

declare interface QueryResponse {
  retorno: string;
  msg: {
    dadosPessoais: CustomerData,
    serasa: Serasa[],
    pendencias: Pendency[],
    scpc: SCPC[],
    siccf: any[],
    cheques: any[],
    protestos: Protestsy[],
    cadin: any[],
    convenioDevedores: any[]
  };
}
