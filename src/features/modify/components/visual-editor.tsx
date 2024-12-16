'use client'

import '@remirror/styles/all.css'
import '../styles/remirror-custom.css'

import { css } from '@emotion/css'
import React from 'react'
import {
  // MarkdownToolbar,
  Remirror,
  ThemeProvider,
  useRemirror,
} from '@remirror/react'
import { extensions } from '../libs/extensions'
import { useEditDocumentContext } from '../context/edit-document-context'

interface VisualEditorProps {
  prevContent?: string
}

export default function VisualEditor({ prevContent }: VisualEditorProps) {
  const { manager } = useRemirror({
    extensions,
    stringHandler: 'markdown',
    // content: '**Markdown** content is the _best_',
  })
  const { setEditorMarkdownContent } = useEditDocumentContext()

  return (
    <ThemeProvider>
      <Remirror
        manager={manager}
        autoRender="end"
        initialContent={prevContent}
        onChange={({ helpers, state }) =>
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          setEditorMarkdownContent(helpers.getMarkdown && helpers.getMarkdown(state))
        }
        placeholder="본문을 작성해보세요!"
        classNames={[
          css`
            &.ProseMirror {
              padding: 16px 20px;
              padding-bottom: 100px;
              width: 100%;
              /* min-width: 100vw; */
              max-width: 430px;
              min-height: 80vh;

              .remirror-ul-list-content {
                margin-top: 0;
                margin-bottom: 0;
                // default padding-left 28px
                padding-left: 12px;
              }
              .remirror-list-item-marker-container {
                // default left 32px
                left: -18px;
              }
              .remirror-list-item-with-custom-mark {
                margin: 0;
              }
            }
          `,
          'prose prose-h1:text-4xl dark:prose-invert prose-p:my-0 prose-sm !shadow-none sm:prose-base lg:prose-lg xl:prose-md focus:outline-none',
          'min-h-[100vh]',
        ]}
      >
        {/* <MarkdownToolbar /> */}
      </Remirror>
    </ThemeProvider>
  )
}
