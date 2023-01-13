const spriteStandLeft = new Image();
spriteStandLeft.src = "./img/spriteStandLeft.png";

const spriteStandRight = new Image();
spriteStandRight.src = "./img/spriteStandRight.png";

const spriteRunLeft = new Image();
spriteRunLeft.src = "./img/spriteRunLeft.png";

const spriteRunRight = new Image();
spriteRunRight.src = "./img/spriteRunRight.png";

const platformFloor = new Image();
platformFloor.src = "./img/platform.png";

const background = new Image();
background.src = "./img/space.png";

const backgroundReversed = new Image();
backgroundReversed.src ="./img/spaceReverse.png"

const hills = new Image();
hills.src = "./img/hills.png";

const block = new Image();
block.src = "./img/block.png";

const bigName = new Image();
bigName.src = "./img/name.png"

const ufo = new Image();
ufo.src = "./img/ufo.png"

const flagpole = new Image();
flagpole.src = "./img/flag.png"

const groundFlower = new Image();
groundFlower.src = "./img/flower.png"

const flowersClosed = new Image();
flowersClosed.src = "./img/flowersClosed.png";

const arrow = new Image();
arrow.src="./img/arrow.png"

const rocketship = new Image();
rocketship.src = "./img/rocketship.png"

const rocketman = new Image();
rocketman.src="./img/rocketman.png"

const spacebar = new Image();
spacebar.src="./img/spacebar.png"

const comet = new Image();
comet.src="./img/comet.png"

const skillsLevel = new Image();
skillsLevel.src="./img/skillsLevel.png"

const hardskills = new Image();
hardskills.src="./img/hardskills.png"

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");


