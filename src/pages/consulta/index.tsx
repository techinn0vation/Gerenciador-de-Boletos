/* eslint-disable @typescript-eslint/dot-notation */
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
  type IIdentificacao,
  styles,
  type IRegistrosDebitos,
  type IRegistrosDebitosItem,
  type IProtestosItem,
  type IProtestos
} from '@/components/Gerar_Consulta'
import { debug } from 'console'

export default function Consulta() {
  const contentRef = useRef<HTMLDivElement>(null)
  const [identificacao, setIdentificacao] = useState<IIdentificacao>({
    'Data de Nascimento': '',
    CPF: '',
    Nome: ''
  })
  const [registroDebitos, setRegistroDebitos] = useState<IRegistrosDebitos>({
    'Valor total (R$):': ''
  })

  const [registroProtestos, setRegistroProtestos] = useState<IProtestos>({
    'Valor total (R$):': ''
  })

  const [protestos, setProtestos] = useState<IProtestosItem[]>([])

  const [debitos, setDebitos] = useState<IRegistrosDebitosItem[]>([])

  const [erro, setErro] = useState('')

  const [query, setQuery] = useState(null)

  const [resultado, setResultado] = useState('')

  const [loading, setLoading] = useState(false)

  const [cpf, setCpf] = useState('')
  const [copied, setCopied] = useState(false)

  async function onConsulta() {
    // if (nome !== '') {
    //   setNome('')
    //   setCpf('')
    //   setSerasa([])
    //   setPendencias([])
    //   setScpc([])
    //   setProtestos([])
    //   setChequeSF([])
    //   setCadin([])
    //   setSiccf([])
    //   setConvenioDevedores([])
    // }
    setLoading(true)
    if (cpf.length < 11) {
      alert('CPF inválido')
      setLoading(false)
    }

    await fetch(`/api/consulta?cpfCnpj=${cpf}`)
      .then(async result => {
        const response = await result.json()
        return response
      })
      .then(data => {
        setQuery(data)

        if (data.retorno === 'ERROR') {
          setErro(data.msg)
          setLoading(false)
          return alert(data.msg)
        }

        setIdentificacao({
          'Data de Nascimento': data.msg['IDENTIFICAÇÃO']['Data de Nascimento'],
          Nome: data.msg['IDENTIFICAÇÃO'].Nome,
          CPF: data.msg['IDENTIFICAÇÃO'].CPF
        })

        const qntDebitos = Number(data.msg['PAINEL DE CONTROLE'][0].Quantidade)
        const qntProtestos = Number(
          data.msg['PAINEL DE CONTROLE'][6].Quantidade
        )

        if (qntProtestos > 0) {
          setRegistroProtestos({
            'Valor total (R$):': data.msg['PROTESTOS']['Valor total (R$):']
          })
          for (let i = 0; i < qntProtestos; i++) {
            setProtestos(prevList => [
              ...prevList,
              {
                // eslint-disable-next-line prettier/prettier
                "Data do protesto": data.msg['PROTESTOS'][`${i}`]['Data do protesto'],
                // eslint-disable-next-line prettier/prettier
                "Valor(R$)": data.msg['PROTESTOS'][`${i}`]['Valor(R$)'],
                Cartório: data.msg['PROTESTOS'][`${i}`]['Cartório'],
                Cidade: data.msg['PROTESTOS'][`${i}`]['Cidade'],
                UF: data.msg['PROTESTOS'][`${i}`]['UF']
              }
            ])
          }
        }

        if (qntDebitos > 0) {
          setRegistroDebitos({
            'Valor total (R$):':
              data.msg['REGISTROS DE DÉBITOS']['Valor total (R$):']
          })

          for (let i = 0; i < qntDebitos; i++) {
            setDebitos(prevList => [
              ...prevList,
              {
                // eslint-disable-next-line prettier/prettier
                'Ocorrência':
                  data.msg['REGISTROS DE DÉBITOS'][`${i}`]['Ocorrência'],
                Disponibilizado:
                  data.msg['REGISTROS DE DÉBITOS'][`${i}`]['Disponibilizado'],
                Informante:
                  data.msg['REGISTROS DE DÉBITOS'][`${i}`]['Informante'],
                Segmento: data.msg['REGISTROS DE DÉBITOS'][`${i}`]['Segmento'],
                Tipo: data.msg['REGISTROS DE DÉBITOS'][`${i}`]['Tipo'],
                Contrato: data.msg['REGISTROS DE DÉBITOS'][`${i}`]['Contrato'],
                Cidade: data.msg['REGISTROS DE DÉBITOS'][`${i}`]['Cidade'],
                UF: data.msg['REGISTROS DE DÉBITOS'][`${i}`]['UF'],
                // eslint-disable-next-line prettier/prettier
                'Situação': data.msg['REGISTROS DE DÉBITOS'][`${i}`]['Situação'],
                'Valor(R$)':
                  data.msg['REGISTROS DE DÉBITOS'][`${i}`]['Valor(R$)']
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
    resultado += ` Nome do Cliente: ${dados.msg['IDENTIFICAÇÃO']['Nome']}\n`
    resultado += ` CPF/CNPJ: ${dados.msg.IDENTIFICAÇÃO.CPF}\n`
    resultado += ` Data de Nascimento: ${dados.msg.IDENTIFICAÇÃO['Data de Nascimento']}\n\n`

    // Debitos
    if (debitos.length > 0) {
      resultado += '\nDébitos:\n'
      debitos.forEach((ocorrencia, index) => {
        resultado += ` Débito ${index + 1}:\n`
        resultado += ` Ocorrência ${ocorrencia.Ocorrência}:\n`
        resultado += `  Disponibilizado: ${ocorrencia.Disponibilizado}\n`
        resultado += `  Segmento: ${ocorrencia.Segmento}\n`
        resultado += `  Tipo: ${ocorrencia.Tipo}\n`
        resultado += `  Contrato: ${ocorrencia.Contrato}\n`
        resultado += `  Cidade: ${ocorrencia.Cidade}\n`
        resultado += `  UF: ${ocorrencia.UF}\n`
        resultado += `  Valor(R$): ${ocorrencia['Valor(R$)']}\n\n`
      })
      resultado += `Valor Total (R$): ${registroDebitos['Valor total (R$):']}\n\n`
    }
    // Pendências
    if (protestos.length > 0) {
      resultado += '\nProtestos:\n'
      protestos.forEach((pendencia, index) => {
        resultado += ` protesto ${index + 1}:\n`
        resultado += `  Data: ${pendencia['Data do protesto']}\n`
        resultado += `  Cartório: ${pendencia.Cartório} \n`
        resultado += `  Cidade: ${pendencia.Cidade} \n`
        resultado += `  UF: ${pendencia.UF} \n`
        resultado += `  Valor (R$): ${pendencia['Valor(R$)']}\n\n`
      })
      resultado += `Valor Total (R$): ${registroProtestos['Valor total (R$):']}\n\n`
    }

    // // SCPC
    // if (dados.msg.scpc.length > 0) {
    //   resultado += '\nSCPC:\n'
    //   dados.msg.scpc.forEach((ocorrencia, index) => {
    //     resultado += ` Ocorrência ${index + 1}:\n\n`
    //     resultado += `  Data Ocorrência: ${ocorrencia['Dt Ocorr'].replace(
    //       ' 00:00:00',
    //       ''
    //     )}\n`
    //     resultado += `  Tipo Devedor: ${ocorrencia['Tp Devedor']}\n`
    //     resultado += `  Nome: ${ocorrencia.Nome}\n`
    //     resultado += `  Valor Dívida (R$): ${new Intl.NumberFormat('pt-BR', {
    //       style: 'currency',
    //       currency: 'BRL'
    //     }).format(Number(ocorrencia['Vr Dívida']))}\n`
    //     resultado += `  Cidade: ${ocorrencia.Cidade}, UF: ${ocorrencia.UF}\n\n`
    //   })
    // }

    // // Protestos
    // if (dados.msg.protestos.length > 0) {
    //   resultado += '\nProtestos:\n'
    //   dados.msg.protestos.forEach((protesto, index) => {
    //     resultado += ` Protesto ${index + 1}:\n`
    //     resultado += `  Data: ${protesto.Data.replace(' 00:00:00', '')}\n`
    //     resultado += `  Valor Protesto (R$): ${new Intl.NumberFormat('pt-BR', {
    //       style: 'currency',
    //       currency: 'BRL'
    //     }).format(Number(protesto['Valor Protesto']))}\n`
    //     resultado += `  Cartório: ${protesto['Cartório']}\n`
    //     resultado += `  Cidade: ${protesto.Cidade}, UF: ${protesto.UF}\n\n`
    //   })
    // }

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
            {identificacao.Nome === '' ? (
              'Preencha os campos!'
            ) : (
              <>
                <ContentButtons>
                  <ButtonConsult
                    disabled={identificacao.Nome === '' || loading}
                  >
                    {identificacao.Nome === '' ? (
                      'Preencha os campos'
                    ) : (
                      <PDFDownloadLink
                        style={{ textDecoration: 'none', color: 'white' }}
                        document={
                          <ConsultaDocument
                            debitos={debitos}
                            identificacao={identificacao}
                            protestos={protestos}
                            registroDebitos={registroDebitos}
                            registroProtestos={registroProtestos}
                          />
                        }
                        fileName={`${identificacao.Nome} - CPF ${identificacao.CPF} .pdf`}
                      >
                        {({ blob, url, loading, error }) =>
                          loading ? 'Carregando...' : 'Gerar PDF'
                        }
                      </PDFDownloadLink>
                    )}
                  </ButtonConsult>

                  <ButtonConsult onClick={TextClipboard}>
                    {copied ? 'copiado!' : 'copiar dados'}
                  </ButtonConsult>
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
                          NOME DO CLIENTE: {identificacao.Nome}
                        </p>
                        <p
                          style={{
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            marginLeft: 20,
                            marginTop: 5
                          }}
                        >
                          CPF: {identificacao.CPF}
                        </p>

                        <p
                          style={{
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            marginLeft: 20,
                            marginTop: 5
                          }}
                        >
                          data de Nascimento:{' '}
                          {identificacao['Data de Nascimento']}
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
                        Débitos
                      </p>
                    </div>

                    {debitos.length > 0 && (
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          marginTop: 5
                        }}
                      >
                        <p
                          style={{
                            width: '15%',
                            fontFamily: 'Helvetica-Bold'
                          }}
                        >
                          Ocorrência
                        </p>
                        <p
                          style={{
                            width: '17%',
                            fontFamily: 'Helvetica-Bold'
                          }}
                        >
                          Disponibilizado
                        </p>
                        <p
                          style={{
                            width: '30%',
                            fontFamily: 'Helvetica-Bold'
                          }}
                        >
                          Informante
                        </p>
                        <p
                          style={{
                            width: '30%',
                            fontFamily: 'Helvetica-Bold'
                          }}
                        >
                          Segmento
                        </p>
                        <p
                          style={{
                            width: '8%',
                            fontFamily: 'Helvetica-Bold'
                          }}
                        >
                          Tipo
                        </p>
                        <p
                          style={{
                            width: '30%',
                            fontFamily: 'Helvetica-Bold'
                          }}
                        >
                          Contrato
                        </p>
                        <p
                          style={{
                            width: '25%',
                            fontFamily: 'Helvetica-Bold'
                          }}
                        >
                          Cidade
                        </p>
                        <p
                          style={{
                            width: '8%',
                            fontFamily: 'Helvetica-Bold'
                          }}
                        >
                          UF
                        </p>

                        <p
                          style={{
                            width: '30%',
                            fontFamily: 'Helvetica-Bold'
                          }}
                        >
                          Valor(R$)
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
                      {debitos.length === 0 ? (
                        <p
                          style={{
                            width: '25%',
                            marginLeft: 5
                          }}
                        >
                          Nada Consta
                        </p>
                      ) : (
                        debitos.map(item => (
                          <div
                            style={{
                              margin: '5px 5px',
                              display: 'flex',
                              flexDirection: 'row',
                              width: '100%'
                            }}
                            key={item.Contrato}
                          >
                            <p style={{ width: '15%' }}>{item.Ocorrência}</p>
                            <p style={{ width: '17%' }}>
                              {item.Disponibilizado}
                            </p>
                            <p style={{ width: '30%' }}>{item.Informante}</p>
                            <p style={{ width: '30%' }}>{item.Segmento}</p>
                            <p style={{ width: '8%' }}>{item.Tipo}</p>
                            <p style={{ width: '30%' }}>{item.Contrato}</p>
                            <p style={{ width: '25%' }}>{item.Cidade}</p>
                            <p style={{ width: '8%' }}>{item.UF}</p>
                            <p style={{ width: '30%' }}>{item['Valor(R$)']}</p>
                          </div>
                        ))
                      )}
                      <p
                        style={{
                          textTransform: 'uppercase',
                          marginLeft: 20,
                          marginTop: 5,
                          fontWeight: 'bold'
                        }}
                      >
                        Valor Total (R$): {registroDebitos['Valor total (R$):']}
                      </p>
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
                          Protestos
                        </p>
                      </div>

                      {protestos.length > 0 && (
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
                            Data do Protesto
                          </p>
                          <p
                            style={{
                              width: '25%',
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
                            Cidade
                          </p>
                          <p
                            style={{
                              width: '25%',
                              fontFamily: 'Helvetica-Bold'
                            }}
                          >
                            UF
                          </p>

                          <p
                            style={{
                              width: '25%',
                              fontFamily: 'Helvetica-Bold'
                            }}
                          >
                            Valor(R$)
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
                        {protestos.length === 0 ? (
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
                              key={item['Data do protesto']}
                            >
                              <p style={{ width: '25%' }}>
                                {item['Data do protesto']}
                              </p>
                              <p style={{ width: '25%' }}>{item.Cartório}</p>
                              <p style={{ width: '25%' }}>{item.Cidade}</p>
                              <p style={{ width: '25%' }}>{item.UF}</p>
                              <p style={{ width: '25%' }}>
                                {item['Valor(R$)']}
                              </p>
                            </div>
                          ))
                        )}
                        <p
                          style={{
                            textTransform: 'uppercase',
                            marginLeft: 20,
                            marginTop: 5,
                            fontWeight: 'bold'
                          }}
                        >
                          Valor Total (R$):{' '}
                          {registroProtestos['Valor total (R$):']}
                        </p>
                      </div>
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
