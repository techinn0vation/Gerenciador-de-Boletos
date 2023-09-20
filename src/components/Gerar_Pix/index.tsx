/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  BlockRegistration,
  FieldRegistration,
  ButtonSaveDate
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


  const router = useRouter()

  useEffect(() => {
    async function getConfiguracoes() {
      const token = window.localStorage.getItem('token')
      const Auth = `Bearer ${token}`
      try {
        const { data } = await api.get('/configuracoes', {
          headers: { Authorization: Auth }
        })
        console.log(data)
        setNomeAvalistaPix(data.nomeAvalistaPix)
        setChavePix(data.chavePix)
        setCidade(data.cidade)
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
          dataVencimento,
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
              type="number"
              placeholder="valor"
              value={valor}
              onChange={e => {
                setValor(e.target.value)
              }}
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
