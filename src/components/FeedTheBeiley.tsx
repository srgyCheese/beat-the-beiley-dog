import { useCounter } from '@mantine/hooks'
import { useState } from 'react'
import { beileyStates } from '../utils/states'
import RandomItemsField from './RandomItemsField'
import FeedingBeiley from './FeedingBeiley'
import { Item, rollCategory } from '../types/feeding'
import useMistakeAnimation from '../hooks/useMistakeAnimation'

const maxFullness = 5
const maxMistakes = 3

const Header = ({ isWin, isFail }: { isWin: boolean, isFail: boolean }) => {
  if (isWin) {
    return <h2 className='text-4xl font-bold text-center text-green-600'>Success!</h2>
  }

  if (isFail) {
    return <h2 className='text-4xl font-bold text-center text-red-600'>Failure...</h2>
  }

  return <h2 className='text-4xl font-bold text-center'>Feed the Beiley!</h2>
}

const FeedTheBeiley = () => {
  const [fullness, fullnessControls] = useCounter(0, { max: maxFullness, min: 0 })
  const [mistakes, mistakesControls] = useCounter(0, { min: 0, max: maxMistakes })

  const { successAnimation, mistakeAnimation } = useMistakeAnimation()

  const mistake = () => {
    mistakesControls.increment()
    mistakeAnimation()
  }

  const success = () => {
    fullnessControls.increment()
    successAnimation()
  }

  const [items, setItems] = useState<Item[]>([])

  const beiley = beileyStates.feeding

  const isWin = fullness >= maxFullness
  const isFail = mistakes >= maxMistakes

  return (
    <div className='pt-6'>
      <img className='hidden' src={beiley.openMouth} />
      <img className='hidden' src={beiley.closedMouth} />
      <audio src='/assets/sounds/pan/1.mp3' className='hidden'></audio>

      <Header isWin={isWin} isFail={isFail} />

      <div className='flex gap-3 justify-center'>
        <span className='text-xl text-center mt-2 mb-6 text-gray-500 font-bold'>Fullness: {fullness}/{maxFullness}</span>
        <span className='text-xl text-center mt-2 mb-6 text-red-400 font-bold'>Mistakes: {mistakes}/{maxMistakes}</span>
      </div>


      <div className='flex items-center max-w-[100%] sm:max-w-[90%]  m-auto h-[70vh] sm:gap-10 flex-wrap sm:flex-nowrap w-full'>
        <FeedingBeiley
          beiley={beiley}
          items={items}
          eatItem={eatedItem => {
            setTimeout(() => {
              if (rollCategory(eatedItem.category)) {
                success()
              } else {
                mistake()
              }
            }, 1600)

            setItems(items.filter(item => eatedItem.id != item.id))
          }}
          isWin={isWin}
          isFail={isFail}
        />
        <RandomItemsField items={items} setItems={setItems} isEnd={isWin || isFail} />
      </div >
    </div >
  )
}

export default FeedTheBeiley