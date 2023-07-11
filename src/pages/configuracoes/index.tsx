import {
  WrapperConfiguracoes,
  ContentConfiguracoes,
  ButtonSalvarDados,
  ContentDadosGerados
} from '../../components/StylesPages/StylesConfiguraçoes'

import {
  Layout,
  SideBar,
  Headline,
  DisplayTypography
} from '../../components/GeralComponents'

// Importando de Modal (Principal)
import {
  WrapperModal,
  ContentModal,
  DisplayButtonClose,
  BlockRegistration,
  FieldRegistration,
  ButtonSaveDate
} from '@/components/Modal/styles'

import { FaDatabase } from 'react-icons/fa'
import { useState } from 'react'

export default function Configurações() {
  const [modalDados, setModalDados] = useState(false)
  function handleGerarLink() {
    setModalDados(!modalDados)
  }
  return (
    <Layout>
      <WrapperConfiguracoes>
        <SideBar />
        <ContentConfiguracoes>
          <Headline title="configurações" text="dados gerais" />
          <ButtonSalvarDados onClick={handleGerarLink}>
            <FaDatabase />
            <DisplayTypography DisplayTypography="inserir dados" />
          </ButtonSalvarDados>
          {/* =============================== */}
          {modalDados && (
            <WrapperModal>
              <ContentModal>
                <DisplayButtonClose onClick={handleGerarLink} />
                <Headline title="dados" text="insira os dados abaixo." />
                <BlockRegistration>
                  <FieldRegistration
                    type="text"
                    placeholder="nome avalista boleto"
                  />
                  <FieldRegistration
                    type="text"
                    placeholder="nome avalista pix"
                  />
                  <FieldRegistration type="text" placeholder="chave pix" />
                  <FieldRegistration type="text" placeholder="cidade" />
                  <FieldRegistration
                    type="text"
                    placeholder="código de transferência"
                  />
                  <ButtonSaveDate>
                    <DisplayTypography DisplayTypography="salvar" />
                  </ButtonSaveDate>
                </BlockRegistration>
              </ContentModal>
            </WrapperModal>
          )}
          {/* =============================== */}
          <ContentDadosGerados></ContentDadosGerados>
        </ContentConfiguracoes>
      </WrapperConfiguracoes>
    </Layout>
  )
}
