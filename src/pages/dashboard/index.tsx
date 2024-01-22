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
import { type IBoletoProps } from '@/components/Gerar_Boleto/Reac_Boleto'

export default function Dashboard() {
  const [admin, setAdmin] = useState(false)
  const [countPix, setCountPix] = useState(0)
  const [countBoleto, setCountBoleto] = useState(0)

  const [valoresUsers, setValoresUsers] = useState<
    Array<{ nome: string, countPix: number, countBoleto: number }>
  >([])

  const [valorPix, setValorPix] = useState(0)
  const [valorBoleto, setValorBoleto] = useState(0)

  interface IUser {
    id: number;
    nome: string;
    email: string;
    tipo: string;
    senha: string;
    boletos: IBoletoProps[];
  }

  async function getBoletos() {
    const token = window.localStorage.getItem('token')
    const Auth = `Bearer ${token}`

    await api
      .get('/user', { headers: { Authorization: Auth } })
      .then(async result => {
        setAdmin(result.data.tipo === 'A')
        if (result.data.tipo === 'A') {
          await api
            .get('/userBoleto', { headers: { Authorization: Auth } })
            .then(({ data }: { data: IUser[] }) => {
              let valorTotalPix = 0
              let valorTotalBoleto = 0
              let countPixUsers = 0
              let countBoletoUsers = 0
              let valorPixC = 0
              let valorBoletoC = 0

              for (let i = 0; i < data.length; i++) {
                data[i].boletos
                  .filter(fi => fi.tipo === 'px')
                  .forEach(item => {
                    const valorCerto =
                      item.valor.length === 6
                        ? item.valor.replace(',', '.')
                        : item.valor.replace('.', '').replace(',', '.')

                    valorTotalPix += parseFloat(valorCerto) || 0
                  })

                valorPixC += valorTotalPix

                countPixUsers += data[i].boletos.filter(
                  fi => fi.tipo === 'px'
                ).length

                data[i].boletos
                  .filter(fi => fi.tipo === 'bo')
                  .forEach(item => {
                    const valorCerto =
                      item.valor.length === 6
                        ? item.valor.replace(',', '.')
                        : item.valor.replace('.', '').replace(',', '.')

                    valorTotalBoleto += parseFloat(valorCerto) || 0
                  })

                valorBoletoC += valorTotalBoleto

                countBoletoUsers += data[i].boletos.filter(
                  fi => fi.tipo === 'bo'
                ).length

                setValoresUsers(state => [
                  ...state,
                  {
                    nome: data[i].nome,
                    countPix: valorTotalPix,
                    countBoleto: valorTotalBoleto
                  }
                ])

                valorTotalPix = 0
                valorTotalBoleto = 0
              }

              setValorPix(valorPixC)
              setValorBoleto(valorBoletoC)
              setCountPix(countPixUsers)
              setCountBoleto(countBoletoUsers)
            })
            .catch(error => {
              alert(error)
            })
        } else {
          await api
            .get('/boleto', { headers: { Authorization: Auth } })
            .then(({ data }: { data: IBoletoProps[] }) => {
              setCountPix(data.filter(item => item.tipo === 'px').length)

              setCountBoleto(data.filter(item => item.tipo === 'bo').length)

              let valorTotalPix = 0
              data
                .filter(fi => fi.tipo === 'px')
                .forEach(item => {
                  const valorCerto =
                    item.valor.length === 6
                      ? item.valor.replace(',', '.')
                      : item.valor.replace('.', '').replace(',', '.')

                  valorTotalPix += parseFloat(valorCerto) || 0
                })

              let valorTotalBoleto = 0
              data
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
              <DisplayTypography DisplayTypography={`r$ ${valorBoleto}`} />
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
