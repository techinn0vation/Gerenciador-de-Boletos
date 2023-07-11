import { RowTitle } from './styles'

interface PropText {
  DisplayTitle: string;
}

export default function DisplayTitle({ DisplayTitle }: PropText) {
  return <RowTitle>{DisplayTitle}</RowTitle>
}
