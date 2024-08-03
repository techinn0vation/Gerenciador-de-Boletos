/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { Layout, SideBar } from '@/components/GeralComponents'
import { useState, useEffect } from 'react'

import {
  BlockRegistration,
  FieldRegistration,
  ButtonSaveDate,
  FieldRegistrationTextArea
} from '@components/Modal/styles'

import {
  ContentGerarBoleto,
  WrapperGerarBoleto,
  DisplayInputMask,
  ViewGerarBoleto
} from '@components/Gerar_Boleto/styles'

import { api } from '@/services/api'
import { useRouter } from 'next/router'
import {
  Boleto,
  type IBoletoProps
} from '@/components/Gerar_Boleto/Reac_Boleto'
import { BlockConsult } from '@/components/StylesPages/StylesConsulta'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { Pix } from '@/components/Gerar_Pix/Reac_Pix'
import {
  WrapperOperador
} from '@/components/StylesPages/StylesOperador'
import CopyToClipboard from 'react-copy-to-clipboard'

interface IResult {
  data: IBoletoProps;
}

export default function PaymentDate() {
  const [loading, setLoading] = useState(false)
  const [nomeCliente, setNomeCliente] = useState<string | undefined>('')
  const [cpfCnpj, setCpfCnpj] = useState<string | undefined>('')
  const [valor, setValor] = useState('')
  const [dataVencimento, setDataVencimento] = useState('')
  const [descricao, setDescricao] = useState<string | undefined>('')
  const [nomeAvalista, setNomeAvalista] = useState('')
  const [tipoDocumento, setTipoDocumento] = useState<string | undefined>('')
  const [codigoBarras, setCodigoBarras] = useState<string | undefined>('')
  const [codigoCliente, setCodigoCliente] = useState<string | undefined>('')
  const [tipoUser, setTipoUser] = useState('')
  const [txid, setTxid] = useState('')
  const [cidade, setCidade] = useState<string | undefined>('')
  const [chavePix, setChavePix] = useState<string | undefined>('')
  const [chaveCopiaCola, setChaveCopiaCola] = useState<string>('')
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    setCopied(true)
  }

  const router = useRouter()

  const { id } = router.query

  useEffect(() => {
    async function getUser() {
      const token = window.localStorage.getItem('token')
      const Auth = `Bearer ${token}`
      setLoading(true)
      await api
        .get('/user', { headers: { Authorization: Auth } })
        .then(result => {
          setTipoUser(result.data.tipo)
        })
      setLoading(false)
    }
    getUser()
  }, [])

  useEffect(() => {
    async function getBoleto() {
      const token = window.localStorage.getItem('token')
      const Auth = `Bearer ${token}`
      let valorData: string
      setLoading(true)
      api
        .get(`/boleto/${id}`, { headers: { Authorization: Auth } })
        .then(async ({ data }: IResult) => {
          setNomeCliente(data.nomeCliente)
          setValor(data.valor)
          setDataVencimento(data.dataVencimento)
          setDescricao(data.descricao)
          setTipoDocumento(data.tipo)
          setCodigoCliente(data.codigoCliente)
          setCpfCnpj(data.cpfCnpj)
          setCidade(data.cidade)
          valorData = data.valor
          if (data.tipo === 'bo') {
            setCodigoBarras(data.codigoBarrasPix)
            await api
              .get('/configuracoes', { headers: { Authorization: Auth } })
              .then(({ data }) => {
                setNomeAvalista(data.nomeAvalistaBoleto)
              })
              .catch(error => {
                alert(error)
              })
          } else if (data.tipo === 'px') {
            await api
              .get('/configuracoes', { headers: { Authorization: Auth } })
              .then(async ({ data: dataConfig }) => {
                setNomeAvalista(dataConfig.nomeAvalistaPix)
                setChavePix(dataConfig.chavePix)
                setTxid(dataConfig.codigoTransferencia)

                const valorCerto = valor.length === 6 ? valor.replace(',', '.') : valor.replace('.', '').replace(',', '.')

                await api.post('/gerarPix', {
                  nomeCliente: dataConfig.nomeAvalistaPix,
                  cidade: dataConfig.cidade,
                  pix: dataConfig.chavePix,
                  valorAPagar: valorCerto,
                  txid: dataConfig.codigoTransferencia
                }).then(result => {
                  setCodigoBarras(result.data.brcode)
                  setChaveCopiaCola(result.data.brcode)
                })
              })
              .catch(error => {
                alert(error)
              })
          }
        })
      setLoading(false)
    }
    getBoleto()
  }, [])


  async function updateBoleto() {
    const token = window.localStorage.getItem('token')
    const Auth = `Bearer ${token}`
    await api
      .put(
        `/boleto/${id}`,
        {
          nomeCliente,
          valor,
          dataVencimento,
          codigoCliente,
          cpfCnpj,
          descricao,
          codigoBarrasPix: codigoBarras
        },
        { headers: { Authorization: Auth } }
      )
      .then(async () => {
        return await router.push('/dashboard')
      })
  }

  async function HandleDelete() {
    const token = window.localStorage.getItem('token')
    const Auth = `Bearer ${token}`
    await api
      .delete(`/boleto/${id}`, { headers: { Authorization: Auth } })
      .then(async () => {
        return await router.push('/dashboard')
      })
  }

  function formatData(event: any) {
    const input = event.target
    const value = input.value

    // Remove qualquer caractere que não seja um dígito
    const digitsOnly = value.replace(/\D/g, '')

    // Aplica a máscara de CPF (000.000.000-00)
    const formattedValue = digitsOnly.replace(
      /(\d{2})(\d{2})(\d{4})/,
      '$1/$2/$3'
    )

    // Atualiza o valor do input com a versão formatada
    input.value = formattedValue
    setDataVencimento(formattedValue)
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
    setCpfCnpj(formattedValue)
  }

  const formatter = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  function formatValor(e: any) {
    const input = e.target;
    // elimina tudo que não é dígito
    input.value = input.value.replace(/\D+/g, '');
    if (input.value.length === 0) // se não tem nada preenchido, não tem o que fazer
      return;
    // verifica se ultrapassou a quantidade máxima de dígitos (pegar o valor no dataset)
    const maxDigits = parseInt(input.dataset.maxDigits);
    if (input.value.length > maxDigits) {
      // O que fazer nesse caso? Decidi pegar somente os primeiros dígitos
      input.value = input.value.substring(0, maxDigits);
    }
    // lembrando que o valor é a quantidade de centavos, então precisa dividir por 100
    const formattedValue = formatter.format(parseInt(input.value) / 100);

    input.value = formattedValue
    setValor(formattedValue)
  }

  return (
    <Layout>
      <WrapperOperador>
        <SideBar />
        <ContentGerarBoleto>
          <ViewGerarBoleto>
            <BlockRegistration>
              <FieldRegistration
                type="text"
                value={nomeCliente}
                onChange={e => {
                  setNomeCliente(e.target.value)
                }}
                placeholder="nome cliente"
              />
              <FieldRegistration
                type="text"
                value={cpfCnpj}
                onChange={e => {
                  setCpfCnpj(e.target.value)
                }}
                pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
                onKeyUp={event => {
                  formatCPF(event)
                }}
                maxLength={14}
                placeholder="cpf/cnpj"
              />
              <FieldRegistration
                type="text"
                onKeyUp={event => { formatValor(event) }}
                onChange={e => { setValor(e.target.value); }}
                placeholder="valor"
                value={valor}
              />
              <DisplayInputMask
                type="text"
                value={dataVencimento}
                pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
                placeholder="Data de Vencimento"
                onKeyUp={event => {
                  formatData(event)
                }}
                maxLength={14}
                onChange={e => {
                  setDataVencimento(e.target.value)
                }}
              />
              <FieldRegistrationTextArea
                value={descricao}
                onChange={e => {
                  setDescricao(e.target.value)
                }}
                placeholder="descrição"
              />
              <FieldRegistration
                type="text"
                value={codigoBarras}
                disabled={tipoUser !== 'A'}
                onChange={e => {
                  setCodigoBarras(e.target.value)
                }}
                placeholder="código de barra"
              />
            </BlockRegistration>
            <BlockConsult style={{ flexDirection: 'row' }}>
              <ButtonSaveDate onClick={HandleDelete}>excluir</ButtonSaveDate>
              <ButtonSaveDate>
                {nomeCliente === '' ||
                  valor === '' ||
                  dataVencimento === '' ||
                  nomeAvalista === '' ||
                  codigoBarras === '' ? (
                  'Aguarde'
                ) : tipoDocumento === 'bo' ? (
                  <PDFDownloadLink
                    style={{ textDecoration: 'none', color: 'white' }}
                    document={
                      <Boleto
                        nomeCliente={nomeCliente}
                        codigoCliente={Math.floor(
                          Date.now() * Math.random()
                        ).toString()}
                        valor={valor}
                        nomeAvalistaBoleto={nomeAvalista}
                        dataVencimento={dataVencimento}
                        codigoBarrasPix={codigoBarras}
                        descricao={descricao}
                      />
                    }
                    fileName={`${nomeCliente} - CPF ${cpfCnpj} .pdf`}
                  >
                    {({ blob, url, loading, error }) =>
                      loading ? 'Carregando' : 'Baixar'
                    }
                  </PDFDownloadLink>
                ) : (
                  <PDFDownloadLink
                    style={{ textDecoration: 'none', color: 'white' }}
                    document={
                      <Pix
                        cidade={cidade}
                        nomeCliente={nomeCliente}
                        codigoCliente={Math.floor(
                          Date.now() * Math.random()
                        ).toString()}
                        valor={valor}
                        nomeAvalistaPix={nomeAvalista}
                        dataVencimento={dataVencimento}
                        pix={codigoBarras}
                        cpfCnpj={cpfCnpj}
                        descricao={descricao}
                        txid={txid}
                      />
                    }
                    fileName={`${nomeCliente} - CPF ${cpfCnpj} .pdf`}
                  >
                    {({ blob, url, loading, error }) =>
                      loading ? 'Carregando' : 'Baixar'
                    }
                  </PDFDownloadLink>
                )}
              </ButtonSaveDate>
              <CopyToClipboard
                text={`${chaveCopiaCola}`}
                onCopy={handleCopy}
              >
                <ButtonSaveDate>
                  {chaveCopiaCola === "" ? "aguarde" : copied ? 'copiado!' : 'copiar chave'}
                </ButtonSaveDate>
              </CopyToClipboard>
              <ButtonSaveDate
                onClick={updateBoleto}
                disabled={tipoUser !== 'A'}
              >
                Enviar
              </ButtonSaveDate>
            </BlockConsult>
          </ViewGerarBoleto>
        </ContentGerarBoleto>
      </WrapperOperador>
    </Layout>
  )
}
