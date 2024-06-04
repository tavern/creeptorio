import { Application } from '@pixi/app'
import { Graphics } from '@pixi/graphics'
import type { Cell } from '@pkgs/db'
import { onMount, type Ref } from 'solid-js'

export const app = new Application()
app.start()

type AppProps = {
  map: Cell[][]
}
export const App = ({ map = [] }: AppProps) => {
  let canvas: Ref<HTMLCanvasElement>
  onMount(async () => {
    const graphics = new Graphics()
    graphics.beginFill(0x004200)
    graphics.lineStyle(1, 0xffffff)

    const cellSize = 50

    for (const row of map) {
      for (const cell of row) {
        graphics.drawRect(cell.x * cellSize, cell.y * cellSize, cellSize, cellSize)
      }
    }

    app.stage.addChild(graphics)
  })

  return app.view
}
