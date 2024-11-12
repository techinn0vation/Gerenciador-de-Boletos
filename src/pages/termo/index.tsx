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
  BlockConsult
} from '..//..//components/StylesPages/StylesConsulta'

import { Layout, SideBar, Headline } from '..//..//components/GeralComponents'

import { api } from '@/services/api'
import { useEffect, useRef, useState } from 'react'

import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'

import { Termos } from '@/components/Gerar_Termos/Reac_Termo'
import { ButtonSaveDate } from '@/components/Modal/styles'

export default function Termo() {
  const [nomeAvalista, setNomeAvalista] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function handleAvalista() {
      setLoading(true)
      const token = window.localStorage.getItem('token')
      const Auth = `Bearer ${token}`
      await api
        .get('/configuracoes', { headers: { Authorization: Auth } })
        .then(({ data }) => {
          console.log(data)
          setNomeAvalista(data.nomeAvalistaPix)
          setLoading(false)
        })
        .catch(error => {
          setLoading(false)
          alert(error)
        })
    }

    handleAvalista()
  }, [])

  return (
    <Layout>
      <WrapperConsult>
        <SideBar />
        <ContentConsult>
          <Headline title="consultar cpf" text="insira os dados abaixo." />

          <BlockConsult>
            <ButtonSaveDate>
              {nomeAvalista === '' ? (
                'Aguarde'
              ) : (
                <PDFDownloadLink
                  style={{ textDecoration: 'none', color: 'white' }}
                  document={<Termos nomeAvalistaPix={nomeAvalista} />}
                  fileName={`Termo de Condições Segurança Pix Feirão Limpa Nome.pdf`}
                >
                  {({ blob, url, loading, error }) =>
                    loading ? 'Carregando' : 'Baixar Termos'
                  }
                </PDFDownloadLink>
              )}
            </ButtonSaveDate>
            {loading && (
              <PDFViewer
                style={{ display: 'flex' }}
                width={'100%'}
                height={'100%'}
              >
                <Termos nomeAvalistaPix="Testando aqui" />
              </PDFViewer>
            )}
          </BlockConsult>
        </ContentConsult>
      </WrapperConsult>
    </Layout>
  )
}
