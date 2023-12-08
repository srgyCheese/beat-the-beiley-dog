import { useEffect, useRef, useState, useLayoutEffect } from "react"
import DraggableItem from "./DraggableItem"
import { Item, categories, getRandomCategory } from "../types/feeding"
import { getRandomImage } from "../utils/getRandomImage"

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const itemHeight = 200
const itemWidth = 200

const RandomItemsField = ({ items, setItems, isEnd }: { items: Item[], setItems: (items: Item[]) => any, isEnd: boolean }) => {
  const layout = useRef<HTMLDivElement>(null)

  const [xyState, setXyState] = useState<{ xFrom: number, xTo: number, yFrom: number, yTo: number }>()

  useEffect(() => {
    const receiveImages = async () => {
      const items = await Promise.all(new Array(15).fill(null).map(async (_, id) => {
        const imageCategory = getRandomCategory()
        const image = await getRandomImage(imageCategory)

        return {
          url: image,
          id,
          category: imageCategory
        }
      }))

      console.log(items);
      
      setItems(items)
    }

    receiveImages()
  }, [])

  useLayoutEffect(() => {
    const { current } = layout

    if (!current) {
      return
    }

    const xFrom = current.offsetLeft
    const xTo = xFrom + current.offsetWidth - itemWidth

    const yFrom = current.offsetTop
    const yTo = yFrom + current.offsetHeight - itemHeight

    setXyState({xFrom, xTo, yFrom, yTo})
  }, [])

  return (
    <div className="h-full w-full" ref={layout}>
      {layout.current
        ? items?.length
          ? items.map(item => {
            if (!xyState) {
              return
            }

            return (
              <DraggableItem
                initialPosition={{
                  x: getRandomInt(xyState.xFrom, xyState.xTo),
                  y: getRandomInt(xyState.yFrom, xyState.yTo)
                }}
                id={item.id}
                url={item.url}
                key={item.id}
              />
            )
          })
          : 'Loading...'
        : null}
    </div>
  )
}

export default RandomItemsField