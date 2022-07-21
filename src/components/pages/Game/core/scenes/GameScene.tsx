import { UI, Hero, Obstacle } from '../common'
import { ExitScene, MenuScene } from '.'
import { checkOnBtn } from '../utils'
import { CoreType } from '../utils/types'

export class GameScene {
  protected imageOpacity: number
  private pause: boolean
  private UI: UI
  private HERO: Hero
  private OBSTACLE: Obstacle

  constructor(protected game: CoreType) {
    this.game = game
    this.pause = false
    this.game.score = 0

    this.imageOpacity = 1
    this.UI = new UI()
    this.HERO = new Hero(this.game, 100, this.game.height / 2 - 70, 50, 50)
    this.OBSTACLE = new Obstacle(
      this.game,
      this.HERO,
      400,
      this.game.height / 2 - 70,
      50,
      50
    )
  }

  protected checkPause(): void {
    const { x, y, w, h } = this.UI.pauseBtnPosition

    if (this.game.checkKeyPress(0)) {
      const { x: cX, y: cY } = this.game.keys[0]
      if (checkOnBtn(cX, cY, x, y, w, h)) {
        this.UI.isPauseChange()
        setTimeout(() => (this.pause = !this.pause), 0)
      }
      this.game.lastKeyState[0] = false
      this.game.keys[0] = false
    }

    if (this.game.keys.move !== undefined) {
      const { x: mX, y: mY } = this.game.keys.move
      if (checkOnBtn(mX, mY, x, y, w, h)) {
        this.UI.imageOpacity = 0.5
        this.game.canvas.style.cursor = 'pointer'
      } else {
        this.UI.imageOpacity = 1
        this.game.canvas.style.cursor = 'default'
      }
    }
  }

  public update(): void {
    this.checkPause()

    if (this.game.keys['Escape']) {
      this.game.setScene(MenuScene)
    }

    if (!this.pause) {
      this.HERO.update()
      this.OBSTACLE.update(() => {
        this.game.setScene(ExitScene)
        this.game.scoreSet(this.game.score)
      })
    }
  }

  public render(): void {
    if (!this.pause) {
      this.game.ctx.clearRect(0, 0, this.game.width, this.game.height)

      this.UI.draw(
        this.game.ctx,
        this.game.width,
        this.game.height,
        this.game.score
      )
      this.HERO.draw()
      this.OBSTACLE.draw()
    }
  }
}

