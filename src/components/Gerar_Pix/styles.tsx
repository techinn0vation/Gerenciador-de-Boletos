import styled from 'styled-components'

export const WrapperGerarPix = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 2rem;
`
export const ContentGerarPix = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 2rem;
  padding-bottom: 2rem;
`
export const ViewGerarPix = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2.5rem;

  @media (min-width: ${props => props.theme.screenSize.sizeLG}) {
    div {
      width: 100%;
      max-width: 90%;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: auto;
      place-items: center;
    }
  }
`
