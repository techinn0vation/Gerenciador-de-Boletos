import styled from 'styled-components'
import { IoClose } from 'react-icons/io5'

export const WrapperModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.816);
  z-index: 1;
  padding: 2rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export const ContentModal = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 3rem;
  position: relative;

  border-radius: 1.6rem;
  background: ${props => props.theme.colors.colorA};
  box-shadow: 0 0 0.8rem 0 ${props => props.theme.colors.colorH};
  padding: 2rem;
  overflow: scroll;

  &::-webkit-scrollbar {
    width: 0;
  }

  @media (min-width: ${props => props.theme.screenSize.sizeMD}) {
    max-width: 65%;
    height: auto;
    margin: auto;
  }

  @media (min-width: ${props => props.theme.screenSize.sizeLG}) {
    max-width: 50%;
    height: auto;
    margin: auto;
  }
`
export const BlockRegistration = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;

  @media (min-width: ${props => props.theme.screenSize.sizeMD}) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;
    place-items: center;
  }
`
export const ViewRegistration = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 3rem;
`
export const FieldRegistration = styled.input`
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
export const ContentFieldBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 2rem;

  p {
    font-style: normal;
    font-weight: 500;
    font-size: 1.4rem;
    line-height: 2.1rem;
    opacity: 0.77;
    color: ${props => props.theme.colors.colorC};
    &::first-letter {
      text-transform: capitalize;
    }
  }

  &:nth-of-type(2) {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 2rem;

    @media (min-width: ${props => props.theme.screenSize.sizeMD}) {
    }
  }
`
export const FieldCheckBlock = styled.input`
  appearance: none;
  width: 1.8rem;
  height: 1.8rem;
  border: 0.1rem solid ${props => props.theme.colors.colorH};
  border-radius: 0.5rem;
  outline: none;
  cursor: pointer;
  position: relative;
  transition: all ease-in 0.2s;

  &:checked {
    background-color: ${props => props.theme.colors.colorH};
  }

  &:checked::before {
    content: '✔';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: ${props => props.theme.colors.colorC};
    font-size: 1.2rem;
  }

  transition: ease-in 0.03s;
  &:active {
    transform: translateY(0.2rem);
    animation: blink 0.4s;
  }

  @keyframes blink {
    0% {
      box-shadow: 0 0 0 0 ${props => props.theme.colors.colorH};
      border-radius: 100%;
    }
    50% {
      box-shadow: 0 0 0 1rem transparent;
      border-radius: 100%;
    }
    100% {
      box-shadow: 0 0 0 0 ${props => props.theme.colors.colorH};
      border-radius: 100%;
    }
  }
`
export const TypeFieldCheck = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 1rem;
`
export const ButtonSaveDate = styled.button`
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

  color: ${props => props.theme.colors.colorC};
  font-style: normal;
  cursor: pointer;
  font-weight: 700;
  font-size: 1.4rem;
  line-height: 2.1rem;
  &::first-letter {
    text-transform: capitalize;
  }
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
export const DisplayButtonClose = styled(IoClose)`
  font-size: 2rem;
  position: absolute;
  top: 0;
  right: 0;
  margin: 1rem;
  color: ${props => props.theme.colors.colorH};
  cursor: pointer;

  transition: ease-in 0.03s;
  &:active {
    color: ${props => props.theme.colors.colorC};

    transform: translateY(0.2rem);
    animation: blinkClose 0.4s;
  }

  @keyframes blinkClose {
    0% {
      box-shadow: 0 0 0 0 ${props => props.theme.colors.colorH};
      border-radius: 100%;
    }
    50% {
      box-shadow: 0 0 0 1rem transparent;
      border-radius: 100%;
    }
    100% {
      box-shadow: 0 0 0 0 ${props => props.theme.colors.colorH};
      border-radius: 100%;
    }
  }
`
