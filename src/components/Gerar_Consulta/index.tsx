/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable prettier/prettier */

import {
  Page,
  Text,
  Image,
  Document,
  StyleSheet,
  View
} from '@react-pdf/renderer'
import { useEffect, useState } from 'react'
import moment from 'moment'

export const styles = StyleSheet.create({
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
  dataP: string
  dataU: string
  qteOcorrencias: string
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

export interface IPendencias {
  data: string
  tipo: string
  valor: string
  origem: string
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
  pendencias: IPendencias[]
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
  convenioDevedores,
  pendencias
}: IConsultaProps) {
  const [logo, setImgB002Url] = useState('')
  const [logo3, setImgB003Url] = useState('')

  // Função para converter a imagem em URL de dados (data URL)
  const convertImageToDataUrl = async (imagePath: RequestInfo | URL) => {
    const response = await fetch(imagePath)
    const blob = await response.blob()
    return URL.createObjectURL(blob)
  }

  useEffect(() => {
    // Carregar as imagens ao montar o componente
    convertImageToDataUrl('/img/serasa.png')
      .then(url => {
        setImgB002Url(url)
      })
      .catch(error => {
        console.log(error)
      })
    convertImageToDataUrl('/img/logo-boa-vista-scpc.png')
      .then(url => {
        setImgB003Url(url)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.header}>
          <Image style={styles.img} src={logo} />
          <View style={styles.header2}>
            <Image style={styles.img3} src={logo3} />
          </View>
        </View>
        <View style={styles.containerText}>
          <View style={styles.contentBlock}>
            <View style={styles.contentText}>
              <View style={styles.rowView}>
                <Text
                  style={{
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    fontSize: 12
                  }}
                >
                  Informações gerais
                </Text>
              </View>

              <Text
                style={{
                  textTransform: 'uppercase',
                  marginLeft: 20,
                  marginTop: 5,
                  fontWeight: 'bold'
                }}
              >
                NOME DO CLIENTE: {nomeCliente}
              </Text>
              <Text
                style={{
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  marginLeft: 20,
                  marginTop: 5
                }}
              >
                CPF: {cpf}
              </Text>
              <Text
                style={{
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  marginLeft: 20,
                  marginTop: 5
                }}
              >
                data: {data}
              </Text>
            </View>
          </View>
        </View>

        <View style={{ width: '100%', marginTop: 10 }}>
          <View
            style={{
              backgroundColor: 'rgb(52, 108, 176)',
              width: '100%',
              borderRadius: 3,
              padding: 5,
              marginTop: 5
            }}
          >
            <Text style={{ textTransform: 'uppercase', color: 'white' }}>
              SERASA
            </Text>
          </View>
          {serasa[0].qteOcorrencias !== '' && (
            <View
              style={{ display: 'flex', flexDirection: 'row', marginTop: 5 }}
            >
              <Text style={{ width: '30%', fontFamily: 'Helvetica-Bold' }}>
                Data Primeira Ocorrência
              </Text>
              <Text style={{ width: '30%', fontFamily: 'Helvetica-Bold' }}>
                Data Última Ocorrência
              </Text>
              <Text style={{ width: '30%', fontFamily: 'Helvetica-Bold' }}>
                Quantidade Ocorrências
              </Text>
            </View>
          )}

          <View
            style={{ display: 'flex', width: '100%' }}
          >
            {serasa[0].qteOcorrencias === '' ? (
              <Text style={{ width: '25%', marginTop: 5, marginLeft: 5 }}>
                Nada Consta
              </Text>
            ) : (
              serasa.map(item => (
                <View
                  style={{
                    marginVertical: 5,
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%'
                  }}
                  key={item.dataP}
                >
                  <Text style={{ width: '30%' }}>{item.dataP.split(" ")[0]}</Text>
                  <Text style={{ width: '30%' }}>{item.dataU.split(" ")[0]}</Text>
                  <Text style={{ width: '30%' }}>{item.qteOcorrencias}</Text>
                </View>
              ))
            )}
          </View>
        </View>

        <View style={{ width: '100%', marginTop: 10 }}>
          <View
            style={{
              backgroundColor: 'rgb(52, 108, 176)',
              width: '100%',
              borderRadius: 3,
              padding: 5,
              marginTop: 5
            }}
          >
            <Text style={{ textTransform: 'uppercase', color: 'white' }}>
              PENDENCIAS
            </Text>
          </View>
          {pendencias[0].data !== '' && (
            <View
              style={{ display: 'flex', flexDirection: 'row', marginTop: 5 }}
            >
              <Text style={{ width: '25%', fontFamily: 'Helvetica-Bold' }}>
                Data
              </Text>
              <Text style={{ width: '30%', fontFamily: 'Helvetica-Bold' }}>
                Tipo
              </Text>
              <Text style={{ width: '20%', fontFamily: 'Helvetica-Bold' }}>
                Valor
              </Text>
              <Text style={{ width: '35%', fontFamily: 'Helvetica-Bold' }}>
                Origem
              </Text>
            </View>
          )}

          <View
            style={{ display: 'flex', width: '100%' }}
          >
            {pendencias[0].data === '' ? (
              <Text style={{ width: '25%', marginTop: 5, marginLeft: 5 }}>
                Nada Consta
              </Text>
            ) : (
              pendencias.map(item => (
                <View
                  style={{
                    marginVertical: 5,
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%'
                  }}
                  key={item.data}
                >
                  <Text style={{ width: '25%' }}>{item.data.split(" ")[0]}</Text>
                  <Text style={{ width: '30%' }}>{item.tipo}</Text>
                  <Text style={{ width: '20%' }}>{new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(Number(item.valor))}</Text>
                  <Text style={{ width: '35%' }}>{item.origem}</Text>
                </View>
              ))
            )}
          </View>
        </View>

        <View style={{ width: '100%' }}>
          <View
            style={{
              backgroundColor: 'rgb(52, 108, 176)',
              width: '100%',
              borderRadius: 3,
              padding: 5,
              marginTop: 5
            }}
          >
            <Text style={{ textTransform: 'uppercase', color: 'white' }}>
              SCPC
            </Text>
          </View>
          {scpc[0].data !== '' && (
            <View
              style={{ display: 'flex', flexDirection: 'row', marginTop: 5 }}
            >
              <Text style={{ width: '25%', fontFamily: 'Helvetica-Bold' }}>
                Nome
              </Text>
              <Text style={{ width: '25%', fontFamily: 'Helvetica-Bold', marginHorizontal: 15 }}>
                Data
              </Text>
              <Text
                style={{
                  width: '15%',
                  marginHorizontal: 15,
                  fontFamily: 'Helvetica-Bold'
                }}
              >
                Tipo
              </Text>
              <Text style={{ width: '20%', fontFamily: 'Helvetica-Bold' }}>
                Valor
              </Text>
              <Text style={{ width: '30%', fontFamily: 'Helvetica-Bold' }}>
                Disponibilidade
              </Text>
            </View>
          )}

          <View style={{ display: 'flex', width: '100%' }}>
            {scpc[0].data === '' ? (
              <Text style={{ width: '25%', marginTop: 5, marginLeft: 5 }}>
                Nada Consta
              </Text>
            ) : (
              scpc.map(item => (
                <View
                  style={{
                    marginVertical: 5,
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%'
                  }}
                  key={item.data}
                >
                  <Text style={{ width: '25%' }}>{item.nome}</Text>
                  <Text style={{ width: '25%', marginHorizontal: 15 }}>
                    {item.data.split(" ")[0]}
                  </Text>
                  <Text style={{ width: '15%', marginHorizontal: 15 }}>
                    {item.tipo}
                  </Text>
                  <Text style={{ width: '20%' }}>{new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(Number(item.valor))}</Text>
                  <Text style={{ width: '30%' }}>
                    {item.data.split(" ")[0]}

                  </Text>
                </View>
              ))
            )}
          </View>
        </View>

        <View style={{ width: '100%' }}>
          <View
            style={{
              backgroundColor: 'rgb(52, 108, 176)',
              width: '100%',
              borderRadius: 3,
              padding: 5,
              marginTop: 5
            }}
          >
            <Text style={{ textTransform: 'uppercase', color: 'white' }}>
              Protestos
            </Text>
          </View>
          {protestos[0].data !== '' && (
            <View
              style={{ display: 'flex', flexDirection: 'row', marginTop: 5 }}
            >
              <Text style={{ width: '35%', fontFamily: 'Helvetica-Bold' }}>
                Data
              </Text>
              <Text
                style={{
                  width: '15%',
                  marginHorizontal: 15,
                  fontFamily: 'Helvetica-Bold'
                }}
              >
                Cartório
              </Text>
              <Text style={{ width: '15%', fontFamily: 'Helvetica-Bold' }}>
                Valor
              </Text>
              <Text style={{ width: '35%', fontFamily: 'Helvetica-Bold' }}>
                Cidade/Estado
              </Text>
            </View>
          )}
          <View style={{ display: 'flex', width: '100%' }}>
            {protestos[0].data === '' ? (
              <Text style={{ width: '25%', marginTop: 5, marginLeft: 5 }}>
                Nada Consta
              </Text>
            ) : (
              protestos.map(item => (
                <View
                  style={{
                    marginVertical: 5,
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%'
                  }}
                  key={item.data}
                >
                  <Text style={{ width: '35%' }}>{item.data.split(" ")[0]}</Text>
                  <Text style={{ width: '15%', marginHorizontal: 15 }}>
                    {item.cartorio}
                  </Text>
                  <Text style={{ width: '15%' }}>{new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(Number(item.valor))}</Text>
                  <Text style={{ width: '35%' }}>{item.cidadeUF}</Text>
                </View>
              ))
            )}
          </View>
        </View>

        <View style={{ width: '100%' }}>
          <View
            style={{
              backgroundColor: 'rgb(52, 108, 176)',
              width: '100%',
              borderRadius: 3,
              padding: 5,
              marginTop: 5
            }}
          >
            <Text style={{ textTransform: 'uppercase', color: 'white' }}>
              Cheques sem fundo
            </Text>
          </View>
          {chequesSF[0].data !== '' && (
            <View
              style={{ display: 'flex', flexDirection: 'row', marginTop: 5 }}
            >
              <Text style={{ width: '10%', fontFamily: 'Helvetica-Bold' }}>
                Data
              </Text>
              <Text
                style={{
                  width: '10%',
                  marginHorizontal: 15,
                  fontFamily: 'Helvetica-Bold'
                }}
              >
                Cheque
              </Text>
              <Text style={{ width: '10%', fontFamily: 'Helvetica-Bold' }}>
                Alinea
              </Text>
              <Text style={{ width: '15%', fontFamily: 'Helvetica-Bold' }}>
                Qte Cheque
              </Text>
              <Text style={{ width: '15%', fontFamily: 'Helvetica-Bold' }}>
                Valor
              </Text>
              <Text style={{ width: '15%', fontFamily: 'Helvetica-Bold' }}>
                Banco
              </Text>
              <Text style={{ width: '15%', fontFamily: 'Helvetica-Bold' }}>
                Agência
              </Text>
              <Text style={{ width: '15%', fontFamily: 'Helvetica-Bold' }}>
                Cidade/Estado
              </Text>
            </View>
          )}
          <View style={{ display: 'flex', width: '100%' }}>
            {chequesSF[0].data === '' ? (
              <Text style={{ width: '25%', marginTop: 5, marginLeft: 5 }}>
                Nada Consta
              </Text>
            ) : (
              chequesSF.map(item => (
                <View
                  style={{
                    marginVertical: 5,
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%'
                  }}
                  key={item.data}
                >
                  <Text style={{ width: '10%' }}>{item.data.split(" ")[0]}</Text>
                  <Text style={{ width: '10%', marginHorizontal: 15 }}>
                    {item.cheque}
                  </Text>
                  <Text style={{ width: '10%' }}>{item.alinea}</Text>
                  <Text style={{ width: '15%' }}>{item.qteCheque}</Text>
                  <Text style={{ width: '15%' }}>{new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(Number(item.valor))}</Text>
                  <Text style={{ width: '15%' }}>{item.banco}</Text>
                  <Text style={{ width: '15%' }}>{item.agencia}</Text>
                  <Text style={{ width: '15%' }}>{item.cidadeUF}</Text>
                </View>
              ))
            )}
          </View>
        </View>

        <View style={{ width: '100%' }}>
          <View
            style={{
              backgroundColor: 'rgb(52, 108, 176)',
              width: '100%',
              borderRadius: 3,
              padding: 5,
              marginTop: 5
            }}
          >
            <Text style={{ textTransform: 'uppercase', color: 'white' }}>
              CADIN
            </Text>
          </View>
          {cadin[0].nomeCredor !== '' && (
            <View
              style={{ display: 'flex', flexDirection: 'row', marginTop: 5 }}
            >
              <Text style={{ width: '50%', fontFamily: 'Helvetica-Bold' }}>
                Sigla Credor
              </Text>
              <Text style={{ width: '50%', fontFamily: 'Helvetica-Bold' }}>
                Nome Credor
              </Text>
            </View>
          )}
          <View style={{ display: 'flex', width: '100%' }}>
            {cadin[0].nomeCredor === '' ? (
              <Text style={{ width: '25%', marginTop: 5, marginLeft: 5 }}>
                Nada Consta
              </Text>
            ) : (
              cadin.map(item => (
                <View
                  style={{
                    marginVertical: 5,
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%'
                  }}
                  key={item.siglaCredor}
                >
                  <Text style={{ width: '50%%' }}>{item.siglaCredor}</Text>
                  <Text style={{ width: '50%' }}>{item.nomeCredor}</Text>
                </View>
              ))
            )}
          </View>
        </View>

        <View style={{ width: '100%' }}>
          <View
            style={{
              backgroundColor: 'rgb(52, 108, 176)',
              width: '100%',
              borderRadius: 3,
              padding: 5,
              marginTop: 5
            }}
          >
            <Text style={{ textTransform: 'uppercase', color: 'white' }}>
              SICCF
            </Text>
          </View>
          {siccf[0].data !== '' && (
            <View
              style={{ display: 'flex', flexDirection: 'row', marginTop: 5 }}
            >
              <Text style={{ width: '25%', fontFamily: 'Helvetica-Bold' }}>
                Data
              </Text>
              <Text
                style={{
                  width: '15%',
                  marginHorizontal: 15,
                  fontFamily: 'Helvetica-Bold'
                }}
              >
                Tipo Conta
              </Text>
              <Text style={{ width: '15%', fontFamily: 'Helvetica-Bold' }}>
                Banco
              </Text>
              <Text style={{ width: '15%', fontFamily: 'Helvetica-Bold' }}>
                Agência
              </Text>
              <Text style={{ width: '15%', fontFamily: 'Helvetica-Bold' }}>
                Alinea
              </Text>
              <Text style={{ width: '25%', fontFamily: 'Helvetica-Bold' }}>
                Qte Ocorrência
              </Text>
            </View>
          )}
          <View style={{ display: 'flex', width: '100%' }}>
            {siccf[0].data === '' ? (
              <Text style={{ width: '25%', marginTop: 5, marginLeft: 5 }}>
                Nada Consta
              </Text>
            ) : (
              siccf.map(item => (
                <View
                  style={{
                    marginVertical: 5,
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%'
                  }}
                  key={item.data}
                >
                  <Text style={{ width: '25%' }}>{item.data.split(" ")[0]}</Text>
                  <Text style={{ width: '15%', marginHorizontal: 15 }}>
                    {item.tipoConta}
                  </Text>
                  <Text style={{ width: '15%' }}>{item.banco}</Text>
                  <Text style={{ width: '15%' }}>{item.agencia}</Text>
                  <Text style={{ width: '15%' }}>{item.alinea}</Text>
                  <Text style={{ width: '25%' }}>{item.qteOcorrencia}</Text>
                </View>
              ))
            )}
          </View>
        </View>

        <View style={{ width: '100%' }}>
          <View
            style={{
              backgroundColor: 'rgb(52, 108, 176)',
              width: '100%',
              borderRadius: 3,
              padding: 5,
              marginTop: 5
            }}
          >
            <Text style={{ textTransform: 'uppercase', color: 'white' }}>
              Convenio devedores
            </Text>
          </View>
          {convenioDevedores[0].data !== '' && (
            <View
              style={{ display: 'flex', flexDirection: 'row', marginTop: 5 }}
            >
              <Text style={{ width: '20%', fontFamily: 'Helvetica-Bold' }}>
                Data
              </Text>
              <Text
                style={{
                  width: '25%',
                  marginHorizontal: 15,
                  fontFamily: 'Helvetica-Bold'
                }}
              >
                Tipo Financiamento
              </Text>
              <Text style={{ width: '15%', fontFamily: 'Helvetica-Bold' }}>
                Valor
              </Text>
              <Text style={{ width: '15%', fontFamily: 'Helvetica-Bold' }}>
                CNPJ
              </Text>
              <Text style={{ width: '20%', fontFamily: 'Helvetica-Bold' }}>
                Banco Contrato
              </Text>
              <Text style={{ width: '15%', fontFamily: 'Helvetica-Bold' }}>
                Cidade/Estado
              </Text>
            </View>
          )}
          <View style={{ display: 'flex', width: '100%' }}>
            {convenioDevedores[0].data === '' ? (
              <Text style={{ width: '25%', marginTop: 5, marginLeft: 5 }}>
                Nada Consta
              </Text>
            ) : (
              convenioDevedores.map(item => (
                <View
                  style={{
                    marginVertical: 5,
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%'
                  }}
                  key={item.data}
                >
                  <Text style={{ width: '20%' }}>{item.data.split(" ")[0]}</Text>
                  <Text style={{ width: '25%', marginHorizontal: 15 }}>
                    {item.tipoFinanciamento}
                  </Text>
                  <Text style={{ width: '15%' }}>R$ {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(Number(item.valor))}</Text>
                  <Text style={{ width: '15%' }}>{item.cnpj}</Text>
                  <Text style={{ width: '20%' }}>{item.bancoContrato}</Text>
                  <Text style={{ width: '15%' }}>{item.cidadeUF}</Text>
                </View>
              ))
            )}
          </View>
        </View>
      </Page>
    </Document>
  )
}
