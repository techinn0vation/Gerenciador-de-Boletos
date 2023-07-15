import { useState } from 'react'
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

export default function SideBar() {
  const [profileOpen, setProfileOpen] = useState(false)

  function toggleProfile() {
    setProfileOpen(!profileOpen)
  }

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
          <DisplayLink href="/usuarios">
            <DisplayIcon>
              <FaUsers />
            </DisplayIcon>
            <DisplayTypography DisplayTypography="usuários" />
          </DisplayLink>
          <DisplayLink href="/operador">
            <DisplayIcon>
              <MdPrecisionManufacturing />
            </DisplayIcon>
            <DisplayTypography DisplayTypography="operador" />
          </DisplayLink>
          <DisplayLink href="/usuario">
            <DisplayIcon>
              <FaUser />
            </DisplayIcon>
            <DisplayTypography DisplayTypography="usuario" />
          </DisplayLink>
          <DisplayLink href="/conexao">
            <DisplayIcon>
              <FaServer />
            </DisplayIcon>
            <DisplayTypography DisplayTypography="conexão" />
          </DisplayLink>
          <DisplayLink href="/consulta">
            <DisplayIcon>
              <FaSearch />
            </DisplayIcon>
            <DisplayTypography DisplayTypography="consultar CPF" />
          </DisplayLink>
          <DisplayLink href="/corporativo">
            <DisplayIcon>
              <FaBook />
            </DisplayIcon>
            <DisplayTypography DisplayTypography="frases e acordos" />
          </DisplayLink>
          <DisplayLink href="/redirecionador">
            <DisplayIcon>
              <FaLink />
            </DisplayIcon>
            <DisplayTypography DisplayTypography="links" />
          </DisplayLink>
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
