/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import {
  BlockRegistration,
  FieldRegistration,
  ButtonSaveDate
} from '../Modal/styles' // Importando Styles de Modal.

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { api } from '@/services/api'

import {
  BlockDividas,
  ContentGerarPixDois,
  WrapperGerarPixDois
} from './styles'

import { Headline, DisplayTypography } from '@/components/GeralComponents'
import { type IDividas } from './Reac_Pix_Dois'
import { DisplayInputMask } from '../Gerar_Boleto/styles'

export default function GerarPixDois() {
  const [nomeCliente, setNomeCliente] = useState('')
  const [cpfCnpj, setCpfCnpj] = useState('')
  const [valorDesconto, setValorDesconto] = useState('')
  const [dataVencimento, setDataVencimento] = useState('')
  const [nomeAvalistaPix, setNomeAvalistaPix] = useState('')
  const [chavePix, setChavePix] = useState('')
  const [cidade, setCidade] = useState('')
  const [nomeAtendente, setNomeAtendente] = useState('')
  const [cpfAtendente, setCpfAtendente] = useState('')
  const [protocolo, setProtocolo] = useState('')
  const [numeroAcordo, setNumeroAcordo] = useState('')
  const [contrato, setContrato] = useState('')
  const [origem, setOrigem] = useState('')
  const [saldoDevedor, setSaldoDevedor] = useState('')
  const [dividas, setDividas] = useState<IDividas[]>([])
  const [total, setTotal] = useState(0.0)

  const token = localStorage.getItem('token')
  const Auth = `Bearer ${token}`
  const router = useRouter()

  useEffect(() => {
    async function getConfiguracoes() {
      await api
        .get('/configuracoes', { headers: { Authorization: Auth } })
        .then(({ data }) => {
          console.log(data)
          setNomeAvalistaPix(data.nomeAvalistaPix)
          setChavePix(data.chavePix)
          setCidade(data.cidade)
        })
        .catch(error => {
          alert(error)
        })
    }
    void getConfiguracoes()
  }, [Auth])

  async function handleGerarBoleto() {
    if (
      nomeCliente === '' ||
      cpfCnpj === '' ||
      valorDesconto === '' ||
      dataVencimento === '' ||
      nomeAvalistaPix === '' ||
      nomeAtendente === '' ||
      cpfAtendente === ''
    ) {
      alert('Campos não podem ser vazio')
    }

    const clienteCodigo = Math.floor(Date.now() * Math.random()).toString()
    try {
      await api.post(
        'pix',
        {
          cidade,
          cpfAtendente,
          nomeAtendente,
          cpfCnpj,
          dataVencimento,
          dividas,
          valorDesconto,
          protocolo,
          total: total.toFixed(2),
          nomeAvalistaPix,
          nomeCliente,
          numeroAcordo,
          codigoBarrasPix: chavePix,
          codigoCliente: clienteCodigo
        },
        { headers: { Authorization: Auth } }
      )
      void router.push('/user')
    } catch (error) {
      alert(error)
    }
  }

  function addDividas() {
    if (contrato === '' || origem === '' || saldoDevedor === '') {
      alert('Campos não podem ser vazios')
    }

    setDividas(oldArray => [
      ...oldArray,
      {
        contrato,
        origem,
        saldoDevedor
      }
    ])

    setTotal(parseFloat(saldoDevedor) + total)

    setContrato('')
    setOrigem('')
    setSaldoDevedor('')
  }

  return (
    <WrapperGerarPixDois>
      <Headline title="gerar pix dois" text="insira os dados abaixo." />
      <ContentGerarPixDois>
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
            value={nomeAtendente}
            onChange={e => {
              setNomeAtendente(e.target.value)
            }}
            placeholder="nome atendente"
          />
          <FieldRegistration
            type="number"
            value={cpfAtendente}
            onChange={e => {
              setCpfAtendente(e.target.value)
            }}
            placeholder="cpf atendente"
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
            value={valorDesconto}
            onChange={e => {
              setValorDesconto(e.target.value)
            }}
            placeholder="valor desconto"
          />
          <FieldRegistration
            type="text"
            value={contrato}
            onChange={e => {
              setContrato(e.target.value)
            }}
            placeholder="contrato"
          />
          <FieldRegistration
            type="text"
            value={origem}
            onChange={e => {
              setOrigem(e.target.value)
            }}
            placeholder="origem"
          />
          <FieldRegistration
            type="number"
            value={saldoDevedor}
            onChange={e => {
              setSaldoDevedor(e.target.value)
            }}
            placeholder="saldo devedor"
          />
          <DisplayInputMask
            mask="99/99/9999"
            value={dataVencimento}
            onChange={(e: any) => {
              setDataVencimento(e.target.value)
            }}
          />
          <FieldRegistration
            type="number"
            value={protocolo}
            onChange={e => {
              setProtocolo(e.target.value)
            }}
            placeholder="protocolo"
          />
          <FieldRegistration
            type="number"
            value={numeroAcordo}
            onChange={e => {
              setNumeroAcordo(e.target.value)
            }}
            placeholder="número do acordo"
          />
          <ButtonSaveDate onClick={addDividas}>+</ButtonSaveDate>
          {dividas.length === 0 ? (
            <></>
          ) : (
            <>
              {dividas.map(item => (
                <BlockDividas key={item.id}>
                  <DisplayTypography DisplayTypography={`${item.contrato}`} />
                  <DisplayTypography DisplayTypography={`${item.origem}`} />
                  <DisplayTypography
                    DisplayTypography={`${item.saldoDevedor}`}
                  />
                </BlockDividas>
              ))}
              <BlockRegistration>
                <DisplayTypography DisplayTypography="total saldo devedor" />
                <DisplayTypography DisplayTypography={`${total.toFixed(2)}`} />
              </BlockRegistration>
            </>
          )}

          <ButtonSaveDate
            onClick={handleGerarBoleto}
            disabled={
              !!(
                nomeCliente === '' ||
                cpfCnpj === '' ||
                valorDesconto === '' ||
                dataVencimento === '' ||
                nomeAtendente === '' ||
                cpfAtendente === ''
              )
            }
          >
            {nomeCliente === '' ||
            cpfCnpj === '' ||
            valorDesconto === '' ||
            dataVencimento === '' ||
            cidade === '' ||
            nomeAtendente === '' ||
            cpfAtendente === ''
              ? 'Preencha os campos'
              : 'salvar'}
          </ButtonSaveDate>
        </BlockRegistration>
      </ContentGerarPixDois>
    </WrapperGerarPixDois>
  )
}
