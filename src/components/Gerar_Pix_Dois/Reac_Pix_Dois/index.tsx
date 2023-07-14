/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
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
import QRCode from 'qrcode'

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
    justifyContent: 'space-between'
  },
  header2: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 20
  },
  center: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  centerBorder: {
    display: 'flex',
    height: 50,
    maxHeight: 50,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: '#000',
    marginBottom: 20,
    paddingHorizontal: 5
  },
  containerText: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'column',
    marginTop: 20
  },
  containerTextPage2: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 15
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
    fontSize: 12
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
  typographyValue: {
    fontWeight: 500,
    fontStyle: 'normal',
    textAlign: 'center'
  },
  img: {
    width: '100%',
    maxWidth: '25%',
    backgroundSize: 'contain'
  },
  img2: {
    width: '100%',
    maxWidth: '30%',
    height: 80,
    padding: '10px 10px',
    backgroundSize: 'contain',
    alignSelf: 'flex-end',
    marginBottom: 20
  },
  img3: {
    width: '100%',
    maxWidth: '26%',
    padding: '15px 10px'
  },
  wrapperCheckOut: {
    display: 'flex',
    minHeight: 120,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderWidth: 0.5,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#000',
    borderStyle: 'solid'
  },
  wrapperCheckOut2: {
    display: 'flex',
    minHeight: 55,
    flexDirection: 'row',
    width: '100%',
    marginTop: -1,
    borderLeftStyle: 'solid',
    borderLeftColor: '#000',
    borderLeftWidth: 1,
    borderRightStyle: 'solid',
    borderRightColor: '#000',
    borderRightWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: '#000',
    borderBottomWidth: 1
  },
  wrapperCheckOut3: {
    display: 'flex',
    minHeight: 55,
    marginTop: -1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftStyle: 'solid',
    borderLeftColor: '#000',
    borderLeftWidth: 1,
    borderRightStyle: 'solid',
    borderRightColor: '#000',
    borderRightWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: '#000',
    borderBottomWidth: 1
  },
  contentTextCheckOut: {
    display: 'flex',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    borderStyle: 'solid',
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: '#000',
    paddingBottom: 20
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  fontBold: {
    fontFamily: 'Helvetica-Bold'
  },
  fontBoldHeaderBorder: {
    width: '100%',
    fontSize: 10,
    fontFamily: 'Helvetica-Bold'
  },
  bodyBorder: {
    width: '100%',
    paddingHorizontal: 5
  },
  fontBoldHeader: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 12,
    marginTop: 20,
    textAlign: 'center',
    alignSelf: 'flex-end'
  },
  separador: {
    margin: 5
  },
  rowView: {
    width: '60%',
    minHeight: 40,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 20
  },
  rowView2: {
    width: '40%',
    minHeight: 40,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderLeftWidth: 1,
    borderLeftColor: '#000',
    borderLeftStyle: 'solid',
    paddingHorizontal: 20
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
  },
  imgCodigoBarras: {
    width: '100%',
    backgroundSize: 'contain',
    maxWidth: '25%'
  },
  textPix: {
    marginTop: 5,
    width: '100%',
    textAlign: 'center'
  }
})

export interface IDividas {
  id?: number
  contrato: string
  origem: string
  saldoDevedor: string
}

export interface IPix2Props {
  id?: number
  codigoBarrasPix?: string
  nomeCliente: string
  valorDesconto: string
  dataVencimento: string
  codigoCliente: string
  descricao?: string
  cpfCnpj: string
  nomeAvalistaPix: string
  cidade: string
  nomeAtendente: string
  cpfAtendente: string
  protocolo: string
  numeroAcordo: string
  dividas: IDividas[]
  total: string
}

