import styled from 'styled-components'
import Link from 'next/link'

export const WrapperSideBar = styled.nav`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (min-width: ${props => props.theme.screenSize.sizeMD}) {
    max-width: 26rem;
  }
`
export const ContentSideBar = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  @media (min-width: ${props => props.theme.screenSize.sizeMD}) {
    background: ${props => props.theme.colors.colorA};
    box-shadow: 0 0 0.7rem 0 ${props => props.theme.colors.colorH};
    border-radius: 1.6rem;
  }
`
export const ContentLinks = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 2rem;
  padding: 2rem;

  overflow-x: scroll;
  transition: transform 0.2s ease-in-out;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    width: 100%;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: transparent;
  }

  @media (min-width: ${props => props.theme.screenSize.sizeMD}) {
    flex-direction: column;
    align-items: flex-start;
  }
`
export const DisplayLink = styled(Link)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex: 2;
  scroll-snap-align: center;
  text-decoration: none;
  border-radius: 0.9rem;
  border: solid ${props => props.theme.colors.colorH} 0.1rem;
  box-shadow: 0 0 0.8rem 0 ${props => props.theme.colors.colorH};
  background: ${props => props.theme.colors.colorH};
  padding: 0.8rem;

  /* Component DisplayTypography */
  p {
    font-style: normal;
    font-weight: 700;
    font-size: 1.4rem;
    line-height: 2.1rem;
    white-space: nowrap;
    color: ${props => props.theme.colors.colorC};
    &::first-letter {
      text-transform: capitalize;
    }
    text-align: center;
  }

  @media (min-width: ${props => props.theme.screenSize.sizeMD}) {
    border-radius: 0;
    border: none;
    box-shadow: none;
    justify-content: flex-start;
    align-items: flex-start;
    background: none;

    &:hover {
      div,
      p {
        color: ${props => props.theme.colors.colorH};
        transition: ease-in 0.3s all;
      }
    }
  }
`
export const DisplayIcon = styled.div`
  font-size: 2rem;
  color: ${props => props.theme.colors.colorC};
  display: flex;
  justify-content: center;
  align-items: center;
`
