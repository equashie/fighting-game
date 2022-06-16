class Sprite {
    constructor({
        position,
        imageSrc,
        scale = 1,
        frameMax = 1,
        offset = { x: 0, y: 0 } }
    ) {
        this.position = position
        this.width = 50
        this.height = 150
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.frameMax = frameMax//total number of frames
        this.framecurrent = 0 // constant
        this.framesElapsed = 0 // should be increasing over time. works as a frame counter
        this.frameHold = 10 // for every nth frame we loop through the animations
        this.offset = offset

    }

    draw() {
        c.drawImage(
            this.image,
            //crop location on x&y axis
            this.framecurrent * (this.image.width / this.frameMax),
            0,
            //crop width & height
            this.image.width / this.frameMax,
            this.image.height,
            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            //dividing the image width by the frames * scale to calculate the width and height the shop should be
            (this.image.width / this.frameMax) * this.scale,
            this.image.height * this.scale
        )
    }

    animateFrame() {
        this.framesElapsed++
        if (this.framesElapsed % this.frameHold === 0) {
            if (this.framecurrent < this.frameMax - 1) {
                this.framecurrent++
            } else {
                this.framecurrent = 0
            }
        }
    }


    update() {
        this.draw()
        this.animateFrame()

    }
}

class Fighter extends Sprite {
    constructor({
        position,
        velocity,
        color = 'red',
        imageSrc,
        scale = 1,
        frameMax = 1,
        offset = { x: 0, y: 0 },
        sprites,  
        attackbox = 
        {
        offset : {},
        width: undefined,
        height: undefined
    }
    }) {
        // super calls the constructror of the parent sprite class
        // child inherents these properties from parent
        super({
            position,
            imageSrc,
            scale,
            frameMax,
            offset,
            sprites,
          

        })

        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastKey
        this.attackbox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: attackbox.offset,
            width: attackbox.width,
            height: attackbox.height
        }
        this.color = color
        this.isAttacking
        this.isDashattaking
        this.health = 100
        this.framecurrent = 0
        this.framesElapsed = 0
        this.frameHold = 5
        this.sprites = sprites
        this.dead = false

        for (const sprite in this.sprites) {
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }
    }


    update() {
        this.draw()
        if (!this.dead) this.animateFrame()

        //aTTACk box
        this.attackbox.position.x = this.position.x + this.attackbox.offset.x
        this.attackbox.position.y = this.position.y+ this.attackbox.offset.y
        
        /*c.fillRect(
            this.attackbox.position.x, 
            this.attackbox.this.position.y, this is how to show the attack box
            this.attackbox.width, 
            this.attackbox.height)*/

        //define how things move on the x and y axis
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        //gravity function
        if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
            this.velocity.y = 0
            this.position.y = 330.69
        } else this.velocity.y += gravity
        
    }

    attack() {
        this.switchSprite('atk')
        this.isAttacking = true
        /*setTimeout(() => {
            this.isAttacking = false
        }, 100)8*/
    }

    takeHit(){
        this.health -= 5

        if (this.health<=0) {
            this.switchSprite('death')
        }else this.switchSprite('hurt')
    }

    dashattack() {
        this.switchSprite('datk')
        this.isDashattaking = true
        /*setTimeout(() => {
            this.isDashattaking = false
        }, 1000)*/
    }

    switchSprite(sprite) {
  //if statement for overridfing all other animations
        if(this.image === this.sprites.death.image) {
            if(this.framecurrent === this.sprites.death.frameMax -1)
            this.dead =true
            return
        }
      
        if (  //if our image is the attack image & and our current frame less than the frames max of the actual sprite sheet then return to switch statment   
            (this.image === this.sprites.atk.image &&
            this.framecurrent < this.sprites.atk.frameMax - 1)||(this.image === this.sprites.datk.image &&
                this.framecurrent < this.sprites.datk.frameMax - 1)
        )  
       
            return

            //overrride when figter gets hit
            if(
                this.image === this.sprites.hurt.image &&
                this.framecurrent < this.sprites.hurt.frameMax - 1)

                return

            switch (sprite) {
                case 'idle':
                    if (this.image !== this.sprites.idle.image) {
                        this.image = this.sprites.idle.image
                        this.frameMax = this.sprites.idle.frameMax
                        this.framecurrent = 0
                        this.frameHold = 8
                    }
                    break;

                case 'idle2':
                    if (this.image !== this.sprites.idleV2.image) {
                        this.image = this.sprites.idleV2.image
                        this.frameMax = this.sprites.idleV2.frameMax
                        this.framecurrent = 0
                        this.frameHold = 8
                    }
                    break;

                case 'run':
                    if (this.image !== this.sprites.run.image) {
                        this.image = this.sprites.run.image
                        this.frameHold = 6
                        this.frameMax = this.sprites.run.frameMax
                        this.framecurrent = 0
                    }
                    break;
                case 'run2':
                    if (this.image !== this.sprites.run2.image) {
                        this.image = this.sprites.run2.image
                        this.frameHold = 6
                        this.frameMax = this.sprites.run2.frameMax
                        this.framecurrent = 0
                    }
                    break;
                case 'jump':
                    if (this.image !== this.sprites.jump.image) {
                        this.image = this.sprites.jump.image
                        this.frameMax = this.sprites.jump.frameMax
                        this.framecurrent = 0
                    }
                    break;
                case 'fall':
                    if (this.image !== this.sprites.fall.image) {
                        this.image = this.sprites.fall.image
                        this.frameHold = 10
                        this.frameMax = this.sprites.fall.frameMax
                        this.framecurrent = 0
                    }
                    break;
                case 'dash':
                    if (this.image !== this.sprites.dash.image) {
                        this.image = this.sprites.dash.image
                        this.frameHold = 5
                        this.frameMax = this.sprites.dash.frameMax
                        this.framecurrent = 0
                    }
                    break;
                case 'crouch':
                    if (this.image !== this.sprites.crouch.image) {
                        this.image = this.sprites.crouch.image
                        this.frameHold = 6
                        this.frameMax = this.sprites.crouch.frameMax
                        this.framecurrent = 0
                    }
                    break;
                case 'atk':
                    if (this.image !== this.sprites.atk.image) {
                        this.image = this.sprites.atk.image
                        this.frameHold = 3
                        this.frameMax = this.sprites.atk.frameMax
                        this.framecurrent = 0
                    }
                    break;
                case 'datk':
                    if (this.image !== this.sprites.datk.image) {
                        this.image = this.sprites.datk.image
                        this.frameHold = 6
                        this.frameMax = this.sprites.datk.frameMax
                        this.framecurrent = 0
                    }
                    break;
                case 'slide':
                    if (this.image !== this.sprites.slide.image) {
                        this.image = this.sprites.slide.image
                        this.frameHold = 10
                        this.frameMax = this.sprites.slide.frameMax
                        this.framecurrent = 0
                    }
                    break;

                    case 'hurt':
                    if (this.image !== this.sprites.hurt.image) {
                        this.image = this.sprites.hurt.image    
                        this.frameMax = this.sprites.hurt.frameMax
                        this.framecurrent = 0
                    }
                    break;

                    case 'death':
                    if (this.image !== this.sprites.death.image) {
                        this.image = this.sprites.death.image
                        this.frameMax = this.sprites.death.frameMax
                        this.framecurrent = 0
                    }
                    break;

            }
        }
    }