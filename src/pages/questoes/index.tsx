/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import {
  WrapperCorporativo,
  ContentCorporativo,
  AreaTextCorporativo,
  TextBlock,
  ButtonCopyText,
  TextBlockGrupo
} from '..//..//components/StylesPages/StylesCorporativo'

import {
  Layout,
  SideBar,
  Headline,
  DisplayTitle,
  DisplayTypography,
  TabelaValores
} from '..//..//components/GeralComponents'

import React, { useEffect, useState } from 'react'
import {
  BlockRegistration,
  BlockRegistrationQuestion,
  ButtonSaveDate,
  ContentModal,
  DisplayButtonClose,
  FieldRegistration,
  FieldRegistrationTextArea,
  WrapperModal
} from '@/components/Modal/styles'
import { api } from '@/services/api'
import { error } from 'console'

interface IQuestions {
  id: number;
  text: string;
}

interface IFrases {
  id: number;
  title: string;
  frases: IQuestions[];
}

export default function Corporativo() {
  const [modalEdit, setModalEdit] = useState(false)
  const [editOrCreate, setEditOrCreate] = useState(false)
  const [modalCreateGrupo, setModalCreateGrupo] = useState(false)
  const [text, setText] = useState('')
  const [title, setTitle] = useState('')
  const [idItem, setIdItem] = useState(0)
  const [frases, setFrases] = useState<IFrases[]>([])
  const [frase, setFrase] = useState<IFrases | null>(null)
  const [buttonText, setButtonText] = useState({ text: 'Copiar', index: 0 })

  const handleCopyText = (text: string, index: number) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log('Texto copiado com sucesso!')
        setButtonText({ text: 'Copiado!', index })
        setTimeout(() => {
          setButtonText({ text: 'Copiar', index: 0 })
        }, 2000)
      })
      .catch(error => {
        console.error('Erro ao copiar o texto:', error)
      })
  }

  useEffect(() => {
    async function handleFrases() {
      const token = window.localStorage.getItem('token')
      const Auth = `Bearer ${token}`

      await api
        .get('/grupoFrases', { headers: { Authorization: Auth } })
        .then(response => {
          console.log(response.data)
          setFrases(response.data)
        })
        .catch(error => {
          console.log(error, 'ewr')
          alert('Erro ao buscar as frases')
        })
    }

    handleFrases()
  }, [])

  async function handleCreateGrupoFrases() {
    if (title === '') {
      return alert('O campo não pode ser vazio')
    }

    const token = window.localStorage.getItem('token')
    const Auth = `Bearer ${token}`

    await api
      .post('/grupoFrases', { title }, { headers: { Authorization: Auth } })
      .then(response => {
        setFrase(response.data)
      })
      .catch(() => {
        return alert('Erro ao criar frase')
      })
    setModalCreateGrupo(false)
    location.reload()
  }

  async function handleEditOrCreateFrase() {
    const token = window.localStorage.getItem('token')
    const Auth = `Bearer ${token}`

    if (editOrCreate) {
      await api
        .put(
          `/frases/${idItem}`,
          { text },
          { headers: { Authorization: Auth } }
        )
        .catch(() => {
          return alert('Erro ao editar frase')
        })
      setModalEdit(false)
      location.reload()
    } else {
      await api
        .post(
          `/frases/${frase?.id}`,
          { text },
          { headers: { Authorization: Auth } }
        )
        .catch(() => {
          return alert('Erro ao criar frase')
        })
      setModalEdit(false)
      location.reload()
    }
  }

  async function handleDeleteFrase(id: number) {
    const token = window.localStorage.getItem('token')
    const Auth = `Bearer ${token}`

    await api
      .delete(`/frases/${id}`, { headers: { Authorization: Auth } })
      .catch(() => {
        return alert('Erro ao editar frase')
      })
    setModalEdit(false)
    location.reload()
  }

  function handleOpenModal(item: { id: number, text: string }) {
    setIdItem(item.id)
    setEditOrCreate(true)
    setText(item.text)
    setModalEdit(true)
  }

  function handleCloseModal() {
    setIdItem(0)
    setText('')
    setTitle('')
    setModalEdit(false)
  }

  return (
    <Layout>
      <WrapperCorporativo>
        <SideBar />
        {modalCreateGrupo && (
          <WrapperModal>
            <ContentModal>
              <DisplayButtonClose onClick={() => setModalCreateGrupo(false)} />
              <Headline title="dados" text="insira os dados abaixo." />
              <BlockRegistrationQuestion>
                <FieldRegistration
                  type="text"
                  placeholder="nome"
                  value={title}
                  onChange={e => {
                    setTitle(e.target.value)
                  }}
                />
              </BlockRegistrationQuestion>
              <ButtonSaveDate onClick={handleCreateGrupoFrases}>
                Salvar
              </ButtonSaveDate>
            </ContentModal>
          </WrapperModal>
        )}
        <ContentCorporativo style={{ width: '40%' }}>
          <AreaTextCorporativo>
            {frases.map((item, index) => (
              <TextBlockGrupo
                key={index}
                onClick={() =>
                  setFrase({
                    id: item.id,
                    title: item.title,
                    frases: item.frases
                  })
                }
                style={{
                  boxShadow: '0 0 0.7rem 0 #00cc4c',
                  borderRadius: '1.6rem',
                  padding: '1rem',
                  textAlign: 'center',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <DisplayTitle DisplayTitle={item.title} />
              </TextBlockGrupo>
            ))}
            <ButtonCopyText
              style={{ width: '80%', borderRadius: '1.6rem', marginBottom: 10 }}
              onClick={() => setModalCreateGrupo(true)}
            >
              Criar novo
            </ButtonCopyText>
          </AreaTextCorporativo>
        </ContentCorporativo>
        {modalEdit && (
          <WrapperModal>
            <ContentModal>
              <DisplayButtonClose onClick={handleCloseModal} />
              <Headline title="dados" text="insira os dados abaixo." />
              <BlockRegistrationQuestion>
                <FieldRegistrationTextArea
                  value={text}
                  onChange={e => {
                    setText(e.target.value)
                  }}
                />
              </BlockRegistrationQuestion>
              <ButtonSaveDate
                onClick={() => {
                  handleEditOrCreateFrase()
                }}
              >
                Salvar
              </ButtonSaveDate>
            </ContentModal>
          </WrapperModal>
        )}
        <ContentCorporativo>
          {frase !== null ? (
            <>
              <Headline title="frases e acordos" text={frase.title} />

              <ButtonCopyText
                style={{
                  width: '80%',
                  borderRadius: '1.6rem',
                  marginBottom: 10
                }}
                onClick={() => {
                  setEditOrCreate(false)
                  setModalEdit(true)
                }}
              >
                Criar novo
              </ButtonCopyText>

              <AreaTextCorporativo>
                {frase.frases.length > 0 ? (
                  frase.frases.map((item, index) => (
                    <TextBlock
                      key={index}
                      style={{
                        boxShadow: '0 0 0.7rem 0 #00cc4c',
                        borderRadius: '1.6rem',
                        padding: '1.6rem'
                      }}
                    >
                      <DisplayTypography DisplayTypography={item.text} />

                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          width: '100%',
                          justifyContent: 'center',
                          alignItems: 'center',
                          gap: 20
                        }}
                      >
                        <ButtonCopyText
                          style={{ margin: 0 }}
                          onClick={async () => await handleDeleteFrase(item.id)}
                        >
                          delete
                        </ButtonCopyText>
                        <ButtonCopyText
                          style={{ margin: 0 }}
                          onClick={() => handleOpenModal(item)}
                        >
                          editar
                        </ButtonCopyText>
                        <ButtonCopyText
                          style={{ margin: 0 }}
                          onClick={() => {
                            handleCopyText(item.text, index)
                          }}
                        >
                          {buttonText.index === index
                            ? buttonText.text
                            : 'Copiar'}
                        </ButtonCopyText>
                      </div>
                    </TextBlock>
                  ))
                ) : (
                  <></>
                )}
              </AreaTextCorporativo>
            </>
          ) : (
            <></>
          )}
        </ContentCorporativo>
      </WrapperCorporativo>
    </Layout>
  )
}
