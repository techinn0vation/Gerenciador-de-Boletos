import {
  Page,
  Text,
  Image,
  Document,
  StyleSheet,
  View
} from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 20,
    alignItems: 'flex-start',
    flexDirection: 'column',
    gap: 10,
    fontSize: 10
  },
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  header2: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 20
  },
  containerText: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'column',
    marginTop: 20
  },
  contentBlock: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch'
  },
  contentText: {
    width: '70%',
    flexDirection: 'column',
    fontStyle: 'normal',
    textAlign: 'left',
    fontSize: 8
  },
  contentTextWidth: {
    width: '100%',
    marginBottom: 10,
    marginTop: 10,
    fontStyle: 'normal',
    textAlign: 'left'
  },
  contentTextWidthBorder: {
    width: '100%',
    fontStyle: 'normal',
    textAlign: 'left',
    borderWidth: 1.5,
    borderColor: '#2f3e94',
    padding: 10
  },

  img: {
    width: '100%',
    maxWidth: '35%'
  },
  img2: {
    width: '100%',
    maxWidth: '15%',
    padding: '10px 10px'
  },
  img3: {
    width: '100%',
    maxWidth: '25%',
    marginRight: 20
  },
  wrapperCheckOut: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderWidth: 2,
    borderColor: '#000',
    borderStyle: 'solid',
    marginTop: 15
  },
  contentTextCheckOut: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: 20
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  fontBold: {
    fontFamily: 'Helvetica-Bold'
  },
  separador: {
    margin: 5
  },
  rowView: {
    flexDirection: 'row'
  },
  textFloatRight: {
    textTransform: 'capitalize',
    fontWeight: 500,
    fontStyle: 'normal',
    textAlign: 'right',
    width: '100%',
    marginRight: 10,
    marginTop: 10
  },
  textFloatLeft: {
    textTransform: 'capitalize',
    fontWeight: 500,
    fontStyle: 'normal',
    textAlign: 'left',
    width: '100%',
    marginLeft: 10,
    marginBottom: 10
  },
  borderDashed: {
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    width: '100%',
    maxWidth: '95%',
    margin: '20px auto'
  },
  containerBoerderImage: {
    width: '100%',
    borderWidth: 2,
    borderStyle: 'solid',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'column',
    padding: 20
  },
  containerBorderImageRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%'
  },
  viewCodigoBarras: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%'
  },
  body: {
    width: '100%',

    margin: 'auto',

    textAlign: 'center'
  }
})

export interface ISerasa {
  data: string
  tipo: string
  valor: string
  origem: string
}

export interface ISCPC {
  nome: string
  data: string
  tipo: string
  valor: string
  disponibilidade: string
}

export interface IProtestos {
  data: string
  cartorio: string
  valor: string
  cidadeUF: string
}

export interface IChequeSemFundo {
  data: string
  cheque: string
  alinea: string
  qteCheque: string
  valor: string
  banco: string
  agencia: string
  cidadeUF: string
}

export interface ICadin {
  siglaCredor: string
  nomeCredor: string
}

export interface ISiccf {
  data: string
  tipoConta: string
  banco: string
  agencia: string
  alinea: string
  qteOcorrencia: string
}

export interface IConvenioDevedores {
  data: string
  tipoFinanciamento: string
  valor: string
  cnpj: string
  bancoContrato: string
  cidadeUF: string
}

export interface IConsultaProps {
  nomeCliente: string
  cpf?: string
  data: string
  serasa: ISerasa[]
  scpc: ISCPC[]
  protestos: IProtestos[]
  chequesSF: IChequeSemFundo[]
  cadin: ICadin[]
  siccf: ISiccf[]
  convenioDevedores: IConvenioDevedores[]
}

