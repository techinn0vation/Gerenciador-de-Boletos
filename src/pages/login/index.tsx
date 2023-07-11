/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from 'react'
import { api } from '..//..//services/api'

import { Headline, DisplayTypography } from '@/components/GeralComponents'

import SVG_B001 from '..//..//assets/svg/SVG_B001.svg'

import {
  BlockFields,
  ContentFields,
  ContentLogin,
  FrameImageLogin,
  InputField,
  WrapperLogin,
  TogglePasswordButton,
  VisibleFill,
  InvisibleFill,
  ButtonLogin,
  CheckField,
  ContentCheckField
} from '../..//components/StylesPages/StylesLogin'

export default function Login() {
  // Configuração Mostrar e Esconder Password
  const [showPassword, setShowPassword] = useState(false)

  const handleTogglePassword = () => {
    setShowPassword(!showPassword)
  }

  // Configuração API
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  async function handleLogin() {
    try {
      const response = await api.post('/users/authenticate', { email, senha })
      localStorage.setItem('token', response.data.token)
      location.assign('/dashboard')
    } catch (error) {
      alert('E-mail ou senha incorretos')
    }
  }

  return (
    <WrapperLogin>
      <ContentLogin>
        <FrameImageLogin src={SVG_B001} alt="Login" priority={true} />
        <Headline title="login" text="digite os dados abaixo" />
        <ContentFields>
          <BlockFields>
            <InputField
              type="email"
              id="email"
              value={email}
              onChange={e => {
                setEmail(e.target.value)
              }}
              placeholder="digite seu e-mail"
            />
          </BlockFields>
          <BlockFields>
            <InputField
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={senha}
              onChange={e => {
                setSenha(e.target.value)
              }}
              placeholder="digite sua senha"
            />
            <TogglePasswordButton onClick={handleTogglePassword}>
              {showPassword ? <VisibleFill /> : <InvisibleFill />}
            </TogglePasswordButton>
          </BlockFields>
          <ContentCheckField>
            <CheckField type="checkbox" id="checkbox_connection" />
            <DisplayTypography DisplayTypography="permanecer conectado." />
          </ContentCheckField>
        </ContentFields>
        <ButtonLogin onClick={handleLogin}>
          <DisplayTypography DisplayTypography="entrar" />
        </ButtonLogin>
      </ContentLogin>
    </WrapperLogin>
  )
}
