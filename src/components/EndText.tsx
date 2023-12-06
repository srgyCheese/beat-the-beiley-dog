import {useEffect, useState} from 'react'

const EndText = () => {
  const [isAnimationStarted, setIsAnimationStarted] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsAnimationStarted(true)
    }, 1000)
  }, [])

  return (
    <div className='absolute z-10 top-0 bottom-0 left-0 right-0 flex items-center justify-center'>
      <div className={`text-red-600 font-semibold -rotate-[35deg] text-8xl tracking-widest select-none transition-all duration-[2s] opacity-0 ${isAnimationStarted && 'opacity-100'}`}>
        ЛИКВИДИРОВАН
      </div>
    </div>
  )
}

export default EndText