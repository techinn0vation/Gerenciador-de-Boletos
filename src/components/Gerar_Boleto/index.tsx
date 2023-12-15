/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-misused-promises */
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
  DisplayInputMask,
  ViewGerarBoleto
} from './styles'

import { DisplayTitle, Headline } from '@/components/GeralComponents'

import { api } from '@/services/api'
import { Boleto } from './Reac_Boleto'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { useRouter } from 'next/router'

export default function GerarBoleto() {
  const [loading, setLoading] = useState(false)
  const [nomeCliente, setNomeCliente] = useState('')
  const [cpfCnpj, setCpfCnpj] = useState('')
  const [valor, setValor] = useState('')
  const [dataVencimento, setDataVencimento] = useState('')
  const [descricao, setDescricao] = useState('')
  const [codigoDeBarras, setCodigoDeBarras] = useState('')
  const [nomeAvalistaBoleto, setNomeAvalistaBoleto] = useState('')

  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions

  const router = useRouter()

  useEffect(() => {
    async function getConfiguracoes() {
      const token = window.localStorage.getItem('token')
      const Auth = `Bearer ${token}`
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
  }, [])

  async function handleGerarBoleto(): Promise<void> {
    const token = window.localStorage.getItem('token')
    const Auth = `Bearer ${token}`
    if (
      nomeCliente === '' ||
      cpfCnpj === '' ||
      valor === '' ||
      dataVencimento === ''
    ) {
      alert('Preencha todos os campos!')

    } else {
      const clienteCodigo = Math.floor(Date.now() * Math.random()).toString()

      try {
        await api.post(
          '/boleto',
          {
            nomeCliente,
            valor,
            dataVencimento,
            codigoCliente: clienteCodigo,
            cpfCnpj,
            descricao,
            codigoBarrasPix: codigoDeBarras,
            nomeAvalista: nomeAvalistaBoleto,
            cidade: "",
            tipo: 'bo'
          },
          { headers: { Authorization: Auth } }
        )
        void router.push('/dashboard')
      } catch (error) {
        alert(error)
      }
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
    setDataVencimento(formattedValue)
  }

  function formatCPF(event: any) {
    const input = event.target
    const value = input.value

    // Remove qualquer caractere que não seja um dígito
    const digitsOnly = value.replace(/\D/g, '')

    // Aplica a máscara de CPF (000.000.000-00)
    const formattedValue = digitsOnly.replace(
      /(\d{3})(\d{3})(\d{3})(\d{2})/,
      '$1.$2.$3-$4'
    )

    // Atualiza o valor do input com a versão formatada
    input.value = formattedValue
    setCpfCnpj(formattedValue)
  }

  const formatter = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  function formatValor(e: any) {
    const input = e.target;
    // elimina tudo que não é dígito
    input.value = input.value.replace(/\D+/g, '');
    if (input.value.length === 0) // se não tem nada preenchido, não tem o que fazer
      return;
    // verifica se ultrapassou a quantidade máxima de dígitos (pegar o valor no dataset)
    const maxDigits = parseInt(input.dataset.maxDigits);
    if (input.value.length > maxDigits) {
      // O que fazer nesse caso? Decidi pegar somente os primeiros dígitos
      input.value = input.value.substring(0, maxDigits);
    }
    // lembrando que o valor é a quantidade de centavos, então precisa dividir por 100
    const formattedValue = formatter.format(parseInt(input.value) / 100);

    input.value = formattedValue
    setValor(formattedValue)
  }

  return (
    <WrapperGerarBoleto>
      <Headline title="gerar boleto" text="insira os dados abaixo." />
      <ContentGerarBoleto>
        {loading ? (
          <DisplayTitle DisplayTitle="loading..." />
        ) : (
          <ViewGerarBoleto>
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
                type="text"
                value={cpfCnpj}
                onChange={e => {
                  setCpfCnpj(e.target.value)
                }}
                pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
                onKeyUp={event => formatCPF(event)}
                maxLength={14}
                placeholder="cpf/cnpj"
              />
              <FieldRegistration
                type="text"
                required
                onKeyUp={event => { formatValor(event) }}
                onChange={e => { setValor(e.target.value); }}
                placeholder="valor"
                value={valor}
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

            </BlockRegistration>
            <ButtonSaveDate
              onClick={handleGerarBoleto}
              disabled={
                !!(
                  nomeCliente === '' ||
                  cpfCnpj === '' ||
                  valor === '' ||
                  dataVencimento === ''
                )
              }
            >
              {nomeCliente === '' ||
                cpfCnpj === '' ||
                valor === '' ||
                dataVencimento === ''
                ? 'Preencha os campos!'
                : 'salvar'}
            </ButtonSaveDate>
          </ViewGerarBoleto>
        )}
      </ContentGerarBoleto>
    </WrapperGerarBoleto>
  )
}
