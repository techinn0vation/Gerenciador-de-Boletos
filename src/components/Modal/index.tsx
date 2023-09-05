/* eslint-disable @typescript-eslint/no-misused-promises */
import { Headline, DisplayTypography } from '@/components/GeralComponents'

import {
  WrapperModal,
  ContentModal,
  DisplayButtonClose,
  BlockRegistration,
  FieldRegistration,
  ContentFieldBlock,
  FieldCheckBlock,
  TypeFieldCheck,
  ButtonSaveDate,
  ViewRegistration
} from './styles'

import { useState, useEffect } from 'react'
import { api } from '@/services/api'

interface PropType {
  onClose: any;
}

export default function Modal({ onClose }: PropType) {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const [tipo, setTipo] = useState('U')
  const [bloqueado, setBloqueado] = useState('')
  const [final, setFinal] = useState('')
  const [checked, setChecked] = useState(false)
  const [Auth, setAuth] = useState('')
  const [textoBotao, setTextoBotao] = useState('Salvar')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = window.localStorage.getItem('token')
      setAuth(token != null ? `Bearer ${token}` : '')
    }
  }, [])

  async function handleUsuario() {
    api
      .post(
        'users',
        {
          nome,
          email,
          usuario,
          tipo,
          bloqueado: checked ? 'S' : 'N',
          final,
          senha
        },
        { headers: { Authorization: Auth } }
      )

      .then(result => {
        location.assign('/users')
      })
      .catch(error => {
        console.log(error)
      })

    setTextoBotao('Salvo!')
  }

  return (
    <WrapperModal>
      <ContentModal>
        <DisplayButtonClose onClick={onClose} />
        <Headline title="cadastro de usuário" text="insira os dados abaixo." />
        <BlockRegistration>
          <FieldRegistration
            type="text"
            value={nome}
            onChange={e => {
              setNome(e.target.value)
            }}
            placeholder="nome"
          />
          <FieldRegistration
            type="text"
            value={email}
            onChange={e => {
              setEmail(e.target.value)
            }}
            placeholder="e-mail"
          />
          <FieldRegistration
            type="text"
            value={senha}
            onChange={e => {
              setSenha(e.target.value)
            }}
            placeholder="senha"
          />
          <FieldRegistration
            type="text"
            value={usuario}
            onChange={e => {
              setUsuario(e.target.value)
            }}
            placeholder="usuario"
          />
          <FieldRegistration
            type="number"
            value={final}
            onChange={e => {
              setFinal(e.target.value)
            }}
            placeholder="numero final"
          />
          <FieldRegistration type="number" placeholder="nível" />
        </BlockRegistration>
        <ViewRegistration>
          <ContentFieldBlock>
            <DisplayTypography DisplayTypography="clique para bloquear o usuário" />
            <FieldCheckBlock
              value={bloqueado}
              checked={checked}
              onChange={() => {
                setChecked(!checked)
              }}
              type="checkbox"
            />
          </ContentFieldBlock>
          <ContentFieldBlock>
            <DisplayTypography DisplayTypography="selecione o tipo" />
            <TypeFieldCheck>
              <FieldCheckBlock
                checked={tipo === 'U'}
                onChange={() => {
                  setTipo('U')
                }}
                type="checkbox"
              />
              <DisplayTypography DisplayTypography="usuário" />
            </TypeFieldCheck>
            <TypeFieldCheck>
              <FieldCheckBlock
                onChange={() => {
                  setTipo('O')
                }}
                checked={tipo === 'O'}
                type="checkbox"
              />
              <DisplayTypography DisplayTypography="operador" />
            </TypeFieldCheck>
            <TypeFieldCheck>
              <FieldCheckBlock
                onChange={() => {
                  setTipo('A')
                }}
                checked={tipo === 'A'}
                type="checkbox"
              />
              <DisplayTypography DisplayTypography="administrador" />
            </TypeFieldCheck>
          </ContentFieldBlock>
          <ButtonSaveDate onClick={handleUsuario}>{textoBotao}</ButtonSaveDate>
        </ViewRegistration>
      </ContentModal>
    </WrapperModal>
  )
}
