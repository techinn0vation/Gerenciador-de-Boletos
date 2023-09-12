/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect, useState } from 'react'
import { ContentAgPagamentos, WrapperAgPagamentos } from './styles'
import { Headline } from '@/components/GeralComponents'
import { type IBoletoProps } from '../Gerar_Boleto/Reac_Boleto'
import { api } from '@/services/api'
import { useRouter } from 'next/router'
import { io } from 'socket.io-client'
import {
  ViewTabelaValores,
  WrapperTabelaValores
} from '../Tabela-Valores/styles'
import {
  TableData,
  TableRow,
  WrapperTable
} from '../StylesPages/StylesUsuarios'
import { GiTakeMyMoney } from 'react-icons/gi'
import Link from 'next/link'

export default function AgPagamento() {
  const [boletos, setBoletos] = useState<IBoletoProps[]>([])
  const [loading, setLoading] = useState(false)
  const [tipoUser, setTipoUser] = useState('')
  const [Auth, setAuth] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = window.localStorage.getItem('token')
      setAuth(token != null ? `Bearer ${token}` : '')
    }
  }, [])

  const router = useRouter()

  async function getBoletos() {
    await api
      .get('/allBoletos', { headers: { Authorization: Auth } })
      .then(result => {
        setBoletos(result.data)
      })
      .catch(error => {
        alert(error)
      })
  }

  async function getBoletoUsuario() {
    await api
      .get('/boleto', { headers: { Authorization: Auth } })
      .then(result => {
        setBoletos(result.data)
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
    socket.on('solicitarBoleto', (boleto: IBoletoProps) => {
      setBoletos(oldArray => [
        ...oldArray,
        {
          nomeCliente: boleto.nomeCliente,
          codigoCliente: boleto.codigoCliente,
          dataVencimento: boleto.dataVencimento,
          descricao: boleto.descricao,
          nomeAvalistaBoleto: boleto.nomeAvalistaBoleto,
          valor: boleto.valor,
          codigoBarrasPix: boleto.codigoBarrasPix
        }
      ])
    })
  }

  useEffect(() => {
    async function getUser() {
      setLoading(true)
      await api
        .get('/user', { headers: { Authorization: Auth } })
        .then(async result => {
          if (result.data.tipo !== 'A' && router.asPath === '/operador') {
            return await router.push('/dashboard')
          } else {
            if (router.asPath === '/operador') {
              getBoletos()
              registerSocket()
            } else {
              getBoletoUsuario()

              registerSocket()
            }
          }
        })
      setLoading(false)
    }
    getUser()
  }, [])

  return (
    <WrapperAgPagamentos>
      <Headline title="aguardando pagamento!" text="" />
      <ContentAgPagamentos>
        <ViewTabelaValores>
          <WrapperTabelaValores>
            <Headline title="valores para acordo" text="" />
            <WrapperTable
              style={{
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/*  */}
              {boletos.map(boleto => (
                <Link
                  style={{ textDecoration: 'none', width: '100%' }}
                  key={boleto.id}
                  href={`/paymentDate/${boleto.id}`}
                >
                  <TableRow>
                    <TableData>
                      {boleto.tipo?.toUpperCase()} <TableData />{' '}
                      {boleto.nomeCliente}
                    </TableData>
                    <TableData>
                      {boleto.codigoBarrasPix === ''
                        ? 'Aguardando'
                        : 'Registrado'}
                    </TableData>
                    <TableData>{boleto.dataVencimento}</TableData>
                  </TableRow>
                </Link>
              ))}
            </WrapperTable>
          </WrapperTabelaValores>
        </ViewTabelaValores>
      </ContentAgPagamentos>
    </WrapperAgPagamentos>
  )
}
