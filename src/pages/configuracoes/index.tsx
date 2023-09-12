/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
import {
  WrapperConfiguracoes,
  ContentConfiguracoes,
  ButtonSalvarDados,
  ContentDadosGerados
} from '../../components/StylesPages/StylesConfiguraçoes'

import {
  Layout,
  SideBar,
  Headline,
  DisplayTypography
} from '../../components/GeralComponents'

// Importando de Modal (Principal)
import {
  WrapperModal,
  ContentModal,
  DisplayButtonClose,
  BlockRegistration,
  FieldRegistration,
  ButtonSaveDate
} from '@/components/Modal/styles'

import { FaDatabase } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { api } from '@/services/api'

interface IConfiguracoes {
  nomeAvalistaBoleto: string;
  nomeAvalistaPix: string;
  chavePix: string;
  cidade: string;
  codigoTransferencia: string;
}

interface IResult {
  data: IConfiguracoes;
}

export default function Configurações() {
  const [nomeAvalistaBoleto, setNomeAvalistaBoleto] = useState('')
  const [nomeAvalistaPix, setNomeAvalistaPix] = useState('')
  const [chavePix, setChavePix] = useState('')
  const [cidade, setCidade] = useState('')
  const [codigoTransferencia, setCodigoTransferencia] = useState('')
  const [loading, setLoading] = useState(false)
  const [modalDados, setModalDados] = useState(false)
  const [Auth, setAuth] = useState('')

  function handleGerarLink() {
    setModalDados(!modalDados)
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = window.localStorage.getItem('token')
      setAuth(token != null ? `Bearer ${token}` : '')
    }
  }, [])
  const navitage = useRouter()

  useEffect(() => {
    async function getUser() {
      setLoading(true)
      await api
        .get('/user', { headers: { Authorization: Auth } })
        .then(result => {
          if (result.data.tipo !== 'A') {
            return navitage.push('/deshboard')
          }
        })
      setLoading(false)
    }
    getUser()
  }, [])

  useEffect(() => {
    async function getConfiguracoes() {
      await api
        .get('/configuracoes', { headers: { Authorization: Auth } })
        .then(({ data }: IResult) => {
          setNomeAvalistaBoleto(data.nomeAvalistaBoleto)
          setNomeAvalistaPix(data.nomeAvalistaPix)
          setChavePix(data.chavePix)
          setCidade(data.cidade)
          setCodigoTransferencia(data.codigoTransferencia)
        })
        .catch(error => {
          alert(error)
        })
    }
    getConfiguracoes()
  }, [])

  async function handleConfiguracoes() {
    if (
      nomeAvalistaBoleto === '' ||
      nomeAvalistaPix === '' ||
      chavePix === '' ||
      chavePix === '' ||
      cidade === '' ||
      codigoTransferencia === ''
    ) {
      alert('Campos não podem ser vazio')
    }

    await api
      .put(
        'configuracoes',
        {
          nomeAvalistaBoleto,
          nomeAvalistaPix,
          chavePix,
          cidade,
          codigoTransferencia
        },
        { headers: { Authorization: Auth } }
      )
      .then(({ data }: IResult) => {
        setNomeAvalistaBoleto(data.nomeAvalistaBoleto)
        setNomeAvalistaPix(data.nomeAvalistaPix)
        setChavePix(data.chavePix)
        setCidade(data.cidade)
        setCodigoTransferencia(data.codigoTransferencia)

        location.reload()
      })
      .catch(error => {
        alert(error)
      })
  }

  return (
    <Layout>
      <WrapperConfiguracoes>
        <SideBar />
        <ContentConfiguracoes>
          <Headline title="configurações" text="dados gerais" />
          <ButtonSalvarDados onClick={handleGerarLink}>
            <FaDatabase />
            <DisplayTypography DisplayTypography="inserir dados" />
          </ButtonSalvarDados>
          {/* =============================== */}
          {modalDados && (
            <WrapperModal>
              <ContentModal>
                <DisplayButtonClose onClick={handleGerarLink} />
                <Headline title="dados" text="insira os dados abaixo." />
                <BlockRegistration>
                  <FieldRegistration
                    type="text"
                    placeholder="nome avalista boleto"
                    value={nomeAvalistaBoleto}
                    onChange={e => {
                      setNomeAvalistaBoleto(e.target.value)
                    }}
                  />
                  <FieldRegistration
                    type="text"
                    placeholder="nome avalista pix"
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
                    placeholder="código de transferência"
                    value={codigoTransferencia}
                    onChange={e => {
                      setCodigoTransferencia(e.target.value)
                    }}
                  />
                </BlockRegistration>
                <ButtonSaveDate>Salvar</ButtonSaveDate>
              </ContentModal>
            </WrapperModal>
          )}
          {/* =============================== */}
          <ContentDadosGerados></ContentDadosGerados>
        </ContentConfiguracoes>
      </WrapperConfiguracoes>
    </Layout>
  )
}
