import { getImage } from '../utils'
import obstacleSprite from '../../sprites/obstacle.png'
import enemySprite from '../../sprites/enemy.png'

export class Stone {
  private obstacleSprite: CanvasImageSource
  private dx: number

  constructor(
    public x: number,
    public y: number,
    public w: number,
    public h: number,
    public gameSpeed: number,
    public typeSprite: number
  ) {
    this.obstacleSprite = getImage(!typeSprite ? obstacleSprite : enemySprite)
    this.x = x
    this.y = y
    this.w = w
    this.h = h

    this.gameSpeed = gameSpeed
    this.dx = -this.gameSpeed
  }

  public update(): void {
    this.x += this.dx
    this.dx = -this.gameSpeed
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(this.obstacleSprite, this.x, this.y, this.w, this.h)
  }
}

