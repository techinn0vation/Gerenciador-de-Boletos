import { WrapperHeadline } from './styles'
import { DisplayTitle, DisplayTypography } from '@/components/GeralComponents'

interface PropsText {
  title: string;
  text: string;
}

export default function Headline({ title, text }: PropsText) {
  return (
    <WrapperHeadline>
      <DisplayTitle DisplayTitle={title} />
      <DisplayTypography DisplayTypography={text} />
    </WrapperHeadline>
  )
}
