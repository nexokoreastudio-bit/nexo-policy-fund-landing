export type CertificateTrackKey = 'general' | 'startup'

export type CertificateStep = {
  title: string
  desc: string
  images: string[]
  tip?: string
}

export type CertificateTrack = {
  label: string
  description: string
  steps: CertificateStep[]
}

export type CertificateGuideData = {
  general: CertificateTrack
  startup: CertificateTrack
}
