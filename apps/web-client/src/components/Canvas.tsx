import { Application } from '@pixi/app'
import { Container } from '@pixi/display'
import { Graphics } from '@pixi/graphics'
import type { Cell } from '@pkgs/db'
import { onMount } from 'solid-js'

export const app = new Application()
app.start()

type AppProps = {
  map: Cell[]
}
export const App = ({ map = [] }: AppProps) => {
  onMount(async () => {
    const graphics = new Graphics()
    graphics.beginFill(0x004200)
    graphics.lineStyle(1, 0xffffff)

    const scalingContainer = new Container()
    scalingContainer.scale.y = 0.3 // adjust scale by Y - that will change "perspective" a bit
    scalingContainer.position.set((app.screen.width * 3) / 8, app.screen.height / 2)
    app.stage.addChild(scalingContainer)

    const isoScalingContainer = new Container()
    isoScalingContainer.scale.y = 0.5 // isometry can be achieved by setting scaleY 0.5 or tan(30 degrees)
    isoScalingContainer.position.set((app.screen.width * 6) / 8, app.screen.height / 2)
    app.stage.addChild(isoScalingContainer)

    const isometryPlane = new Graphics()
    isometryPlane.rotation = Math.PI / 4
    isoScalingContainer.addChild(isometryPlane)

    const cellSize = 50

    for (const cell of map) {
      graphics.drawRect(cell.x * cellSize, cell.y * cellSize, cellSize, cellSize)
    }

    isometryPlane.addChild(graphics)
  })

  return app.view
}
