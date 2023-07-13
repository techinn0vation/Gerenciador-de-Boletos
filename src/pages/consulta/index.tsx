/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

import {
  WrapperConsult,
  ContentConsult,
  BlockConsult,
  InputFieldConsult,
  ButtonConsult,
  ScreenResult
} from '..//..//components/StylesPages/StylesConsulta'

import {
  Layout,
  SideBar,
  Headline,
  ConsultaDocument,
  DisplayTypography
} from '..//..//components/GeralComponents'

import { api } from '@/services/api'
import { useRef, useState } from 'react'
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'
import { DisplayInputMask } from '@/components/Gerar_Boleto/styles'

import {
  type ISerasa,
  type ISCPC,
  type IProtestos,
  type IChequeSemFundo,
  type ICadin,
  type ISiccf,
  type IConvenioDevedores
} from '@/components/Gerar_Consulta'

export default function Consulta() {
  const [nome, setNome] = useState('')
  const [cpfCnpj, setCpfCnpj] = useState('')
  const [serasa, setSerasa] = useState<ISerasa[]>([])
  const [scpc, setScpc] = useState<ISCPC[]>([])
  const [protestos, setProtestos] = useState<IProtestos[]>([])
  const [chequeSF, setChequeSF] = useState<IChequeSemFundo[]>([])
  const [cadin, setCadin] = useState<ICadin[]>([])
  const [siccf, setSiccf] = useState<ISiccf[]>([])
  const [convenioDevedores, setConvenioDevedores] = useState<
    IConvenioDevedores[]
  >([])

  const [loading, setLoading] = useState(false)

  const [cpf, setCpf] = useState('')

  const token = localStorage.getItem('token')
  const Auth = `Bearer ${token}`

  async function onConsulta() {
    setLoading(true)
    if (cpf.length < 11) {
      alert('CPF invalido')
      setLoading(false)
    }

    await api
      .post('/consulta', { cpf })
      .then(result => {
        setNome(result.data.msg.dadosPessoais['Nome do Cliente'])
        setCpfCnpj(result.data.msg.dadosPessoais['CPF/CNPJ'])

        setSerasa(prevList => [
          ...prevList,
          { data: '', origem: '', tipo: '', valor: '' }
        ])

        if (result.data.msg.cheques.length === 0) {
          setChequeSF(prevList => [
            ...prevList,
            {
              agencia: '',
              alinea: '',
              banco: '',
              cheque: '',
              cidadeUF: '',
              data: 'Nada consta',
              qteCheque: '',
              valor: ''
            }
          ])
        } else if (result.data.msg.cheques.length > 0) {
          for (let i = 0; i < result.data.msg.cheques.length; i++) {
            setChequeSF(prevList => [
              ...prevList,
              {
                cheque: result.data.msg.cheques[i].Cheque,
                agencia: result.data.msg.cheques[i]['Agência'],
                alinea: result.data.msg.cheques[i].Alinea,
                banco: result.data.msg.cheques[i].Banco,
                cidadeUF: `${result.data.msg.cheques[i].Cidade}/${result.data.msg.cheques[i].UF}`,
                data: result.data.msg.cheques[i].Data,
                qteCheque: result.data.msg.cheques[i]['Qte Cheque'],
                valor: result.data.msg.cheques[i]['Vlr Cheque']
              }
            ])
          }
        }

        if (result.data.msg.cadin.length === 0) {
          setCadin(prevList => [
            ...prevList,
            {
              nomeCredor: '',
              siglaCredor: 'Nada consta'
            }
          ])
        } else if (result.data.msg.cadin.length > 0) {
          setCadin(prevList => [
            ...prevList,
            {
              nomeCredor: result.data.msg.cadin[1]['Nome Credor'],
              siglaCredor: result.data.msg.cadin[1]['Sigla Credor']
            }
          ])
        }

        if (result.data.msg.convenioDevedores.length === 0) {
          setConvenioDevedores(prevList => [
            ...prevList,
            {
              cnpj: '',
              bancoContrato: '',
              tipoFinanciamento: '',
              cidadeUF: '',
              data: 'Nada consta',
              valor: ''
            }
          ])
        } else if (result.data.msg.convenioDevedores.length > 0) {
          for (let i = 0; i < result.data.msg.convenioDevedores.length; i++) {
            setConvenioDevedores(prevList => [
              ...prevList,
              {
                cnpj: result.data.msg.convenioDevedores[i].CNPJ,
                bancoContrato: result.data.msg.convenioDevedores[i].Contrato,
                tipoFinanciamento:
                  result.data.msg.convenioDevedores[i]['Tp Financ'],
                cidadeUF: `${result.data.msg.convenioDevedores[i].Cidade}/${result.data.msg.convenioDevedores[i].UF}`,
                data: result.data.msg.convenioDevedores[i].Data,
                valor: result.data.msg.convenioDevedores[i]['Vlr Conv']
              }
            ])
          }
        }

        if (result.data.msg.protestos.length === 0) {
          setProtestos(prevList => [
            ...prevList,
            {
              cartorio: '',
              cidadeUF: '',
              data: 'Nada consta',
              valor: ''
            }
          ])
        } else if (result.data.msg.protestos.length) {
          for (let i = 0; i < result.data.msg.protestos.length; i++) {
            setProtestos(prevList => [
              ...prevList,
              {
                cartorio: result.data.msg.protestos[i]['Cartório'],
                cidadeUF: `${result.data.msg.protestos[i].Cidade}/${result.data.msg.protestos[i].UF}`,
                data: result.data.msg.protestos[i].Data,
                valor: result.data.msg.protestos[i]['Valor Protesto']
              }
            ])
          }
        }

        if (result.data.msg.scpc.length === 0) {
          setScpc(prevList => [
            ...prevList,
            {
              nome: '',
              disponibilidade: '',
              cidadeUF: '',
              data: 'Nada consta',
              valor: '',
              tipo: ''
            }
          ])
        } else if (result.data.msg.scpc.length > 0) {
          for (let i = 0; i < result.data.msg.scpc.length; i++) {
            setScpc(prevList => [
              ...prevList,
              {
                nome: result.data.msg.scpc[i].Nome,
                disponibilidade: result.data.msg.scpc[i]['Dt Disp'],
                cidadeUF: `${result.data.msg.scpc[i].Cidade}/${result.data.msg.scpc[i].UF}`,
                data: result.data.msg.scpc[i]['Dt Ocorr'],
                valor: result.data.msg.scpc[i]['Vr Dívida'],
                tipo: result.data.msg.scpc[i]['Tp Devedor']
              }
            ])
          }
        }
        if (result.data.msg.siccf.length === 0) {
          setSiccf(prevList => [
            ...prevList,
            {
              agencia: '',
              alinea: '',
              banco: '',
              data: 'Nada consta',
              qteOcorrencia: '',
              tipoConta: ''
            }
          ])
        } else if (result.data.msg.siccf.length > 0) {
          for (let i = 0; i < result.data.msg.siccf.length; i++) {
            setSiccf(prevList => [
              ...prevList,
              {
                agencia: result.data.msg.siccf[i]['Agência'],
                alinea: result.data.msg.siccf[i].Alinea,
                banco: result.data.msg.siccf[i].Banco,
                data: result.data.msg.siccf[i]['Data Ocor'],
                qteOcorrencia: result.data.msg.siccf[i]['Qte Ocor'],
                tipoConta: result.data.msg.siccf[i]['Tp Conta']
              }
            ])
          }
        }

        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }

  return (
    <Layout>
      <WrapperConsult>
        <SideBar />
        <ContentConsult>
          <Headline title="consultar cpf" text="insira os dados abaixo." />
          <BlockConsult>
            <DisplayInputMask
              mask="000.000.000-00"
              value={cpf}
              // unmask={true}
              onAccept={(value: string) => {
                setCpf(value)
              }}
              placeholder="digite o cpf"
            />
            <ButtonConsult disabled={loading} onClick={onConsulta}>
              {loading ? 'Carregando informações' : 'Consultar'}
            </ButtonConsult>
            <ButtonConsult disabled={nome === '' || cpfCnpj === '' || loading}>
              {nome === '' || cpfCnpj === '' || siccf.length === 0 ? (
                'Preencha os campos'
              ) : (
                <PDFDownloadLink
                  document={
                    <ConsultaDocument
                      nomeCliente={nome}
                      data={new Date().toString()}
                      cpf={cpfCnpj}
                      cadin={cadin}
                      chequesSF={chequeSF}
                      convenioDevedores={convenioDevedores}
                      protestos={protestos}
                      scpc={scpc}
                      serasa={serasa}
                      siccf={siccf}
                    />
                  }
                  fileName={`${nome} - CPF ${cpfCnpj} .pdf`}
                >
                  {({ blob, url, loading, error }) =>
                    loading ? 'Carregando...' : 'Gerar PDF'
                  }
                </PDFDownloadLink>
              )}
            </ButtonConsult>
          </BlockConsult>
          <ScreenResult></ScreenResult>
        </ContentConsult>
      </WrapperConsult>
    </Layout>
  )
}
