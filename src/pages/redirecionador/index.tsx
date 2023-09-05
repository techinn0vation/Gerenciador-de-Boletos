import {
  WrapperRedirecionador,
  ContentRedirecionador,
  ButtonGeradorLinks,
  ContentLinksGerados
} from '../../components/StylesPages/StylesLinks'

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

import { FaLink } from 'react-icons/fa'
import { useState } from 'react'

export default function Redirecionador() {
  const [modalGerarLinks, setModalGerarLinks] = useState(false)
  function handleGerarLink() {
    setModalGerarLinks(!modalGerarLinks)
  }
  return (
    <Layout>
      <WrapperRedirecionador>
        <SideBar />
        <ContentRedirecionador>
          <Headline
            title="redirecionador de links"
            text="o único lugar onde o sucesso vem antes do trabalaho é no dicionário."
          />
          <ButtonGeradorLinks onClick={handleGerarLink}>
            <FaLink />
            <DisplayTypography DisplayTypography="gerar link" />
          </ButtonGeradorLinks>
          {/* =============================== */}
          {modalGerarLinks && (
            <WrapperModal>
              <ContentModal>
                <DisplayButtonClose onClick={handleGerarLink} />
                <Headline title="gerar links" text="insira os dados abaixo." />
                <BlockRegistration>
                  <FieldRegistration type="text" placeholder="nome" />
                  <FieldRegistration type="text" placeholder="número" />
                </BlockRegistration>
                <ButtonSaveDate>Salvar</ButtonSaveDate>
              </ContentModal>
            </WrapperModal>
          )}
          {/* =============================== */}
          <ContentLinksGerados></ContentLinksGerados>
        </ContentRedirecionador>
      </WrapperRedirecionador>
    </Layout>
  )
}
