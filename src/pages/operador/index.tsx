/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { useEffect, useState } from 'react'

import { BiTime, BiBarcode } from 'react-icons/bi'
import { MdPix } from 'react-icons/md'

import {
  Layout,
  SideBar,
  DisplayTypography,
  AgPagamento,
  GerarBoleto,
  GerarPix,
  GerarPixDois,
  Headline
} from '@/components/GeralComponents'

import {
  WrapperOperador,
  ContentOperador,
  BlockOperador,
  ButtonOperador,
  DisplayIconOperador,
  ScreenCheckOperador
} from '..//..//components/StylesPages/StylesOperador'
import { api } from '@/services/api'
import { type IBoletoProps } from '@/components/Gerar_Boleto/Reac_Boleto'
import { type IPix2Props } from '@/components/Gerar_Pix_Dois/Reac_Pix_Dois'
import { io } from 'socket.io-client'

export default function Operador() {
  const [currentScreen, setCurrentScreen] = useState('aguardandoPagamento')
  const [boletos, setBoletos] = useState<IBoletoProps[]>([])
  const [pix, setPix] = useState<IPix2Props[]>([])

  const handleButtonClick = (screen: string) => {
    setCurrentScreen(screen)
  }
  const renderScreen = () => {
    switch (currentScreen) {
      case 'aguardandoPagamento':
        return <AgPagamento />
      case 'gerarBoleto':
        return <GerarBoleto />
      case 'gerarPix':
        return <GerarPix />
      case 'gerarPixDois':
        return <GerarPixDois />
      default:
        return <div>Tela padrão</div>
    }
  }

  var token;
  useEffect(() => {
    token = localStorage.getItem('token')
  }, [])


  async function getBoletos() {
    await api
      .get('boleto', { headers: { Authorization: Auth } })
      .then(result => {
        setBoletos(result.data)
      })
      .catch(error => {
        alert(error)
      })
  }

  async function getPix() {
    await api
      .get('/pixUser', { headers: { Authorization: Auth } })
      .then(result => {
        setPix(result.data)
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
    socket.on('boletoGerado', (novoBoleto: IBoletoProps) => {
      getBoletos()
    })
  }

  useEffect(() => {
    getBoletos()
    getPix()
    registerSocket()
  }, [])

  return (
    <Layout>
      <WrapperOperador>
        <SideBar />
        <ContentOperador>
          <Headline
            title="gerador de boleto e pix - operador"
            text="o único lugar onde o sucesso vem antes do trabalho é no dicionário."
          />
          <BlockOperador>
            <ButtonOperador
              onClick={() => {
                handleButtonClick('aguardandoPagamento')
              }}
            >
              <DisplayIconOperador>
                <BiTime />
              </DisplayIconOperador>
              <DisplayTypography DisplayTypography="aguardando pagamento" />
            </ButtonOperador>
            <ButtonOperador
              onClick={() => {
                handleButtonClick('gerarBoleto')
              }}
            >
              <DisplayIconOperador>
                <BiBarcode />
              </DisplayIconOperador>
              <DisplayTypography DisplayTypography="gerar boleto" />
            </ButtonOperador>
            <ButtonOperador
              onClick={() => {
                handleButtonClick('gerarPix')
              }}
            >
              <DisplayIconOperador>
                <MdPix />
              </DisplayIconOperador>
              <DisplayTypography DisplayTypography="gerar pix" />
            </ButtonOperador>
            <ButtonOperador
              onClick={() => {
                handleButtonClick('gerarPixDois')
              }}
            >
              <DisplayIconOperador>
                <MdPix />
              </DisplayIconOperador>
              <DisplayTypography DisplayTypography="gerar pix dois" />
            </ButtonOperador>
          </BlockOperador>
          <ScreenCheckOperador>{renderScreen()}</ScreenCheckOperador>
        </ContentOperador>
      </WrapperOperador>
    </Layout>
  )
}
