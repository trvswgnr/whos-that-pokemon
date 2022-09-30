import { type PropsWithChildren, type HTMLAttributes } from 'react'

export default function Container({ children, className, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  className = `mx-auto px-4 ${className || ''}`

  return (
    <div className={className} {...props}>
      {children}
    </div>
  )
}
