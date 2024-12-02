/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-base-to-string */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import {
  WrapperConsult,
  ContentConsult,
  BlockConsult,
  ButtonConsult,
  ScreenResult,
  ContentButtons
} from '..//..//components/StylesPages/StylesConsulta'

import { Layout, SideBar, Headline } from '..//..//components/GeralComponents'
import { useState } from 'react'
import { DisplayTextArea } from '@/components/Gerar_Boleto/styles'
import { FieldRegistration } from '@/components/Modal/styles'

export default function Calculadora() {
  const [loading, setLoading] = useState(false)
  const [valor, setValor] = useState<number | ''>('')
  const [desconto, setDesconto] = useState<number | ''>('')
  const [resultadoTexto, setResultadoTexto] = useState<string>('')

  const calcularDesconto = () => {
    if (valor === '' || desconto === '') {
      alert('Por favor, preencha os campos de valor e desconto.')
      return
    }

    const valorNumerico = typeof valor === 'number' ? valor : parseFloat(valor)
    const descontoNumerico =
      typeof desconto === 'number' ? desconto : parseFloat(desconto)

    if (isNaN(valorNumerico) || isNaN(descontoNumerico)) {
      alert('Os valores inseridos são inválidos.')
      return
    }

    const valorDesconto = valorNumerico * (descontoNumerico / 100)
    const valorFinal = valorNumerico - valorDesconto

    setResultadoTexto(
      `Para pagamento via *PIX* o sistema está liberando descontos sem juros e tributos, o débito de R$ ${formatarValor(
        valorNumerico
      )} fica *reduzido + ${descontoNumerico}% de desconto!* Pagando *R$ ${formatarValor(
        valorFinal
      )}* Exclusão dos débitos no sistema ocorre em até: 🕕 *16 HORAS*`
    )
  }

  const copyGeneratedText = () => {
    if (!resultadoTexto) {
      alert('Nada para copiar! Por favor, gere um texto primeiro.')
      return
    }

    navigator.clipboard
      .writeText(resultadoTexto)
      .then(() => {
        alert('Texto copiado com sucesso!')
      })
      .catch(() => {
        alert('Erro ao copiar o texto.')
      })
  }

  function formatarValor(valor: number): string {
    return valor.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  }

  return (
    <Layout>
      <WrapperConsult>
        <SideBar />
        <ContentConsult>
          <Headline title="Resultados" text="Insira os dados abaixo." />

          <BlockConsult>
            {/* Campo para Valor */}
            <label htmlFor="valor">Valor (R$):</label>
            <FieldRegistration
              type="number"
              id="valor"
              value={valor}
              placeholder="Ex: 1000"
              onChange={e => {
                setValor(
                  e.target.value === '' ? '' : parseFloat(e.target.value)
                )
              }}
            />

            {/* Campo para Percentual de Desconto */}
            <label htmlFor="desconto">Percentual de Desconto (%):</label>
            <FieldRegistration
              type="number"
              id="desconto"
              value={desconto}
              placeholder="Ex: 10"
              onChange={e => {
                setDesconto(
                  e.target.value === '' ? '' : parseFloat(e.target.value)
                )
              }}
            />

            {/* Botão para calcular o desconto */}
            <ButtonConsult disabled={loading} onClick={calcularDesconto}>
              Calcular
            </ButtonConsult>

            {/* Resultado Gerado */}
            {resultadoTexto && (
              <div id="resultadoSection">
                <h3>Texto Gerado:</h3>
                <p>{resultadoTexto}</p>

                {/* Botão para copiar o texto */}
                <ButtonConsult onClick={copyGeneratedText}>
                  Copiar Texto Gerado
                </ButtonConsult>
              </div>
            )}
          </BlockConsult>
        </ContentConsult>
      </WrapperConsult>
    </Layout>
  )
}
