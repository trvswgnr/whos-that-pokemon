import { type FC, createElement } from 'react'
import Link from 'next/link'

interface Props {
  children?: React.ReactNode,
  el?: React.ElementType,
  className?: string,
  href?: string,
  as?: string,
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void,
  [key: string]: unknown
}

export const Button: FC<Props> = ({ children, el, href, as, className, onClick, ...props }) => {
  let btnClass = `bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full cursor-pointer
    disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-80`
  if (className) btnClass += ' ' + className

  const clickHandler = props.disabled ? undefined : onClick

  const button = createElement(el || 'button', { className: btnClass, onClick: clickHandler, ...props }, children)

  if (href) {
    return <Link {...{ href, as }}>{button}</Link>
  }

  return button
}
