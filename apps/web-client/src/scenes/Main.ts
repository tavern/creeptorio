import type { Cell } from '@pkgs/db'
import { api } from '@pkgs/server/client'
import { Scene } from 'phaser'
import { EventBus } from '~/EventBus'

export class Main extends Scene {
  camera?: Phaser.Cameras.Scene2D.Camera
  cells?: Cell[]

  constructor() {
    super('Main')
  }

  async preload() {}

  async create() {
    this.cells = await (await api.map.$get()).json()
    this.camera = this.cameras.main
    this.camera.setBackgroundColor(0x000000)
    this.add
      .text(512, 460, 'Main', {
        fontFamily: 'Arial Black',
        fontSize: 38,
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 8,
        align: 'center',
      })
      .setOrigin(0.5)
      .setDepth(100)

    const mapData = new Phaser.Tilemaps.MapData({
      width: 20,
      height: 20,
      tileWidth: 64,
      tileHeight: 32,
      orientation: Phaser.Tilemaps.Orientation.ISOMETRIC,
      format: Phaser.Tilemaps.Formats.ARRAY_2D,
    })

    const map = new Phaser.Tilemaps.Tilemap(this, mapData)

    const tileset = map.addTilesetImage('iso-64x64-outside', 'tiles')
    if (!tileset) throw new Error('Tileset not found')

    const layer = map.createBlankLayer('layer', tileset, 470, 300)
    if (!layer) throw new Error('Layer not found')

    if (!this.cells) throw new Error('Cells not found')

    for (const cell of this.cells) {
      layer.putTileAt(Math.floor(Math.random() * 6) + 10, cell.x, cell.y)
    }

    EventBus.emit('current-scene-ready', this)
  }
}
