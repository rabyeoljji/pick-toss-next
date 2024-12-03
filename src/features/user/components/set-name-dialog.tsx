'use client'

import { useUpdateUserName } from '@/requests/user/hooks'
import Icon from '@/shared/components/custom/icon'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog'
import Text from '@/shared/components/ui/text'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Form, FormControl, FormField, FormItem } from '@/shared/components/ui/form'

const formSchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요'),
})

type FormValues = z.infer<typeof formSchema>

const SetNameDialog = ({ userName }: { userName: string }) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: userName,
    },
  })

  const { mutate, isPending } = useUpdateUserName()

  const onSubmit = (values: { name: string }) => {
    mutate(
      {
        name: values.name,
      },
      {
        onSuccess: () => {
          router.refresh()
          setOpen(false)
        },
      }
    )
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open)
        if (!open) {
          form.reset()
        }
      }}
    >
      <DialogTrigger asChild>
        <div className="flex w-full cursor-pointer items-center justify-between">
          <div className="flex flex-col items-start gap-[4px]">
            <Text typography="text2-medium" className="text-text-sub">
              이름
            </Text>
            <Text typography="subtitle2-medium">{userName}</Text>
          </div>
          <Icon name="chevron-right" className="size-[16px] text-icon-tertiary" />
        </div>
      </DialogTrigger>

      <DialogContent
        displayCloseButton={false}
        className="h-fit w-[280px] rounded-[16px] bg-background-base-01 p-[24px] pb-[32px]"
        onPointerDownOutside={(e) => {
          if (isPending) {
            e.preventDefault()
          }
        }}
      >
        <div>
          <DialogTitle className="mb-[38px]">
            <Text typography="subtitle2-bold">이름 변경</Text>
          </DialogTitle>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <input
                        {...field}
                        disabled={isPending}
                        className="size-full border-b border-border-divider py-[5px] text-subtitle2-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-background-disabled disabled:opacity-50 disabled:placeholder:text-text-disabled"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="mt-[53px] flex items-center justify-end gap-[35px] text-button2">
                <DialogClose>
                  <span className="text-button-text-tertiary">취소</span>
                </DialogClose>
                <button className="text-button-text-primary">저장하기</button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SetNameDialog
