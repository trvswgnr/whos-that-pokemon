import { type PropsWithChildren, type HTMLAttributes } from 'react'

export function Container({ children, className, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  className = `w-full max-w-[800px] mx-auto px-4 ${className || ''}`

  return (
    <div className={className} {...props}>
      {children}
    </div>
  )
}
