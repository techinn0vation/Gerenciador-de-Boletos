import {
  WrapperConsult,
  ContentConsult,
  BlockConsult,
  InputFieldConsult,
  ButtonConsult,
  ScreenResult
} from '..//..//components/StylesPages/StylesConsulta'

import {
  Layout,
  SideBar,
  Headline,
  DisplayTypography
} from '..//..//components/GeralComponents'

export default function Consulta() {
  return (
    <Layout>
      <WrapperConsult>
        <SideBar />
        <ContentConsult>
          <Headline title="consultar cpf" text="insira os dados abaixo." />
          <BlockConsult>
            <InputFieldConsult
              id="cpf"
              name="cpf"
              type="number"
              placeholder="digite o cpf"
            />
            <ButtonConsult>
              <DisplayTypography DisplayTypography="consultar cpf" />
            </ButtonConsult>
          </BlockConsult>
          <ScreenResult></ScreenResult>
        </ContentConsult>
      </WrapperConsult>
    </Layout>
  )
}
