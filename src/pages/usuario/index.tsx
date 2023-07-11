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

import { useState } from 'react'

import { BiTime, BiBarcode } from 'react-icons/bi'
import { MdPix } from 'react-icons/md'

import {
  WrapperUsuario,
  ContentUsuario,
  BlockUsuario,
  ButtonUsuario,
  DisplayIconUsuario,
  ScreenCheckUsuario
} from '..//..//components/StylesPages/StylesUsuario'

export default function Usuario() {
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
      <WrapperUsuario>
        <SideBar />
        <ContentUsuario>
          <Headline
            title="gerador de boleto e pix - usuário"
            text="o sucesso é ir de fracasso em fracasso sem perder o entusiasmo."
          />
          <BlockUsuario>
            <ButtonUsuario
              onClick={() => {
                handleButtonClick('aguardandoPagamento')
              }}
            >
              <DisplayIconUsuario>
                <BiTime />
              </DisplayIconUsuario>
              <DisplayTypography DisplayTypography="aguardando pagamento" />
            </ButtonUsuario>
            <ButtonUsuario
              onClick={() => {
                handleButtonClick('gerarBoleto')
              }}
            >
              <DisplayIconUsuario>
                <BiBarcode />
              </DisplayIconUsuario>
              <DisplayTypography DisplayTypography="gerar boleto" />
            </ButtonUsuario>
            <ButtonUsuario
              onClick={() => {
                handleButtonClick('gerarPix')
              }}
            >
              <DisplayIconUsuario>
                <MdPix />
              </DisplayIconUsuario>
              <DisplayTypography DisplayTypography="gerar pix" />
            </ButtonUsuario>
            <ButtonUsuario
              onClick={() => {
                handleButtonClick('gerarPixDois')
              }}
            >
              <DisplayIconUsuario>
                <MdPix />
              </DisplayIconUsuario>
              <DisplayTypography DisplayTypography="gerar pix dois" />
            </ButtonUsuario>
          </BlockUsuario>
          <ScreenCheckUsuario>{renderScreen()}</ScreenCheckUsuario>
        </ContentUsuario>
      </WrapperUsuario>
    </Layout>
  )
}
