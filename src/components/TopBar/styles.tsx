import styled from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'

interface PropProfile {
  profileOpen: boolean;
}

export const WrapperTopBar = styled.nav`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export const ContentTopBar = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
export const FrameLogo = styled.div`
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const LogoBranding = styled(Image)`
  width: 100%;
  height: auto;
  object-fit: fill;
  filter: invert(1);
`
export const BlockProfile = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  position: relative;
`
export const FrameProfile = styled.div`
  width: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  padding: 0.3rem;
  border: solid ${props => props.theme.colors.colorH} 0.2rem;
`
export const ProfileImage = styled(Image)`
  width: 4.5rem;
  height: auto;
  object-fit: fill;
`
// eslint-disable-next-line prettier/prettier
export const ToggleProfile = styled.div<PropProfile>`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  background: ${props => props.theme.colors.colorJ};
  border-radius: 1rem;
  position: absolute;
  top: 100%;
  transform: translateY(10%);
  visibility: ${({ profileOpen }) => (profileOpen ? 'visible' : 'hidden')};
  opacity: ${({ profileOpen }) => (profileOpen ? '1' : '0')};
  transition: opacity 0.3s ease-in-out;
  padding: 1.6rem;
  z-index: 1;
  box-shadow: 0 0 0.7rem 0 ${props => props.theme.colors.colorH};

  @media (min-width: ${props => props.theme.screenSize.sizeMD}) {
    max-width: 20rem;
  }
`
export const ToggleLink = styled(Link)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  text-decoration: none;

  /* Component DisplayTitle */
  h1 {
    color: ${props => props.theme.colors.colorC};
    font-style: normal;
    font-weight: 700;
    font-size: 1.4rem;
    line-height: 2.1rem;
    text-transform: capitalize;
  }

  /* Component DisplayTypography */
  p {
    font-style: normal;
    font-weight: 700;
    font-size: 1.4rem;
    line-height: 2.1rem;
    white-space: nowrap;
    color: ${props => props.theme.colors.colorC};
    text-transform: capitalize;
  }

  &:nth-child(3) {
    p {
      color: ${props => props.theme.colors.colorI};
    }
  }
`
