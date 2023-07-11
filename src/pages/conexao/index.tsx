import { useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'

import {
  Layout,
  SideBar,
  DisplayTypography,
  Whatsapp,
  Headline
} from '@/components/GeralComponents'

import {
  WrapperConexao,
  ContentConexao,
  BlockConexao,
  ButtonConexao,
  DisplayIconConexao,
  ScreenCheckConexao
} from '..//..//components/StylesPages/StylesConexão'

export default function Conexão() {
  const [currentScreen, setCurrentScreen] = useState('whatsapp')

  const handleButtonClick = (screen: string) => {
    setCurrentScreen(screen)
  }
  const renderScreen = () => {
    switch (currentScreen) {
      case 'whatsapp':
        return <Whatsapp />
      default:
        return <div>Tela padrão</div>
    }
  }

  return (
    <Layout>
      <WrapperConexao>
        <SideBar />
        <ContentConexao>
          <Headline
            title="whatsapp conexão"
            text="adicione dados do o seu whatsapp, após isso leia o QRcode com o seu celular."
          />
          <BlockConexao>
            <ButtonConexao
              onClick={() => {
                handleButtonClick('whatsapp')
              }}
            >
              <DisplayIconConexao>
                <FaWhatsapp />
              </DisplayIconConexao>
              <DisplayTypography DisplayTypography="adicionar whatsapp" />
            </ButtonConexao>
          </BlockConexao>
          <ScreenCheckConexao>{renderScreen()}</ScreenCheckConexao>
        </ContentConexao>
      </WrapperConexao>
    </Layout>
  )
}
