import styled from 'styled-components'
import Image from 'next/image'
import { BsEye, BsEyeSlash } from 'react-icons/bs'

export const WrapperLogin = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  position: relative;
`
export const ContentLogin = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  background: ${props => props.theme.colors.colorA};
  border: solid transparent 1rem;
  border-radius: 1.6rem;
  box-shadow: 0 0 0.8rem 0 ${props => props.theme.colors.colorH};
  text-align: center;

  @media (min-width: ${props => props.theme.screenSize.sizeMD}) {
    max-width: 32.5rem;
    margin: 0 auto;
  }
`
export const FrameImageLogin = styled(Image)`
  width: 100%;
  height: auto;
  object-fit: fill;
`
export const ContentFields = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
`
export const BlockFields = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  &:nth-child(2) {
    position: relative;
  }
`
export const InputField = styled.input`
  width: 100%;
  background: ${props => props.theme.colors.colorG};
  color: ${props => props.theme.colors.colorC};
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
`
export const TogglePasswordButton = styled.div`
  position: absolute;
  top: 50%;
  left: 90%;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`
export const VisibleFill = styled(BsEye)`
  font-size: 1.6rem;
  color: ${props => props.theme.colors.colorH};
`
export const InvisibleFill = styled(BsEyeSlash)`
  font-size: 1.6rem;
  color: ${props => props.theme.colors.colorH};
`
export const ButtonLogin = styled.button`
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

  p {
    font-style: normal;
    font-weight: 700;
    font-size: 1.4rem;
    line-height: 2.1rem;
    color: ${props => props.theme.colors.colorJ};
    &::first-letter {
      text-transform: capitalize;
    }
  }

  transition: ease-in 0.02s;
  &:focus:active {
    transform: translateY(0.2rem);
  }
`
export const ContentCheckField = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
  margin-left: 0.5rem;

  p {
    font-style: normal;
    font-weight: 500;
    font-size: 1.3rem;
    line-height: 1.9rem;
    opacity: 0.77;
    color: ${props => props.theme.colors.colorC};
    &::first-letter {
      text-transform: uppercase;
    }
  }
`
export const CheckField = styled.input`
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
    color: ${props => props.theme.colors.colorJ};
    font-size: 1.2rem;
  }

  transition: ease-in 0.03s;
  &:active {
    color: ${props => props.theme.colors.colorC};
    transform: translateY(0.2rem);
    animation: blinkCheck 0.4s;
  }

  @keyframes blinkCheck {
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
