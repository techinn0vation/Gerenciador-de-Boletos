import styled from 'styled-components'
import { BsTrashFill, BsPlusCircleFill } from 'react-icons/bs'

export const WrapperUsuarios = styled.section`
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
export const ContentUsuarios = styled.div`
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
  }
  padding: 1.6rem;
`
export const WrapperTable = styled.table`
  min-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  /* border: solid ${props => props.theme.colors.colorH} 0.02rem; */ //OBS
  box-shadow: 0 0 0.5rem 0 ${props => props.theme.colors.colorH};

  border-radius: 1rem;
  padding: 1rem;
`
export const TableRow = styled.tr`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`
export const TableHeader = styled.th`
  width: 100%;
  font-style: normal;
  font-weight: 600;
  font-size: 1.4rem;
  line-height: 2.1rem;
  white-space: nowrap;
  text-transform: uppercase;
  color: ${props => props.theme.colors.colorC};
`
export const TableData = styled.td`
  width: 100%;
  color: ${props => props.theme.colors.colorC};
  overflow-x: scroll;
  font-style: normal;
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 2.1rem;
  white-space: nowrap;
  text-align: center;
  &::first-letter {
    text-transform: capitalize;
  }

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
`
export const ButtonDelete = styled(BsTrashFill)`
  color: ${props => props.theme.colors.colorH};
  font-size: 1.6rem;
  cursor: pointer;

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
export const ButtonAdd = styled(BsPlusCircleFill)`
  color: ${props => props.theme.colors.colorC};
  border: solid ${props => props.theme.colors.colorH} 0.2rem;
  border-radius: 100%;
  font-size: 2.4rem;
  cursor: pointer;
  padding: 0.2rem;

  transition: ease-in 0.03s;
  &:active {
    transform: translateY(0.2rem);
    animation: blinkAdd 0.4s;
  }

  @keyframes blinkAdd {
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
