import SVG_B003 from '..//..//assets/svg/SVG_B003.svg'

import {
  DisplayTitle,
  DisplayTypography,
  Layout,
  SideBar
} from '@/components/GeralComponents'

import {
  WrapperDashboard,
  ContentDashboard,
  HeadlineDashboard,
  CardsDashboard,
  DisplayCard,
  FrameCard
} from '../..//components/StylesPages/StylesDashboard'

export default function Login() {
  return (
    <Layout>
      <WrapperDashboard>
        <SideBar />
        <ContentDashboard>
          <HeadlineDashboard>
            <DisplayTitle DisplayTitle="painel principal" />
            <DisplayTypography DisplayTypography="todo esforço tem sua recompensa. Bom trabalho!" />
          </HeadlineDashboard>
          <CardsDashboard>
            <DisplayCard>
              <FrameCard src={SVG_B003} alt="" priority={true} />
              <DisplayTitle DisplayTitle="boletos emitidos hoje" />
              <DisplayTypography DisplayTypography="qtd&ensp;0" />
            </DisplayCard>
            <DisplayCard>
              <FrameCard src={SVG_B003} alt="" priority={true} />
              <DisplayTitle DisplayTitle="pix emitidos hoje" />
              <DisplayTypography DisplayTypography="qtd&ensp;0" />
            </DisplayCard>
            <DisplayCard>
              <FrameCard src={SVG_B003} alt="" priority={true} />
              <DisplayTitle DisplayTitle="valor total / boletos" />
              <DisplayTypography DisplayTypography="r$&ensp;0" />
            </DisplayCard>
            <DisplayCard>
              <FrameCard src={SVG_B003} alt="" priority={true} />
              <DisplayTitle DisplayTitle="valor total / pix" />
              <DisplayTypography DisplayTypography="r$&ensp;0" />
            </DisplayCard>
          </CardsDashboard>
        </ContentDashboard>
      </WrapperDashboard>
    </Layout>
  )
}
