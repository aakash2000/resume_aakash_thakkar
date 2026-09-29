import { useId } from 'react'
import { cx } from '../../lib/cx'
import styles from './SegmentedControl.module.css'

export interface SegmentOption<T extends string> {
  value: T
  label: string
}

interface SegmentedControlProps<T extends string> {
  /** Accessible name of the radio group. */
  label: string
  options: readonly SegmentOption<T>[]
  value: T
  onChange: (value: T) => void
  /** Stretch options to share the full width equally. */
  stretch?: boolean
  className?: string
}

/** A radio group styled as joined buttons (Nocturne `.seg`). Uses native radios for a11y. */
export function SegmentedControl<T extends string>({
  label,
  options,
  value,
  onChange,
  stretch = false,
  className,
}: SegmentedControlProps<T>) {
  const name = useId()
  return (
    <div role="radiogroup" aria-label={label} className={cx(styles.seg, stretch && styles.stretch, className)}>
      {options.map((opt) => (
        <label key={opt.value} className={styles.option}>
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={opt.value === value}
            onChange={() => onChange(opt.value)}
          />
          {opt.label}
        </label>
      ))}
    </div>
  )
}
