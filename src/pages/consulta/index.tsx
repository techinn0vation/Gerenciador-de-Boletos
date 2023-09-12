/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

import {
  WrapperConsult,
  ContentConsult,
  BlockConsult,
  ButtonConsult,
  ScreenResult,
  ContentButtons
} from '..//..//components/StylesPages/StylesConsulta'

import {
  Layout,
  SideBar,
  Headline,
  ConsultaDocument
} from '..//..//components/GeralComponents'

import moment from 'moment'

import { api } from '@/services/api'
import { useState } from 'react'

import { PDFDownloadLink, PDFViewer, Document } from '@react-pdf/renderer'
import { DisplayInputMask } from '@/components/Gerar_Boleto/styles'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import {
  type ISerasa,
  type ISCPC,
  type IProtestos,
  type IChequeSemFundo,
  type ICadin,
  type ISiccf,
  type IConvenioDevedores,
  type IPendencias
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
  const [pendencias, setPendencias] = useState<IPendencias[]>([])
  const [erro, setErro] = useState('')

  const [loading, setLoading] = useState(false)

  const [cpf, setCpf] = useState('')
  const [showPreview, setShowPreview] = useState(false)
  const [copied, setCopied] = useState(false)

  async function onConsulta() {
    setLoading(true)
    if (cpf.length < 11) {
      alert('CPF inválido')
      setLoading(false)
    }

    await api
      .post('/consulta', { cpf })
      .then(result => {
        if (result.data.retorno === 'ERROR') {
          setErro(result.data.msg)
          setLoading(false)
          return alert(result.data.msg)
        }

        console.log(result.data)
        setNome(result.data.msg.dadosPessoais['Nome do Cliente'])
        setCpfCnpj(result.data.msg.dadosPessoais['CPF/CNPJ'])

        if (result.data.msg.serasa.length === 0) {
          setSerasa(prevList => [
            ...prevList,
            { dataP: '', dataU: '', qteOcorrencias: '' }
          ])
        } else if (result.data.msg.serasa.length > 0) {
          for (let i = 0; i < result.data.msg.serasa.length; i++) {
            setSerasa(prevList => [
              ...prevList,
              {
                dataP: result.data.msg.serasa[i]['Data Primeira Ocorrência'],
                dataU: result.data.msg.serasa[i]['Data Última Ocorrência'],
                qteOcorrencias:
                  result.data.msg.serasa[i]['Quantidade Ocorrências']
              }
            ])
          }
        }

        if (result.data.msg.pendencias.length === 0) {
          setPendencias(prevList => [
            ...prevList,
            {
              data: '',
              origem: '',
              tipo: '',
              valor: ''
            }
          ])
        } else if (result.data.msg.pendencias.length > 0) {
          for (let i = 0; i < result.data.msg.pendencias.length; i++) {
            setPendencias(prevList => [
              ...prevList,
              {
                data: result.data.msg.pendencias[i].Data,
                tipo: result.data.msg.pendencias[i]['Tipo Financ.'],
                origem: result.data.msg.pendencias[i]['Razão Social'],
                valor: result.data.msg.pendencias[i]['Valor (R$)']
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
              data: '',
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

        if (result.data.msg.protestos.length === 0) {
          setProtestos(prevList => [
            ...prevList,
            {
              cartorio: '',
              cidadeUF: '',
              data: '',
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

        if (result.data.msg.cheques.length === 0) {
          setChequeSF(prevList => [
            ...prevList,
            {
              agencia: '',
              alinea: '',
              banco: '',
              cheque: '',
              cidadeUF: '',
              data: '',
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
              siglaCredor: ''
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
              data: '',
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

        if (result.data.msg.siccf.length === 0) {
          setSiccf(prevList => [
            ...prevList,
            {
              agencia: '',
              alinea: '',
              banco: '',
              data: '',
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

    setCpf('')
  }

  function formatCPF(event: any) {
    const input = event.target
    const value = input.value

    // Remove qualquer caractere que não seja um dígito
    const digitsOnly = value.replace(/\D/g, '')

    // Aplica a máscara de CPF (000.000.000-00)
    const formattedValue = digitsOnly.replace(
      /(\d{3})(\d{3})(\d{3})(\d{2})/,
      '$1.$2.$3-$4'
    )

    // Atualiza o valor do input com a versão formatada
    input.value = formattedValue
  }

  const handleCopy = () => {
    setCopied(true)
  }

  return (
    <Layout>
      <WrapperConsult>
        <SideBar />
        <ContentConsult>
          <Headline title="consultar cpf" text="insira os dados abaixo." />
          <BlockConsult>
            <DisplayInputMask
              type="text"
              value={cpf}
              pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
              placeholder="Digite um CPF válido"
              onKeyUp={event => formatCPF(event)}
              maxLength={14}
              onChange={e => setCpf(e.target.value)}
            />
            <ButtonConsult disabled={loading} onClick={onConsulta}>
              {loading ? 'Carregando informações.' : 'Consultar'}
            </ButtonConsult>
            {nome === '' || cpfCnpj === '' || siccf.length === 0 ? (
              'Preencha os campos!'
            ) : (
              <>
                {showPreview && (
                  <ScreenResult>
                    <PDFViewer style={{ width: '100%', height: '100vh' }}>
                      <ConsultaDocument
                        nomeCliente={nome}
                        data={moment().format('L')}
                        cpf={cpfCnpj}
                        cadin={cadin}
                        chequesSF={chequeSF}
                        convenioDevedores={convenioDevedores}
                        protestos={protestos}
                        scpc={scpc}
                        serasa={serasa}
                        siccf={siccf}
                        pendencias={pendencias}
                      />
                    </PDFViewer>
                  </ScreenResult>
                )}
                <ContentButtons>
                  <ButtonConsult onClick={() => setShowPreview(!showPreview)}>
                    {showPreview ? 'voltar' : 'visualizar'}
                  </ButtonConsult>
                  <ButtonConsult
                    disabled={nome === '' || cpfCnpj === '' || loading}
                  >
                    {nome === '' || cpfCnpj === '' || siccf.length === 0 ? (
                      'Preencha os campos'
                    ) : (
                      <PDFDownloadLink
                        style={{ textDecoration: 'none', color: 'white' }}
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
                            pendencias={pendencias}
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
                  <CopyToClipboard
                    text={`Nome: ${nome}\nData: ${moment().format()}\nCPF: ${cpfCnpj}\nCadin: ${JSON.stringify(
                      cadin,
                      null,
                      2
                    ).replace(/[[\]{}"]/g, '')}\nCheques SF: ${JSON.stringify(
                      chequeSF,
                      null,
                      2
                    ).replace(
                      /[[\]{}"]/g,
                      ''
                    )}\nConvênio de Devedores: ${JSON.stringify(
                      convenioDevedores,
                      null,
                      2
                    ).replace(/[[\]{}"]/g, '')}\nProtestos: ${JSON.stringify(
                      protestos,
                      null,
                      2
                    ).replace(/[[\]{}"]/g, '')}\nSCPC: ${JSON.stringify(
                      scpc,
                      null,
                      2
                    ).replace(/[[\]{}"]/g, '')}\nSerasa: ${JSON.stringify(
                      serasa,
                      null,
                      2
                    ).replace(/[[\]{}"]/g, '')}\nSICCF: ${JSON.stringify(
                      siccf,
                      null,
                      2
                    ).replace(/[[\]{}"]/g, '')}`}
                    onCopy={handleCopy}
                  >
                    <ButtonConsult>
                      {copied ? 'copiado!' : 'copiar dados'}
                    </ButtonConsult>
                  </CopyToClipboard>
                </ContentButtons>
              </>
            )}
          </BlockConsult>
        </ContentConsult>
      </WrapperConsult>
    </Layout>
  )
}
