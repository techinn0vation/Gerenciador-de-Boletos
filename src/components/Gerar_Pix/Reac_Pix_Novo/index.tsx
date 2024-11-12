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
import { api } from '@/services/api'

import moment from 'moment'
moment.locale('pt-br');

const styles = StyleSheet.create({
  page: {
    flex: 1,
    // padding: 20,
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
    alignItems: 'center',
    backgroundColor: "#fa1589",
    // borderBottomWidth: 1,
    // borderBottomColor: '#000',
    // borderBottomStyle: 'solid'
    padding: 20
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
    marginTop: 10,
    marginBottom: 5,
    padding: "0px 20px"
  },
  contentBlock: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch'
  },
  contentText: {
    width: '100%',
    flexDirection: 'column',
    fontStyle: 'normal',
    textAlign: 'left',
    fontSize: 10
  },
  contentTextWidth: {
    width: '100%',
    marginBottom: 10,
    fontStyle: 'normal',
    textAlign: 'left',
    padding: "0px 20px"
  },
  contentTextWidthBorder: {
    width: '95%',
    fontStyle: 'normal',
    textAlign: 'left',
    borderWidth: 1.5,
    borderColor: '#fa1589',
    padding: 10,
    margin: "0px auto",
    borderRadius: 5
  },
  contentValue: {
    maxWidth: '50%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'column',
    borderLeftColor: '#cbcbcb',
    borderLeftWidth: 1,
    borderRightColor: '#cbcbcb',
    borderRightWidth: 1,
    borderStyle: "solid",
    padding: "0px 15px",
    gap: 5,
    marginLeft: 10
  },
  typographyValue: {
    fontWeight: 400,
    fontStyle: 'normal',
    textAlign: 'left'

  },
  img: {
    width: '100%',
    maxWidth: '35%',
  },
  img2: {
    width: '100%',
    maxWidth: '15%',
    padding: '10px 10px'
  },
  img3: {
    width: '100%',
    maxWidth: '26%',
    padding: '15px 10px'
  },
  wrapperCheckOut: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '95%',
    borderWidth: 2,
    borderColor: '#fa1589',
    borderStyle: 'solid',
    borderRadius: 5,
    marginTop: 15,
    margin: "5px auto",
    padding: 10
  },
  contentTextCheckOut: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: 5
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
    margin: 10
  },
  rowView: {
    display: "flex",
    width: "100%",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    marginBottom: 5
  },
  borderDashed: {
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    width: '100%',
    maxWidth: '95%',
    margin: '0px auto'
  },
  containerBoerderImage: {
    width: '100%',
    // borderWidth: 2,
    // borderStyle: 'solid',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'column',
    padding: 20,
    backgroundColor: "#fa1589",
    color: "white"
  },
  containerBorderImageRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%'
  },
  viewCodigoBarras: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginTop: 10
  },
  body: {
    width: '100%',
    margin: 'auto',
    textAlign: 'center'
  },
  imgCodigoBarras: {
    width: '30%',
    backgroundSize: 'contain',
    margin: '0px auto'
  },
  textPix: {
    color: '#000',
    fontWeight: 500,
    fontStyle: 'normal',
    textAlign: 'center'
  }
})

interface IBoletoProps {
  nomeCliente?: string
  valor: string
  dataVencimento: string
  codigoCliente: string
  pix?: string
  descricao?: string
  cpfCnpj?: string
  nomeAvalistaPix: string
  cidade?: string
  txid?: string
}

