import type { AnchorHTMLAttributes, ButtonHTMLAttributes, Ref } from 'react'
import { cx } from '../../lib/cx'
import styles from './Button.module.css'

type Variant = 'primary' | 'secondary' | 'ghost'

interface StyleProps {
  variant?: Variant
  /** Square 36×36 button holding only an icon. Requires an aria-label. */
  iconOnly?: boolean
}

const buttonClass = ({ variant = 'secondary', iconOnly = false }: StyleProps, className?: string) =>
  cx(styles.btn, styles[variant], iconOnly && styles.icon, className)

interface ButtonProps extends StyleProps, ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: Ref<HTMLButtonElement>
}

export function Button({ variant, iconOnly, type = 'button', className, ...rest }: ButtonProps) {
  return <button type={type} className={buttonClass({ variant, iconOnly }, className)} {...rest} />
}

interface ButtonLinkProps extends StyleProps, AnchorHTMLAttributes<HTMLAnchorElement> {
  ref?: Ref<HTMLAnchorElement>
}

/** A link that looks like a Button, for navigation and downloads. */
export function ButtonLink({ variant, iconOnly, className, ...rest }: ButtonLinkProps) {
  return <a className={buttonClass({ variant, iconOnly }, className)} {...rest} />
}
