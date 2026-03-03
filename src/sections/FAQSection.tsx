import faqData from '../data/faq.ko.json'
import Accordion from '../components/Accordion'
import { track } from '../lib/track'

type FAQSectionProps = {
  policyOpen: boolean
}

function FAQSection({ policyOpen }: FAQSectionProps) {
  const items = faqData.faq.map((item) => ({
    title: item.q,
    content: policyOpen ? item.a : `${item.a} (2026 공고 공개 후 확정 안내)`,
  }))

  return (
    <section id="faq" className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-2xl font-extrabold text-slate-900">자주 묻는 질문</h2>
      <div className="mt-4">
        <Accordion items={items} onOpenItem={(index) => track('faq_open', { index })} />
      </div>
    </section>
  )
}

export default FAQSection
