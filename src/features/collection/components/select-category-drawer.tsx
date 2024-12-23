'use client'

import QS from 'query-string'
import FixedBottom from '@/shared/components/custom/fixed-bottom'
import Icon from '@/shared/components/custom/icon'
import { Button } from '@/shared/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/components/ui/drawer'
import Text from '@/shared/components/ui/text'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { cn } from '@/shared/lib/utils'
import { useState } from 'react'
import { CATEGORIES } from '@/features/category/config'
import { Checkbox } from '@/shared/components/ui/checkbox'
import Label from '@/shared/components/ui/label'

interface Props {
  categories: Collection.Field[]
}

const SelectCategoryDrawer = ({ categories }: Props) => {
  const [innerCategories, setInnerCategories] = useState<Collection.Field[]>(categories)
  const searchParamsString = useSearchParams().toString()
  const router = useRouter()
  const pathname = usePathname()

  const sortByCategories = (categories: Collection.Field[]) => {
    const categoryOrder = CATEGORIES.map((category) => category.id)
    return categories.sort((a, b) => categoryOrder.indexOf(a) - categoryOrder.indexOf(b))
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button
          className={cn(
            'h-[32px] flex items-center gap-[4px] rounded-full border bg-button-fill-outlined pl-[14px] pr-[10px] text-button-label-tertiary',
            innerCategories.length > 0 && 'border-button-fill-primary text-text-accent'
          )}
        >
          <Text typography="button4">
            {innerCategories.length < 1
              ? '분야'
              : `${CATEGORIES.find((category) => category.id === innerCategories[0])?.name}${
                  innerCategories.length > 1 ? ` 외 ${innerCategories.length - 1}` : ''
                }`}
          </Text>
          <Icon
            name="chevron-down"
            className={cn(
              'size-[12px] text-icon-tertiary',
              innerCategories.length > 0 && 'text-text-accent'
            )}
          />
        </button>
      </DrawerTrigger>
      <DrawerContent className="mx-auto h-[85vh] max-w-mobile px-4">
        <DrawerHeader className="px-0 py-5">
          <DrawerTitle>
            <Text typography="title3">분야</Text>
          </DrawerTitle>
        </DrawerHeader>
        <div className="h-px bg-border-divider" />

        <div>
          {CATEGORIES.map((category) => (
            <div key={category.id} className="flex items-center gap-3">
              <Checkbox
                id={category.id}
                value={category.id}
                checked={innerCategories.includes(category.id)}
                onCheckedChange={() => {
                  if (innerCategories.includes(category.id)) {
                    setInnerCategories(
                      sortByCategories(innerCategories.filter((c) => c !== category.id))
                    )
                  } else {
                    setInnerCategories(sortByCategories([...innerCategories, category.id]))
                  }
                }}
              />
              <Label htmlFor={category.id} className="py-2.5">
                <Text typography="text1-medium">{category.name}</Text>
              </Label>
            </div>
          ))}
        </div>

        <FixedBottom className="flex gap-1.5">
          <DrawerClose className="w-full">
            <Button
              className="w-full"
              onClick={() => {
                const newQueryString = QS.stringify({
                  ...QS.parse(searchParamsString),
                  'collection-category':
                    innerCategories.length > 0 ? innerCategories.join(',') : undefined,
                })
                router.replace(`${pathname}?${newQueryString}`)
              }}
            >
              적용하기
            </Button>
          </DrawerClose>
        </FixedBottom>
      </DrawerContent>
    </Drawer>
  )
}

export default SelectCategoryDrawer
