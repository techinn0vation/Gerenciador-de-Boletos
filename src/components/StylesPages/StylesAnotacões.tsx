import styled from 'styled-components'

export const WrapperAnotações = styled.section`
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
export const ContentAnotações = styled.div`
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
    background: ${props => props.theme.colors.colorA};
    box-shadow: 0 0 0.7rem 0 ${props => props.theme.colors.colorH};
    border-radius: 1.6rem;
    padding: 1.6rem;
    overflow-x: hidden;
  }
`
