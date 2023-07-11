import { useState } from 'react'

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

export default function TopBar() {
  const [profileOpen, setProfileOpen] = useState(false)

  function toggleProfile() {
    setProfileOpen(!profileOpen)
  }

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
              <DisplayTitle DisplayTitle="henrique" />
            </ToggleLink>
            <ToggleLink href="#">
              <DisplayTypography DisplayTypography="administrador" />
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
