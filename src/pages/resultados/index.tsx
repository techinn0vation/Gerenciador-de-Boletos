/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

import {
  WrapperConsult,
  ContentConsult,
  BlockConsult,
  ButtonConsult,
  ScreenResult,
  ContentButtons
} from '..//..//components/StylesPages/StylesConsulta'

import {
  Layout,
  SideBar,
  Headline,
  ConsultaDocument
} from '..//..//components/GeralComponents'

import moment from 'moment'

import { api } from '@/services/api'
import { useEffect, useRef, useState } from 'react'

import { PDFDownloadLink, PDFViewer, Document } from '@react-pdf/renderer'
import {
  DisplayInputMask,
  DisplayTextArea
} from '@/components/Gerar_Boleto/styles'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import {
  type IIdentificacao,
  styles,
  type IRegistrosDebitos,
  type IRegistrosDebitosItem,
  type IProtestosItem,
  type IProtestos
} from '@/components/Gerar_Consulta'
import { debug } from 'console'

export default function Resultados() {
  const [loading, setLoading] = useState(false)
  const [text, setText] = useState('')
  const [totalSum, setTotalSum] = useState('')
  const [priceResult, setPriceResult] = useState('')
  const [obtainedPercentage, setObtainedPercentage] = useState('')
  const [showAnnouncement, setShowAnnouncement] = useState(false)

  const calculatePrice = async () => {
    try {
      const response = await api.post('/get-price', { text })

      const data = await response.data
      setTotalSum(`R$ ${data.totalSum.toFixed(2).replace('.', ',')}`)
      setPriceResult(`R$ ${data.price}`)
      setObtainedPercentage(
        data.obtainedPercentage
          ? `${data.obtainedPercentage}%`
          : 'Valor fora da faixa'
      )

      // Exibe o anúncio
      setShowAnnouncement(true)
    } catch (error) {
      alert('Erro ao calcular a faixa de preço.')
    }
  }

  const copyText = () => {
    const copyText =
      `Total Somado: ${totalSum}\n` +
      `Faixa de Preço: ${priceResult}\n` +
      `Percentual de Desconto: ${obtainedPercentage}`

    navigator.clipboard
      .writeText(copyText)
      .then(() => alert('Texto copiado para a área de transferência!'))
      .catch(() => alert('Erro ao copiar o texto.'))
  }

  const copyAnnouncementText = () => {
    const announcementText =
      `📣✨ Feirão Limpa Nome 2024 chegou com tudo! ✨📣\n\n` +
      `🔸 Quer começar o ano com o pé direito e sair das dívidas? Agora é a sua chance!\n` +
      `🔸 Descontos exclusivos, condições imperdíveis e negociações que cabem no seu bolso! 💸💯\n\n` +
      `Pendências REFIN/PEFIN\n${text}\n\n` +
      `Total Somado: ${totalSum}\n` +
      `Faixa de Preço: ${priceResult}\n` +
      `Percentual de Desconto: ${obtainedPercentage}\n\n` +
      `🚀 Gostaria de negociar HOJE! 🚀`

    navigator.clipboard
      .writeText(announcementText)
      .then(() =>
        alert('Mensagem completa copiada para a área de transferência!')
      )
      .catch(() => alert('Erro ao copiar a mensagem completa.'))
  }

  return (
    <Layout>
      <WrapperConsult>
        <SideBar />
        <ContentConsult>
          <Headline title="Resultados" text="insira os dados abaixo." />

          <BlockConsult>
            <DisplayTextArea
              value={text}
              placeholder="Cole o texto de consulta aqui"
              onChange={e => setText(e.target.value)}
            />
            <ButtonConsult disabled={loading} onClick={calculatePrice}>
              Calcular
            </ButtonConsult>

            <div>
              <p>Total Somado: {totalSum}</p>
              <p>Faixa de Preço: {priceResult}</p>
              <p>Percentual de Desconto: {obtainedPercentage}</p>
            </div>

            <ButtonConsult onClick={copyText}>Copiar Texto</ButtonConsult>

            {showAnnouncement && (
              <div id="announcementSection">
                <h2>Anúncio</h2>
                <p>Pendências: {text}</p>
                <p>Total Somado: {totalSum}</p>
                <p>Faixa de Preço: {priceResult}</p>
                <p>Percentual de Desconto: {obtainedPercentage}</p>
                <ButtonConsult onClick={copyAnnouncementText}>
                  Copiar Anúncio Completo
                </ButtonConsult>
              </div>
            )}
          </BlockConsult>
        </ContentConsult>
      </WrapperConsult>
    </Layout>
  )
}
