import { useWindowEvent } from "@mantine/hooks"
import { beileyStates } from '../utils/states'
import { useLatest } from '../hooks/useLatest'
import { useState } from "react"
import PanCursor from "./PanCursor"
import EndText from "./EndText"

const KickTheBeiley = () => {
  const beiley = beileyStates.beating
  const [isBeating, setIsBeating] = useState(false)
  const [beatsCount, setBeatsCount] = useState(0)

  const beatsCountRef = useLatest(beatsCount)

  useWindowEvent('mouseup', () => {
    setTimeout(() => {
      if (beatsCountRef.current === beatsCount) {
        setIsBeating(false)
      }
    }, 200)
  })

  return (
    <div className='pt-6 cursor-none'>
      <PanCursor />

      <h2 className='text-4xl font-bold text-center'>Beat the Beiley!</h2>
      <p className='text-xl text-center mt-2 mb-6 text-gray-500 font-bold'>Count: {beatsCount}</p>

      <div className='flex items-center justify-center'>
        <div className='max-w-[90%] relative'>
          <img className='hidden' src='/assets/other/beiley-end.png' />
          <img className='hidden' src={beiley.beated} />
          <img className='hidden' src={beiley.calm} />
          <audio src='/assets/sounds/pan/1.mp3' className='hidden'></audio>
          {beatsCount >= 94 ? (
            <div className='relative'>
              <EndText />
              <img className='w-full h-full select-none rounded-md' src='/assets/other/beiley-end.png' alt="beiley" />
            </div>
          ) : (
            <div>
              <div className='absolute top-0 bottom-0 left-0 right-0'>
                <beiley.BeatZone onMouseDown={() => {
                  setIsBeating(false)
                  setTimeout(() => setIsBeating(true), 20)
                  setBeatsCount(beats => beats + 1)

                  const audio = new Audio('/assets/sounds/pan/1.mp3')
                  audio.volume = 0.5
                  audio.play()
                }} />
              </div>
              <img className='w-full h-full select-none rounded-md overflow-hidden' src={isBeating ? beiley.beated : beiley.calm} alt="beiley" />
            </div>
          )}
        </div>
      </div >
    </div >
  )
}

export default KickTheBeiley