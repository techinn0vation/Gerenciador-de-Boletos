/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing, @typescript-eslint/no-explicit-any, prettier/prettier */


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

interface Ocorrencia {
  sistema?: string
  ocorrencia?: string
  data_pesquisa?: string
  validade?: string
  descricao?: string
}

interface DetalheDescricao {
  tipo: string
  campos: Record<string, string>
}

interface GrupoOcorrencia {
  sistema: string
  ocorrencia: string
  data_pesquisa: string
  validade: string
  descricoes: DetalheDescricao[]
}

interface ProcessedData {
  IDENTIFICAÇÃO: {
    Nome: string
    CPF: string
  }
  SISTEMAS: GrupoOcorrencia[]
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

  const [debitos, setDebitos] = useState<Debito[]>([]);
  const [protestos, setProtestos] = useState<Protesto[]>([]);

  const [erro, setErro] = useState('')

  const [query, setQuery] = useState<QueryResponse | ProcessedData | null>(null)

  const [resultado, setResultado] = useState('')

  const [loading, setLoading] = useState(false)

  const [cpf, setCpf] = useState('')
  const [copied, setCopied] = useState(false)

  function parseDescricao(descricao: string): DetalheDescricao {
    const partes = descricao.split(' - ').filter(p => p.trim() !== '')

    // Primeira parte é sempre o tipo
    const tipo = partes[0].split(':')[0].trim()

    const campos: Record<string, string> = {}

    for (const parte of partes.slice(1)) {
      const [chaveBruta, ...valorParts] = parte.split(':')
      const chave = formatarChave(chaveBruta.trim())
      const valor = valorParts.join(':').trim()

      if (chave && valor) {
        campos[chave] = valor
      }
    }

    return { tipo, campos }
  }

  function formatarChave(chaveBruta: string): string {
    return chaveBruta
      .toLowerCase()
      .replace(/[^a-z0-9áéíóúâêîôûãõç\s]/gi, '') // Remove caracteres especiais
      .trim()
      .replace(/\s+/g, ' ') // Normaliza espaços
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (match, index) =>
        index === 0 ? match.toLowerCase() : match.toUpperCase()
      ) // camelCase
      .replace(/\s+/g, '')
  }

  function processarDados(json: {
    informacoes: any
    ocorrencias: Ocorrencia[]
  }): ProcessedData {
    const result: ProcessedData = {
      IDENTIFICAÇÃO: {
        Nome: json.informacoes.nome,
        CPF: json.ocorrencias[0].ocorrencia || ''
      },
      SISTEMAS: []
    }

    let currentSystem: GrupoOcorrencia | null = null

    json.ocorrencias.slice(1).forEach(item => {
      if (item.sistema && item.ocorrencia) {
        currentSystem = {
          sistema: item.sistema,
          ocorrencia: item.ocorrencia,
          data_pesquisa: item.data_pesquisa || '',
          validade: item.validade || '',
          descricoes: []
        }
        result.SISTEMAS.push(currentSystem)
      } else if (item.descricao && currentSystem) {
        currentSystem.descricoes.push(parseDescricao(item.descricao))
      }
    })

    return result
  }

  async function onConsulta() {
    // Resetar estados
    setIdentificacao({
      'Data de Nascimento': '',
      CPF: '',
      Nome: ''
    });
    setRegistroDebitos({ 'Valor total (R$):': '' });
    setRegistroProtestos({ 'Valor total (R$):': '' });
    setDebitos([]);
    setProtestos([]);
    setQuery(null);
    setCpf('');
    setErro('');
    setLoading(true);

    try {
      if (cpf.length < 11) {
        throw new Error('CPF inválido');
      }

      const response = await fetch(`/api/consulta?cpfCnpj=${cpf}`);
      const data = await response.json();

      // Processar os dados com a nova função
      const processedData = processarDados(data);

      setQuery(processedData);

      // Atualizar identificação
      setIdentificacao({
        'Data de Nascimento': '', // Adicione campo se existir nos dados
        Nome: processedData.IDENTIFICAÇÃO.Nome,
        CPF: processedData.IDENTIFICAÇÃO.CPF
      });

      // Processar sistemas e ocorrências
      let totalDebitos = 0;
      let totalProtestos = 0;
      const novosDebitos: any[] = [];
      const novosProtestos: any[] = [];

      processedData.SISTEMAS.forEach(sistema => {
        sistema.descricoes.forEach(descricao => {
          // Classificar por tipo de ocorrência
          if (descricao.tipo.includes('Protesto') || descricao.tipo.includes('Pendencia')) {
            totalProtestos += parseFloat(descricao.campos.valor?.replace('R$ ', '') || '0');
            novosProtestos.push({
              "Data do protesto": descricao.campos.data,
              "Valor(R$)": descricao.campos.valor,
              "Cartório": descricao.campos.codigoIdentificacao,
              "Cidade": descricao.campos.cidade,
              "UF": descricao.campos.uf
            });
          } else {
            totalDebitos += parseFloat(descricao.campos.valor?.replace('R$ ', '') || '0');
            novosDebitos.push({
              'Ocorrência': sistema.ocorrencia,
              'Disponibilizado': descricao.campos.data,
              'Valor(R$)': descricao.campos.valor,
              'Informante': descricao.campos.nomeCredor,
              'Contrato': descricao.campos.numeroContrato,
              'Cidade': descricao.campos.cidade,
              'UF': descricao.campos.uf
            });
          }
        });
      });

      // Atualizar estados
      setRegistroProtestos({ 'Valor total (R$):': `R$ ${totalProtestos.toFixed(2)}` });
      setProtestos(novosProtestos);

      setRegistroDebitos({ 'Valor total (R$):': `R$ ${totalDebitos.toFixed(2)}` });
      setDebitos(novosDebitos);

    } catch (err) {
      console.error(err);
      setErro(err instanceof Error ? err.message : 'Erro na consulta');
      alert(err instanceof Error ? err.message : 'Erro na consulta');
    } finally {
      setLoading(false);
      setCpf('');
    }
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
    resultado += ` CPF/CNPJ: ${dados.msg['IDENTIFICAÇÃO'].CPF}\n`
    resultado += ` Data de Nascimento: ${dados.msg['IDENTIFICAÇÃO']['Data de Nascimento']}\n\n`

    // Debitos
    if (debitos.length > 0) {
      resultado += '\nDébitos:\n'
      debitos.forEach((ocorrencia, index) => {
        resultado += ` Débito ${index + 1}:\n`
        resultado += ` Ocorrência ${ocorrencia.Ocorrência}:\n`
        resultado += `  Disponibilizado: ${ocorrencia.Disponibilizado}\n`
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
      const texto = responseToText(query as QueryResponse)

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
                    <div style={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'stretch'
                    }}>
                      <div style={{
                        width: '70%',
                        flexDirection: 'column',
                        fontStyle: 'normal',
                        textAlign: 'left',
                        fontSize: 8
                      }}>
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
                        {/* <p
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
                        </p> */}
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
                            {/* <p style={{ width: '30%' }}>{item.Segmento}</p>
                            <p style={{ width: '8%' }}>{item.Tipo}</p> */}
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
