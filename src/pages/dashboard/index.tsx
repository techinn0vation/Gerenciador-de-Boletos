import React, { useState, useEffect } from 'react'

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

export default function Dashboard() {
  // Estado para armazenar os dados dos boletos e PIX
  const [boletos, setBoletos] = useState<
    Array<{ id: number, quantidade: number, valor: number }>
  >([])
  const [pix, setPix] = useState<
    Array<{ id: number, quantidade: number, valor: number }>
  >([])

  // Efeito para buscar os dados dos boletos e PIX ao carregar o componente
  useEffect(() => {
    // Função fictícia para buscar os dados dos boletos (substitua pelo seu método de busca)
    const fetchBoletosData = () => {
      // Simulação de dados de exemplo para boletos
      const boletosData = [
        { id: 1, quantidade: 10, valor: 100 },
        { id: 2, quantidade: 5, valor: 50 }
        // Outros dados de boletos...
      ]
      setBoletos(boletosData)
    }

    // Função fictícia para buscar os dados dos PIX (substitua pelo seu método de busca)
    const fetchPixData = () => {
      // Simulação de dados de exemplo para PIX
      const pixData = [
        { id: 1, quantidade: 8, valor: 80 },
        { id: 2, quantidade: 3, valor: 30 }
        // Outros dados de PIX...
      ]
      setPix(pixData)
    }

    fetchBoletosData()
    fetchPixData()
  }, [])

  // Função para calcular o valor total dos boletos
  const calcularValorTotalBoletos = () => {
    return boletos.reduce((total, boleto) => total + boleto.valor, 0)
  }

  // Função para calcular o valor total dos PIX
  const calcularValorTotalPix = () => {
    return pix.reduce((total, pixItem) => total + pixItem.valor, 0)
  }

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
              <DisplayTypography DisplayTypography={`qtd ${boletos.length}`} />
            </DisplayCard>
            <DisplayCard>
              <FrameCard src={SVG_B003} alt="" priority={true} />
              <DisplayTitle DisplayTitle="pix emitidos hoje" />
              <DisplayTypography DisplayTypography={`qtd ${pix.length}`} />
            </DisplayCard>
            <DisplayCard>
              <FrameCard src={SVG_B003} alt="" priority={true} />
              <DisplayTitle DisplayTitle="valor total / boletos" />
              <DisplayTypography
                DisplayTypography={`r$ ${calcularValorTotalBoletos()}`}
              />
            </DisplayCard>
            <DisplayCard>
              <FrameCard src={SVG_B003} alt="" priority={true} />
              <DisplayTitle DisplayTitle="valor total / pix" />
              <DisplayTypography
                DisplayTypography={`r$ ${calcularValorTotalPix()}`}
              />
            </DisplayCard>
          </CardsDashboard>
        </ContentDashboard>
      </WrapperDashboard>
    </Layout>
  )
}

// export default function Dashboard() {
//   return (
//     <Layout>
//       <WrapperDashboard>
//         <SideBar />
//         <ContentDashboard>
//           <HeadlineDashboard>
//             <DisplayTitle DisplayTitle="painel principal" />
//             <DisplayTypography DisplayTypography="todo esforço tem sua recompensa. Bom trabalho!" />
//           </HeadlineDashboard>
//           <CardsDashboard>
//             <DisplayCard>
//               <FrameCard src={SVG_B003} alt="" priority={true} />
//               <DisplayTitle DisplayTitle="boletos emitidos hoje" />
//               <DisplayTypography DisplayTypography="qtd&ensp;0" />
//             </DisplayCard>
//             <DisplayCard>
//               <FrameCard src={SVG_B003} alt="" priority={true} />
//               <DisplayTitle DisplayTitle="pix emitidos hoje" />
//               <DisplayTypography DisplayTypography="qtd&ensp;0" />
//             </DisplayCard>
//             <DisplayCard>
//               <FrameCard src={SVG_B003} alt="" priority={true} />
//               <DisplayTitle DisplayTitle="valor total / boletos" />
//               <DisplayTypography DisplayTypography="r$&ensp;0" />
//             </DisplayCard>
//             <DisplayCard>
//               <FrameCard src={SVG_B003} alt="" priority={true} />
//               <DisplayTitle DisplayTitle="valor total / pix" />
//               <DisplayTypography DisplayTypography="r$&ensp;0" />
//             </DisplayCard>
//           </CardsDashboard>
//         </ContentDashboard>
//       </WrapperDashboard>
//     </Layout>
//   )
// }
