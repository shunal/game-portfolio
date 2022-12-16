const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
console.log(c)

//set canvas to fullscreen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const gravity = 0.7 
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

        this.width = 30
        this.height = 30
    }
    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
    update() {
        this.draw()
        this.position.y += this.velocity.y
        
        //GRAVITY IF ELSE STATEMENT (stops the player at bottom of canvas)
        if (this.position.y + this.height + this.velocity.y <= canvas.height)
            this.velocity.y += gravity
        
        else 
            this.velocity.y = 0
        
    }

}

const player = new Player()

// create animation loop
// clear the canvas
//call the draw function (update) to maintain Player shape
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0,0,canvas.width,canvas.height)
    player.update()
}
animate()

//listens for keyCode property of event for movement wasd
window.addEventListener('keydown', ({keyCode}) => {
    switch(keyCode) {
        case 87:
            console.log('up')
            break
        case 65:
            console.log('left')
            break
        case 83:
            console.log('down')
            break
        case 68:
            console.log('right')
            break
    }
})

