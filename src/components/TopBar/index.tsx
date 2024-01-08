/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { use, useEffect, useState } from 'react'

import { DisplayTitle, DisplayTypography } from '@/components/GeralComponents'

import SVG_B001 from '..//..//assets/svg/SVG_B002.svg'
import IMG_B001 from '..//..//..//public/img/IMG_B001.png'

import {
  ContentTopBar,
  FrameLogo,
  FrameProfile,
  LogoBranding,
  ProfileImage,
  BlockProfile,
  WrapperTopBar,
  ToggleProfile,
  ToggleLink
} from './styles'
import { api } from '@/services/api'

export default function TopBar() {
  const [profileOpen, setProfileOpen] = useState(false)
  const [user, setUser] = useState({
    nome: '',
    tipo: ''
  })

  function toggleProfile() {
    setProfileOpen(!profileOpen)
  }

  useEffect(() => {
    async function getUser() {
      const token = window.localStorage.getItem('token')
      const Auth = `Bearer ${token}`
      await api
        .get('/user', { headers: { Authorization: Auth } })
        .then(result => {
          setUser({ nome: result.data.nome, tipo: result.data.tipo })
        })
    }
    getUser()
  }, [])

  return (
    <WrapperTopBar>
      <ContentTopBar>
        <FrameLogo>
          <LogoBranding src={SVG_B001} alt="Logo" priority={true} />
        </FrameLogo>
        <BlockProfile>
          <FrameProfile onClick={toggleProfile}>
            <ProfileImage src={IMG_B001} alt="Profile" priority={true} />
          </FrameProfile>
          <ToggleProfile profileOpen={profileOpen}>
            <ToggleLink href="#">
              <DisplayTitle DisplayTitle={user.nome} />
            </ToggleLink>
            <ToggleLink href="#">
              <DisplayTypography
                DisplayTypography={
                  user.tipo === 'A' ? 'Administrador' : 'usuário'
                }
              />
            </ToggleLink>
            <ToggleLink href="/login">
              <DisplayTypography DisplayTypography="sair" />
            </ToggleLink>
          </ToggleProfile>
        </BlockProfile>
      </ContentTopBar>
    </WrapperTopBar>
  )
}
