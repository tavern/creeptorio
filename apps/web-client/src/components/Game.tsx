import type Phaser from 'phaser'

import { AUTO, Game } from 'phaser'
import { onCleanup, onMount, type JSX } from 'solid-js'
import { createStore } from 'solid-js/store'
import { EventBus } from '~/EventBus'
import { Boot, Main, Preload } from '~/scenes'

const gameContainerId = 'game-container'

/** @see https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig */
const config: Phaser.Types.Core.GameConfig = {
  type: AUTO,
  width: 1024,
  height: 768,
  parent: gameContainerId,
  backgroundColor: '#000000',
  scene: [Boot, Preload, Main],
}

const startGame = (parent: string) => {
  return new Game({ ...config, parent })
}

type GameStore = {
  game: Phaser.Game | null
  scene?: Phaser.Scene | null
}
type GameComponentProps = {
  onChangeScene?: (scene: Phaser.Scene) => void
  ref?: (instance: GameStore) => void
} & JSX.HTMLAttributes<HTMLDivElement>
export const GameComponent = (props: GameComponentProps) => {
  const [instance, setInstance] = createStore<GameStore>({ game: null, scene: null })

  onMount(() => {
    const game = startGame(gameContainerId)
    setInstance('game', game)
    props.ref?.({ game, scene: null })

    EventBus.on('current-scene-ready', (scene: Phaser.Scene) => {
      setInstance('scene', scene)
      props.onChangeScene?.(scene)

      props.ref?.({ game, scene })
    })

    onCleanup(() => {
      if (instance.game) {
        instance.game.destroy(true)
        setInstance({ game: null, scene: null })
      }
    })
  })

  return <div id={gameContainerId} />
}
