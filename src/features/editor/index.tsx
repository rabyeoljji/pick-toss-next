import TitleInput from './components/title-input'
import { EditDocumentProvider } from './context/edit-document-context'
import dynamic from 'next/dynamic'
import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'
import Loading from '@/shared/components/custom/loading'
import FixedBottom from '@/shared/components/custom/fixed-bottom'
import NewQuizDrawer from '../quiz/components/new-quiz-drawer'
import { Button } from '@/shared/components/ui/button'

// Remirror가 브라우저 전용 라이브러리라 서버에서 렌더링될 때 오류 발생, 이를 해결하기 위해 dynamic import를 사용
const VisualEditor = dynamic(() => import('./components/visual-editor'), {
  ssr: false,
  loading: () => <Loading center />,
})

const CreateWithEditor = () => {
  return (
    <>
      {/* <Header /> */}

      <EditDocumentProvider>
        <div className="w-full max-w-mobile">
          <TitleInput />

          <div className="sticky top-[54px] z-10 flex w-full items-center justify-between bg-background-base-02 px-[16px] py-[11px]">
            <div className="flex items-center">
              <Icon name="info" className="mr-[4px] size-[16px]" />
              <Text as="span" typography="text2-medium" className="text-text-caption">
                최소 500자, 최대 15000자 입력 가능
              </Text>
            </div>
            <Text typography="text1-medium" className="text-text-secondary">
              <span className="text-text-caption">{0}</span> / 15000
            </Text>
          </div>

          <VisualEditor />

          <FixedBottom className="px-[20px]">
            <NewQuizDrawer
              triggerComponent={
                <Button
                  variant={'largeRound'}
                  colors={'primary'}
                  className="flex-center h-[52px] w-full"
                >
                  퀴즈 만들기
                </Button>
              }
            />
          </FixedBottom>
        </div>
      </EditDocumentProvider>
    </>
  )
}

export default CreateWithEditor