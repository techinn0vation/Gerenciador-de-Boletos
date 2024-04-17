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
import { useEffect, useRef, useState } from 'react'

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
  type IPendencias,
  styles
} from '@/components/Gerar_Consulta'

export default function Consulta() {
  const contentRef = useRef<HTMLDivElement>(null)
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

  const [query, setQuery] = useState(null)

  const [resultado, setResultado] = useState('')

  const [loading, setLoading] = useState(false)

  const [cpf, setCpf] = useState('')
  const [copied, setCopied] = useState(false)

  async function onConsulta() {
    if (nome !== '') {
      setNome('')
      setCpf('')
      setSerasa([])
      setPendencias([])
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

    await fetch(`/api/consulta?cpfCnpj=${cpf}`)
      .then(async result => {
        const response = await result.json()
        setQuery(response)

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
                tipoFinanciamento:
                  response.msg.convenioDevedores[i]['Tp Financ'],
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

  // function copyHtmlContent() {
  //   if (!contentRef.current) return

  //   const range = document.createRange()
  //   range.selectNode(contentRef.current)

  //   try {
  //     navigator.clipboard
  //       .writeText(contentRef.current.innerHTML)
  //       .then(() => {
  //         console.log('Conteúdo copiado com sucesso')
  //       })
  //       .catch(err => {
  //         console.error('Erro ao copiar o conteúdo', err)
  //       })
  //   } catch (err) {
  //     console.error('Erro ao copiar o conteúdo', err)
  //   }

  //   window.getSelection()?.removeAllRanges()
  // }

  const responseToText = (dados: QueryResponse) => {
    let resultado = ''

    // Dados Pessoais
    resultado += 'Dados Pessoais:\n'
    resultado += ` Nome do Cliente: ${dados.msg.dadosPessoais['Nome do Cliente']}\n`
    resultado += ` CPF/CNPJ: ${dados.msg.dadosPessoais['CPF/CNPJ']}\n\n`

    // Serasa
    if (dados.msg.serasa.length > 0) {
      resultado += '\nSerasa:\n'
      dados.msg.serasa.forEach((ocorrencia, index) => {
        resultado += ` Ocorrência ${index + 1}:\n`
        resultado += `  Data Primeira Ocorrência: ${ocorrencia[
          'Data Primeira Ocorrência'
        ].replace('00:00:00', '')}\n`
        resultado += `  Data Última Ocorrência: ${ocorrencia[
          'Data Última Ocorrência'
        ].replace(' 00:00:00', '')}\n`
        resultado += `  Quantidade de Ocorrências: ${ocorrencia['Quantidade Ocorrências']}\n\n`
      })
    }
    // Pendências
    if (dados.msg.pendencias.length > 0) {
      resultado += '\nPendências:\n'
      dados.msg.pendencias.forEach((pendencia, index) => {
        resultado += ` Pendência ${index + 1}:\n`
        resultado += `  Data: ${pendencia.Data.replace(' 00:00:00', '')}\n`
        resultado += `  Tipo Financ.: ${pendencia['Tipo Financ.']} \n`
        resultado += `  Valor (R$): ${new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(Number(pendencia['Valor (R$)']))}\n`
        resultado += `  Contrato: ${pendencia.Contrato}\n`
        resultado += `  Razão Social: ${pendencia['Razão Social']}\n\n`
      })
    }

    // SCPC
    if (dados.msg.scpc.length > 0) {
      resultado += '\nSCPC:\n'
      dados.msg.scpc.forEach((ocorrencia, index) => {
        resultado += ` Ocorrência ${index + 1}:\n\n`
        resultado += `  Data Ocorrência: ${ocorrencia['Dt Ocorr'].replace(
          ' 00:00:00',
          ''
        )}\n`
        resultado += `  Tipo Devedor: ${ocorrencia['Tp Devedor']}\n`
        resultado += `  Nome: ${ocorrencia.Nome}\n`
        resultado += `  Valor Dívida (R$): ${new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(Number(ocorrencia['Vr Dívida']))}\n`
        resultado += `  Cidade: ${ocorrencia.Cidade}, UF: ${ocorrencia.UF}\n\n`
      })
    }

    // Protestos
    if (dados.msg.protestos.length > 0) {
      resultado += '\nProtestos:\n'
      dados.msg.protestos.forEach((protesto, index) => {
        resultado += ` Protesto ${index + 1}:\n`
        resultado += `  Data: ${protesto.Data.replace(' 00:00:00', '')}\n`
        resultado += `  Valor Protesto (R$): ${new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(Number(protesto['Valor Protesto']))}\n`
        resultado += `  Cartório: ${protesto['Cartório']}\n`
        resultado += `  Cidade: ${protesto.Cidade}, UF: ${protesto.UF}\n\n`
      })
    }

    return resultado
  }

  const TextClipboard = () => {
    if (query) {
      const texto = responseToText(query)

      navigator.clipboard.writeText(texto)
      handleCopy()
    }
  }

  return (
    <Layout>
      <WrapperConsult>
        <SideBar />
        <ContentConsult>
          <Headline title="consultar cpf" text="insira os dados abaixo." />

          <BlockConsult>
            <DisplayInputMask
              type="p"
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
                <ContentButtons>
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
                  {/* <CopyToClipboard
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
                  > */}
                  <ButtonConsult onClick={TextClipboard}>
                    {copied ? 'copiado!' : 'copiar dados'}
                  </ButtonConsult>
                  {/* </CopyToClipboard> */}
                  {/* <ButtonConsult onClick={copyHtmlContent}>Teste</ButtonConsult> */}
                </ContentButtons>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginTop: 50,
                    width: '100%'
                  }}
                  ref={contentRef}
                  id="copy"
                >
                  <div style={(styles.containerText, { width: '100%' })}>
                    <div style={styles.contentBlock}>
                      <div style={styles.contentText}>
                        <div
                          style={
                            (styles.rowView,
                            {
                              backgroundColor: 'rgb(52, 108, 176)',
                              width: '100%',
                              borderRadius: 3,
                              padding: 5,
                              marginTop: 5
                            })
                          }
                        >
                          <p
                            style={{
                              textTransform: 'uppercase',
                              fontWeight: 'bold',
                              fontSize: 12,
                              color: 'white'
                            }}
                          >
                            Informações gerais
                          </p>
                        </div>

                        <p
                          style={{
                            textTransform: 'uppercase',
                            marginLeft: 20,
                            marginTop: 5,
                            fontWeight: 'bold'
                          }}
                        >
                          NOME DO CLIENTE: {nome}
                        </p>
                        <p
                          style={{
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            marginLeft: 20,
                            marginTop: 5
                          }}
                        >
                          CPF: {cpfCnpj}
                        </p>
                        <p
                          style={{
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            marginLeft: 20,
                            marginTop: 5
                          }}
                        >
                          data: {moment().locale('pt-br').format('DD/MM/YYYY')}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div style={{ width: '100%', marginTop: 10 }}>
                    <div
                      style={{
                        backgroundColor: 'rgb(52, 108, 176)',
                        width: '100%',
                        borderRadius: 3,
                        padding: 5,
                        marginTop: 5
                      }}
                    >
                      <p
                        style={{
                          textTransform: 'uppercase',
                          color: 'white'
                        }}
                      >
                        SERASA
                      </p>
                    </div>
                    {serasa[0].qteOcorrencias !== '' && (
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          marginTop: 5
                        }}
                      >
                        <p
                          style={{
                            width: '30%',
                            fontFamily: 'Helvetica-Bold'
                          }}
                        >
                          Data Primeira Ocorrência
                        </p>
                        <p
                          style={{
                            width: '30%',
                            fontFamily: 'Helvetica-Bold'
                          }}
                        >
                          Data Última Ocorrência
                        </p>
                        <p
                          style={{
                            width: '30%',
                            fontFamily: 'Helvetica-Bold'
                          }}
                        >
                          Quantidade Ocorrências
                        </p>
                      </div>
                    )}

                    <div
                      style={{
                        display: 'flex',
                        width: '100%',
                        flexDirection: 'column',
                        marginTop: 10
                      }}
                    >
                      {serasa[0].qteOcorrencias === '' ? (
                        <p
                          style={{
                            width: '25%',
                            marginLeft: 5
                          }}
                        >
                          Nada Consta
                        </p>
                      ) : (
                        serasa.map(item => (
                          <div
                            style={{
                              margin: '5px 5px',
                              display: 'flex',
                              flexDirection: 'row',
                              width: '100%'
                            }}
                            key={item.dataP}
                          >
                            <p style={{ width: '30%' }}>
                              {item.dataP.split(' ')[0]}
                            </p>
                            <p style={{ width: '30%' }}>
                              {item.dataU.split(' ')[0]}
                            </p>
                            <p style={{ width: '30%' }}>
                              {item.qteOcorrencias}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  <div style={{ width: '100%', marginTop: 10 }}>
                    <div
                      style={{
                        backgroundColor: 'rgb(52, 108, 176)',
                        width: '100%',
                        borderRadius: 3,
                        padding: 5,
                        marginTop: 5
                      }}
                    >
                      <p
                        style={{
                          textTransform: 'uppercase',
                          color: 'white'
                        }}
                      >
                        PENDENCIAS
                      </p>
                    </div>
                    {pendencias[0].data !== '' && (
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          marginTop: 5
                        }}
                      >
                        <p
                          style={{
                            width: '25%',
                            fontFamily: 'Helvetica-Bold'
                          }}
                        >
                          Data
                        </p>
                        <p
                          style={{
                            width: '30%',
                            fontFamily: 'Helvetica-Bold'
                          }}
                        >
                          Tipo
                        </p>
                        <p
                          style={{
                            width: '20%',
                            fontFamily: 'Helvetica-Bold'
                          }}
                        >
                          Valor
                        </p>
                        <p
                          style={{
                            width: '35%',
                            fontFamily: 'Helvetica-Bold'
                          }}
                        >
                          Origem
                        </p>
                      </div>
                    )}

                    <div
                      style={{
                        display: 'flex',
                        width: '100%',
                        flexDirection: 'column',
                        marginTop: 10
                      }}
                    >
                      {pendencias[0].data === '' ? (
                        <p
                          style={{
                            width: '25%',
                            marginLeft: 5
                          }}
                        >
                          Nada Consta
                        </p>
                      ) : (
                        pendencias.map(item => (
                          <div
                            style={{
                              margin: '5px 5px',
                              display: 'flex',
                              flexDirection: 'row',
                              width: '100%'
                            }}
                            key={item.data}
                          >
                            <p style={{ width: '25%' }}>
                              {item.data.split(' ')[0]}
                            </p>
                            <p style={{ width: '30%' }}>{item.tipo}</p>
                            <p style={{ width: '20%' }}>
                              {new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                              }).format(Number(item.valor))}
                            </p>
                            <p style={{ width: '35%' }}>{item.origem}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  <div style={{ width: '100%' }}>
                    <div
                      style={{
                        backgroundColor: 'rgb(52, 108, 176)',
                        width: '100%',
                        borderRadius: 3,
                        padding: 5,
                        marginTop: 5
                      }}
                    >
                      <p
                        style={{
                          textTransform: 'uppercase',
                          color: 'white'
                        }}
                      >
                        SCPC
                      </p>
                    </div>
                    {scpc[0].data !== '' && (
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          marginTop: 5
                        }}
                      >
                        <p
                          style={{
                            width: '25%',
                            fontFamily: 'Helvetica-Bold'
                          }}
                        >
                          Nome
                        </p>
                        <p
                          style={{
                            width: '25%',
                            fontFamily: 'Helvetica-Bold',
                            marginLeft: 20
                          }}
                        >
                          Data
                        </p>
                        <p
                          style={{
                            width: '15%',
                            fontFamily: 'Helvetica-Bold'
                          }}
                        >
                          Tipo
                        </p>
                        <p
                          style={{
                            width: '20%',
                            fontFamily: 'Helvetica-Bold'
                          }}
                        >
                          Valor
                        </p>
                        <p
                          style={{
                            width: '30%',
                            fontFamily: 'Helvetica-Bold'
                          }}
                        >
                          Disponibilidade
                        </p>
                      </div>
                    )}

                    <div
                      style={{
                        display: 'flex',
                        width: '100%',
                        flexDirection: 'column',
                        marginTop: 10
                      }}
                    >
                      {scpc[0].data === '' ? (
                        <p
                          style={{
                            width: '25%',
                            marginLeft: 5
                          }}
                        >
                          Nada Consta
                        </p>
                      ) : (
                        scpc.map(item => (
                          <div
                            style={{
                              margin: '5px 5px',
                              display: 'flex',
                              flexDirection: 'row',
                              width: '100%'
                            }}
                            key={item.data}
                          >
                            <p style={{ width: '25%' }}>{item.nome}</p>
                            <p style={{ width: '25%', margin: '0px 15px' }}>
                              {item.data.split(' ')[0]}
                            </p>
                            <p style={{ width: '15%', marginLeft: -10 }}>
                              {item.tipo}
                            </p>
                            <p style={{ width: '20%' }}>
                              {new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                              }).format(Number(item.valor))}
                            </p>
                            <p style={{ width: '30%' }}>
                              {item.data.split(' ')[0]}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  <div style={{ width: '100%' }}>
                    <div
                      style={{
                        backgroundColor: 'rgb(52, 108, 176)',
                        width: '100%',
                        borderRadius: 3,
                        padding: 5,
                        marginTop: 5
                      }}
                    >
                      <p
                        style={{
                          textTransform: 'uppercase',
                          color: 'white'
                        }}
                      >
                        Protestos
                      </p>
                    </div>
                    {protestos[0].data !== '' && (
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          marginTop: 5
                        }}
                      >
                        <p
                          style={{
                            width: '25%',
                            fontFamily: 'Helvetica-Bold'
                          }}
                        >
                          Data
                        </p>
                        <p
                          style={{
                            width: '15%',
                            fontFamily: 'Helvetica-Bold'
                          }}
                        >
                          Cartório
                        </p>
                        <p
                          style={{
                            width: '25%',
                            fontFamily: 'Helvetica-Bold'
                          }}
                        >
                          Valor
                        </p>
                        <p
                          style={{
                            width: '35%',
                            fontFamily: 'Helvetica-Bold'
                          }}
                        >
                          Cidade/Estado
                        </p>
                      </div>
                    )}
                    <div
                      style={{
                        display: 'flex',
                        width: '100%',
                        flexDirection: 'column',
                        marginTop: 10
                      }}
                    >
                      {protestos[0].data === '' ? (
                        <p
                          style={{
                            width: '25%',
                            marginLeft: 5
                          }}
                        >
                          Nada Consta
                        </p>
                      ) : (
                        protestos.map(item => (
                          <div
                            style={{
                              margin: '5px 5px',
                              display: 'flex',
                              flexDirection: 'row',
                              width: '100%'
                            }}
                            key={item.data}
                          >
                            <p style={{ width: '25%' }}>
                              {item.data.split(' ')[0]}
                            </p>
                            <p style={{ width: '15%' }}>{item.cartorio}</p>
                            <p style={{ width: '25%' }}>
                              {new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                              }).format(Number(item.valor))}
                            </p>
                            <p style={{ width: '35%' }}>{item.cidadeUF}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  <div style={{ width: '100%' }}>
                    <div
                      style={{
                        backgroundColor: 'rgb(52, 108, 176)',
                        width: '100%',
                        borderRadius: 3,
                        padding: 5,
                        marginTop: 5
                      }}
                    >
                      <p
                        style={{
                          textTransform: 'uppercase',
                          color: 'white'
                        }}
                      >
                        Cheques sem fundo
                      </p>
                    </div>
                    {chequeSF[0].data !== '' && (
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          marginTop: 5
                        }}
                      >
                        <p
                          style={{
                            width: '10%',
                            fontFamily: 'Helvetica-Bold'
                          }}
                        >
                          Data
                        </p>
                        <p
                          style={{
                            width: '10%',
                            margin: '0px 15px',
                            fontFamily: 'Helvetica-Bold'
                          }}
                        >
                          Cheque
                        </p>
                        <p
                          style={{
                            width: '10%',
                            fontFamily: 'Helvetica-Bold'
                          }}
                        >
                          Alinea
                        </p>
                        <p
                          style={{
                            width: '15%',
                            fontFamily: 'Helvetica-Bold'
                          }}
                        >
                          Qte Cheque
                        </p>
                        <p
                          style={{
                            width: '15%',
                            fontFamily: 'Helvetica-Bold'
                          }}
                        >
                          Valor
                        </p>
                        <p
                          style={{
                            width: '15%',
                            fontFamily: 'Helvetica-Bold'
                          }}
                        >
                          Banco
                        </p>
                        <p
                          style={{
                            width: '15%',
                            fontFamily: 'Helvetica-Bold'
                          }}
                        >
                          Agência
                        </p>
                        <p
                          style={{
                            width: '15%',
                            fontFamily: 'Helvetica-Bold'
                          }}
                        >
                          Cidade/Estado
                        </p>
                      </div>
                    )}
                    <div
                      style={{
                        display: 'flex',
                        width: '100%',
                        flexDirection: 'column',
                        marginTop: 10
                      }}
                    >
                      {chequeSF[0].data === '' ? (
                        <p
                          style={{
                            width: '25%',
                            marginLeft: 5
                          }}
                        >
                          Nada Consta
                        </p>
                      ) : (
                        chequeSF.map(item => (
                          <div
                            style={{
                              margin: '5px 5px',
                              display: 'flex',
                              flexDirection: 'row',
                              width: '100%'
                            }}
                            key={item.data}
                          >
                            <p style={{ width: '10%' }}>
                              {item.data.split(' ')[0]}
                            </p>
                            <p style={{ width: '10%', margin: 'px 15px' }}>
                              {item.cheque}
                            </p>
                            <p style={{ width: '10%' }}>{item.alinea}</p>
                            <p style={{ width: '15%' }}>{item.qteCheque}</p>
                            <p style={{ width: '15%' }}>
                              {new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                              }).format(Number(item.valor))}
                            </p>
                            <p style={{ width: '15%' }}>{item.banco}</p>
                            <p style={{ width: '15%' }}>{item.agencia}</p>
                            <p style={{ width: '15%' }}>{item.cidadeUF}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  <div style={{ width: '100%' }}>
                    <div
                      style={{
                        backgroundColor: 'rgb(52, 108, 176)',
                        width: '100%',
                        borderRadius: 3,
                        padding: 5,
                        marginTop: 5
                      }}
                    >
                      <p
                        style={{
                          textTransform: 'uppercase',
                          color: 'white'
                        }}
                      >
                        CADIN
                      </p>
                    </div>
                    {cadin[0].nomeCredor !== '' && (
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          marginTop: 5
                        }}
                      >
                        <p
                          style={{
                            width: '50%',
                            fontFamily: 'Helvetica-Bold'
                          }}
                        >
                          Sigla Credor
                        </p>
                        <p
                          style={{
                            width: '50%',
                            fontFamily: 'Helvetica-Bold'
                          }}
                        >
                          Nome Credor
                        </p>
                      </div>
                    )}
                    <div
                      style={{
                        display: 'flex',
                        width: '100%',
                        flexDirection: 'column',
                        marginTop: 10
                      }}
                    >
                      {cadin[0].nomeCredor === '' ? (
                        <p
                          style={{
                            width: '25%',
                            marginLeft: 5
                          }}
                        >
                          Nada Consta
                        </p>
                      ) : (
                        cadin.map(item => (
                          <div
                            style={{
                              margin: '5px 5px',
                              display: 'flex',
                              flexDirection: 'row',
                              width: '100%'
                            }}
                            key={item.siglaCredor}
                          >
                            <p style={{ width: '50%%' }}>{item.siglaCredor}</p>
                            <p style={{ width: '50%' }}>{item.nomeCredor}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  <div style={{ width: '100%' }}>
                    <div
                      style={{
                        backgroundColor: 'rgb(52, 108, 176)',
                        width: '100%',
                        borderRadius: 3,
                        padding: 5,
                        marginTop: 5
                      }}
                    >
                      <p
                        style={{
                          textTransform: 'uppercase',
                          color: 'white'
                        }}
                      >
                        SICCF
                      </p>
                    </div>
                    {siccf[0].data !== '' && (
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          marginTop: 5
                        }}
                      >
                        <p
                          style={{
                            width: '25%',
                            fontFamily: 'Helvetica-Bold'
                          }}
                        >
                          Data
                        </p>
                        <p
                          style={{
                            width: '15%',
                            margin: '0px 15px',
                            fontFamily: 'Helvetica-Bold'
                          }}
                        >
                          Tipo Conta
                        </p>
                        <p
                          style={{
                            width: '15%',
                            fontFamily: 'Helvetica-Bold'
                          }}
                        >
                          Banco
                        </p>
                        <p
                          style={{
                            width: '15%',
                            fontFamily: 'Helvetica-Bold'
                          }}
                        >
                          Agência
                        </p>
                        <p
                          style={{
                            width: '15%',
                            fontFamily: 'Helvetica-Bold'
                          }}
                        >
                          Alinea
                        </p>
                        <p
                          style={{
                            width: '25%',
                            fontFamily: 'Helvetica-Bold'
                          }}
                        >
                          Qte Ocorrência
                        </p>
                      </div>
                    )}
                    <div
                      style={{
                        display: 'flex',
                        width: '100%',
                        flexDirection: 'column',
                        marginTop: 10
                      }}
                    >
                      {siccf[0].data === '' ? (
                        <p
                          style={{
                            width: '25%',
                            marginLeft: 5
                          }}
                        >
                          Nada Consta
                        </p>
                      ) : (
                        siccf.map(item => (
                          <div
                            style={{
                              margin: '5px 5px',
                              display: 'flex',
                              flexDirection: 'row',
                              width: '100%'
                            }}
                            key={item.data}
                          >
                            <p style={{ width: '25%' }}>
                              {item.data.split(' ')[0]}
                            </p>
                            <p style={{ width: '15%', margin: '0px 15px' }}>
                              {item.tipoConta}
                            </p>
                            <p style={{ width: '15%' }}>{item.banco}</p>
                            <p style={{ width: '15%' }}>{item.agencia}</p>
                            <p style={{ width: '15%' }}>{item.alinea}</p>
                            <p style={{ width: '25%' }}>{item.qteOcorrencia}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  <div style={{ width: '100%' }}>
                    <div
                      style={{
                        backgroundColor: 'rgb(52, 108, 176)',
                        width: '100%',
                        borderRadius: 3,
                        padding: 5,
                        marginTop: 5
                      }}
                    >
                      <p
                        style={{
                          textTransform: 'uppercase',
                          color: 'white'
                        }}
                      >
                        Convenio devedores
                      </p>
                    </div>
                    {convenioDevedores[0].data !== '' && (
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          marginTop: 5
                        }}
                      >
                        <p
                          style={{
                            width: '20%',
                            fontFamily: 'Helvetica-Bold'
                          }}
                        >
                          Data
                        </p>
                        <p
                          style={{
                            width: '25%',
                            margin: '0px 15px',
                            fontFamily: 'Helvetica-Bold'
                          }}
                        >
                          Tipo Financiamento
                        </p>
                        <p
                          style={{
                            width: '15%',
                            fontFamily: 'Helvetica-Bold'
                          }}
                        >
                          Valor
                        </p>
                        <p
                          style={{
                            width: '15%',
                            fontFamily: 'Helvetica-Bold'
                          }}
                        >
                          CNPJ
                        </p>
                        <p
                          style={{
                            width: '20%',
                            fontFamily: 'Helvetica-Bold'
                          }}
                        >
                          Banco Contrato
                        </p>
                        <p
                          style={{
                            width: '15%',
                            fontFamily: 'Helvetica-Bold'
                          }}
                        >
                          Cidade/Estado
                        </p>
                      </div>
                    )}
                    <div
                      style={{
                        display: 'flex',
                        width: '100%',
                        flexDirection: 'column',
                        marginTop: 10
                      }}
                    >
                      {convenioDevedores[0].data === '' ? (
                        <p
                          style={{
                            width: '25%',
                            marginLeft: 5
                          }}
                        >
                          Nada Consta
                        </p>
                      ) : (
                        convenioDevedores.map(item => (
                          <div
                            style={{
                              margin: '5px 5px',
                              display: 'flex',
                              flexDirection: 'row',
                              width: '100%'
                            }}
                            key={item.data}
                          >
                            <p style={{ width: '20%' }}>
                              {item.data.split(' ')[0]}
                            </p>
                            <p style={{ width: '25%', margin: '0px 15px' }}>
                              {item.tipoFinanciamento}
                            </p>
                            <p style={{ width: '15%' }}>
                              R${' '}
                              {new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                              }).format(Number(item.valor))}
                            </p>
                            <p style={{ width: '15%' }}>{item.cnpj}</p>
                            <p style={{ width: '20%' }}>{item.bancoContrato}</p>
                            <p style={{ width: '15%' }}>{item.cidadeUF}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </BlockConsult>
        </ContentConsult>
      </WrapperConsult>
    </Layout>
  )
}
