/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-sequences */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  BlockRegistration,
  FieldRegistration,
  ButtonSaveDate,
  FieldRegistrationTextArea
} from '../Modal/styles' // Importando Styles de Modal.

import { api } from '../../services/api'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { ContentGerarPix, ViewGerarPix, WrapperGerarPix } from './styles'

import { Headline } from '@/components/GeralComponents'
import { DisplayInputMask } from '../Gerar_Boleto/styles'

export default function GerarPix() {
  const [nomeCliente, setNomeCliente] = useState('')
  const [cpfCnpj, setCpfCnpj] = useState('')
  const [valor, setValor] = useState('')
  const [dataVencimento, setDataVencimento] = useState('')
  const [descricao, setDescricao] = useState('')
  const [nomeAvalistaPix, setNomeAvalistaPix] = useState('')
  const [chavePix, setChavePix] = useState('')
  const [cidade, setCidade] = useState('')
  const [txid, setTxId] = useState('')


  const router = useRouter()

  useEffect(() => {
    async function getConfiguracoes() {
      const token = window.localStorage.getItem('token')
      const Auth = `Bearer ${token}`
      try {
        const { data } = await api.get('/configuracoes', {
          headers: { Authorization: Auth }
        })
        setNomeAvalistaPix(data.nomeAvalistaPix)
        setChavePix(data.chavePix)
        setCidade(data.cidade)
        setTxId(data.codigoTransferencia)
      } catch (error) {
        alert(error)
      }
    }
    void getConfiguracoes()
  }, [])

  async function handleGerarBoleto() {
    if (
      nomeCliente === '' ||
      cpfCnpj === '' ||
      valor === '' ||
      dataVencimento === '' ||
      nomeAvalistaPix === ''
    ) {
      alert('Campos não podem ser vazios')
      return
    }

    const clienteCodigo = Math.floor(Date.now() * Math.random()).toString()
    const token = window.localStorage.getItem('token')
    const Auth = `Bearer ${token}`
    try {
      await api.post(
        'boleto',
        {
          nomeCliente,
          valor,
          dataVencimento: dataVencimento.split('-').reverse().join('/'),
          codigoCliente: clienteCodigo,
          cpfCnpj,
          descricao,
          codigoBarrasPix: chavePix,
          nomeAvalista: nomeAvalistaPix,
          cidade,
          tipo: 'px'
        },
        { headers: { Authorization: Auth } }
      )
      void router.push('/dashboard')
    } catch (error) {
      alert(error)
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
    const formatoCerto = formattedValue.split('-').reverse().join('/')
    setDataVencimento(formatoCerto)
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
    <WrapperGerarPix>
      <Headline title="gerar pix" text="insira os dados abaixo." />
      <ContentGerarPix>
        <ViewGerarPix>

          <BlockRegistration>
            <FieldRegistration
              type="text"
              placeholder="nome do cliente"
              value={nomeCliente}
              onChange={e => {
                setNomeCliente(e.target.value)
              }}
            />
            <DisplayInputMask
              type="text"
              value={cpfCnpj}
              onChange={e => {
                setCpfCnpj(e.target.value)
              }}
              pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
              onKeyUp={event => { formatCPF(event); }}
              maxLength={21}
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
              type="date"
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
            <FieldRegistrationTextArea
              placeholder="descrição"
              value={descricao}
              onChange={e => {
                setDescricao(e.target.value)
              }}
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
              dataVencimento === '' ||
              cidade === ''
              ? 'Preencha os campos!'
              : 'salvar'}
          </ButtonSaveDate>
        </ViewGerarPix>
      </ContentGerarPix>
    </WrapperGerarPix>
  )
}
