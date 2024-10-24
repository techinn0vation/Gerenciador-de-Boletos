/* eslint-disable @typescript-eslint/no-misused-promises */
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
  dadosPix: {
    id: 1,
    chavePix: string,
    nomeAvalista: string,
    cidade: string,
    codigoTransferencia: string
  };
  copiaCola: {
    brcode: string
  };
}

interface IResult {
  data: IConfiguracoes;
}

export default function Configurações() {
  const [nomeAvalistaPix, setNomeAvalistaPix] = useState('')
  const [chavePix, setChavePix] = useState('')
  const [cidade, setCidade] = useState('')
  const [codigoTransferencia, setCodigoTransferencia] = useState('')
  const [loading, setLoading] = useState(false)
  const [modalDados, setModalDados] = useState(false)

  function handleGerarLink() {
    setModalDados(!modalDados)
  }

  const navitage = useRouter()

  useEffect(() => {
    const token = window.localStorage.getItem('token')
    const Auth = `Bearer ${token}`
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
      const token = window.localStorage.getItem('token')
      const Auth = `Bearer ${token}`
      await api
        .post('pixBotCop', { nomeCliente: 'l' })
        .then(({ data }: IResult) => {
          setNomeAvalistaPix(data.dadosPix.nomeAvalista)
          setChavePix(data.dadosPix.chavePix)
          setCidade(data.dadosPix.cidade)
          setCodigoTransferencia(data.dadosPix.codigoTransferencia)
        })
        .catch(error => {
          alert(error)
        })
    }
    getConfiguracoes()
  }, [])

  async function handleConfiguracoes() {
    const token = window.localStorage.getItem('token')
    const Auth = `Bearer ${token}`
    if (
      nomeAvalistaPix === '' ||
      chavePix === '' ||
      cidade === '' ||
      codigoTransferencia === ''
    ) {
      alert('Campos não podem ser vazio')
    }

    await api
      .put(
        'pixBot',
        {
          nomeAvalista: nomeAvalistaPix,
          chavePix,
          cidade,
          codigoTransferencia
        },
        { headers: { Authorization: Auth } }
      )
      .then(({ data }) => {
        setNomeAvalistaPix(data.nomeAvalista)
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
                <ButtonSaveDate onClick={handleConfiguracoes}>
                  Salvar
                </ButtonSaveDate>
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
