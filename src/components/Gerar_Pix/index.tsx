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

import { ContentGerarPix, WrapperGerarPix } from './styles'

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

  const token = localStorage.getItem('token')
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  const Auth = `Bearer ${token}`
  const router = useRouter()

  useEffect(() => {
    async function getConfiguracoes() {
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
  }, [Auth])

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
      void router.push('/user')
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
  }

  return (
    <WrapperGerarPix>
      <Headline title="gerar pix" text="insira os dados abaixo." />
      <ContentGerarPix>
        <BlockRegistration>
          <FieldRegistration
            type="text"
            placeholder="nome do cliente"
            value={nomeCliente}
            onChange={e => {
              setNomeCliente(e.target.value)
            }}
          />
          <FieldRegistration
            type="number"
            placeholder="cpf"
            value={cpfCnpj}
            onChange={e => {
              setCpfCnpj(e.target.value)
            }}
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
          <FieldRegistration
            type="text"
            placeholder="cidade"
            value={cidade}
            onChange={e => {
              setCidade(e.target.value)
            }}
          />
          <FieldRegistration
            type="text"
            placeholder="nome avalista"
            value={nomeAvalistaPix}
            onChange={e => {
              setNomeAvalistaPix(e.target.value)
            }}
          />
          <FieldRegistration
            type="text"
            placeholder="chave pix"
            value={chavePix}
            onChange={e => {
              setChavePix(e.target.value)
            }}
          />
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

            {/* <DisplayTypography DisplayTypography="salvar" /> */}
          </ButtonSaveDate>
        </BlockRegistration>
      </ContentGerarPix>
    </WrapperGerarPix>
  )
}
