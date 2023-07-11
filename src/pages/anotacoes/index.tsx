import {
  WrapperAnotações,
  ContentAnotações
} from '..//..//components/StylesPages/StylesAnotacões'

import { Layout, SideBar, Headline } from '..//..//components/GeralComponents'

export default function Anotações() {
  return (
    <Layout>
      <WrapperAnotações>
        <SideBar />
        <ContentAnotações>
          <Headline title="bloco de anotações" text="bloco de anotações" />
        </ContentAnotações>
      </WrapperAnotações>
    </Layout>
  )
}
