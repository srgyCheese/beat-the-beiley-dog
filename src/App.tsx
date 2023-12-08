import FeedTheBeiley from './components/FeedTheBeiley'
import KickTheBeiley from './components/KickTheBeiley'

function App() {
  return (
    <>
      {window.location.pathname === '/beat' ? <KickTheBeiley /> : <FeedTheBeiley />}
      <div className='sm:absolute sm:bottom-0 pb-2 text-center text-gray-800 font-bold w-full'>
        Github: <a className='text-blue-700' href="https://github.com/srgyCheese/beat-the-beiley-dog" target='_blank'>srgyCheese/beat-the-beiley-dog</a>
      </div>
    </>
  )
}

export default App
