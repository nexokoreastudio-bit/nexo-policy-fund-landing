import { useEffect, useState } from 'react'

import { IMAGE_PLACEHOLDER_COPY } from '../constants/landing'

type ImageSlotPlaceholderProps = {
  label: string
  src?: string
  alt?: string
  note?: string
  plannedSrc?: string
  sourceRef?: string
  minHeightClassName?: string
}

function ImageSlotPlaceholder({
  label,
  src,
  alt = label,
  note: _note = '2026 최종 이미지 업로드 예정',
  plannedSrc,
  sourceRef: _sourceRef,
  minHeightClassName = 'min-h-64',
}: ImageSlotPlaceholderProps) {
  const [hasLoadError, setHasLoadError] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const effectiveSrc = hasLoadError ? undefined : src ?? plannedSrc

  useEffect(() => {
    setHasLoadError(false)
  }, [src, plannedSrc])

  useEffect(() => {
    if (!lightboxOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLightboxOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [lightboxOpen])

  return (
    <>
      <div className="rounded-[1.5rem] border border-[#4a6fbe] bg-[linear-gradient(180deg,rgba(23,41,92,0.72)_0%,rgba(13,25,57,0.72)_100%)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:p-5">
        {effectiveSrc ? (
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className={`group relative mt-1 block w-full overflow-hidden rounded-[1.25rem] border border-[#89a8ef] bg-white text-left shadow-[0_18px_40px_rgba(4,10,30,0.28)] ${minHeightClassName}`}
          >
            <span className="absolute right-3 top-3 z-10 rounded-full bg-slate-950/80 px-3 py-1 text-[11px] font-bold text-white">
              클릭해서 크게 보기
            </span>
            <img
              src={effectiveSrc}
              alt={alt}
              className="h-full w-full bg-white object-contain transition-transform duration-200 group-hover:scale-[1.01]"
              onError={() => setHasLoadError(true)}
            />
          </button>
        ) : (
          <>
            <div className={`mt-3 flex items-center justify-center rounded-[1.25rem] border border-dashed border-slate-300 bg-white text-center ${minHeightClassName}`}>
              <div>
                <p className="text-sm font-bold text-slate-700">{IMAGE_PLACEHOLDER_COPY.title}</p>
                <p className="mt-2 px-5 text-xs text-slate-500">{IMAGE_PLACEHOLDER_COPY.description}</p>
              </div>
            </div>
          </>
        )}
      </div>

      {lightboxOpen && effectiveSrc ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/88 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={() => setLightboxOpen(false)}
        >
          <div className="relative w-full max-w-7xl" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="absolute right-2 top-2 z-10 rounded-full bg-slate-950/70 px-3 py-1.5 text-xs font-bold text-white backdrop-blur"
            >
              닫기
            </button>
            <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-white shadow-2xl">
              <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-4 py-3 sm:px-5">
                <p className="text-sm font-semibold text-slate-700">{alt}</p>
                <p className="hidden text-xs text-slate-400 sm:block">배경 클릭 또는 ESC로 닫기</p>
              </div>
              <div className="max-h-[82vh] overflow-auto bg-slate-100 p-2 sm:p-4">
                <img src={effectiveSrc} alt={alt} className="mx-auto w-full rounded-xl bg-white object-contain" />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default ImageSlotPlaceholder
