import Confirm from '@/features/user/components/confirm'
import InquiryType from '@/features/user/components/inquiry-type'
import SetEmail from '@/features/user/components/set-email'
import TitleAndContent from '@/features/user/components/title-and-content'
import { InquiryProvider } from '@/features/user/contexts/inquiry-context'

const InquiryPage = () => {
  return (
    <InquiryProvider>
      {/* <Header /> */}

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
