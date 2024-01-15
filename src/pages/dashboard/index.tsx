/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
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

import { api } from '@/services/api'

export default function Dashboard() {
  const [countPix, setCountPix] = useState(0)
  const [countBoleto, setCountBoleto] = useState(0)
  const [valorPix, setValorPix] = useState(0)
  const [valorBoleto, setValorBoleto] = useState(0)

  async function getBoletos() {
    const token = window.localStorage.getItem('token')
    const Auth = `Bearer ${token}`
    await api
      .get('/boleto', { headers: { Authorization: Auth } })
      .then(result => {
        setCountPix(result.data.filter(item => item.tipo === 'px').length)

        setCountBoleto(result.data.filter(item => item.tipo === 'bo').length)

        let valorTotalPix = 0
        result.data
          .filter(fi => fi.tipo === 'px')
          .forEach(item => {
            const valorCerto =
              item.valor.length === 6
                ? item.valor.replace(',', '.')
                : item.valor.replace('.', '').replace(',', '.')

            valorTotalPix += parseFloat(valorCerto) || 0
          })

        let valorTotalBoleto = 0
        result.data
          .filter(fi => fi.tipo === 'bo')
          .forEach(item => {
            const valorCerto =
              item.valor.length === 6
                ? item.valor.replace(',', '.')
                : item.valor.replace('.', '').replace(',', '.')

            valorTotalBoleto += parseFloat(valorCerto) || 0
          })

        setValorPix(valorTotalPix)
        setValorBoleto(valorTotalBoleto)
      })
      .catch(error => {
        alert(error)
      })
  }

  useEffect(() => {
    getBoletos()
  }, [])

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
              <DisplayTypography DisplayTypography={`qtd ${countBoleto}`} />
            </DisplayCard>
            <DisplayCard>
              <FrameCard src={SVG_B003} alt="" priority={true} />
              <DisplayTitle DisplayTitle="pix emitidos hoje" />
              <DisplayTypography DisplayTypography={`qtd ${countPix}`} />
            </DisplayCard>
            <DisplayCard>
              <FrameCard src={SVG_B003} alt="" priority={true} />
              <DisplayTitle DisplayTitle="valor total / boletos" />
              <DisplayTypography DisplayTypography="r$&ensp;0" />
            </DisplayCard>
            <DisplayCard>
              <FrameCard src={SVG_B003} alt="" priority={true} />
              <DisplayTitle DisplayTitle="valor total / pix" />
              <DisplayTypography DisplayTypography={`r$ ${valorPix}`} />
            </DisplayCard>
          </CardsDashboard>
        </ContentDashboard>
      </WrapperDashboard>
    </Layout>
  )
}
