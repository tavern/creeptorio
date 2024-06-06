import { Scene } from 'phaser'
import { EventBus } from '~/EventBus'

export class Main extends Scene {
  camera?: Phaser.Cameras.Scene2D.Camera

  constructor() {
    super('Main')
  }

  preload() {}

  create() {
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

    EventBus.emit('current-scene-ready', this)
  }
}
