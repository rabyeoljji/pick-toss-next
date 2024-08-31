import { getExampleQuizSets } from '@/actions/fetchers/quiz/get-example-quizzes'
import { ExampleQuiz } from './components/example-quiz'

export default async function QuizPractice() {
  const { quizzes } = await getExampleQuizSets()

  return <ExampleQuiz quizzes={quizzes.map((quiz, idx) => ({ id: idx, ...quiz }))} />
}
