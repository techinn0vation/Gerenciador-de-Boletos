/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { useEffect, useState } from 'react'

import { Layout, SideBar, Headline } from '@/components/GeralComponents'
import { TbReload } from 'react-icons/tb'
import {
  WrapperOperador,
  ContentOperador,
  ScreenCheckOperador
} from '..//..//components/StylesPages/StylesOperador'
import {
  ViewTabelaValores,
  WrapperTabelaValores
} from '@/components/Tabela-Valores/styles'
import {
  TableData,
  TableRow,
  WrapperTable
} from '@/components/StylesPages/StylesUsuarios'
import Link from 'next/link'
import { FaEdit, FaShareAlt, FaTrashAlt } from 'react-icons/fa'
import {
  BlockRegistration,
  ButtonSaveDate,
  FieldRegistration
} from '@/components/Modal/styles'
import { useRouter } from 'next/router'
import { api } from '@/services/api'
import { io } from 'socket.io-client'
import { DisplayInputMask } from '@/components/Gerar_Boleto/styles'

export interface IGerenciamentoPix {
  id?: number;
  nomeCliente: string;
  cpfCnpj: string;
  valor: string;
  local?: string;
  ipCliente?: string;
  linkAcessado: boolean;
  expired: boolean;
  status: string;
  dataAberto: string;
  codigoCliente: string;
  user_id?: number;
}

