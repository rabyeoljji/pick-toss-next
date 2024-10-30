import Confirm from '@/views/profile/inquiry/components/confirm'
import InquiryType from '@/views/profile/inquiry/components/inquiry-type'
import SetEmail from '@/views/profile/inquiry/components/set-email'
import TitleAndContent from '@/views/profile/inquiry/components/title-and-content'
import { InquiryProvider } from '@/views/profile/inquiry/context/inquiry-context'
import Header from '@/views/profile/main/components/header'

const InquiryPage = () => {
  return (
    <InquiryProvider>
      <Header />

      <main className="h-[calc(100dvh-54px-88px)] w-full overflow-y-auto">
        <InquiryType />

        <div className="h-[8px] w-full bg-background-base-02"></div>

        <TitleAndContent />

        <div className="h-[8px] w-full bg-background-base-02"></div>

        <SetEmail />

        <Confirm />
      </main>
    </InquiryProvider>
  )
}

export default InquiryPage
