import { Container, Text, Img, Body, Html, Link } from '@react-email/components'

export default function TodayQuizEmail() {
  return (
    <Html>
      <Body
        style={{
          backgroundColor: '#ffffff',
          maxWidth: 500,
          textAlign: 'center',
          color: '#292B2C',
        }}
      >
        <Img
          src="https://picktoss-dev-bucket.s3.amazonaws.com/today-quiz-background.png"
          width="100%"
        />
        <Container
          style={{
            marginTop: '-100%',
          }}
        >
          <Container>
            <Img
              src="https://picktoss-dev-bucket.s3.amazonaws.com/logo-icon.png"
              alt=""
              width="100px"
              style={{
                paddingTop: '110px',
                margin: '0 auto',
              }}
            />
            <Text
              style={{
                color: '#ffffff',
                fontSize: '11px',
                marginTop: '6px',
              }}
            >
              나의 노트에서 출발해 매일 도착하는 퀴즈
            </Text>
          </Container>
          <Container
            style={{
              marginTop: '45px',
            }}
          >
            <Text
              style={{
                fontWeight: 700,
                color: '#FB7E20',
              }}
            >
              TODAY&apos;s QUIZ
            </Text>
            <Text
              style={{
                fontWeight: 900,
                fontSize: '24px',
                marginTop: '-5px',
              }}
            >
              --월 --일 오늘의 퀴즈
            </Text>
            <Text
              style={{
                fontSize: '12px',
                marginTop: '-12px',
              }}
            >
              ---님을 위해 AI가 선별한 오늘의 퀴즈를 풀어보세요
            </Text>
          </Container>
          <Container
            style={{
              marginTop: '16px',
            }}
          >
            <Link
              href=""
              target="_blank"
              rel="noreferrer noopener"
              style={{
                background: '#FB7E20',
                color: '#ffffff',
                padding: '14px 36px',
                borderRadius: '50px',
                fontWeight: 600,
                fontSize: '14px',
              }}
            >
              오늘의 퀴즈 시작하기
            </Link>
          </Container>
          <Container
            style={{
              marginTop: '30px',
            }}
          >
            <Text>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                }}
              >
                CONTACT
              </span>{' '}
              <span
                style={{
                  fontSize: '12px',
                }}
              >
                support@picktoss.com
              </span>
            </Text>
            <Text
              style={{
                fontSize: '11px',
                color: '#A2A6AB',
                marginTop: '-16px',
              }}
            >
              ⓒ 2024. picktoss all rights reserved
            </Text>
          </Container>
        </Container>
      </Body>
    </Html>
  )
}
