import GoBackButton from '@/shared/components/go-back-button'
import Text from '@/shared/components/ui/text'
import NotificationControlArea from '@/views/profile/notification/components/notification-control-area'
import { NotificationProvider } from '@/views/profile/notification/context/notification-context'

const NotificationPage = () => {
  const isKakaoUser = true

  return (
    <>
      <header className="relative flex h-[54px] w-full items-center bg-background-base-01 px-[16px]">
        <GoBackButton />
        <Text typography="subtitle2-medium" className="center">
          알림 설정
        </Text>
      </header>

      <NotificationProvider>
        <NotificationControlArea isKakaoUser={isKakaoUser} />
      </NotificationProvider>
    </>
  )
}

export default NotificationPage
