import { Meta, StoryObj } from '@storybook/react'
import Header from './@header/default'
import Home from './page'
import Layout from './layout'

const meta = {
  title: 'Page/Main',
  component: Home,
  parameters: {
    layout: 'fullscreen',
    nextjs: { appDirectory: true },
  },
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-mobile">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Home>

export default meta

type Story = StoryObj<typeof Home>

export const Default: Story = {
  render: () => (
    <Layout header={<Header />}>
      <Home />
    </Layout>
  ),
}
