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

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
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
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'column',
    marginTop: 10,
    marginBottom: 5
  },
  containerTextLeft: {
    justifyContent: 'flex-start',
    width: '100%',
    flexDirection: 'column',
    marginTop: 10,
    marginBottom: 5
  },
  contentBlock: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentText: {
    width: '100%',
    flexDirection: 'column',
    fontStyle: 'normal',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 10
  },
  contentTextWidth: {
    width: '100%',
    marginBottom: 10,
    fontStyle: 'normal',
    textAlign: 'left'
  },
  contentTextWidthBorder: {
    width: '100%',
    fontStyle: 'normal',
    textAlign: 'left',
    borderWidth: 1.5,
    borderColor: '#5397fd',
    padding: 10,
    borderRadius: 5
  },
  contentValue: {
    maxWidth: '30%',
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#cbcbcb',
    padding: 15,
    marginLeft: 10
  },
  typographyValue: {
    fontWeight: 500,
    fontStyle: 'normal',
    textAlign: 'center'
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
    width: '100%',
    marginTop: 15,
    backgroundColor: '#ffc107',
    padding: 15,
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
    fontFamily: 'Helvetica-Bold',
    fontSize: 13
  },
  separador: {
    margin: 15
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
    marginBottom: 5
  },
  borderDashed: {
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    width: '100%',
    maxWidth: '95%',
    margin: '10px auto'
  },
  containerBoerderImage: {
    width: '100%',
    borderWidth: 2,
    borderStyle: 'solid',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'column',
    padding: 10
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
  nomeAvalistaPix: string
}

