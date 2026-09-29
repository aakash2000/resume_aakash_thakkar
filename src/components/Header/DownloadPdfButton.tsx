import { DownloadSimple } from '@phosphor-icons/react'
import { resume } from '../../content/resume'
import { useLocale, useSettings } from '../../state/useSettings'
import { ButtonLink } from '../../ui'

const DOWNLOAD_NAME = 'Aakash_Thakkar_Resume.pdf'

/** Downloads the ready-made PDF for the current profile and language; hidden if there is none. */
export function DownloadPdfButton({ className }: { className?: string }) {
  const { profileId, lang } = useSettings()
  const { ui } = useLocale()
  const path = resume.pdfs[profileId]?.[lang]
  if (!path) return null

  return (
    <ButtonLink
      iconOnly
      className={className}
      href={`${import.meta.env.BASE_URL}${path}`}
      download={DOWNLOAD_NAME}
      aria-label={ui.downloadPdf}
      title={ui.downloadPdf}
    >
      <DownloadSimple size={17} aria-hidden />
    </ButtonLink>
  )
}
