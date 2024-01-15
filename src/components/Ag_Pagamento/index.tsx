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
import { type IAguaProps } from '../Gerar_Agua/Reac_Agua'

export default function AgPagamento() {
  const [boletos, setBoletos] = useState<IBoletoProps[]>([])
  const [agua, setAgua] = useState<IAguaProps[]>([])
  const [loading, setLoading] = useState(false)
  const [tipoUser, setTipoUser] = useState('')

  const router = useRouter()

  async function getBoletos() {
    const token = window.localStorage.getItem('token')
    const Auth = `Bearer ${token}`
    await api
      .get('/boleto', { headers: { Authorization: Auth } })
      .then(result => {
        setBoletos(result.data)
      })
      .catch(error => {
        alert(error)
      })
  }

  async function getAgua() {
    const token = window.localStorage.getItem('token')
    const Auth = `Bearer ${token}`
    await api
      .get('/agua', { headers: { Authorization: Auth } })
      .then(result => {
        setAgua(result.data)
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
    getBoletos()
  }, [])

  useEffect(() => {
    getAgua()
  }, [])

  useEffect(() => {
    registerSocket()
  }, [])

  return (
    <WrapperAgPagamentos>
      <Headline title="aguardando pagamento!" text="" />
      <ContentAgPagamentos>
        <ViewTabelaValores>
          <WrapperTabelaValores>
            <Headline title="valores para acordo - boleto e pix" text="" />
            <WrapperTable
              style={{
                display: 'flex',
                flexDirection: 'column'
              }}
            >
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
          <div style={{ marginTop: 20 }}></div>
          <WrapperTabelaValores>
            <Headline title="valores para acordo - agua" text="" />
            <WrapperTable
              style={{
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/*  */}
              {agua.map(agua => (
                <Link
                  style={{ textDecoration: 'none', width: '100%' }}
                  key={agua.id}
                  href={`/paymentDate/${agua.id}`}
                >
                  <TableRow>
                    <TableData>
                      {'AG'}
                      {agua.nomeCliente}
                    </TableData>
                    <TableData>{agua.dataVencimento}</TableData>
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
