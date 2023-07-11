import { ContentAgPagamentos, WrapperAgPagamentos } from './styles'
import { Headline } from '@/components/GeralComponents'

export default function AgPagamento() {
  return (
    <WrapperAgPagamentos>
      <Headline title="aguardando pagamento!" text="" />
      <ContentAgPagamentos></ContentAgPagamentos>
    </WrapperAgPagamentos>
  )
}