export function Termos({
  nomeAvalistaPix,
}: IBoletoProps) {


  const [imgB002Url, setImgB002Url] = useState('');
  const [imgB001Url, setImgB001Url] = useState('');

  // Função para converter a imagem em URL de dados (data URL)
  const convertImageToDataUrl = async (imagePath: RequestInfo | URL) => {
    const response = await fetch(imagePath);
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  };

  useEffect(() => {
    // Carregar as imagens ao montar o componente
    convertImageToDataUrl('/img/copyright.png')
      .then((url) => { setImgB001Url(url); })
      .catch((error) => { console.log(error); });
    convertImageToDataUrl('/img/IMG_B002.png')
      .then((url) => { setImgB002Url(url); })
      .catch((error) => { console.log(error); });

  }, []);

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.header}>
          <Image style={styles.img} src={imgB002Url} />
        </View>
        <View style={styles.containerText}>
          <View style={styles.contentBlock}>
            <View style={styles.contentText}>
              <Text style={styles.fontBold}> NOTIFICAÇÃO DE CESSÃO DE CRÉDITO DO FEIRÃO LIMPA NOME</Text>
              <Text style={{ color: "red", textDecoration: "underline", fontSize: 13, fontFamily: "Helvetica-Bold", marginTop: 2 }}>
                ACORDO ESTABELECIDO COM A OPÇÃO DE PAGAMENTO VIA PIX.
              </Text>
              <View style={styles.separador}></View>
              <Text style={{ color: "#5397fd", fontSize: 9 }}>
                Embora seja uma palavra composta por apenas três letras, {`'Pix'`} não constitui uma sigla nem representa um conceito específico. Segundo o Banco Central, o novo método de
                pagamento foi denominado como {`'Pix'`} devido à associação que a palavra evoca com tecnologia, transações e pixels (os pontos luminosos em uma tela).
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.contentTextWidth}>
          <Text style={{ textAlign: "left" }}>
            O Pix é um meio seguro de realizar transações, pois as informações pessoais utilizadas nas operações do Pix, bem como
            nas transações por TED e DOC, encontram-se resguardadas pelo sigilo bancário. O sigilo bancário encontra-se
            respaldado na Lei Complementar nº 105, bem como nas disposições da Lei Geral de Proteção de Dados.
          </Text>
        </View>
        <View style={styles.contentTextWidth}>
          <Text style={{ textAlign: "left" }}>
            <Image style={{ width: 9, height: 9 }} source={imgB001Url} /> Serasa Experian Feirão Limpa Nome - São Paulo - Avenida das Nações Unidas, atuando como legítimo credor de seu(s)
            débito(s). Em conformidade com a legislação vigente, é importante ressaltar que, em caso de não cumprimento do acordo
            (falta de pagamento), não ocorrerá a novação da dívida (ou seja, a criação de uma nova dívida para extinguir e substituir a
            anterior). Isso significa que o valor de seu débito retornará ao montante original, e os pagamentos realizados em virtude do
            acordo serão destinados exclusivamente para a quitação do débito original. Não haverá possibilidade de reativação do
            acordo sob as mesmas condições anteriormente acordadas.
          </Text>
        </View>

        <View style={styles.contentTextWidthBorder}>
          <Text>
            No Feirão Serasa, todas as negociações requerem a presença de um avalista legalmente responsável para sua efetivação. A <Text style={{ color: "red", fontFamily: "Helvetica-Bold", marginTop: 2 }}>
              {nomeAvalistaPix}
            </Text>
            , em seu papel de apoio ao Feirão do Acordo, atua como a pessoa responsável por essa transação, desempenhando o papel de avalista junto às empresas com as quais você possui débitos, além de ser um associado da empresa.
          </Text>
        </View>

        <View style={styles.contentTextWidth}>
          <Text style={{ textAlign: "left" }}>
            Em nossa plataforma, oferecemos um programa que possibilita pequenos microempresários a acessar crédito no mercado. Ao participar da campanha Nome Limpo Serasa Avalista nos acordos, seu CPF/CNPJ receberá pontos de score a cada acordo firmado e pago, tendo seu nome como avalista. Na Chave PIX do acordo, estão registrados os dados do  seu avalista, enquanto a conta bancária está relacionada aos dados de seu fiador.
          </Text>
        </View>

        <View style={styles.contentTextWidth}>
          <Text style={{ textAlign: "left" }}>
            Reforçamos que a responsabilidade pela quitação de seu débito é integralmente de nossa empresa, Serasa Experian,
            reconhecida como uma das mais seguras do Brasil.
          </Text>
        </View>

        <View style={styles.contentTextWidth}>
          <Text style={{ textAlign: "left" }}>
            O Feirão Limpa Nome é um evento devidamente licenciado e organizado pelo SPC/Serasa. Ademais, assumimos
            integralmente o risco; se, em até um dia, o seu nome não for regularizado, reembolsaremos integralmente o montante
            pago, sem imposições burocráticas. Adicionalmente, contamos com uma plataforma de pagamento amplamente
            reconhecida no mercado, estreitamente colaboradora do SPC/Serasa e uma das mais seguras no Brasil. Esta plataforma
            atuará como intermediária entre o Feirão Limpa Nome e as empresas credoras, assegurando a segurança tanto dos seus
            dados durante o processo de pagamento quanto da regularização do seu nome. Caso o reembolso seja requerido, ele
            será efetuado integralmente a seu favor.
          </Text>
        </View>

        <View style={styles.contentTextWidth}>
          <Text style={{ textAlign: "left" }}>
            Imediatamente após a verificação de seu pagamento pelo sistema, procederei ao envio do contrato de quitação (carta de
            anuência) referente ao acordo, elaborado por nossa equipe jurídica perante o credor. Este documento conterá todas as
            cláusulas e especificações necessárias para sua completa proteção contra quaisquer contingências futuras.
          </Text>
        </View>



        {/* <Image src={Logo} /> */}
        <View style={styles.wrapperCheckOut}>
          <Text>
            Esta proposta é válida apenas até a data do acordo. Após esse período, o documento não terá mais validade.
          </Text>
        </View>
      </Page>
      <Page style={styles.page}>
        <View style={styles.containerTextLeft}>
          <Text style={{ fontSize: 25, fontWeight: 'normal' }}>
            Segurança
          </Text>
          <Text style={{ marginTop: 15 }}>A segurança do Pix está pautada em quatro dimensões:</Text>

          <Text style={{ fontSize: 15, marginTop: 15 }}>1. Autenticação do usuário:</Text>
          <Text style={{ marginTop: 10 }}>
            Toda e qualquer transação, inclusive aquelas relacionadas ao gerenciamento das chaves Pix, só pode ser iniciada em
            ambiente seguro da instituição de relacionamento do usuário que seja acessado por meio de uma senha ou de outros
            dispositivos de segurança integrados ao telefone celular, como reconhecimento biométrico e reconhecimento facial ou uso
            de token;
          </Text>

          <Text style={{ fontSize: 15, marginTop: 15 }}>2. Rastreabilidade das transações:</Text>
          <Text style={{ marginTop: 10 }}>
            Por seu desenho tecnológico, todas as operações com o Pix são totalmente rastreáveis, o que permite a identificação das
            contas recebedoras de recursos produtos de fraude/golpe/crime, permitindo a ação mais incisiva da polícia e da Justiça, o
            que não acontece com saques em caixas eletrônicos, por exemplo;
          </Text>

          <Text style={{ fontSize: 15, marginTop: 15 }}>3. Tráfego seguro de informações:</Text>
          <Text style={{ marginTop: 10 }}>
            O tráfego das informações das transações é feito de forma criptografada na Rede do Sistema Financeiro Nacional (RSFN),
            que é uma rede totalmente apartada da internet e na qual cursam as transações do Sistema de Pagamentos Brasileiro
            (SPB). Todos os participantes do Pix têm que emitir certificados de segurança para conseguir transacionar nessa rede.
            Além disso, todas as informações das transações e os dados pessoais vinculados às chaves Pix são armazenados de
            maneira criptografada em sistemas internos do BCB;
          </Text>

          <Text style={{ fontSize: 15, marginTop: 15 }}>4. Regras de funcionamento do Pix:</Text>
          <Text style={{ marginTop: 10 }}>
            O regulamento do Pix prevê medidas que mitigam o risco de fraudes, como, por exemplo:
          </Text>

          <Text style={{ marginTop: 15 }}>
            <Text style={styles.fontBold}>
              a. {" "}
            </Text>
            a previsão de que os participantes do Pix (instituições financeiras e de pagamentos que ofertam o Pix a seus clientes)
            devem se responsabilizar por fraudes no âmbito do Pix decorrentes de falhas nos seus mecanismos de gerenciamento de
            riscos;</Text>

          <Text style={{ marginTop: 15 }}>
            <Text style={styles.fontBold}>
              b. {" "}
            </Text>
            mecanismos de proteção, pelo BC e pelas instituições, que impedem varreduras de informações pessoais
            relacionadas a chave Pix; </Text>

          <Text style={{ marginTop: 15 }}>
            <Text style={styles.fontBold}>
              c. {" "}
            </Text>
            a possibilidade de colocação de limites máximos de valor, com base no perfil de risco de seus clientes, por parte das
            instituições, tais limites podem se diferenciar pelo período que ocorre a transação, titularidade da conta, canal de
            atendimento e forma de autenticação do usuário, entre outros;  </Text>

          <Text style={{ marginTop: 15 }}>
            <Text style={styles.fontBold}>
              d. {" "}
            </Text>
            a possibilidade dos próprios usuários, por meio dos aplicativos, ajustarem os limites de valor estabelecidos pelas
            instituições, sendo que pedidos de redução tem efeitos imediatos e os pedidos de aumento, não são imediatos e carecem
            de uma análise pelas instituições para verificar a compatibilidade ao perfil do cliente;
          </Text>

          <Text style={{ marginTop: 15 }}>
            <Text style={styles.fontBold}>
              e. {" "}
            </Text>
            tempo máximo diferenciado para autorização da transação, pelas instituições participantes, nos casos de transações
            não usuais iniciadas por seus clientes com elevada probabilidade de serem uma fraude;
          </Text>

          <Text style={{ marginTop: 15 }}>
            <Text style={styles.fontBold}>
              f. {" "}
            </Text>
            centro de informações, compartilhadas com todos os participantes, sobre chaves Pix, números de conta e CPF / CNPJ
            que se envolveram em alguma transação fraudulenta;
          </Text>

          <Text style={{ marginTop: 15 }}>
            <Text style={styles.fontBold}>
              g. {" "}
            </Text>
            geração de QR Code dinâmico permitida apenas para os participantes que enviam certificados de segurança
            específicos para o BCB; h. mecanismos que facilitam o bloqueio e eventual devolução dos recursos em caso de fraude,
            como o bloqueio cautelar e o mecanismo especial de devolução.
          </Text>
        </View>
      </Page>
      <Page style={styles.page}>
        <View style={[styles.containerText, { padding: '0px 10px' }]}>
          <Text style={{ fontSize: 12, fontWeight: 'normal', textDecoration: "underline" }}>
            Confissão irrevogável e irretratável da totalidade dos créditos acima relacionados
          </Text>

          <View style={{ flexDirection: 'row', textAlign: "center", justifyContent: "center", marginTop: 25, gap: 10 }}>
            <Text style={styles.fontBold}>1-</Text>
            <Text style={{ textAlign: 'left' }}>
              Ciência que só confirme seu acordo caso tenha total certeza do pagamento, pois O NÃO PAGAMENTO RESULTA
              EM QUEBRA DE ACORDO, ANULANDO TODOS OS DESCONTOS OFERECIDOS.
            </Text>
          </View>

          <View style={{ flexDirection: 'row', textAlign: "center", justifyContent: "center", marginTop: 15, gap: 10 }}>
            <Text style={styles.fontBold}>2-</Text>
            <Text style={{ textAlign: 'left' }}>
              Ciência de que, em caso de parcelamento superior a 12 vezes, as parcelas serão corrigidas mensalmente com
              juros de 1%;
            </Text>
          </View>

          <View style={{ flexDirection: 'row', textAlign: "center", justifyContent: "center", marginTop: 15, gap: 10 }}>
            <Text style={styles.fontBold}>3-</Text>
            <Text style={{ textAlign: 'left' }}>
              Ciência de que o desconto porventura concedido na negociação é mera liberalidade do credor e de que o valor
              negociado será válido para pagamento somente nos prazos e termos acordados;
            </Text>
          </View>

          <View style={{ flexDirection: 'row', textAlign: "center", justifyContent: "center", marginTop: 15, gap: 10 }}>
            <Text style={styles.fontBold}>4-</Text>
            <Text style={{ textAlign: 'left' }}>
              Ciência de que a SERASA S/A, após a confirmação de pagamento da 1ª parcela ou parcela única do presente
              acordo, dará conhecimento de tal fato ao banco cedente para baixa do (s) respectivo (s) débito (s) no sistema de
              informação de crédito do Banco Central do Brasil;
            </Text>
          </View>

          <View style={{ flexDirection: 'row', textAlign: "center", justifyContent: "center", marginTop: 15, gap: 10 }}>
            <Text style={styles.fontBold}>5-</Text>
            <Text style={{ textAlign: 'left' }}>
              Ciência de que a SERASA S/A, após a confirmação de pagamento da 1ª parcela ou parcela única do presente
              acordo, dará conhecimento de tal fato ao banco cedente para baixa do (s) respectivo (s) débito (s) no sistema de
              informação de crédito do Banco Central do Brasil;
            </Text>
          </View>

          <View style={{ flexDirection: 'row', textAlign: "center", justifyContent: "center", marginTop: 15, gap: 10 }}>
            <Text style={styles.fontBold}>6-</Text>
            <Text style={{ textAlign: 'left' }}>
              Ciência de que a baixa de eventual (ais) anotação nos órgãos de proteção ao crédito, referente (s) à (s) operação
              (ões) envolvida (s) neste acordo dar-se-á após a confirmação de pagamento da primeira parcela ou parcela única;
            </Text>
          </View>

          <View style={{ flexDirection: 'row', textAlign: "center", justifyContent: "center", marginTop: 15, gap: 10 }}>
            <Text style={styles.fontBold}>7-</Text>
            <Text style={{ textAlign: 'left' }}>
              Ciência de que a inadimplência das demais parcelas aqui acordadas ensejará nova anotação nos órgãos de
              proteção ao crédito.
            </Text>
          </View>

          <View style={{ flexDirection: 'row', textAlign: "center", justifyContent: "center", marginTop: 15, gap: 10 }}>
            <Text style={styles.fontBold}>8-</Text>
            <Text style={{ textAlign: 'left' }}>
              Ciência de que o não-pagamento de qualquer parcela no prazo ajustado importa em rescisão automática da
              renegociação e a perda das condições ora oferecidas, independentemente de interpelação ou notificação judicial ou
              extrajudicial, dando conhecimento de tal fato a instituição cedente, cientificando esta do inadimplemento do
              presente acordo.
            </Text>
          </View>

          <View style={{ flexDirection: 'row', textAlign: "center", justifyContent: "center", marginTop: 15, gap: 10 }}>
            <Text style={styles.fontBold}>9-</Text>
            <Text style={{ textAlign: 'left' }}>
              Ciência de que pode (m) existir outro (s) débito (s) que porventura não foi (ram) cedido (s) para a SERASA S/A. e
              que essa informação somente pode ser verificada diretamente com a instituição cedente, tendo em vista o fato de a
              SERASA S/A não possuir ingerência em seu sistema de informações - ciência de que havendo entre o(s) crédito (s)
              acima operação (ões) envolvida (s) em demanda (s) judicial (ais), este acordo somente terá validade após a
              quitação dos honorários advocatícios e das custas judiciais por V.Sa
            </Text>
          </View>
          <View style={{ flexDirection: 'row', textAlign: "center", justifyContent: "center", marginTop: 35, gap: 10 }}>

            <Text style={{ textAlign: 'left' }}>
              A quitação da parcela única (pagamento à vista) ou das parcelas (pagamento à prazo), do presente acordo que compõe a
              (s) operação (ões) acima relacionada (s), juntamente com este documento, expressa a LIQUIDAÇÃO deste. A diferença
              entre o saldo devedor no momento da negociação e o valor efetivamente recebido para liquidação da (s) operação (ões)
              será considerado com desconto, concedido a cargo desta empresa.
            </Text>
          </View>

          <View style={{ backgroundColor: "#0c6dfc", padding: 15, width: "100 %", marginTop: 35, color: "white", textAlign: "center" }}>
            <Text>
              Serasa Experian – São Paulo – Av das Nações Unidas, 14.401 – Torre Sucupira – 24º andar –Chácara Sto. Antônio –
              São Paulo-SP – CEP 04794-000 – CNPJ 62.173.620/0001-80
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  )
}
