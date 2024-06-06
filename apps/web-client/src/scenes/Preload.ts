import { Scene } from 'phaser'

export class Preload extends Scene {
  constructor() {
    super('Preload')
  }

  async init() {
    this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff)

    const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff)

    this.load.on('progress', (progress: number) => {
      bar.width = 4 + 460 * progress
    })
  }

  async preload() {
    this.load.image('tiles', '/iso-64x64-outside.png')
  }

  async create() {
    let progress = 0
    await new Promise((resolve) => {
      const interval = setInterval(() => {
        progress += 0.1
        this.load.emit('progress', progress)
        if (progress >= 1) {
          resolve(progress)
          clearInterval(interval)
        }
      }, 25)
    })
    this.scene.start('Main')
  }
}
