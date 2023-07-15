import styled from 'styled-components'

export const WrapperConsult = styled.section`
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
export const ContentConsult = styled.div`
  width: 100%;
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
  color: ${props => props.theme.colors.colorC};
`
export const BlockConsult = styled.div`
  width: 100%;
  display: flex;
  padding: 1.6rem 0;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
  align-items: center;
`
export const InputFieldConsult = styled.input`
  width: 100%;
  background: ${props => props.theme.colors.colorC};
  color: ${props => props.theme.colors.colorA};
  font-style: normal;
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 2.1rem;
  text-align: left;

  caret-color: ${props => props.theme.colors.colorB};
  padding: 1.6rem;
  outline: none;
  border-radius: 0.9rem;
  border-left: solid ${props => props.theme.colors.colorH} 2rem;
  animation: load 0.6s linear;
  transition: all 0.4s;
  @keyframes load {
    0% {
      border-left: solid ${props => props.theme.colors.colorF} 0;
    }
    100% {
      border-left: solid ${props => props.theme.colors.colorH} 2rem;
    }
  }
  &:focus {
    background: ${props => props.theme.colors.colorG};
  }

  &::placeholder {
    text-transform: uppercase;
    font-size: 1.2rem;
    line-height: 1.8rem;
    opacity: 0.88;
  }
  &[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  &[type='number'] {
    -moz-appearance: textfield;
    appearance: textfield;
  }

  @media (min-width: ${props => props.theme.screenSize.sizeMD}) {
    max-width: 40rem;
    margin: 0 auto;
  }
`
export const ButtonConsult = styled.button`
  width: 100%;
  max-width: 20rem;
  margin: 0 auto;
  padding: 1.6rem;
  border-radius: 1.4rem;
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
  color: ${props => props.theme.colors.colorC};
  text-transform: capitalize;

  transition: ease-in 0.03s;
  &:active {
    transform: translateY(0.2rem);
    animation: blinkDate 0.4s;
  }

  @keyframes blinkDate {
    0% {
      box-shadow: 0 0 0 0 ${props => props.theme.colors.colorH};
    }
    50% {
      box-shadow: 0 0 0 1rem transparent;
    }
    100% {
      box-shadow: 0 0 0 0 ${props => props.theme.colors.colorH};
    }
  }
`
export const ScreenResult = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export const ContentButtons = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  @media (min-width: ${props => props.theme.screenSize.sizeMD}) {
    flex-direction: row;
    gap: 1.5rem;
  }
`
