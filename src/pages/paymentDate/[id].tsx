/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { Layout, SideBar } from '@/components/GeralComponents'
import { useState, useEffect } from 'react'

import {
  BlockRegistration,
  FieldRegistration,
  ButtonSaveDate
} from '@components/Modal/styles'

import {
  ContentGerarBoleto,
  WrapperGerarBoleto,
  DisplayInputMask,
  ViewGerarBoleto
} from '@components/Gerar_Boleto/styles'

import { api } from '@/services/api'
import { useRouter } from 'next/router'
import { useParams } from 'next/navigation'
import {
  Boleto,
  type IBoletoProps
} from '@/components/Gerar_Boleto/Reac_Boleto'
import { BlockConsult } from '@/components/StylesPages/StylesConsulta'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { Pix } from '@/components/Gerar_Pix/Reac_Pix'
import {
  BlockOperador,
  ContentOperador,
  WrapperOperador
} from '@/components/StylesPages/StylesOperador'
import { ScreenCheckUsuario } from '@/components/StylesPages/StylesUsuario'

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
  const [cidade, setCidade] = useState<string | undefined>('')

  const token = localStorage.getItem('token')
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  const Auth = `Bearer ${token}`
  const router = useRouter()

  const { id } = router.query

  useEffect(() => {
    async function getUser() {
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
      setLoading(true)
      api
        .get(`/boleto/${id}`, { headers: { Authorization: Auth } })
        .then(async ({ data }: IResult) => {
          setNomeCliente(data.nomeCliente)
          setValor(data.valor)
          setDataVencimento(data.dataVencimento)
          setDescricao(data.descricao)
          setTipoDocumento(data.tipo)
          setCodigoBarras(data.codigoBarrasPix)
          setCodigoCliente(data.codigoCliente)
          setCpfCnpj(data.cpfCnpj)
          setCidade(data.cidade)
          if (data.tipo === 'bo') {
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
              .then(({ data }) => {
                setNomeAvalista(data.nomeAvalistaPix)
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
                type="number"
                value={valor}
                onChange={e => {
                  setValor(e.target.value)
                }}
                placeholder="valor"
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
              <FieldRegistration
                type="text"
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