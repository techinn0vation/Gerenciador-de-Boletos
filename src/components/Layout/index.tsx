import { ContentLayout, WrapperLayout } from './styles'

import { ScrollProgress, TopBar } from '@/components/GeralComponents'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <WrapperLayout>
      <ScrollProgress />
      <TopBar />
      <ContentLayout>{children}</ContentLayout>
    </WrapperLayout>
  )
}
