import FeedTheBeiley from './components/FeedTheBeiley'
import KickTheBeiley from './components/KickTheBeiley'

function App() {
  if (window.location.pathname === '/beat') {
    return <KickTheBeiley />
  }

  return <FeedTheBeiley />
}

export default App
