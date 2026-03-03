import Landing from '../pages/Landing'
import AnnouncePreview from '../pages/AnnouncePreview'

function App() {
  if (window.location.pathname === '/announce-preview') {
    return <AnnouncePreview />
  }

  return <Landing />
}

export default App
