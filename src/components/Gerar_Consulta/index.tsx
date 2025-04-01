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

export interface IIdentificacao {
  Nome: string
  CPF: string
  "Data de Nascimento": string
}

export interface IRegistrosDebitosItem {
  "Ocorrência": string
  Disponibilizado: string
  Informante: string
  Segmento: string
  Tipo: string
  Contrato: string
  Cidade: string
  UF: string
  "Situação": string
  "Valor(R$)": string
}

export interface IRegistrosDebitos {
  "Valor total (R$):": string
}

export interface IProtestosItem {
  "Data do protesto": string
  "Cartório": string
  Cidade: string
  UF: string
  "Valor(R$)": string
}

export interface IProtestos {
  "Valor total (R$):": string
}

interface Debito {
  'Ocorrência': string;
  'Disponibilizado': string;
  'Valor(R$)': string;
  'Informante': string;
  'Contrato': string;
  'Cidade': string;
  'UF': string;
}

interface Protesto {
  "Data do protesto": string;
  "Valor(R$)": string;
  "Cartório": string;
  "Cidade": string;
  "UF": string;
}

export interface IConsultaProps {
  identificacao: IIdentificacao
  registroDebitos: IRegistrosDebitos
  registroProtestos: IProtestos
  protestos: Protesto[]
  debitos: Debito[]
}

export default function ConsultaDocument({
  debitos,
  identificacao,
  protestos,
  registroDebitos,
  registroProtestos
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
                NOME DO CLIENTE: {identificacao.Nome}
              </Text>
              <Text
                style={{
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  marginLeft: 20,
                  marginTop: 5
                }}
              >
                CPF: {identificacao.CPF}
              </Text>
              <Text
                style={{
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  marginLeft: 20,
                  marginTop: 5
                }}
              >
                Data de Nacimento: {identificacao['Data de Nascimento']}
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
              Débitos
            </Text>
          </View>
          {debitos.length > 0 && (
            <View
              style={{ display: 'flex', flexDirection: 'row', marginTop: 5 }}
            >
              <Text style={{ width: '15%', fontFamily: 'Helvetica-Bold' }}>
                Ocorrência
              </Text>
              <Text style={{ width: '17%', fontFamily: 'Helvetica-Bold' }}>
                Disponibilizado
              </Text>
              <Text style={{ width: '30%', fontFamily: 'Helvetica-Bold' }}>
                Informante
              </Text>
              {/* <Text style={{ width: '30%', fontFamily: 'Helvetica-Bold' }}>
                Segmento
              </Text>
              <Text style={{ width: '8%', fontFamily: 'Helvetica-Bold' }}>
                Tipo
              </Text> */}
              <Text style={{ width: '30%', fontFamily: 'Helvetica-Bold' }}>
                Contrato
              </Text>
              <Text style={{ width: '25%', fontFamily: 'Helvetica-Bold' }}>
                Cidade
              </Text>
              <Text style={{ width: '8%', fontFamily: 'Helvetica-Bold' }}>
                UF
              </Text>
              <Text style={{ width: '30%', fontFamily: 'Helvetica-Bold' }}>
                Valor(R$)
              </Text>
            </View>
          )}

          <View
            style={{ display: 'flex', width: '100%' }}
          >
            {debitos.length === 0 ? (
              <Text style={{ width: '25%', marginTop: 5, marginLeft: 5 }}>
                Nada Consta
              </Text>
            ) : (
              debitos.map(item => (
                <View
                  style={{
                    marginVertical: 5,
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%'
                  }}
                  key={item.Contrato}
                >
                  <Text style={{ width: '30%' }}>{item.Ocorrência}</Text>
                  <Text style={{ width: '30%' }}>{item.Disponibilizado}</Text>
                  <Text style={{ width: '30%' }}>{item.Informante}</Text>
                  {/* <Text style={{ width: '30%' }}>{item.Segmento}</Text>
                  <Text style={{ width: '30%' }}>{item.Tipo}</Text> */}
                  <Text style={{ width: '30%' }}>{item.Contrato}</Text>
                  <Text style={{ width: '30%' }}>{item.UF}</Text>
                  <Text style={{ width: '30%' }}>{item['Valor(R$)']}</Text>
                </View>
              ))
            )}
            <Text
              style={{
                textTransform: 'uppercase',
                fontWeight: 'bold',
                marginLeft: 20,
                marginTop: 5
              }}
            >
              Valor Total (R$): {registroDebitos['Valor total (R$):']}
            </Text>
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
              Protestos
            </Text>
          </View>
          {protestos.length > 0 && (
            <View
              style={{ display: 'flex', flexDirection: 'row', marginTop: 5 }}
            >
              <Text style={{ width: '25%', fontFamily: 'Helvetica-Bold' }}>
                Data do Protesto
              </Text>
              <Text style={{ width: '25%', fontFamily: 'Helvetica-Bold' }}>
                Cartório
              </Text>
              <Text style={{ width: '25%', fontFamily: 'Helvetica-Bold' }}>
                Cidade
              </Text>
              <Text style={{ width: '25%', fontFamily: 'Helvetica-Bold' }}>
                UF
              </Text>
              <Text style={{ width: '25%', fontFamily: 'Helvetica-Bold' }}>
                Valor(R$)
              </Text>
            </View>
          )}

          <View
            style={{ display: 'flex', width: '100%' }}
          >
            {protestos.length === 0 ? (
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
                  key={item['Data do protesto']}
                >
                  <Text style={{ width: '25%' }}>{item['Data do protesto']}</Text>
                  <Text style={{ width: '25%' }}>{item.Cartório}</Text>
                  <Text style={{ width: '25%' }}>{item.Cidade}</Text>
                  <Text style={{ width: '25%' }}>{item.UF}</Text>
                  <Text style={{ width: '25%' }}>{item['Valor(R$)']}</Text>
                </View>
              ))
            )}
            <Text
              style={{
                textTransform: 'uppercase',
                fontWeight: 'bold',
                marginLeft: 20,
                marginTop: 5
              }}
            >
              Valor Total (R$): {registroProtestos['Valor total (R$):']}
            </Text>
          </View>
        </View>
      </Page>
    </Document >
  )
}
