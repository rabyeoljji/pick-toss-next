import type { Meta, StoryObj } from '@storybook/react'
import CollectionDetail from '.'
import RootLayout from '@/app/layout'

const meta = {
  title: 'Page/CollectionDetail',
  component: CollectionDetail,
  parameters: {
    nextjs: { appDirectory: true },
  },
  decorators: [
    (Story) => (
      <RootLayout>
        <Story />
      </RootLayout>
    ),
  ],
} satisfies Meta<typeof CollectionDetail>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