export function Pix2({
  nomeCliente,
  nomeAvalistaPix,
  cidade,
  cpfCnpj,
  valorDesconto,
  dataVencimento,
  codigoCliente,
  codigoBarrasPix,
  descricao,
  nomeAtendente,
  cpfAtendente,
  protocolo,
  numeroAcordo,
  dividas,
  total
}: IPix2Props) {
  const [copiaCola, setCopiaCola] = useState<string | null>(null)

  const valorAPagar = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(Number(total) - Number(valorDesconto))

  const valorFormat = valorAPagar.replace('R$', '')

  const valorfinal = Number(total) - Number(valorDesconto)

  async function getPixCopCol() {
    const result = await api.post('/gerarPix', {
      nomeCliente: nomeAvalistaPix,
      cidade,
      pix: codigoBarrasPix,
      valorAPagar: valorfinal
    })
    const qrcode = await QRCode.toDataURL(result.data.brcode).then(url => url)

    setCopiaCola(qrcode)
  }

  useEffect(() => {
    void getPixCopCol()
  }, [])

  const [imgB002Url, setImgB002Url] = useState('');

  // Função para converter a imagem em URL de dados (data URL)
  const convertImageToDataUrl = async (imagePath: RequestInfo | URL) => {
    const response = await fetch(imagePath);
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  };

  useEffect(() => {
    // Carregar as imagens ao montar o componente
    convertImageToDataUrl('/img/IMG_B004.png')
      .then((url) => { setImgB002Url(url); })
      .catch((error) => { console.log(error); });
  }, []);

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.header}>
          <Image style={styles.img2} src={imgB002Url} />
          <Text style={styles.fontBoldHeader}>
            CARTA DE CONFIRMAÇÃO DE ACORDO
          </Text>
          <Image style={styles.imgCodigoBarras} src={(copiaCola ?? "") || ''} />
        </View>
        <View style={styles.center}></View>
        <View style={styles.containerText}>
          <View style={styles.contentBlock}>
            <View style={styles.contentText}>
              <Text>ACORDO Nº {numeroAcordo}</Text>
              <View style={styles.separador}></View>
              <Text>NOME: {nomeCliente}</Text>
              <View style={styles.separador}></View>
              <Text>
                CPF: {cpfCnpj} - PROTOCOLO: {protocolo}
              </Text>
              <View style={styles.separador}></View>
              <Text>
                ATENDENTE: {nomeAtendente} CPF {cpfAtendente}
              </Text>
              <View style={styles.separador}></View>
              <Text>ADVOGADO AVALISTA DO ACORDO: DRª {nomeAvalistaPix}</Text>
              {/* <View style={styles.rowView}>
                <Text>Nome </Text>
                <Text style={styles.fontBold}>{nomeCliente}</Text>
              </View>
              <View style={styles.separador}></View>
              <Text>
                Este é o boleto com o demonstrativo do acordo firmado em{' '}
                {dataVencimento}
              </Text>
              <View style={styles.separador}></View>
              <Text>
                Para garantir as condições oferecidas no acordo, este boleto
                deve ser pago até a data de vencimento nele indicada. Se o
                boleto não for pago até está data, está proposta ficará sem
                efeito{' '}
              </Text> */}
            </View>
          </View>
        </View>

        <View style={styles.contentTextWidth}>
          <Text>
            A presente Carta de Confirmação de Acordo decorre de pacto negocial
            efetuado entre a{' '}
            <Text style={styles.fontBold}>
              SERASA S.A CNPJ: 62.173.620/0001- 80
            </Text>{' '}
            e{' '}
            <Text style={styles.fontBold}>
              {nomeCliente} CPF: {cpfCnpj}.
            </Text>{' '}
            e tem por objetivo informar os termos do acordo firmado entre as
            partes para a(s) operação(ões) abaixo relacionada(s), adquiridas
            junto SERASA S.A, amparada pela resolução do CMN/Banco Central do
            Brasil nº. 2686 de 26 de janeiro de 2000, e art. 286 e seguintes do
            Código Civil Brasileiro.
          </Text>
        </View>

        <View style={styles.contentTextWidth}>
          <Text>
            A confirmação do pagamento, referente a primeira parcela ou parcela
            única, representa a aceitação e a confirmação dos termos da
            renegociação descrito a seguir:
          </Text>
        </View>

        {/* <Image src={Logo} /> */}
        <View style={styles.wrapperCheckOut}>
          <View style={styles.contentTextCheckOut}>
            <View style={styles.centerBorder}>
              <Text style={styles.fontBoldHeaderBorder}>CONTRATO</Text>
            </View>
            <View style={styles.bodyBorder}>
              {dividas.map(item => (
                <>
                  <Text>{item.contrato}</Text>
                  <View style={styles.separador}></View>
                </>
              ))}
            </View>
          </View>
          <View style={styles.contentTextCheckOut}>
            <View style={styles.centerBorder}>
              <Text style={styles.fontBoldHeaderBorder}>ORIGEM</Text>
            </View>
            <View style={styles.bodyBorder}>
              {dividas.map(item => (
                <>
                  <Text>{item.origem}</Text>
                  <View style={styles.separador}></View>
                </>
              ))}
            </View>
          </View>
          <View style={styles.contentTextCheckOut}>
            <View style={styles.centerBorder}>
              <Text style={styles.fontBoldHeaderBorder}>SALDO DEVEDOR</Text>
            </View>
            <View style={styles.bodyBorder}>
              {dividas.map(item => (
                <>
                  <Text>{item.saldoDevedor}</Text>
                  <View style={styles.separador}></View>
                </>
              ))}
            </View>
          </View>
          <View style={styles.contentTextCheckOut}>
            <View style={styles.centerBorder}>
              <Text style={styles.fontBoldHeaderBorder}>VALOR NEGOCIADO</Text>
            </View>
            <View style={styles.bodyBorder}>
              <Text>{valorDesconto}</Text>
            </View>
          </View>
          <View style={styles.contentTextCheckOut}>
            <View style={styles.centerBorder}>
              <Text style={styles.fontBoldHeaderBorder}>
                PRIMEIRO VENCIMENTO
              </Text>
            </View>
            <View style={styles.bodyBorder}>
              <Text>{dataVencimento}</Text>
            </View>
          </View>
          {/* CONTADOR DE PAGINAS Ñ APAGAR */}
        </View>
        <View style={styles.wrapperCheckOut2}>
          <View style={styles.rowView}>
            <Text style={styles.fontBold}>TOTAL </Text>
            <Text>R$ {valorFormat}</Text>
          </View>
          <View style={styles.rowView2}>
            <Text style={styles.fontBold}>DESCONTO </Text>
            <Text>R$ {valorDesconto}</Text>
          </View>
        </View>
        <View style={styles.wrapperCheckOut3}>
          <Text style={styles.fontBold}>PAGAMENTO NEGOCIADO</Text>
        </View>
        <View style={styles.wrapperCheckOut2}>
          <View style={styles.rowView}>
            <Text style={styles.fontBold}>1 PARCELA </Text>
            <Text>{valorFormat}</Text>
          </View>
          <View style={styles.rowView2}>
            <Text>TOTAL = </Text>
            <Text>{valorFormat}</Text>
          </View>
        </View>
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
      {true && (
        <Page style={styles.page}>
          <View style={styles.containerText}>
            <Text>
              1 1 – O Credor {nomeCliente} tem ciência de que, o contrato e
              boleto pode sair em nome do Avalista do acordo DRª MIKEL RAMOS DOS
              SANTOS. Situação em que o Advogado negocia e atribui descontos em
              excessão (Descontos maiores do que permitido) Segue em Regime da
              Lei 14.181/2021, conhecida como Lei do Super endividamento
            </Text>
            <View style={styles.separador}></View>
            <Text>
              2- Confissão irrevogável e irretratável da totalidade dos créditos
              acima relacionados;
            </Text>
            <View style={styles.separador}></View>
            <Text>
              3- O Credor {nomeCliente} tem ciência de que, em caso de
              parcelamento superior a 12 vezes, as parcelas serão corrigidas
              mensalmente com juros de 1%;
            </Text>
            <View style={styles.separador}></View>
            <Text>
              4- O Credor {nomeCliente} tem ciência de que o desconto porventura
              concedido na negociação é mera liberalidade do credor e de que o
              valor negociado será válido para pagamento somente nos prazos e
              termos acordados;
            </Text>
            <View style={styles.separador}></View>
            <Text>
              5- O Credor {nomeCliente} tem ciência de que o presente acordo não
              pressupõe o direito de retomar linhas de crédito junto a
              instituição cedente do crédito, tendo em vista essa decisão
              competir exclusivamente a ela;
            </Text>
            <View style={styles.separador}></View>
            <Text>
              6- O Credor {nomeCliente} tem ciência de que a SERASA S.A, após a
              confirmação de pagamento da 1ª parcela ou parcela única do
              presente acordo, dará conhecimento de tal fato ao banco cedente
              para baixa do (s) respectivo (s) débito (s) no sistema de
              informação de crédito do Banco Central do Brasil;
            </Text>
            <View style={styles.separador}></View>
            <Text>
              7- O Credor {nomeCliente} tem ciência de que a baixa de eventual
              (ais) anotação nos órgãos de proteção ao crédito, referente (s) à
              (s) operação (ões) envolvida (s) neste acordo dar-se-á após a
              confirmação de pagamento da primeira parcela ou parcela única;
            </Text>
            <View style={styles.separador}></View>
            <Text>
              8- O Credor {nomeCliente} tem ciência de que a inadimplência das
              demais parcelas aqui acordadas ensejará nova anotação nos órgãos
              de proteção ao crédito.
            </Text>
            <View style={styles.separador}></View>
            <Text>
              9- O Credor {nomeCliente} tem ciência de que o não-pagamento de
              qualquer parcela no prazo ajustado importa em rescisão automática
              da renegociação e a perda das condições ora oferecidas,
              independentemente de interpelação ou notificação judicial ou
              extrajudicial, dando conhecimento de tal fato a instituição
              cedente, cientificando esta do inadimplemento do presente acordo.
            </Text>
            <View style={styles.separador}></View>
            <Text>
              10- O Credor {nomeCliente} tem ciência de que pode (m) existir
              outro (s) débito (s) que porventura não foi(ram) cedido (s) para a
              . e que essa informação somente pode ser verificada diretamente
              com a instituição cedente, tendo em vista o fato de a SERASA S.A
              não possuir ingerência em seu sistema de informações - ciência de
              que havendo entre o(s) crédito (s) acima operação(ões) envolvida
              (s) em demanda (s) judicial (ais), este acordo somente terá
              validade após a quitação dos honorários advocatícios e das custas
              judiciais por V.Sa.
            </Text>
            <View style={styles.separador}></View>
            <Text>
              A quitação da parcela única (pagamento à vista) ou das parcelas
              (pagamento à prazo), do presente acordo que compõe a (s)
              operação(ões) acima relacionada (s), juntamente com este
              documento, expressa a LIQUIDAÇÃO deste. A diferença entre o saldo
              devedor no momento da negociação e o valor efetivamente recebido
              para liquidação da (s) operação(ões) será considerado com
              desconto, concedido a cargo desta empresa.{' '}
            </Text>
          </View>
          <View style={styles.containerTextPage2}>
            <Text style={styles.fontBold}>
              SERASA S.A. CNPJ : 62.173.620./0093-06
            </Text>
          </View>
        </Page>
      )}
    </Document>
  )
}
