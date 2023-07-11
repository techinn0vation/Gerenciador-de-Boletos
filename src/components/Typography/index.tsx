import { RowTypography } from './styles'

interface PropTypography {
  DisplayTypography: string;
}

export default function DisplayTypography({
  DisplayTypography
}: PropTypography) {
  return <RowTypography>{DisplayTypography}</RowTypography>
}
