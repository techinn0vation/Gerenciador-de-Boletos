import styled from 'styled-components'

export const WrapperUsuario = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 2rem;

  @media (min-width: ${props => props.theme.screenSize.sizeMD}) {
    flex-direction: row;
    align-items: flex-start;
    padding: 1rem;
  }
`
export const ContentUsuario = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 2rem;
  overflow-x: scroll;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: transparent;
  }

  @media (min-width: ${props => props.theme.screenSize.sizeMD}) {
    height: auto; // Ou 55rem
    background: ${props => props.theme.colors.colorA};
    box-shadow: 0 0 0.7rem 0 ${props => props.theme.colors.colorH};
    border-radius: 1.6rem;
    padding: 1.6rem;
    overflow-y: scroll;
  }
`
export const BlockUsuario = styled.div`
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

  @media (min-width: ${props => props.theme.screenSize.sizeLG}) {
    overflow: hidden;
  }
`
export const ButtonUsuario = styled.button`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex: 2;
  scroll-snap-align: center;
  border-radius: 0.9rem;
  border: solid ${props => props.theme.colors.colorH} 0.1rem;
  box-shadow: 0 0 0.8rem 0 ${props => props.theme.colors.colorH};
  background: ${props => props.theme.colors.colorH};
  padding: 0.8rem;
  position: relative;

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

    transition: ease-in 0.03s;
    &:active {
      transform: translateY(0.2rem);
    }

    &:hover::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -5px;
      width: 100%;
      height: 2px;
      background: ${props => props.theme.colors.colorH};
      animation: underline 0.3s ease-out forwards;
    }

    @keyframes underline {
      from {
        transform: scaleX(0);
      }
      to {
        transform: scaleX(1);
      }
    }
  }
`
export const DisplayIconUsuario = styled.div`
  font-size: 2rem;
  color: ${props => props.theme.colors.colorC};
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: ${props => props.theme.screenSize.sizeMD}) {
    color: ${props => props.theme.colors.colorH};
  }
`
export const ScreenCheckUsuario = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
`
