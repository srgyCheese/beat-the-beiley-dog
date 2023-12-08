import { useWindowEvent } from "@mantine/hooks"
import { useRef, useState } from "react"
import { Item } from "../types/feeding"
import { useOnPointerEnter } from "../hooks/useOnPointerEnter"
import { useOnPointerLeave } from "../hooks/useOnPointerLeave"
import { useOnPointerUp } from "../hooks/useOnPointerUp"

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
  const feedAreaRef = useRef<HTMLDivElement>(null)

  const onFeeding = (e: MouseEvent | TouchEvent) => {
    const target = e.target as HTMLDivElement
    if (target.dataset.type === 'feed-item') {  
      setDraggableItem(target)
    }
  }

  useOnPointerEnter(feedAreaRef, () => {
    if (draggableItem) {
      setIsFeeding(true)
    }
  })

  useOnPointerLeave(feedAreaRef, () => {
    setIsFeeding(false)
  })

  useOnPointerUp(feedAreaRef, () => {
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
  })

  useWindowEvent('mousedown', onFeeding)
  useWindowEvent('touchstart', onFeeding)

  useWindowEvent('mouseup', () => {
    setDraggableItem(null)
  })

  useWindowEvent('touchend', () => {
    setDraggableItem(null)
  })

  if (isWin || isFail) {
    return (
      <div className='w-full sm:min-w-[505px] h-full relative px-1 sm:px-0 sm:w-auto'>
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
    <div className='w-full sm:min-w-[505px] h-full relative px-1 sm:px-0 sm:w-auto'>
      <audio src='/assets/sounds/eating.mp3' hidden />
      <div
        ref={feedAreaRef}
        className={`w-full h-full select-none rounded-md overflow-hidden bg-no-repeat bg-cover bg-center ${isEatingAnimation ? 'eating-beiley' : ''}`}
        style={{
          backgroundImage: `url(${getBgUrl({ isFeeding, isFail, isWin })})`,
          // backgroundSize: '100% 100%'
        }}
      />
    </div>
  )
}

export default FeedingBeiley