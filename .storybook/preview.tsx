import React from 'react'
import type { Preview } from '@storybook/react'
import '../src/app/globals.css'
import RootLayout from '../src/app/layout'

const preview: Preview = {
  decorators: [
    (Story) => (
      <RootLayout>
        <Story />
      </RootLayout>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
