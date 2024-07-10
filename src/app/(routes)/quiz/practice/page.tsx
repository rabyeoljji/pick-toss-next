import { getExampleQuizSets } from '@/apis/fetchers/quiz/get-example-quizzes/fetcher'
import { ExampleQuiz } from './components/example-quiz'

export default async function QuizPractice() {
  const { quizzes } = await getExampleQuizSets()

  return <ExampleQuiz quizzes={quizzes.map((quiz, idx) => ({ id: idx, ...quiz }))} />
}
