import { useWindowEvent } from "@mantine/hooks"
import { useState } from "react"
import { Item } from "../types/feeding"

const FeedingBeiley = ({ beiley, items, eatItem, isFail, isWin }:
  {
    beiley: { openMouth: string, closedMouth: string, happy: string, uncanny: string },
    items: Item[],
    eatItem: (item: Item) => any,
    isWin: boolean,
    isFail: boolean
  }
) => {
  const getBgUrl = ({ isFeeding, isWin, isFail }: { isFeeding: boolean, isWin: boolean, isFail: boolean }) => {
    if (isWin) {
      return beiley.happy
    }

    if (isFail) {
      return beiley.uncanny
    }

    if (isFeeding) {
      return beiley.openMouth
    }

    return beiley.closedMouth
  }

  const [isFeeding, setIsFeeding] = useState(false)
  const [draggableItem, setDraggableItem] = useState<HTMLDivElement | null>(null)
  const [isEatingAnimation, setIsEatingAnimation] = useState(false)

  useWindowEvent('mousedown', e => {
    const target = e.target as HTMLDivElement

    setDraggableItem(target)
  })

  useWindowEvent('mouseup', () => {
    setDraggableItem(null)
  })

  if (isWin || isFail) {
    return (
      <div className='min-w-[505px] h-full relative'>
        <audio src='/assets/sounds/eating.mp3' hidden />
        <div
          className={`w-full h-full select-none rounded-md overflow-hidden bg-no-repeat bg-cover bg-center ${isEatingAnimation ? 'eating-beiley' : ''}`}
          style={{
            backgroundImage: `url(${getBgUrl({ isFeeding, isFail, isWin })})`,
          }}
        />
      </div>
    )
  }

  return (
    <div className='min-w-[505px] h-full relative'>
      <audio src='/assets/sounds/eating.mp3' hidden />
      <div
        className={`w-full h-full select-none rounded-md overflow-hidden bg-no-repeat bg-cover bg-center ${isEatingAnimation ? 'eating-beiley' : ''}`}
        style={{
          backgroundImage: `url(${getBgUrl({ isFeeding, isFail, isWin })})`,
          // backgroundSize: '100% 100%'
        }}
        onMouseEnter={() => {
          if (draggableItem) {
            setIsFeeding(true)
          }
        }}
        onMouseLeave={() => {
          setIsFeeding(false)
        }}
        onMouseUp={() => {
          const draggableId = draggableItem?.dataset?.id

          if (draggableId != undefined && draggableItem?.dataset?.type === 'feed-item' && !isEatingAnimation) {
            const eatingItem = items.find(item => item.id == +draggableId)
            if (eatingItem) {
              eatItem(eatingItem)
              setIsEatingAnimation(true)

              setTimeout(() => setIsEatingAnimation(false), 1500)

              const audio = new Audio('/assets/sounds/eating.mp3')
              audio.play()
            }
          }

          setDraggableItem(null)
          setIsFeeding(false)
        }}
      />
    </div>
  )
}

export default FeedingBeiley