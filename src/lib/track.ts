type TrackPayload = {
  event: string
  created_at: string
  payload?: Record<string, unknown>
}

const KEY = 'nexo_event_logs'

export function track(event: string, payload?: Record<string, unknown>) {
  const record: TrackPayload = {
    event,
    created_at: new Date().toISOString(),
    payload,
  }

  try {
    const prev = localStorage.getItem(KEY)
    const list: TrackPayload[] = prev ? (JSON.parse(prev) as TrackPayload[]) : []
    list.push(record)
    localStorage.setItem(KEY, JSON.stringify(list))
  } catch {
    // ignore storage errors
  }

  console.log('[track]', record)
}
