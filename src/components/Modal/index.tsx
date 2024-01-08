/* eslint-disable @typescript-eslint/restrict-template-expressions */
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
  const [senha, setSenha] = useState('')
  const [tipo, setTipo] = useState('U')
  const [checked, setChecked] = useState(false)
  const [textoBotao, setTextoBotao] = useState('Salvar')

  async function handleUsuario() {
    const token = window.localStorage.getItem('token')
    const Auth = `Bearer ${token}`
    api
      .post(
        'users',
        {
          nome,
          email,
          tipo,
          senha
        },
        { headers: { Authorization: Auth } }
      )

      .then(result => {
        location.assign('/usuarios')
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
        </BlockRegistration>
        <ViewRegistration>
          <ContentFieldBlock>
            <DisplayTypography DisplayTypography="selecione a permissão" />
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
