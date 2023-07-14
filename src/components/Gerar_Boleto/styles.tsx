import styled from 'styled-components'
import InputMask from 'react-input-mask'

export const WrapperGerarBoleto = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 2rem;

  /* @media (min-width: ${props => props.theme.screenSize.sizeMD}) {
    flex-direction: row;
    align-items: flex-start;
  } */
`
export const ContentGerarBoleto = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 2rem;
  padding-bottom: 2rem;

  @media (min-width: ${props => props.theme.screenSize.sizeLG}) {
    div {
      max-width: 40rem; // OBS!
    }
  }
`
export const DisplayInputMask = styled.input`
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
`
