/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { useState } from 'react'

import { BiTime, BiBarcode } from 'react-icons/bi'
import { MdPix } from 'react-icons/md'
import { IoIosWater } from 'react-icons/io'

import {
  Layout,
  SideBar,
  DisplayTypography,
  AgPagamento,
  GerarBoleto,
  GerarPix,
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
import GerarAgua from '@/components/Gerar_Agua'

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
      case 'gerarAgua':
        return <GerarAgua />
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
            title="gerador de boleto e pix"
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
                handleButtonClick('gerarAgua')
              }}
            >
              <DisplayIconOperador>
                <IoIosWater />
              </DisplayIconOperador>
              <DisplayTypography DisplayTypography="gerar agua" />
            </ButtonOperador>
          </BlockOperador>
          <ScreenCheckOperador>{renderScreen()}</ScreenCheckOperador>
        </ContentOperador>
      </WrapperOperador>
    </Layout>
  )
}
