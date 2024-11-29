/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/prefer-includes */
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

import { Layout, SideBar, Headline } from '..//..//components/GeralComponents'

import { api } from '@/services/api'
import { useState } from 'react'

import { DisplayTextArea } from '@/components/Gerar_Boleto/styles'
import { CopyToClipboard } from 'react-copy-to-clipboard'

interface SectionData {
  CADIN?: string[][];
  SCPC?: string[][];
  PROTESTOS?: string[][];
  'REFIN/PEFIN'?: string[][];
  PROTESTO?: string[][];
  'Pendências REFIN/PEFIN'?: string[][]
}

export default function Resultados() {
  const [loading, setLoading] = useState(false)
  const [text, setText] = useState('')
  const [totalSum, setTotalSum] = useState('')
  const [priceResult, setPriceResult] = useState('')
  const [obtainedPercentage, setObtainedPercentage] = useState('')
  const [showAnnouncement, setShowAnnouncement] = useState(false)
  const [debitos, setDebitos] = useState<
    Array<{ contrato: string, nome: string, valor: string }>
  >([])
  const [protestos, setProtestos] = useState<
    Array<{ cidade: string, data: string, valor: string }>
  >([])
  const [totalDebt, setTotalDebt] = useState('')

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
    let announcementText = `*📋 Abaixo estão os seus débitos disponíveis para negociação:*\n\n`
    announcementText += `Aproveite o Feirão Limpa Nome para quitar suas dívidas com condições imperdíveis e ficar no azul ainda hoje!\n\n`
    announcementText += `*Serasa Experian/SPC/Protesto*\n\n`

    debitos.forEach((debt, index) => {
      announcementText += `*Dívida ${index + 1}*\n`
      announcementText += `Nome: ${debt.nome || ''}\n`
      announcementText += `Valor: R$ ${debt.valor}\n`
      announcementText += `Contrato: ${debt.contrato}\n\n`
    })

    if (protestos.length > 0) {
      console.log(protestos)
      announcementText += `Protesto\n`
      protestos.forEach(protest => {
        announcementText += `Cidade: ${protest.cidade || ''}\n`
        announcementText += `Data: ${protest.data}\n`
        announcementText += `Valor: R$ ${protest.valor}\n\n`
      })
    }

    announcementText += `*Soma total dos seus débitos: ${totalDebt}*\n\n`
    announcementText += `*🎯 Aproveite o Feirão Limpa Nome e mude sua vida financeira!*\n\n`
    announcementText += `Essa é a sua chance de negociar suas dívidas com descontos incríveis de até 99% e condições especiais. Regularize sua situação hoje mesmo e recupere sua tranquilidade financeira!\n\n`
    announcementText += `⏳ Não perca tempo! Propostas válidas por tempo limitado.\n`
    announcementText += `💬 Fique no azul e aproveite essa oportunidade única!`

    navigator.clipboard
      .writeText(announcementText)
      .then(() =>
        alert('Mensagem completa copiada para a área de transferência!')
      )
      .catch(() => alert('Erro ao copiar a mensagem completa.'))
  }

  function parseData() {
    const lines = text.split('\n').filter(Boolean) // Divide em linhas e remove linhas vazias
    console.log(lines)
    const result: SectionData = {}
    // eslint-disable-next-line prettier/prettier
    let currentSection: keyof SectionData | '' = '' // Armazena a seção atual

    const sectionTitles: Array<keyof SectionData> = ['CADIN', 'SCPC', 'PROTESTOS', 'REFIN/PEFIN', 'PROTESTO', 'Pendências REFIN/PEFIN'] // Seções que queremos identificar

    lines.forEach(line => {
      const trimmedLine = line.trim()

      // Verifica se a linha é um título de seção
      const sectionFound = sectionTitles.find(title => trimmedLine.toLowerCase() === title.toLowerCase())

      if (sectionFound) {
        currentSection = sectionFound
        result[currentSection] = [] // Inicia um array para a nova seção
      } else if (currentSection) {
        // Adiciona os dados à seção atual
        const columns = line.split(/\s{1,}/) // Divide por espaços duplos ou mais
        result[currentSection]?.push(columns)
      }
    })
    console.log(result)

    const SCPC = result.SCPC
    const Protestos = result.PROTESTOS ? result.PROTESTOS : result.PROTESTO
    const RefinPefin = result['REFIN/PEFIN'] ? result['REFIN/PEFIN'] : result['Pendências REFIN/PEFIN']
    const CADIN = result['CADIN']

    const dadosFormatadosSCPC: Array<{
      contrato: string,
      nome: string,
      valor: string
    }> = []

    const dadosFormatadosProtestos: Array<{
      cidade: string,
      data: string,
      valor: string
    }> = []

    const dadosFormatadosRefinPefin: Array<{
      contrato: string,
      nome: string,
      valor: string
    }> = []

    const dadosFormatadosCadin: Array<{
      contrato: string,
      valor: string,
      nome: string
    }> = []

    if (CADIN) {
      for (let i = 1; i < CADIN.length; i++) {
        const item = CADIN[i]
        console.log(item)
        const contrato = Math.floor(Date.now() * Math.random()).toString()

        const nome = item.slice(0, item.indexOf('R$')).join(' ')

        const valor = item[item.indexOf('R$') + 1]

        dadosFormatadosCadin.push({
          contrato,
          nome,
          valor
        })
      }
    }

    if (RefinPefin) {
      console.log(RefinPefin)
      for (let i = 1; i < RefinPefin.length; i++) {
        const item = RefinPefin[i]

        const contrato = item[6]

        const nome = item.slice(8).join(' ').trim()

        const valor = item[item.indexOf('R$') + 1]

        dadosFormatadosRefinPefin.push({
          contrato,
          nome,
          valor
        })
      }
    }

    if (Protestos) {
      for (let i = 1; i < Protestos.length; i++) {
        const item = Protestos[i]
        const data = item[0]

        const valor = item[2]

        const cidade = item.slice(4).join(' ')

        dadosFormatadosProtestos.push({
          cidade,
          data,
          valor
        })
      }
    }

    if (SCPC) {
      for (let i = 1; i < SCPC.length; i++) {
        const item = SCPC[i]
        const contrato = Math.floor(Date.now() * Math.random()).toString()

        // 2. Juntar as strings que estão depois da data até o "R$"
        const nome = item.slice(2, item.indexOf('R$')).join(' ')

        // 3. Pegar o valor depois de "R$"
        const valor = item[item.indexOf('R$') + 1]

        dadosFormatadosSCPC.push({
          contrato,
          nome,
          valor
        })
      }
    }

    const validos = [
      ...dadosFormatadosSCPC,
      ...dadosFormatadosRefinPefin,
      ...dadosFormatadosCadin
    ].filter(item => item.nome && item.valor)

    const unicos = validos.filter(
      (item, index, self) =>
        index === self.findIndex(obj => obj.valor === item.valor)
    )

    console.log(validos)

    function parseDebtValue(value: string): number {
      return parseFloat(value.replace('R$', '').replace('.', '').replace(',', '.'));
    }

    const soma = unicos.reduce((acumulador, item) => {
      // Substituir vírgula por ponto e converter para número
      return acumulador + parseDebtValue(item.valor);
    }, 0)

    const somaDebitos = dadosFormatadosProtestos.reduce((acumulador, item) => {
      return acumulador + parseDebtValue(item.valor);
    }, 0)

    const somaTotal = soma + somaDebitos

    const totalFormatado = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(somaTotal);

    // Exibir os resultados
    console.log(dadosFormatadosRefinPefin, 'aqui')
    setDebitos(unicos)
    setProtestos(dadosFormatadosProtestos)
    setTotalDebt(totalFormatado)
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
            <ButtonConsult disabled={loading} onClick={parseData}>
              Calcular
            </ButtonConsult>

            <div>
              <p>
                {debitos.length > 0
                  ? 'Dados formatados com sucesso.. clique no botão abaixo para copiar!!'
                  : 'digite o texto acima'}
              </p>
            </div>

            <ButtonConsult onClick={copyAnnouncementText}>
              Copiar Texto
            </ButtonConsult>
            <ButtonConsult onClick={() => {
              setDebitos([])
              setProtestos([])
              setTotalDebt('')
              setText('')
            }}>
              Apagar tudo
            </ButtonConsult>

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
