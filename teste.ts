interface Ocorrencia {
  sistema?: string
  ocorrencia?: string
  data_pesquisa?: string
  validade?: string
  descricao?: string
}

interface DetalheDescricao {
  tipo: string
  campos: Record<string, string>
}

interface GrupoOcorrencia {
  sistema: string
  ocorrencia: string
  data_pesquisa: string
  validade: string
  descricoes: DetalheDescricao[]
}

interface ProcessedData {
  IDENTIFICAÇÃO: {
    Nome: string
    CPF: string
  }
  SISTEMAS: GrupoOcorrencia[]
}

function parseDescricao(descricao: string): DetalheDescricao {
  const partes = descricao.split(' - ').filter(p => p.trim() !== '')

  // Primeira parte é sempre o tipo
  const tipo = partes[0].split(':')[0].trim()

  const campos: Record<string, string> = {}

  for (const parte of partes.slice(1)) {
    const [chaveBruta, ...valorParts] = parte.split(':')
    const chave = formatarChave(chaveBruta.trim())
    const valor = valorParts.join(':').trim()

    if (chave && valor) {
      campos[chave] = valor
    }
  }

  return { tipo, campos }
}

function formatarChave(chaveBruta: string): string {
  return chaveBruta
    .toLowerCase()
    .replace(/[^a-z0-9áéíóúâêîôûãõç\s]/gi, '') // Remove caracteres especiais
    .trim()
    .replace(/\s+/g, ' ') // Normaliza espaços
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (match, index) =>
      index === 0 ? match.toLowerCase() : match.toUpperCase()
    ) // camelCase
    .replace(/\s+/g, '')
}

function processarDados(json: {
  informacoes: any
  ocorrencias: Ocorrencia[]
}): ProcessedData {
  const result: ProcessedData = {
    IDENTIFICAÇÃO: {
      Nome: json.informacoes.nome,
      CPF: json.ocorrencias[0].ocorrencia || ''
    },
    SISTEMAS: []
  }

  let currentSystem: GrupoOcorrencia | null = null

  json.ocorrencias.slice(1).forEach(item => {
    if (item.sistema && item.ocorrencia) {
      currentSystem = {
        sistema: item.sistema,
        ocorrencia: item.ocorrencia,
        data_pesquisa: item.data_pesquisa || '',
        validade: item.validade || '',
        descricoes: []
      }
      result.SISTEMAS.push(currentSystem)
    } else if (item.descricao && currentSystem) {
      currentSystem.descricoes.push(parseDescricao(item.descricao))
    }
  })

  return result
}

