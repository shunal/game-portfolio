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
background.src = "./img/background.png";

const hills = new Image();
hills.src = "./img/hills.png";

const block = new Image();
block.src = "./img/block.png";

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

//set canvas to fullscreen
canvas.width = 1024;
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
    this.speed = 5;
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
  new Platform({ x: -1, y: 470, image: platformFloor }),
  new Platform({ x: platformFloor.width - 1, y: 470, image: platformFloor }),
  new Platform({
    x: platformFloor.width * 2 - 1,
    y: 470,
    image: platformFloor,
  }),
  new Platform({
    x: platformFloor.width * 3 - 1,
    y: 470,
    image: platformFloor,
  }),
  new Platform({
    x: platformFloor.width * 4 - 1,
    y: 470,
    image: platformFloor,
  }),
  new Platform({
    x: platformFloor.width * 5 - 1,
    y: 470,
    image: platformFloor,
  }),
  new Platform({
    x: platformFloor.width * 6 - 1,
    y: 470,
    image: platformFloor,
  }),
  new Platform({
    x: platformFloor.width * 7 - 1,
    y: 470,
    image: platformFloor,
  }),
  new Platform({
    x: platformFloor.width * 8 - 1,
    y: 470,
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
  }
  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}
const blocks = [new GenericObject({ x: 1200, y: -400, image: block })];

const genericObjects = [
  new GenericObject({ x: -1, y: -1, image: background }),
  new GenericObject({ x: -1, y: -1, image: hills }),
];

const player = new Player();

const keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
};

let scrollOffset = 0;

// create loop
function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = "white";
  c.fillRect(0, 0, canvas.width, canvas.height);

  genericObjects.forEach((genericObject) => {
    genericObject.draw();
  });


  player.update();

  // stop player at left and middle of screen so platforms can scroll
  if (keys.right.pressed && player.position.x < 400) {
    player.velocity.x = player.speed;
  } else if (
    (keys.left.pressed && player.position.x > 10) ||
    (keys.left.pressed && scrollOffset === 0 && player.position.x > 0)
  ) {
    player.velocity.x = -player.speed;
  } else {

    player.velocity.x = 0;

    // BLOCK VERTICAL SCROLLING LOGIC
    if (scrollOffset > 100) {
        blocks.forEach((block) => {
            if(block.position.y < 100) {
            block.position.y += block.speed;
        }
            
          });
    } 
    // platform scrolling logic
    if (keys.right.pressed) {
      scrollOffset += player.speed
      platforms.forEach((platform) => {
        platform.position.x -= player.speed;
      });
      blocks.forEach((block) => {
        block.position.x -= player.speed;
      });
    
      genericObjects.forEach((genericObject) => {
        genericObject.position.x -= player.speed * 0.66;
      });
    } else if (keys.left.pressed && (scrollOffset > 0)) {
        scrollOffset -= player.speed;
      platforms.forEach((platform) => {
        platform.position.x += player.speed;
      });
      blocks.forEach((block) => {
        block.position.x += player.speed;
      });
      
      genericObjects.forEach((genericObject) => {
        genericObject.position.x += player.speed * 0.66;
      });
    }
  }
  //BLOCK COLLISION DETECTION
  // -70 because block.width is not accurately representing the size of the block
  blocks.forEach((block) => {
    block.draw();
    if (player.position.y - player.height + 7 <= block.position.y && player.position.x >= block.position.x && player.position.x <= block.position.x + block.width - 70  ) {
        player.velocity.y = 0;
        player.velocity.y = 1;
        console.log("collision")
    }
  })

  //platform collision detection
  platforms.forEach((platform) => {
    platform.draw();

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

  if (scrollOffset > 400) {
  }

}
animate();

//listens for keyCode property of event for movement wasd
window.addEventListener("keydown", ({ keyCode }) => {
  switch (keyCode) {
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
