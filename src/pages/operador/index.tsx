import { useState } from 'react'

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

export default function Operador() {
  const [currentScreen, setCurrentScreen] = useState('aguardandoPagamento')

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
