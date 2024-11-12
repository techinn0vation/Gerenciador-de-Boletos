/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useEffect, useState } from 'react'
import { DisplayTypography } from '@/components/GeralComponents'

import { AiFillHome, AiFillSetting } from 'react-icons/ai'
import {
  FaUsers,
  FaUser,
  FaServer,
  FaBook,
  FaLink,
  FaSearch
} from 'react-icons/fa'
import { MdPrecisionManufacturing } from 'react-icons/md'
import { GiNotebook } from 'react-icons/gi'

import {
  ContentLinks,
  ContentSideBar,
  DisplayIcon,
  DisplayLink,
  WrapperSideBar
} from './styles'
import { api } from '@/services/api'

export default function SideBar() {
  const [profileOpen, setProfileOpen] = useState(false)
  const [admin, setAdmin] = useState(false)

  function toggleProfile() {
    setProfileOpen(!profileOpen)
  }

  async function handleUser() {
    const token = window.localStorage.getItem('token')
    const Auth = `Bearer ${token}`

    await api
      .get('/user', { headers: { Authorization: Auth } })
      .then(result => {
        setAdmin(result.data.tipo === 'A')
      })
  }

  useEffect(() => {
    handleUser()
  }, [])

  return (
    <WrapperSideBar>
      <ContentSideBar>
        <ContentLinks>
          <DisplayLink href="/dashboard">
            <DisplayIcon>
              <AiFillHome />
            </DisplayIcon>
            <DisplayTypography DisplayTypography="painel" />
          </DisplayLink>
          {admin && (
            <DisplayLink href="/usuarios">
              <DisplayIcon>
                <FaUsers />
              </DisplayIcon>
              <DisplayTypography DisplayTypography="usuários" />
            </DisplayLink>
          )}

          <DisplayLink href="/operador">
            <DisplayIcon>
              <MdPrecisionManufacturing />
            </DisplayIcon>
            <DisplayTypography DisplayTypography="operador" />
          </DisplayLink>
          <DisplayLink href="/consulta">
            <DisplayIcon>
              <FaSearch />
            </DisplayIcon>
            <DisplayTypography DisplayTypography="consultar CPF" />
          </DisplayLink>
          <DisplayLink href="/termo">
            <DisplayIcon>
              <FaSearch />
            </DisplayIcon>
            <DisplayTypography DisplayTypography="Termos" />
          </DisplayLink>
          <DisplayLink href="/questoes">
            <DisplayIcon>
              <FaBook />
            </DisplayIcon>
            <DisplayTypography DisplayTypography="frases e acordos" />
          </DisplayLink>
          <DisplayLink href="/resultados">
            <DisplayIcon>
              <FaBook />
            </DisplayIcon>
            <DisplayTypography DisplayTypography="Resultados" />
          </DisplayLink>
          <DisplayLink href="/conexao">
            <DisplayIcon>
              <FaServer />
            </DisplayIcon>
            <DisplayTypography DisplayTypography="conexão" />
          </DisplayLink>
          {admin && (
            <DisplayLink href="/configuracoesPixBot">
              <DisplayIcon>
                <AiFillSetting />
              </DisplayIcon>
              <DisplayTypography DisplayTypography="Config pix bot" />
            </DisplayLink>
          )}
          <DisplayLink href="/configuracoes">
            <DisplayIcon>
              <AiFillSetting />
            </DisplayIcon>
            <DisplayTypography DisplayTypography="configurações" />
          </DisplayLink>
        </ContentLinks>
      </ContentSideBar>
    </WrapperSideBar>
  )
}
