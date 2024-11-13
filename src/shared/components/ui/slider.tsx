'use client'

import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'

import { cn } from '@/shared/lib/utils'

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn('relative flex w-full touch-none select-none items-center', className)}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-background-base-03">
      <SliderPrimitive.Range className="absolute h-full bg-fill-primary-orange" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="focus-visible:ring-offset-background focus-visible:ring-ring block size-[32px] cursor-grab rounded-full border border-border-default bg-background-base-01 shadow-custom-shadow transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:cursor-grabbing disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
