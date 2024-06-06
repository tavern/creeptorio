import type { Cell } from '@pkgs/db'
import { api } from '@pkgs/server/client'
import { Scene, Tilemaps, type Cameras } from 'phaser'
import { EventBus } from '~/EventBus'

export class Main extends Scene {
  camera?: Cameras.Scene2D.Camera
  cells?: Cell[]

  constructor() {
    super('Main')
  }

  async preload() {}

  async create() {
    this.camera = this.cameras.main
    this.camera.setBackgroundColor(0x000000)
    this.camera.setZoom(2)

    const mapData = new Tilemaps.MapData({
      width: 20,
      height: 20,
      tileWidth: 64,
      tileHeight: 32,
      orientation: Tilemaps.Orientation.ISOMETRIC,
      format: Tilemaps.Formats.ARRAY_2D,
    })

    const map = new Tilemaps.Tilemap(this, mapData)
    const tileset = map.addTilesetImage('iso-64x64-outside', 'tiles')
    if (!tileset) throw new Error('Tileset not found')

    const layer = map.createBlankLayer('layer', tileset, 470, 300, 40, 40)

    if (!layer) throw new Error('Layer not found')

    this.cells = await (await api.map.$get()).json()
    if (!this.cells) throw new Error('Cells not found')

    for (const cell of this.cells) {
      layer.putTileAt(Math.floor(Math.random() * 6) + 10, cell.x, cell.y)
    }

    EventBus.emit('current-scene-ready', this)
  }
}
