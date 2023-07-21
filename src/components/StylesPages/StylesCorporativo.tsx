import styled from 'styled-components'

export const WrapperCorporativo = styled.section`
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
export const ContentCorporativo = styled.div`
  width: 100%;
  height: 85.5vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 2rem;

  @media (min-width: ${props => props.theme.screenSize.sizeMD}) {
    background: ${props => props.theme.colors.colorA};
    box-shadow: 0 0 0.7rem 0 ${props => props.theme.colors.colorH};
    border-radius: 1.6rem;
    padding: 1.6rem;
  }
`
export const AreaTextCorporativo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 2rem;

  overflow: scroll;
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
`
export const TextBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1.6rem;

  h1 {
    font-style: normal;
    font-weight: 700;
    font-size: 1.4rem;
    line-height: 2.1rem;
    text-align: left;
    color: ${props => props.theme.colors.colorH};
    scroll-snap-align: start;
    text-transform: uppercase;
  }

  p {
    font-style: normal;
    font-weight: 700;
    font-size: 1.4rem;
    line-height: 2.1rem;
    text-align: left;
    color: ${props => props.theme.colors.colorC};
    scroll-snap-align: start;
    &::first-letter {
      text-transform: capitalize;
    }
  }
`
export const ButtonCopyText = styled.button`
  width: auto;
  margin: 0 auto;
  padding: 0.6rem;
  border-radius: 0.5rem;
  background: ${props => props.theme.colors.colorH};

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  box-shadow: 0 0 0.4rem 0 ${props => props.theme.colors.colorH};

  font-style: normal;
  font-weight: 700;
  font-size: 1.4rem;
  line-height: 2.1rem;
  color: ${props => props.theme.colors.colorA};
  &::first-letter {
    text-transform: capitalize;
  }

  transition: ease-in 0.02s;
  &:focus:active {
    transform: translateY(0.2rem);
  }
`