export default function ConsultaDocument({
  nomeCliente,
  cpf,
  data,
  serasa,
  scpc,
  protestos,
  chequesSF,
  cadin,
  siccf,
  convenioDevedores
}: IConsultaProps) {
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.header}>
          <Image style={styles.img} src={Logo} />
          <View style={styles.header2}>
            <Image style={styles.img3} src={Logo3} />
          </View>
        </View>
        <View style={styles.containerText}>
          <View style={styles.contentBlock}>
            <View style={styles.contentText}>
              <View style={styles.rowView}>
                <Text>
                  Informações gerais
                </Text>
              </View>

              <Text
              >
                NOME DO CLIENTE: {nomeCliente}
              </Text>
              <Text
              >
                CPF: {cpf}
              </Text>
              <Text
              >
                data: {data}
              </Text>
            </View>
          </View>
        </View>

        <View>
          <View
          >
            <Text>
              SERASA
            </Text>
          </View>
          {serasa[0].data !== '' && (
            <View
            >
              <Text>
                Data
              </Text>
              <Text>
                Tipo
              </Text>
              <Text>
                Valor
              </Text>
              <Text>
                Origem
              </Text>
            </View>
          )}

          <View
            
          >
            {serasa[0].data === '' ? (
              <Text>
                Nada Consta
              </Text>
            ) : (
              serasa.map(item => (
                <View
                  key={item.data}
                >
                  <Text>{item.data}</Text>
                  <Text>{item.tipo}</Text>
                  <Text>{item.valor}</Text>
                  <Text>{item.origem}</Text>
                </View>
              ))
            )}
          </View>
        </View>

        <View>
          <View
          >
            <Text>
              SCPC
            </Text>
          </View>
          {scpc[0].data !== '' && (
            <View
            
            >
              <Text>
                Nome
              </Text>
              <Text>
                Data
              </Text>
              <Text
              >
                Tipo
              </Text>
              <Text>
                Valor
              </Text>
              <Text>
                Disponibilidade
              </Text>
            </View>
          )}
          <View>
            {scpc[0].data === '' ? (
              <Text>
                Nada Consta
              </Text>
            ) : (
              scpc.map(item => (
                <View
                  key={item.data}>
                  <Text>{item.nome}</Text>
                  <Text>{item.data}</Text>
                  <Text>
                    {item.tipo}
                  </Text>
                  <Text>{item.valor}</Text>
                  <Text>{item.disponibilidade}</Text>
                </View>
              ))
            )}
          </View>
        </View>

        <View>
          <View>
            <Text>
              Protestos
            </Text>
          </View>
          {protestos[0].data !== '' && (
            <View>
              <Text>
                Data
              </Text>
              <Text>
                Cartório
              </Text>
              <Text>
                Valor
              </Text>
              <Text>
                Cidade/Estado
              </Text>
            </View>
          )}
          <View>
            {protestos[0].data === '' ? (
              <Text>
                Nada Consta
              </Text>
            ) : (
              protestos.map(item => (
                <View key={item.data}>
                  <Text>{item.data}</Text>
                  <Text>
                    {item.cartorio}
                  </Text>
                  <Text>{item.valor}</Text>
                  <Text>{item.cidadeUF}</Text>
                </View>
              ))
            )}
          </View>
        </View>

        <View>
          <View>
            <Text>
              Cheques sem fundo
            </Text>
          </View>
          {chequesSF[0].data !== '' && (
            <View>
              <Text>
                Data
              </Text>
              <Text>
                Cheque
              </Text>
              <Text>
                Alinea
              </Text>
              <Text>
                Qte Cheque
              </Text>
              <Text>
                Valor
              </Text>
              <Text>
                Banco
              </Text>
              <Text>
                Agência
              </Text>
              <Text>
                Cidade/Estado
              </Text>
            </View>
          )}
          <View style={{ display: 'flex', width: '100%' }}>
            {chequesSF[0].data === '' ? (
              <Text>
                Nada Consta
              </Text>
            ) : (
              chequesSF.map(item => (
                <View
                  key={item.data}
                >
                  <Text>{item.data}</Text>
                  <Text>
                    {item.cheque}
                  </Text>
                  <Text>{item.alinea}</Text>
                  <Text>{item.qteCheque}</Text>
                  <Text>{item.valor}</Text>
                  <Text>{item.banco}</Text>
                  <Text>{item.agencia}</Text>
                  <Text>{item.cidadeUF}</Text>
                </View>
              ))
            )}
          </View>
        </View>

        <View>
          <View>
            <Text>
              CADIN
            </Text>
          </View>
          {cadin[0].nomeCredor !== '' && (
            <View>
              <Text>
                Sigla Credor
              </Text>
              <Text>
                Nome Credor
              </Text>
            </View>
          )}
          <View>
            {cadin[0].nomeCredor === '' ? (
              <Text>
                Nada Consta
              </Text>
            ) : (
              cadin.map(item => (
                <View key={item.siglaCredor}>
                  <Text>{item.siglaCredor}</Text>
                  <Text>{item.nomeCredor}</Text>
                </View>
              ))
            )}
          </View>
        </View>

        <View>
          <View>
            <Text>
              SICCF
            </Text>
          </View>
          {siccf[0].data !== '' && (
            <View>
              <Text>
                Data
              </Text>
              <Text>
                Tipo Conta
              </Text>
              <Text>
                Banco
              </Text>
              <Text>
                Agência
              </Text>
              <Text>
                Alinea
              </Text>
              <Text>
                Qte Ocorrência
              </Text>
            </View>
          )}
          <View>
            {siccf[0].data === '' ? (
              <Text>
                Nada Consta
              </Text>
            ) : (
              siccf.map(item => (
                <View key={item.data}>
                  <Text>{item.data}</Text>
                  <Text>
                    {item.tipoConta}
                  </Text>
                  <Text>{item.banco}</Text>
                  <Text>{item.agencia}</Text>
                  <Text>{item.alinea}</Text>
                  <Text>{item.qteOcorrencia}</Text>
                </View>
              ))
            )}
          </View>
        </View>

        <View>
          <View>
            <Text>
              Convenio devedores
            </Text>
          </View>
          {convenioDevedores[0].data !== '' && (
            <View>
              <Text>
                Data
              </Text>
              <Text>
                Tipo Financiamento
              </Text>
              <Text>
                Valor
              </Text>
              <Text>
                CNPJ
              </Text>
              <Text>
                Banco Contrato
              </Text>
              <Text>
                Cidade/Estado
              </Text>
            </View>
          )}
          <View style={{ display: 'flex', width: '100%' }}>
            {convenioDevedores[0].data === '' ? (
              <Text>
                Nada Consta
              </Text>
            ) : (
              convenioDevedores.map(item => (
                <View
                  key={item.data}
                >
                  <Text>{item.data}</Text>
                  <Text>
                    {item.tipoFinanciamento}
                  </Text>
                  <Text>{item.valor}</Text>
                  <Text>{item.cnpj}</Text>
                  <Text>{item.bancoContrato}</Text>
                  <Text>{item.cidadeUF}</Text>
                </View>
              ))
            )}
          </View>
        </View>
      </Page>
    </Document>
  )
}