//set canvas to fullscreen
canvas.width = window.innerWidth;
canvas.height = 576;
const gravity = 0.3;
//define Player
class Player {
  constructor() {
    this.position = {
      x: 100,
      y: 100,
    };
    this.velocity = {
      x: 0,
      y: 1,
    };
    this.speed = 7;
    // this.speed = 20
    this.width = 66;
    this.height = 150;
    this.image = spriteStandRight;
    this.frames = 0;
    this.sprites = {
      stand: {
        right: spriteStandRight,
        left: spriteStandLeft,
        cropWidth: 177,
        width: 66,
      },
      run: {
        right: spriteRunRight,
        left: spriteRunLeft,
        cropWidth: 341,
        width: 127.875,
      },
    };
    this.currentSprite = this.sprites.stand.right;
    this.currentCurrentCropWidth = 177;
  }
  draw() {
    //crop spritesheet
    c.drawImage(
      this.currentSprite,
      this.currentCurrentCropWidth * this.frames,
      0,
      this.currentCurrentCropWidth,
      400,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
  update() {
    //loops through frames and set to 0 at end for movement animations
    this.frames++;
    if (
      (this.frames > 59 && this.currentSprite === this.sprites.stand.right) ||
      this.currentSprite === this.sprites.stand.left
    ) {
      this.frames = 0;
    } else if (
      this.frames > 29 &&
      (this.currentSprite === this.sprites.run.left ||
        this.currentSprite === this.sprites.run.right)
    ) {
      this.frames = 0;
    }

    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    //GRAVITY IF ELSE STATEMENT (stops the player at bottom of canvas)
    if (this.position.y + this.height + this.velocity.y <= canvas.height){
      this.velocity.y += gravity;
    }
  }
}

class Platform {
  constructor({ x, y, image }) {
    this.position = {
      x: x,
      y: y,
    };
    this.image = platformFloor;
    this.width = platformFloor.width;
    this.height = platformFloor.height;
  }
  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}

const platforms = [
  new Platform({ x:0, y: 470, image: platformFloor }),
  new Platform({ x: platformFloor.width - 1, y: 470, image: platformFloor }),
  new Platform({
    x: platformFloor.width * 2 - 2,
    y: 470,
    image: platformFloor,
  }),
  new Platform({
    x: platformFloor.width * 3 - 3,
    y: 470,
    image: platformFloor,
  }),
  new Platform({
    x: platformFloor.width * 4 - 4,
    y: 470,
    image: platformFloor,
  }),
  new Platform({
    x: platformFloor.width * 5 - 5,
    y: 470,
    image: platformFloor,
  }),
  new Platform({
    x: platformFloor.width * 6 - 6,
    y: 470,
    image: platformFloor,
  }),
  new Platform({
    x: platformFloor.width * 7 - 7,
    y: 470,
    image: platformFloor,
  }),
  new Platform({
    x: platformFloor.width * 8 - 8,
    y: 470,
    image: platformFloor,
  }),
  new Platform({
    x: platformFloor.width * 9 - 9,
    y: 470,
    image: platformFloor,
  }),
  new Platform({
    x: platformFloor.width * 3 + 400 - 8,
    y: 470 - platformFloor.height,
    image: platformFloor,
  })
];

class GenericObject {
  constructor({ x, y, image }) {
    this.position = {
      x: x,
      y: y,
    };
    this.image = image;
    this.width = image.width;
    this.height = image.height;
    this.speed = 5
    this.size = image.size;
  }
  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}
const blocks = [new GenericObject({ x: 1200, y: -400, image: comet })];
const flowers = [
  new GenericObject({ x: 1050, y: 700, image: groundFlower }),
  new GenericObject({ x: 1200, y: 700, image: groundFlower }),
  new GenericObject({ x: 1350, y: 700, image: groundFlower }),
  new GenericObject({ x: 1500, y: 700, image: groundFlower }),
  new GenericObject({ x: 1650, y: 700, image: groundFlower }),

];



const ufos = [
  new GenericObject({ x: 4200, y: -200, image: ufo }),
  new GenericObject({ x: 4300, y: -160, image: ufo }),
  new GenericObject({ x: 4400, y: -200, image: ufo }),
  new GenericObject({ x: 4500, y: -160, image: ufo }),
  new GenericObject({ x: 4600, y: -200, image: ufo }),


  ];

const spaceBackground = [
  new GenericObject({ x: -1, y: -1, image: background }),
  new GenericObject({ x: background.width -1, y: -1, image: background}),
  new GenericObject({ x: -1, y: background.height * -1, image: background}),
  new GenericObject({ x: background.width -1, y: background.height * -1, image: background}),
  new GenericObject({ x: -1, y: background.height * -2, image: background}),
  new GenericObject({ x: background.width -1, y: background.height * -2, image: background}),
  new GenericObject({ x: -1, y: background.height * -3, image: background}),
  new GenericObject({ x: background.width -1, y: background.height * -3, image: background}),
  new GenericObject({ x: -1, y: background.height * -4, image: background}),
  new GenericObject({ x: background.width -1, y: background.height * -4, image: background}),
  new GenericObject({ x: -1, y: background.height * -5, image: background}),
  new GenericObject({ x: background.width -1, y: background.height * -5, image: background}),
  new GenericObject({ x: -1, y: background.height * -6, image: background}),
  new GenericObject({ x: background.width -1, y: background.height * -6, image: background}),
]

const genericObjects = [
  new GenericObject({ x: -600, y: -1, image: hills }),
  new GenericObject({ x: -175, y: -50, image: bigName }),
];

const foreground = [
  new GenericObject({ x: 1050, y: 50, image: skillsLevel }),
  new GenericObject({ x: 1400, y: -250, image: hardskills })


]

const flashingArrow = new GenericObject({x:-70, y:0, image:arrow})
const flag = new GenericObject({ x: 2850, y: -30, image: flagpole })
const rocket = new GenericObject({x:5000,y: -100, image:rocketship})
const spacebarPrompt = new GenericObject({x:4700,y: 800, image:spacebar})
const player = new Player();


const keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
  up: {
    pressed: false
  }
};

let scrollOffset = 0;
let verticalScroll= 0;

// create loop
function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = "white";
  c.fillRect(0, 0, canvas.width, canvas.height);


