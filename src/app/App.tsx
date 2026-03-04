import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Landing from '../pages/Landing'
import AnnouncePreview from '../pages/AnnouncePreview'
import CertificateGuide from '../pages/CertificateGuide'
import SmartStoreApply from '../pages/SmartStoreApply'
import DisplayCompare from '../pages/DisplayCompare'

function ScrollToHash() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'auto' })
      return
    }

    const id = location.hash.replace('#', '')
    const target = document.getElementById(id)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [location])

  return null
}

function App() {
  return (
    <>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/announce-preview" element={<AnnouncePreview />} />
        <Route path="/certificate-guide" element={<CertificateGuide />} />
        <Route path="/smartstore-apply" element={<SmartStoreApply />} />
        <Route path="/display-compare" element={<DisplayCompare />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App
