import { useState } from 'react'

type AccordionItem = {
  title: string
  content: string
}

type AccordionProps = {
  items: AccordionItem[]
  onOpenItem?: (index: number) => void
}

function Accordion({ items, onOpenItem }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index

        return (
          <div key={item.title} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              onClick={() => {
                const next = isOpen ? null : index
                setOpenIndex(next)
                if (next !== null) {
                  onOpenItem?.(index)
                }
              }}
              aria-expanded={isOpen}
            >
              <span className="text-sm font-semibold text-slate-900 sm:text-base">{item.title}</span>
              <span className="text-xl text-slate-500">{isOpen ? '-' : '+'}</span>
            </button>
            {isOpen ? <p className="border-t border-slate-100 px-5 py-4 text-sm leading-6 text-slate-600">{item.content}</p> : null}
          </div>
        )
      })}
    </div>
  )
}

export default Accordion
