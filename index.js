const spriteStandLeft = new Image();
spriteStandLeft.src="./img/spriteStandLeft.png"

const spriteStandRight = new Image();
spriteStandRight.src="./img/spriteStandRight.png"

const spriteRunLeft = new Image();
spriteRunLeft.src="./img/spriteRunLeft.png"

const spriteRunRight = new Image();
spriteRunRight.src="./img/spriteRunRight.png"

const platformFloor = new Image();
platformFloor.src="./img/platform.png"

const background = new Image()
background.src="./img/background.png"

const hills = new Image()
hills.src="./img/hills.png"

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

//set canvas to fullscreen
canvas.width = 1024;
canvas.height = 576;
const gravity = 0.3 
//define Player
class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 1
        }

        this.width = 66
        this.height = 150
        this.image = spriteStandRight
        this.frames = 0
        this.sprites = {
            stand: {
                right: spriteStandRight,
                left: spriteStandLeft,
                cropWidth: 177,
                width: 66
            },
            run: {
                right: spriteRunRight,
                left: spriteRunLeft,
                cropWidth: 341,
                width:127.875
            }
        }
        this.currentSprite = this.sprites.stand.right
        this.currentCurrentCropWidth = 177
    }
    draw() {
                                //crop spritesheet
        c.drawImage(this.currentSprite, this.currentCurrentCropWidth * this.frames, 0, this.currentCurrentCropWidth, 400, this.position.x, this.position.y, this.width, this.height)
    }
    update() {
        //loops through frames and set to 0 at end for movement animations
        this.frames++
        if (this.frames > 59 && this.currentSprite === this.sprites.stand.right || this.currentSprite === this.sprites.stand.left) {
            this.frames= 0
        }
        else if (this.frames > 29 && (this.currentSprite === this.sprites.run.left || this.currentSprite === this.sprites.run.right)) {
            this.frames = 0
        }


        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        
        //GRAVITY IF ELSE STATEMENT (stops the player at bottom of canvas)
        if (this.position.y + this.height + this.velocity.y <= canvas.height)
            this.velocity.y += gravity
                
    }

}

class Platform {
    constructor({x,y,image}) {
        this.position  = {
            x: x,
            y: y
        }
        this.image = platformFloor
        this.width = platformFloor.width
        this.height = platformFloor.height
    }
        draw() {
            c.drawImage(this.image, this.position.x, this.position.y)
        }
}

const platforms = [
    new Platform({x:-1, y: 470, image: platformFloor}), 
    new Platform({x: platformFloor.width -3, y: 470, image: platformFloor})]

class GenericObject {
    constructor({x,y,image}) {
        this.position  = {
            x: x,
            y: y
        }
        this.image = image
        this.width = image.width
        this.height = image.height
    }
        draw() {
            c.drawImage(this.image, this.position.x, this.position.y)
        }
}

const genericObjects = [
    new GenericObject({x:-1, y:-1, image: background }),
    new GenericObject({x:-1, y:-1, image: hills }),

]





function createImage(imageSrc) {
    const image = new Image()
    image.src = imageSrc
    return image
}

const player = new Player()


const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }

}

let scrollOffset = 0

// create loop
function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.fillRect(0,0,canvas.width,canvas.height)

    genericObjects.forEach(genericObject => {
        genericObject.draw()
    })
    
    platforms.forEach(platform => {
        platform.draw()
    })

    player.update()

 
    // stop player at left and middle of screen so platforms can scroll
    if (keys.right.pressed && player.position.x < 400) {
        player.velocity.x = 5
    }
    else if 
        (keys.left.pressed && player.position.x > 100)
         {
        player.velocity.x = -5
    }

    else {
        player.velocity.x = 0

        // platform scrolling logic
        if (keys.right.pressed) {
            scrollOffset += 5
            platforms.forEach(platform => {
                platform.position.x -= 5
            })
            genericObjects.forEach(genericObject => {
                genericObject.position.x -=3
            })
        }
        else if (keys.left.pressed) {
            platforms.forEach(platform => {
                scrollOffset -= 5
                platform.position.x += 5
            })
            genericObjects.forEach(genericObject => {
                genericObject.position.x +=3
            })
        }
    }

    //platform collision detection
    platforms.forEach(platform => {
        platform.draw()
    
        if(player.position.y + player.height<= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x + player.width >= platform.position.x && player.position.x<= platform.position.x + platform.width ) {
         player.velocity.y = 0
        }
    })
    // win condition
    if (scrollOffset > 2000) {
        alert("you win")
    }
}
animate()

//listens for keyCode property of event for movement wasd
window.addEventListener('keydown', ({keyCode}) => {
    switch(keyCode) {
        case 87:
            console.log('up')
            player.velocity.y -= 10
            break
        case 65:
            console.log('left')
            keys.left.pressed = true
            player.currentSprite = player.sprites.run.left
            player.currentCurrentCropWidth = player.sprites.run.cropWidth
            player.width=player.sprites.run.width
            break
        case 83:
            console.log('down')
            player.velocity.y += 10

            break
        case 68:
            console.log('right')
            keys.right.pressed = true
            player.currentSprite = player.sprites.run.right
            player.currentCurrentCropWidth = player.sprites.run.cropWidth
            player.width=player.sprites.run.width
            break
    }
})
window.addEventListener('keyup', ({keyCode}) => {
    switch(keyCode) {
        case 87:
            console.log('up')
            // player.velocity.y -= 20
            break
        case 65:
            console.log('left')
            keys.left.pressed = false
            player.currentSprite = player.sprites.stand.left
            player.currentCurrentCropWidth = player.sprites.stand.cropWidth
            player.width=player.sprites.stand.width
            break
        case 83:
            console.log('down')
            // player.velocity.y += 20

            break
        case 68:
            console.log('right')
            keys.right.pressed = false
            player.currentSprite = player.sprites.stand.right
            player.currentCurrentCropWidth = player.sprites.stand.cropWidth
            player.width=player.sprites.stand.width
            break
    }
})

