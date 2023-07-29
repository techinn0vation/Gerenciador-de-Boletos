/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'

import {
  BlockRegistration,
  FieldRegistration,
  ButtonSaveDate
} from '../Modal/styles'

import {
  ContentGerarBoleto,
  WrapperGerarBoleto,
  DisplayInputMask
} from './styles'

import { DisplayTitle, Headline } from '@/components/GeralComponents'

import { api } from '@/services/api'
import { Boleto } from './Reac_Boleto'
import { PDFDownloadLink } from '@react-pdf/renderer'

export default function GerarBoleto() {
  const [loading, setLoading] = useState(false)
  const [nomeCliente, setNomeCliente] = useState('')
  const [cpfCnpj, setCpfCnpj] = useState('')
  const [valor, setValor] = useState('')
  const [dataVencimento, setDataVencimento] = useState('')
  const [descricao, setDescricao] = useState('')
  const [codigoDeBarras, setCodigoDeBarras] = useState('')
  const [nomeAvalistaBoleto, setNomeAvalistaBoleto] = useState('')

  const token = localStorage.getItem('token')
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  const Auth = `Bearer ${token}`

  useEffect(() => {
    async function getConfiguracoes() {
      try {
        const response = await api.get('/configuracoes', {
          headers: { Authorization: Auth }
        })
        setNomeAvalistaBoleto(response.data.nomeAvalistaBoleto)
      } catch (error) {
        alert(error)
      }
    }
    void getConfiguracoes()
  }, [Auth])

  async function handleGerarBoleto(): Promise<void> {
    if (
      nomeCliente === '' ||
      cpfCnpj === '' ||
      valor === '' ||
      dataVencimento === '' ||
      codigoDeBarras === ''
    ) {
      alert('Preencha todos os campos!')
    } else {
      console.log(Math.floor(Date.now() * Math.random()).toString())
    }
  }

  function formatData(event: any) {
    const input = event.target
    const value = input.value

    // Remove qualquer caractere que não seja um dígito
    const digitsOnly = value.replace(/\D/g, '')

    // Aplica a máscara de CPF (000.000.000-00)
    const formattedValue = digitsOnly.replace(
      /(\d{2})(\d{2})(\d{4})/,
      '$1/$2/$3'
    )

    // Atualiza o valor do input com a versão formatada
    input.value = formattedValue
  }

  return (
    <WrapperGerarBoleto>
      <Headline title="gerar boleto" text="insira os dados abaixo." />
      <ContentGerarBoleto>
        {loading ? (
          <DisplayTitle DisplayTitle="loading..." />
        ) : (
          <BlockRegistration>
            <FieldRegistration
              type="text"
              value={nomeCliente}
              onChange={e => {
                setNomeCliente(e.target.value)
              }}
              placeholder="nome cliente"
            />
            <FieldRegistration
              type="number"
              value={cpfCnpj}
              onChange={e => {
                setCpfCnpj(e.target.value)
              }}
              placeholder="cpf/cnpj"
            />
            <FieldRegistration
              type="number"
              value={valor}
              onChange={e => {
                setValor(e.target.value)
              }}
              placeholder="valor"
            />
            <DisplayInputMask
              type="text"
              value={dataVencimento}
              pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
              placeholder="Data de Vencimento"
              onKeyUp={event => {
                formatData(event)
              }}
              maxLength={14}
              onChange={e => {
                setDataVencimento(e.target.value)
              }}
            />
            <FieldRegistration
              type="text"
              value={descricao}
              onChange={e => {
                setDescricao(e.target.value)
              }}
              placeholder="descrição"
            />
            <FieldRegistration
              type="number"
              value={codigoDeBarras}
              onChange={e => {
                setCodigoDeBarras(e.target.value)
              }}
              placeholder="código de barra"
            />
            <ButtonSaveDate
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={handleGerarBoleto}
              disabled={
                nomeCliente === '' ||
                cpfCnpj === '' ||
                valor === '' ||
                dataVencimento === ''
              }
            >
              {nomeCliente === '' ||
                cpfCnpj === '' ||
                valor === '' ||
                dataVencimento === '' ||
                codigoDeBarras === '' ? (
                'Preencha os campos'
              ) : (
                <PDFDownloadLink
                  style={{ textDecoration: 'none', color: 'white' }}
                  document={
                    <Boleto
                      nomeCliente={nomeCliente}
                      codigoCliente={Math.floor(
                        Date.now() * Math.random()
                      ).toString()}
                      valor={valor}
                      nomeAvalistaBoleto={nomeAvalistaBoleto}
                      dataVencimento={dataVencimento}
                      codigoBarrasPix={codigoDeBarras}
                      descricao={descricao}
                    />
                  }
                  fileName={`${nomeCliente} - CPF ${cpfCnpj} .pdf`}
                >
                  {({ blob, url, loading, error }) =>
                    loading ? 'Carregando...' : 'Gerar Boleto'
                  }
                </PDFDownloadLink>
              )}
            </ButtonSaveDate>
          </BlockRegistration>
        )}
      </ContentGerarBoleto>
    </WrapperGerarBoleto>
  )
}
