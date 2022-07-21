import { getImage } from '../utils'
import heroSprite from '../../sprites/hero.png'

export class Hero {
  private dy: number
  private jumpForce: number
  public originalHeight: number
  private grounded: boolean
  private groundedHeight: number
  private jumpTimer: number
  private gravity: number
  protected hero: HTMLImageElement

  constructor(
    protected game: any,
    public x: number,
    public y: number,
    public w: number,
    public h: number
  ) {
    this.game = game
    this.hero = getImage(heroSprite)
    this.x = x
    this.y = y
    this.w = w
    this.h = h

    this.dy = 0
    this.jumpForce = 13
    this.originalHeight = h
    this.grounded = false
    this.groundedHeight = 70
    this.jumpTimer = 0
    this.gravity = 1
  }

  public update(): void {
    if (this.game.keys['KeyW']) {
      this.jump()
    } else {
      this.jumpTimer = 0
    }

    if (this.game.keys['KeyS']) {
      this.h = this.originalHeight / 2
    } else {
      this.h = this.originalHeight
    }

    this.y += this.dy

    if (this.y + this.h < this.game.height - 70) {
      this.dy += this.gravity
      this.grounded = false
    } else {
      this.dy = 0
      this.grounded = true
      this.y = this.game.height - this.h - this.groundedHeight
    }
  }

  protected jump(): void {
    if (this.grounded && this.jumpTimer == 0) {
      this.jumpTimer = 1
      this.dy = -this.jumpForce
    } else if (this.jumpTimer > 0 && this.jumpTimer < 15) {
      this.jumpTimer++
      this.dy = -this.jumpForce - this.jumpTimer / 50
    }
  }

  public draw(): void {
    this.game.ctx.beginPath()
    this.game.ctx.drawImage(this.hero, this.x, this.y, this.w, this.h)
    this.game.ctx.closePath()
  }
}