// Uso:
const dadosProcessados = processarDados({
  informacoes: {
    nome: 'EMERSON TEIXEIRA KUNZ'
  },
  ocorrencias: [
    {
      sistema: 'CPF/CNPJ:',
      ocorrencia: '04782718918',
      data_pesquisa: 'Nome/Razão Social:',
      validade: 'EMERSON TEIXEIRA KUNZ'
    },
    {
      sistema: 'Sistema',
      ocorrencia: 'Ocorrência',
      data_pesquisa: 'Data da Pesquisa',
      validade: 'Validade'
    },
    {
      sistema: 'CADIN',
      ocorrencia: 'Nada Consta',
      data_pesquisa: '04/02/2024',
      validade: '05/03/2024'
    },
    {
      sistema: 'SERASA',
      ocorrencia: 'Consta Ocorrência',
      data_pesquisa: '04/02/2024',
      validade: '05/03/2024'
    },
    {
      descricao:
        'Acao - Data da Pendência :15/12/2022 - Tipo de Financiamento: R-CART CREDI - Cliente é Avalista da Operação (S/N): N - Valor do Financiamento: R$ 248,22 - Número do Contrato: 2000000163871 - Nome da instituição financeira: 058160789000128 - Sigla da Cidade onde está localizada a instituição financeira:'
    },
    {
      descricao:
        'Acao - Data da Pendência :15/02/2022 - Tipo de Financiamento: R-EMPRES CTA - Cliente é Avalista da Operação (S/N): N - Valor do Financiamento: R$ 1.497,46 - Número do Contrato: 219555770026001 - Nome da instituição financeira: 000000208000100 - Sigla da Cidade onde está localizada a instituição financeira:'
    },
    {
      descricao:
        'Acao - Data da Pendência :07/01/2022 - Tipo de Financiamento: R-EMPRES CTA - Cliente é Avalista da Operação (S/N): N - Valor do Financiamento: R$ 5.856,75 - Número do Contrato: 08649628 - Nome da instituição financeira: 000000208000100 - Sigla da Cidade onde está localizada a instituição financeira:'
    },
    {
      descricao:
        'Acao - Data da Pendência :12/05/2023 - Tipo de Financiamento: R-CART CREDI - Cliente é Avalista da Operação (S/N): N - Valor do Financiamento: R$ 470,93 - Número do Contrato: D59C513F4632A2 - Nome da instituição financeira: 030680829000143 - Sigla da Cidade onde está localizada a instituição financeira:'
    },
    {
      descricao:
        'Acao - Data da Pendência :10/03/2023 - Tipo de Financiamento: R-CART CREDI - Cliente é Avalista da Operação (S/N): N - Valor do Financiamento: R$ 344,25 - Número do Contrato: 01000028619101 - Nome da instituição financeira: 006040559000121 - Sigla da Cidade onde está localizada a instituição financeira:'
    },
    {
      descricao:
        'Acao - Data da Pendência :13/01/2023 - Tipo de Financiamento: R-CART CREDI - Cliente é Avalista da Operação (S/N): N - Valor do Financiamento: R$ 554,21 - Número do Contrato: 7827189180003 - Nome da instituição financeira: 027351731000138 - Sigla da Cidade onde está localizada a instituição financeira: POA'
    },
    {
      descricao:
        'Acao - Data da Pendência :19/06/2022 - Tipo de Financiamento: R-CART CREDI - Cliente é Avalista da Operação (S/N): N - Valor do Financiamento: R$ 1.320,14 - Número do Contrato: 00731079 - Nome da instituição financeira: 026405883000103 - Sigla da Cidade onde está localizada a instituição financeira:'
    },
    {
      descricao:
        'Acao - Data da Pendência :10/06/2022 - Tipo de Financiamento: R-CART CREDI - Cliente é Avalista da Operação (S/N): N - Valor do Financiamento: R$ 1.162,22 - Número do Contrato: 00002613275313 - Nome da instituição financeira: 029292312000106 - Sigla da Cidade onde está localizada a instituição financeira:'
    },
    {
      descricao:
        'Acao - Data da Pendência :03/06/2022 - Tipo de Financiamento: R-EMPR AGRIC - Cliente é Avalista da Operação (S/N): N - Valor do Financiamento: R$ 1.134,82 - Número do Contrato: 686359/5280292 - Nome da instituição financeira: 082639451000138 - Sigla da Cidade onde está localizada a instituição financeira:'
    },
    {
      descricao:
        'Acao - Data da Pendência :05/01/2022 - Tipo de Financiamento: R-CART CREDI - Cliente é Avalista da Operação (S/N): N - Valor do Financiamento: R$ 888,68 - Número do Contrato: 29583838170000 - Nome da instituição financeira: 026405883000103 - Sigla da Cidade onde está localizada a instituição financeira:'
    },
    {
      descricao:
        'Pendencia Financeira (PEFIN) - Data do Protesto : 12/04/2022 - Valor do protesto: R$ 6.152,65 - Código de identificação do cartório onde está registrado o contrato: 1 - Nome da cidade onde está localizado o cartório : ITAJAI - UF onde está localizado o cartório : SC'
    },
    {
      descricao:
        'Protesto - Data da Ação Judicial: 20/11/2023 - Natureza da Ação Judicial: EXECUTIVA - Cliente é Avalista da Operação (S/N)? N - Valor da ação judicial : R$ 9.257,93 - Código de identificação do distribuidor : 0 - Código de identificação da vara civil: 2 - Nome da cidade onde foi decretada a ação judicial: ITAJAI - UF onde foi decretada a ação judicial: SC'
    },
    {
      sistema: 'SICCF',
      ocorrencia: 'Nada Consta',
      data_pesquisa: '04/02/2024',
      validade: '05/03/2024'
    },
    {
      sistema: 'SICOW',
      ocorrencia: 'Nada Consta',
      data_pesquisa: '04/02/2024',
      validade: '05/03/2024'
    },
    {
      sistema: 'SINAD',
      ocorrencia: 'Nada Consta',
      data_pesquisa: '04/02/2024',
      validade: '05/03/2024'
    },
    {
      sistema: 'SPC',
      ocorrencia: 'Consta Ocorrência',
      data_pesquisa: '04/02/2024',
      validade: '05/03/2024'
    },
    {
      descricao:
        'Anotações no SCPC - Data Inadimplência: 18/07/2023 - Tipo Devedor (T - Tomador; A - Avalista): T - Nome do credor: CELESC DISTRIBUICAO S.A - Cidade do credor: SCPC SAO PAULO - UF do credor: SP - Valor divida: R$ 95,06 - Número do Contrato: 0020229397818941'
    },
    {
      descricao:
        'Anotações no SCPC - Data Inadimplência: 18/06/2023 - Tipo Devedor (T - Tomador; A - Avalista): T - Nome do credor: CELESC DISTRIBUICAO S.A - Cidade do credor: SCPC SAO PAULO - UF do credor: SP - Valor divida: R$ 95,06 - Número do Contrato: 0020229397818936'
    },
    {
      descricao:
        'Anotações no SCPC - Data Inadimplência: 07/06/2023 - Tipo Devedor (T - Tomador; A - Avalista): T - Nome do credor: CELESC DISTRIBUICAO S.A - Cidade do credor: SCPC SAO PAULO - UF do credor: SP - Valor divida: R$ 236,21 - Número do Contrato: 0202310351664581'
    },
    {
      descricao:
        'Anotações no SCPC - Data Inadimplência: 18/05/2023 - Tipo Devedor (T - Tomador; A - Avalista): T - Nome do credor: CELESC DISTRIBUICAO S.A - Cidade do credor: SCPC SAO PAULO - UF do credor: SP - Valor divida: R$ 95,06 - Número do Contrato: 0020229397818932'
    },
    {
      descricao:
        'Anotações no SCPC - Data Inadimplência: 12/05/2023 - Tipo Devedor (T - Tomador; A - Avalista): T - Nome do credor: NU FINANCEIRA S/A - Cidade do credor: SCPC SAO PAULO - UF do credor: SP - Valor divida: R$ 470,93 - Número do Contrato: 99D59C513F4632A2'
    },
    {
      descricao:
        'Anotações no SCPC - Data Inadimplência: 07/05/2023 - Tipo Devedor (T - Tomador; A - Avalista): T - Nome do credor: CELESC DISTRIBUICAO S.A - Cidade do credor: SCPC SAO PAULO - UF do credor: SP - Valor divida: R$ 364,73 - Número do Contrato: 0202310254664200'
    },
    {
      descricao:
        'Anotações no SCPC - Data Inadimplência: 18/04/2023 - Tipo Devedor (T - Tomador; A - Avalista): T - Nome do credor: CELESC DISTRIBUICAO S.A - Cidade do credor: SCPC SAO PAULO - UF do credor: SP - Valor divida: R$ 95,06 - Número do Contrato: 0020229397818866'
    },
    {
      descricao:
        'Anotações no SCPC - Data Inadimplência: 08/04/2023 - Tipo Devedor (T - Tomador; A - Avalista): T - Nome do credor: KREDILIG/CARTAO DE CREDITO - Cidade do credor: SCPC SAO PAULO - UF do credor: SP - Valor divida: R$ 95,00 - Número do Contrato: 0000000000000007914041'
    },
    {
      descricao:
        'Anotações no SCPC - Data Inadimplência: 07/04/2023 - Tipo Devedor (T - Tomador; A - Avalista): T - Nome do credor: CELESC DISTRIBUICAO S.A - Cidade do credor: SCPC SAO PAULO - UF do credor: SP - Valor divida: R$ 385,50 - Número do Contrato: 0202310167250233'
    },
    {
      descricao:
        'Anotações no SCPC - Data Inadimplência: 18/03/2023 - Tipo Devedor (T - Tomador; A - Avalista): T - Nome do credor: CELESC DISTRIBUICAO S.A - Cidade do credor: SCPC SAO PAULO - UF do credor: SP - Valor divida: R$ 95,06 - Número do Contrato: 0020229397818861'
    },
    {
      descricao:
        'Anotações no SCPC - Data Inadimplência: 07/03/2023 - Tipo Devedor (T - Tomador; A - Avalista): T - Nome do credor: CELESC DISTRIBUICAO S.A - Cidade do credor: SCPC SAO PAULO - UF do credor: SP - Valor divida: R$ 577,84 - Número do Contrato: 0202310066282840'
    }
  ]
})

console.log(dadosProcessados.SISTEMAS[2].descricoes)