export default function GerenciamentoPix() {
  const [pixs, setPixs] = useState<IGerenciamentoPix[]>([])
  const [nomeCliente, setNomeCliente] = useState('')
  const [cpfCnpj, setCpfCnpj] = useState('')
  const [valor, setValor] = useState('')
  const [chavePix, setChavePix] = useState<string | undefined>('')

  const [timeLeftArray, setTimeLeftArray] = useState<number[]>([])

  const [nomeAvalista, setNomeAvalista] = useState('')
  const [txid, setTxid] = useState('')

  const router = useRouter()

  async function getConfig() {
    const token = window.localStorage.getItem('token')
    const Auth = `Bearer ${token}`
    await api
      .get('/configuracoes', { headers: { Authorization: Auth } })
      .then(({ data }) => {
        setNomeAvalista(data.nomeAvalistaBoleto)
        setChavePix(data.chavePix)
        setTxid(data.codigoTransferencia)
      })
      .catch(error => {
        alert(error)
      })
  }

  async function getBoletos() {
    const token = window.localStorage.getItem('token')
    const Auth = `Bearer ${token}`
    await api
      .get('/gerenciamentoPix', { headers: { Authorization: Auth } })
      .then(result => {
        console.log(result.data)
        setPixs(result.data)
      })
      .catch(error => {
        alert(error)
      })
  }

  function registerSocket() {
    const socket = io(
      'https://sistema-boleto-server-production.up.railway.app',
      { transports: ['websocket'] }
    )
    socket.on('solicitarBoleto', (boleto: IGerenciamentoPix) => {
      setPixs(oldArray => [
        ...oldArray,
        {
          nomeCliente: boleto.nomeCliente,
          codigoCliente: boleto.codigoCliente,
          dataAberto: boleto.dataAberto,
          cpfCnpj: boleto.cpfCnpj,
          linkAcessado: boleto.linkAcessado,
          valor: boleto.valor,
          expired: boleto.expired,
          status: boleto.status,
          ipCliente: boleto.ipCliente
        }
      ])
    })
  }

  useEffect(() => {
    getBoletos()
  }, [])

  useEffect(() => {
    getConfig()
  }, [])

  useEffect(() => {
    registerSocket()
  }, [])

  async function HandleDelete(id?: number) {
    const token = window.localStorage.getItem('token')
    const Auth = `Bearer ${token}`
    await api
      .delete(`/gerenciamentoPix/${id}`, { headers: { Authorization: Auth } })
      .then(async () => {
        router.reload()
      })
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

  const formatter = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })

  function formatValor(e: any) {
    const input = e.target
    // elimina tudo que não é dígito
    input.value = input.value.replace(/\D+/g, '')
    if (input.value.length === 0)
      // se não tem nada preenchido, não tem o que fazer
      return
    // verifica se ultrapassou a quantidade máxima de dígitos (pegar o valor no dataset)
    const maxDigits = parseInt(input.dataset.maxDigits)
    if (input.value.length > maxDigits) {
      // O que fazer nesse caso? Decidi pegar somente os primeiros dígitos
      input.value = input.value.substring(0, maxDigits)
    }
    // lembrando que o valor é a quantidade de centavos, então precisa dividir por 100
    const formattedValue = formatter.format(parseInt(input.value) / 100)

    input.value = formattedValue
    setValor(formattedValue)
  }

  async function handleGerarBoleto() {
    if (nomeCliente === '' || cpfCnpj === '' || valor === '') {
      alert('Campos não podem ser vazios')
      return
    }

    const clienteCodigo = Math.floor(Date.now() * Math.random()).toString()
    const token = window.localStorage.getItem('token')
    const Auth = `Bearer ${token}`
    try {
      await api
        .post(
          'gerenciamentoPix',
          {
            nomeCliente,
            valor,
            dataAberto: '',
            codigoCliente: clienteCodigo,
            cpfCnpj,
            expired: false,
            local: '',
            ipCliente: '',
            linkAcessado: false,
            status: 'aguardando'
          },
          { headers: { Authorization: Auth } }
        )
        .then(() => {
          setNomeCliente('')
          setCpfCnpj('')
          setValor('')
          router.reload()
        })
    } catch (error) {
      alert(error)
    }
  }

  useEffect(() => {
    const calculateTimeLeft = () => {
      const currentTime = new Date().getTime()
      const differences = pixs.map(boleto => {
        const targetTime = new Date(boleto.dataAberto).getTime()
        return Math.max(targetTime - currentTime, 0) // Evita tempos negativos
      })
      setTimeLeftArray(differences)
    }

    // Atualiza imediatamente e a cada segundo
    calculateTimeLeft()
    const interval = setInterval(calculateTimeLeft, 1000)

    return () => {
      clearInterval(interval)
    } // Limpa o intervalo ao desmontar
  }, [pixs])

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  const copyGeneratedText = (nome: string) => {
    if (!nome) {
      alert('Nada para copiar! Por favor, gere um texto primeiro.')
      return
    }

    navigator.clipboard
      .writeText(`https://acordospayments-hj6aec9h.b4a.run/pay?nome=${nome}`)
      .then(() => {
        alert('Texto copiado com sucesso!')
      })
      .catch(() => {
        alert('Erro ao copiar o texto.')
      })
  }

  async function handleReset(nome: string) {
    await api
      .put(`/gerenciamentoPix/${nome}`, {
        dataAberto: '',
        expired: false,
        status: 'aguardando'
      })
      .then(async () => {
        router.reload()
      })
  }

  return (
    <Layout>
      <WrapperOperador>
        <SideBar />
        <ContentOperador>
          <Headline title="Gerenciamento pix" text="" />
          <BlockRegistration>
            <FieldRegistration
              type="text"
              placeholder="nome do cliente"
              value={nomeCliente}
              onChange={e => {
                setNomeCliente(e.target.value)
              }}
            />
            <DisplayInputMask
              type="text"
              value={cpfCnpj}
              onChange={e => {
                setCpfCnpj(e.target.value)
              }}
              pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
              onKeyUp={event => {
                formatCPF(event)
              }}
              maxLength={21}
              placeholder="cpf/cnpj"
            />
            <FieldRegistration
              type="text"
              required
              onKeyUp={event => {
                formatValor(event)
              }}
              onChange={e => {
                setValor(e.target.value)
              }}
              placeholder="valor"
              value={valor}
            />
            <ButtonSaveDate
              onClick={handleGerarBoleto}
              disabled={
                !!(nomeCliente === '' || cpfCnpj === '' || valor === '')
              }
            >
              {nomeCliente === '' || cpfCnpj === '' || valor === ''
                ? 'Preencha os campos!'
                : 'salvar'}
            </ButtonSaveDate>
          </BlockRegistration>

          <ScreenCheckOperador>
            <ViewTabelaValores>
              <WrapperTabelaValores
                style={{ boxShadow: 'none', backgroundColor: 'transparent' }}
              >
                <WrapperTable
                  style={{
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  {pixs.map((boleto, index) => (
                    <TableRow key={index}>
                      <TableData>{boleto.nomeCliente}</TableData>

                      <TableData>{boleto.cpfCnpj}</TableData>

                      <TableData>{boleto.valor}</TableData>

                      <TableData>{boleto.local}</TableData>

                      <TableData>{boleto.ipCliente}</TableData>

                      <TableData>
                        {boleto.linkAcessado ? 'sim' : 'não'}
                      </TableData>

                      <TableData>{boleto.status}</TableData>

                      <TableData>
                        {boleto.dataAberto === '' || boleto.expired
                          ? 'Não inicializado!'
                          : formatTime(timeLeftArray[index] || 0)}
                      </TableData>

                      <ButtonSaveDate
                        style={{
                          padding: 5,
                          margin: 0,
                          width: '25px',
                          marginBottom: 20
                        }}
                        onClick={() => {
                          copyGeneratedText(boleto.nomeCliente)
                        }}
                      >
                        <FaShareAlt />
                      </ButtonSaveDate>

                      <ButtonSaveDate
                        style={{
                          padding: 5,
                          margin: 0,
                          width: '25px',
                          marginBottom: 20
                        }}
                        onClick={() => {
                          HandleDelete(boleto.id)
                        }}
                      >
                        <FaTrashAlt color="white" />
                      </ButtonSaveDate>

                      <ButtonSaveDate
                        style={{
                          padding: 2.5,
                          margin: 0,
                          width: '25px',
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginBottom: 20
                        }}
                        onClick={() => {
                          handleReset(boleto.nomeCliente)
                        }}
                      >
                        <TbReload />
                      </ButtonSaveDate>
                    </TableRow>
                  ))}
                </WrapperTable>
              </WrapperTabelaValores>
            </ViewTabelaValores>
          </ScreenCheckOperador>
        </ContentOperador>
      </WrapperOperador>
    </Layout>
  )
}