  spaceBackground.forEach((background) => {
    background.draw();
  })
  genericObjects.forEach((genericObject) => {
    genericObject.draw();
  });

 
  
  flag.draw()
  ufos.forEach((ufo) => {
    ufo.draw()
  })
  foreground.forEach((object) => {
    object.draw()
  })
  flowers.forEach((flower) => {
    flower.draw();
  })
  platforms.forEach((platform) => {
    platform.draw()
  });
  flashingArrow.draw()
  rocket.draw()
  spacebarPrompt.draw()


  //draw player last so he is in front of background and objects
  player.update();
  // stop player at left and middle of screen so platforms can scroll
  if (keys.right.pressed && player.position.x < window.innerWidth * .5) {
    player.velocity.x = player.speed;
  } else if (
    (keys.left.pressed && player.position.x > 10) ||
    (keys.left.pressed && scrollOffset === 0 && player.position.x > 0)) {
    player.velocity.x = -player.speed;
  } 
  // else if (scrollOffset === 4300) {
    
  // } 
  else {
    player.velocity.x = 0;

    // BLOCK VERTICAL SCROLLING LOGIC
    if (scrollOffset > 100) {
        blocks.forEach((block) => {
            if(block.position.y < -100) {
            block.position.y += block.speed;

        }          
    });
    } 
    // platform/blocks scrolling logic
    if (keys.right.pressed) {
      scrollOffset += player.speed
      platforms.forEach((platform) => {
        platform.position.x -= player.speed;
      });
      blocks.forEach((block) => {
        block.position.x -= player.speed;
      });
      flowers.forEach((flower) => {
        flower.position.x -= player.speed;
      });
      ufos.forEach((ufo) => {
        ufo.position.x -= player.speed;
      });
      spaceBackground.forEach((background) => {
        background.position.x -= player.speed * 0.33;
      })
      genericObjects.forEach((genericObject) => {
        genericObject.position.x -= player.speed * 0.66;
      });
      foreground.forEach((object) => {
        object.position.x -= player.speed;
      });
      flag.position.x -= player.speed;
      flashingArrow.position.x -= player.speed;
      rocket.position.x -= player.speed;
      spacebarPrompt.position.x -= player.speed;



    } else if (keys.left.pressed && (scrollOffset > 0)) {
        scrollOffset -= player.speed;
      platforms.forEach((platform) => {
        platform.position.x += player.speed;
      });
      blocks.forEach((block) => {
        block.position.x += player.speed;
      });
      flowers.forEach((flower) => {
        flower.position.x += player.speed;
      });
      ufos.forEach((ufo) => {
        ufo.position.x += player.speed;
      });
      flag.position.x += player.speed;      
      spaceBackground.forEach((background) => {
        background.position.x += player.speed * 0.33;
      })
      genericObjects.forEach((genericObject) => {
        genericObject.position.x += player.speed * 0.66;
      });
      foreground.forEach((object) => {
        object.position.x += player.speed;
      });
      flashingArrow.position.x += player.speed;
      rocket.position.x += player.speed;      
      spacebarPrompt.position.x += player.speed;
    

    }  
  }
      //TESTING VERTICAL MOVEMENT

  //CHANGE ROCKET IMAGE ON COLLISION
  if(player.position.x === rocket.position.x && rocket.image=== rocketship) {
    rocket.image = rocketman
    player.position.y = 5000
    console.log(rocket.position.x)
    player.speed=0
    spacebarPrompt.position.y = 100
    
    
    
  }
  //MOVE ROCKET UP
  if (keys.up.pressed && rocket.position.y > 40) {
    rocket.position.y --  
     console.log(rocket.position.y)
  }
  //MOVE BACKGROUND DOWN
  else {
    if(keys.up.pressed) {
      spaceBackground.forEach((background) => {
        background.position.y += 4;
      })
      genericObjects.forEach((genericObject) =>{
        genericObject.position.y += 4
      },
      platforms.forEach((platform)=> {
        platform.position.y += 4 
      }),
      spacebarPrompt.position.y += 4
      
      )
    }
  }


