import GoBackButton from '@/shared/components/custom/go-back-button'
import Text from '@/shared/components/ui/text'

const Header = () => {
  return (
    <header className="relative flex h-[54px] w-full items-center bg-background-base-01 px-[16px]">
      <GoBackButton />
      <Text typography="subtitle2-medium" className="center">
        자주 묻는 질문
      </Text>
    </header>
  )
}

export default Header
