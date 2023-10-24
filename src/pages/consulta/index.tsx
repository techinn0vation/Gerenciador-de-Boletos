/* eslint-disable @typescript-eslint/no-floating-promises */
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
import { useEffect, useState } from 'react'

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
    if (
      serasa.length > 0 ||
      scpc.length > 0 ||
      protestos.length > 0 ||
      chequeSF.length > 0 ||
      cadin.length > 0 ||
      siccf.length > 0 ||
      convenioDevedores.length > 0
    ) {
      setNome('')
      setCpf('')
      setSerasa([])
      setScpc([])
      setProtestos([])
      setChequeSF([])
      setCadin([])
      setSiccf([])
      setConvenioDevedores([])
    }
    setLoading(true)
    if (cpf.length < 11) {
      alert('CPF inválido')
      setLoading(false)
    }

    await fetch(`/api/consulta?value=${cpf}`).then(async result => {
      const response = await result.json()
      console.log(response)
      console.log(result, 'teste')
      if (response.retorno === 'ERROR') {
        setErro(response.msg)
        setLoading(false)
        return alert(response.msg)
      }

      setNome(response.msg.dadosPessoais['Nome do Cliente'])
      setCpfCnpj(response.msg.dadosPessoais['CPF/CNPJ'])

      if (response.msg.serasa.length === 0) {
        setSerasa(prevList => [
          ...prevList,
          { dataP: '', dataU: '', qteOcorrencias: '' }
        ])
      } else if (response.msg.serasa.length > 0) {
        for (let i = 0; i < response.msg.serasa.length; i++) {
          setSerasa(prevList => [
            ...prevList,
            {
              dataP: response.msg.serasa[i]['Data Primeira Ocorrência'],
              dataU: response.msg.serasa[i]['Data Última Ocorrência'],
              qteOcorrencias: response.msg.serasa[i]['Quantidade Ocorrências']
            }
          ])
        }
      }

      if (response.msg.pendencias.length === 0) {
        setPendencias(prevList => [
          ...prevList,
          {
            data: '',
            origem: '',
            tipo: '',
            valor: ''
          }
        ])
      } else if (response.msg.pendencias.length > 0) {
        for (let i = 0; i < response.msg.pendencias.length; i++) {
          setPendencias(prevList => [
            ...prevList,
            {
              data: response.msg.pendencias[i].Data,
              tipo: response.msg.pendencias[i]['Tipo Financ.'],
              origem: response.msg.pendencias[i]['Razão Social'],
              valor: response.msg.pendencias[i]['Valor (R$)']
            }
          ])
        }
      }

      if (response.msg.scpc.length === 0) {
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
      } else if (response.msg.scpc.length > 0) {
        for (let i = 0; i < response.msg.scpc.length; i++) {
          setScpc(prevList => [
            ...prevList,
            {
              nome: response.msg.scpc[i].Nome,
              disponibilidade: response.msg.scpc[i]['Dt Disp'],
              cidadeUF: `${response.msg.scpc[i].Cidade}/${response.msg.scpc[i].UF}`,
              data: response.msg.scpc[i]['Dt Ocorr'],
              valor: response.msg.scpc[i]['Vr Dívida'],
              tipo: response.msg.scpc[i]['Tp Devedor']
            }
          ])
        }
      }

      if (response.msg.protestos.length === 0) {
        setProtestos(prevList => [
          ...prevList,
          {
            cartorio: '',
            cidadeUF: '',
            data: '',
            valor: ''
          }
        ])
      } else if (response.msg.protestos.length) {
        for (let i = 0; i < response.msg.protestos.length; i++) {
          setProtestos(prevList => [
            ...prevList,
            {
              cartorio: response.msg.protestos[i]['Cartório'],
              cidadeUF: `${response.msg.protestos[i].Cidade}/${response.msg.protestos[i].UF}`,
              data: response.msg.protestos[i].Data,
              valor: response.msg.protestos[i]['Valor Protesto']
            }
          ])
        }
      }

      if (response.msg.cheques.length === 0) {
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
      } else if (response.msg.cheques.length > 0) {
        for (let i = 0; i < response.msg.cheques.length; i++) {
          setChequeSF(prevList => [
            ...prevList,
            {
              cheque: response.msg.cheques[i].Cheque,
              agencia: response.msg.cheques[i]['Agência'],
              alinea: response.msg.cheques[i].Alinea,
              banco: response.msg.cheques[i].Banco,
              cidadeUF: `${response.msg.cheques[i].Cidade}/${response.msg.cheques[i].UF}`,
              data: response.msg.cheques[i].Data,
              qteCheque: response.msg.cheques[i]['Qte Cheque'],
              valor: response.msg.cheques[i]['Vlr Cheque']
            }
          ])
        }
      }

      if (response.msg.cadin.length === 0) {
        setCadin(prevList => [
          ...prevList,
          {
            nomeCredor: '',
            siglaCredor: ''
          }
        ])
      } else if (response.msg.cadin.length > 0) {
        setCadin(prevList => [
          ...prevList,
          {
            nomeCredor: response.msg.cadin[1]['Nome Credor'],
            siglaCredor: response.msg.cadin[1]['Sigla Credor']
          }
        ])
      }

      if (response.msg.convenioDevedores.length === 0) {
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
      } else if (response.msg.convenioDevedores.length > 0) {
        for (let i = 0; i < response.msg.convenioDevedores.length; i++) {
          setConvenioDevedores(prevList => [
            ...prevList,
            {
              cnpj: response.msg.convenioDevedores[i].CNPJ,
              bancoContrato: response.msg.convenioDevedores[i].Contrato,
              tipoFinanciamento: response.msg.convenioDevedores[i]['Tp Financ'],
              cidadeUF: `${response.msg.convenioDevedores[i].Cidade}/${response.msg.convenioDevedores[i].UF}`,
              data: response.msg.convenioDevedores[i].Data,
              valor: response.msg.convenioDevedores[i]['Vlr Conv']
            }
          ])
        }
      }

      if (response.msg.siccf.length === 0) {
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
      } else if (response.msg.siccf.length > 0) {
        for (let i = 0; i < response.msg.siccf.length; i++) {
          setSiccf(prevList => [
            ...prevList,
            {
              agencia: response.msg.siccf[i]['Agência'],
              alinea: response.msg.siccf[i].Alinea,
              banco: response.msg.siccf[i].Banco,
              data: response.msg.siccf[i]['Data Ocor'],
              qteOcorrencia: response.msg.siccf[i]['Qte Ocor'],
              tipoConta: response.msg.siccf[i]['Tp Conta']
            }
          ])
        }
      }

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
                            data={moment().locale('pt-br').format('DD/MM/YYYY')}
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