  console.log(scrollOffset)

  //BLOCK COLLISION DETECTION
  // -70 because block.width is not accurately representing the size of the block
  blocks.forEach((block) => {
    block.draw();

    if (player.position.y - player.height + 7 <= block.position.y + 190 && player.position.x >= block.position.x && player.position.x <= block.position.x + block.width - 200 && player.position.x >= block.position.x +100 ) {
        player.velocity.y = 0;
        player.velocity.y = 1;
        // hides block on collision
        block.position.y = canvas.height

        setInterval(()=>{
          if (flowers[0].position.y !== -30){
            flowers[0].position.y --
          }
          else if (flowers[1].position.y !== 60) {
            flowers[1].position.y --
          }
          else if (flowers[2].position.y !== -30) {
            flowers[2].position.y --
          }
          else if (flowers[3].position.y !== 160) {
            flowers[3].position.y --
          }
        },20)

    }
  })

  // ON FLAG POLE COLLISION UFOS FLY IN FROM RIGHT SIDE
  if (player.position.y - player.height + 7 <= flag.position.y && player.position.x >= flag.position.x && player.position.x <= flag.position.x + flag.width) {
      console.log("first")      
    player.speed = 0
    setTimeout(() => {
      player.speed=7
    },900)

      var handle =setInterval(()=>{
        if (ufos[0].position.x > flag.position.x - 250) {
          ufos[0].position.x -=3
        }
        else if (ufos[1].position.x > flag.position.x - 100) {
          ufos[1].position.x -=3
        }
        else if (ufos[2].position.x > flag.position.x + 50) {
          ufos[2].position.x -=3
        }
        else if (ufos[3].position.x > flag.position.x + 200) {
          ufos[3].position.x -=3
        }
        else if (ufos[4].position.x > flag.position.x + 350) {
          ufos[4].position.x -=2
        }
        else clearInterval(handle)
      },30)   
  }




  //platform collision detection
  platforms.forEach((platform) => {

    if (
      player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y >=
        platform.position.y &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width
    ) {
      player.velocity.y = 0;
    }
  });
  // win condition
  if (scrollOffset > 2000) {
    // alert("you win")
  }

  flowers.forEach((flower) => {
    if(flower.image === groundFlower) {
      setTimeout(() => {
        flower.image = flowersClosed
      },600)
  
    }
    else {
      setTimeout(() => {
        flower.image = groundFlower
      },600)      
    }
  })



}
animate();

//listens for keyCode property of event for movement wasd
window.addEventListener("keydown", ({ keyCode }) => {
  console.log(keyCode)
  switch (keyCode) {
    case 32:
      keys.up.pressed = true;
      break;
    case 87:
      player.velocity.y -= 10;
      break;
    case 65:
      keys.left.pressed = true;
      player.currentSprite = player.sprites.run.left;
      player.currentCurrentCropWidth = player.sprites.run.cropWidth;
      player.width = player.sprites.run.width;
      break;

    //removed down
    // case 83:
    //   player.velocity.y += 10;

      break;
    case 68:
      keys.right.pressed = true;
      player.currentSprite = player.sprites.run.right;
      player.currentCurrentCropWidth = player.sprites.run.cropWidth;
      player.width = player.sprites.run.width;
      break;
  }
});
window.addEventListener("keyup", ({ keyCode }) => {
  switch (keyCode) {
    case 32:
      keys.up.pressed = false;
      break;
    case 87:
      // player.velocity.y -= 20
      break;
    case 65:
      keys.left.pressed = false;
      player.currentSprite = player.sprites.stand.left;
      player.currentCurrentCropWidth = player.sprites.stand.cropWidth;
      player.width = player.sprites.stand.width;
      break;
    case 83:
      // player.velocity.y += 20

      break;
    case 68:
      keys.right.pressed = false;
      player.currentSprite = player.sprites.stand.right;
      player.currentCurrentCropWidth = player.sprites.stand.cropWidth;
      player.width = player.sprites.stand.width;
      break;
  }
});