export function PixNovo({
  nomeCliente,
  nomeAvalistaPix,
  cidade,
  cpfCnpj,
  valor,
  dataVencimento,
  codigoCliente,
  pix,
  txid,
  descricao
}: IBoletoProps) {
  const [copiaCola, setCopiaCola] = useState<string | null>(null)

  // const valorAPagar = new Intl.NumberFormat('pt-BR', {
  //   style: 'currency',
  //   currency: 'BRL'
  // }).format(Number(valor))

  // const valorFormat = valorAPagar.replace('R$', '')

  async function getPixCopCol() {
    const valorCerto = valor.length === 6 ? valor.replace(',', '.') : valor.replace('.', '').replace(',', '.')

    const result = await api.post('/generate-pix-qrcode', {
      nomeCliente: nomeAvalistaPix,
      cidade,
      pix,
      valorAPagar: valorCerto,
      txid
    })

    const qrcode = result.data.qrCodeUrl

    console.log(result.data.qrCodeUrl)

    setCopiaCola(qrcode)
  }

  useEffect(() => {
    void getPixCopCol()
  }, [])

  const [imgB002Url, setImgB002Url] = useState('');
  const [imgB003Url, setImgB003Url] = useState('');
  const [imgB004Url, setImgB004Url] = useState('');
  const [data, setData] = useState('')

  // Função para converter a imagem em URL de dados (data URL)
  const convertImageToDataUrl = async (imagePath: RequestInfo | URL) => {
    const response = await fetch(imagePath);
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  };

  useEffect(() => {
    // Carregar as imagens ao montar o componente
    convertImageToDataUrl('/img/img.png')
      .then((url) => { setImgB002Url(url); })
      .catch((error) => { console.log(error); });
    convertImageToDataUrl('/img/IMG_B003.png')
      .then((url) => { setImgB003Url(url); })
      .catch((error) => { console.log(error); });
    convertImageToDataUrl('/img/IMG_B004.png')
      .then((url) => { setImgB004Url(url); })
      .catch((error) => { console.log(error); });

    const digitsOnly = dataVencimento.replace(/\D/g, '')

    // Aplica a máscara de CPF (000.000.000-00)
    const formattedValue = digitsOnly.replace(
      /(\d{2})(\d{2})(\d{4})/,
      '$1/$2/$3'
    )
    setData(formattedValue)
  }, []);

  return (
    <Document>
      <Page size={"A4"} style={styles.page}>
        <View style={styles.header}>
          <Image style={styles.img} src={imgB002Url} />
          {/* <View style={styles.header2}> */}
          {/* <Image style={styles.img3} src={imgB004Url} /> */}
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 12 }}>Emitido em {moment(dataVencimento).locale("pt-br").format('DD [de] MMMM [de] YYYY')}</Text>
          {/* <Image style={styles.img2} src={imgB003Url} /> */}
          {/* </View> */}
        </View>
        <View style={styles.containerText}>
          <View style={styles.contentBlock}>
            <View style={styles.contentText}>
              <View style={styles.rowView}>
                <View style={{ flexDirection: "row" }}>
                  <Text>Prezado(a) </Text>
                  <Text style={styles.fontBold}>{nomeCliente}</Text>
                </View>

                <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>

                  <View style={[styles.contentValue, { paddingRight: 40 }]}>
                    <Text style={styles.typographyValue}>
                      <Text style={{ textTransform: 'capitalize' }}>CPF</Text>
                    </Text>
                    <Text style={styles.fontBold}>{cpfCnpj}</Text>
                  </View>

                  <View style={[styles.contentValue, { paddingRight: 40, borderLeftWidth: 0 }]}>
                    <Text style={styles.typographyValue}>
                      <Text style={{ textTransform: 'capitalize' }}>valor</Text>
                    </Text>
                    <Text style={styles.fontBold}>R$ {valor}</Text>
                  </View>

                  <View style={[styles.contentValue, {
                    borderLeftWidth: 0, marginLeft: 0, borderRightWidth: 0
                  }]}>
                    <Text style={styles.typographyValue}>
                      <Text style={{ textTransform: 'capitalize' }}>Vencimento</Text>
                    </Text>
                    <Text style={styles.fontBold}>{dataVencimento}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.separador}></View>
              <Text>
                Acordo firmado na opção de pagamento via PIX na data{' '}
                {data}
              </Text>
              <View style={styles.separador}></View>
              <Text>
                Na hora de realizar um pagamento pelo PIX, os dados da chave de
                endereçamento serão consultados no DICT - Diretório de
                Identificadores de Contas Transacionais. Segue a chave PIX
                gerada exclusivamente para o pagador do acordo, conforme
                especificado com atendente.{' '}
              </Text>
            </View>

          </View>
        </View>

        <View style={styles.contentTextWidth}>
          <Text>
            Comunicamos que seu débito(s) detalhado(s) na presente, realizado
            originalmente junto as Instituição descriminas: foi(foram) cedido(s)
            e transferido(s) ao © Serasa Experian FEIRAO LIMPA NOME - São Paulo
            - Av das Nações Unidas tomando se legitimo credor de seu(s)
            débito(s). Restrições no SPC SERASA serão regularizadas em até 3
            dias úteis - Devolução de documentos (cheques, carta de anuência e
            aplicável): somente após a quitação deste Acordo
          </Text>
        </View>

        <View style={styles.contentTextWidthBorder}>
          <Text>
            Toda negociação precisa que haja um avalista responsável
            juridicamente para que a mesma seja concretizada. {nomeAvalistaPix}{' '}
            e a pessoa responsável pelo acordo, sendo seu avalista junto as
            empresas que você tem dívidas. Toda a responsabilidade sobre a baixa
            de seu débito é de nossa empresa © Serasa Experian uma das mais
            seguras do Brasil.
          </Text>
        </View>
        {/* <Image src={Logo} /> */}
        <View style={styles.wrapperCheckOut}>
          <View style={styles.contentTextCheckOut}>
            <Text style={styles.fontBold}>CÓDIGO DO CLIENTE</Text>
            <Text>{codigoCliente}</Text>
          </View>
          <View style={styles.contentTextCheckOut}>
            <Text style={styles.fontBold}>VALOR A PAGAR</Text>
            <Text>R$ {valor}</Text>
          </View>
          <View style={styles.contentTextCheckOut}>
            <Text style={styles.fontBold}>DATA DE VENCIMENTO</Text>
            <Text>{data}</Text>
          </View>
          {/* CONTADOR DE PAGINAS Ñ APAGAR */}
        </View>

        <View style={styles.borderDashed}></View>
        <Text style={styles.textFloatLeft}>documento para pagamento</Text>
        {/* <View style={styles.containerBoerderImage}>
          <Image style={styles.img} src={imgB002Url} />

          <View style={[styles.containerBorderImageRow, { marginTop: 10 }]}>
            <View style={styles.contentTextCheckOut}>
              <Text style={styles.fontBold}>CÓDIGO DO CLIENTE</Text>
              <Text>{codigoCliente}</Text>
            </View>
            <View style={styles.contentTextCheckOut}>
              <Text style={styles.fontBold}>VALOR A PAGAR</Text>
              <Text>R$ {valor}</Text>
            </View>
            <View style={styles.contentTextCheckOut}>
              <Text style={styles.fontBold}>DATA DE VENCIMENTO</Text>
              <Text>{data}</Text>
            </View>
          </View>
          
        </View> */}

        <View style={styles.viewCodigoBarras}>

          <Text style={styles.textPix}>ESCANEIE O QRCODE P/PAGAR!</Text>
        </View>
        {/* <Image style={styles.imgCodigoBarras} src={(copiaCola != null) || ''}  alt='' /> */}
        <Image style={styles.imgCodigoBarras} src={copiaCola !== null ? copiaCola : ''} />


        {/* <View style={styles.body}>
          <Text>
            Restrições no SPC SERASA serão regularizadas em até 3 dias úteis -
            Devolução de documentos (cheques, carta de anuência e aplicável):
            somente após a quitação deste Acordo.
          </Text>
        </View> */}
        {/* <Text
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
        /> */}
      </Page>
      {descricao !== '' && (
        <Page style={styles.page}>
          <View style={styles.header}>
            <Image style={styles.img} src={imgB002Url} />
            {/* <View style={styles.header2}> */}
            {/* <Image style={styles.img3} src={imgB004Url} /> */}
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 12 }}>Emitido em {moment(dataVencimento).format('DD [de] MMMM [de] YYYY')}</Text>
            {/* <Image style={styles.img2} src={imgB003Url} /> */}
            {/* </View> */}
          </View>
          <View style={styles.containerText}>
            <Text style={styles.fontBold}>
              DEMOSTRATIVO DOS VALORES DO CONTRATO ORIGINAL EM ABERTO
            </Text>
            <Text>{descricao}</Text>
          </View>
        </Page>
      )}
    </Document>
  )
}
