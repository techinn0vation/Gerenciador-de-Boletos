/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect, useState } from 'react'
import { ContentAgPagamentos, WrapperAgPagamentos } from './styles'
import { Headline } from '@/components/GeralComponents'
import { Boleto, type IBoletoProps } from '../Gerar_Boleto/Reac_Boleto'
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
import { ButtonSaveDate } from '../Modal/styles'
import { FaTrashAlt, FaEdit } from 'react-icons/fa'
import { IoMdDownload, IoMdRefresh } from 'react-icons/io'

import { PDFDownloadLink } from '@react-pdf/renderer'
import { Pix } from '../Gerar_Pix/Reac_Pix'

export default function AgPagamento() {
  const [boletos, setBoletos] = useState<IBoletoProps[]>([])
  const [agua, setAgua] = useState<IAguaProps[]>([])
  const [loading, setLoading] = useState(false)
  const [tipoUser, setTipoUser] = useState('')
  const [chavePix, setChavePix] = useState<string | undefined>('')

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
    getConfig()
  }, [])

  useEffect(() => {
    registerSocket()
  }, [])

  async function HandleDelete(id?: number) {
    const token = window.localStorage.getItem('token')
    const Auth = `Bearer ${token}`
    await api
      .delete(`/boleto/${id}`, { headers: { Authorization: Auth } })
      .then(async () => {
        return await router.push('/dashboard')
      })
  }

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

                    <TableData>{boleto.dataVencimento}</TableData>

                    <Link
                      style={{
                        textDecoration: 'none',
                        color: 'white',
                        padding: 2.5,
                        margin: 0,
                        width: 25,
                        backgroundColor: '#00cc4c',
                        boxShadow: '0 0 0.4rem 0 #00cc4c',
                        alignItems: 'center',
                        textAlign: 'center',
                        borderRadius: 25,
                        marginBottom: 20
                      }}
                      key={boleto.id}
                      href={`/paymentDate/${boleto.id}`}
                    >
                      <FaEdit size={15} />
                    </Link>

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
                    >
                      {boleto.nomeCliente === '' ||
                      boleto.valor === '' ||
                      boleto.dataVencimento === '' ||
                      nomeAvalista === '' ||
                      boleto.codigoBarrasPix === '' ? (
                        'Aguarde'
                      ) : boleto.tipo === 'bo' ? (
                        <PDFDownloadLink
                          style={{
                            display: 'flex',
                            textDecoration: 'none',
                            color: 'white',
                            textAlign: 'center',
                            justifyContent: 'center'
                          }}
                          document={
                            <Boleto
                              nomeCliente={boleto.nomeCliente}
                              codigoCliente={Math.floor(
                                Date.now() * Math.random()
                              ).toString()}
                              valor={boleto.valor}
                              nomeAvalistaBoleto={nomeAvalista}
                              dataVencimento={boleto.dataVencimento}
                              codigoBarrasPix={boleto.codigoBarrasPix}
                              descricao={boleto.descricao}
                            />
                          }
                          fileName={`${boleto.nomeCliente} - CPF ${boleto.cpfCnpj} .pdf`}
                        >
                          {({ blob, url, loading, error }) =>
                            loading ? <IoMdRefresh /> : <IoMdDownload />
                          }
                        </PDFDownloadLink>
                      ) : (
                        <PDFDownloadLink
                          style={{ textDecoration: 'none', color: 'white' }}
                          document={
                            <Pix
                              cidade={boleto.cidade}
                              nomeCliente={boleto.nomeCliente}
                              codigoCliente={Math.floor(
                                Date.now() * Math.random()
                              ).toString()}
                              valor={boleto.valor}
                              nomeAvalistaPix={nomeAvalista}
                              dataVencimento={boleto.dataVencimento}
                              pix={boleto.codigoBarrasPix}
                              cpfCnpj={boleto?.cpfCnpj}
                              descricao={boleto.descricao}
                              txid={txid}
                            />
                          }
                          fileName={`${boleto.nomeCliente} - CPF ${boleto.cpfCnpj} .pdf`}
                        >
                          {({ blob, url, loading, error }) =>
                            loading ? <IoMdRefresh /> : <IoMdDownload />
                          }
                        </PDFDownloadLink>
                      )}
                    </ButtonSaveDate>
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
