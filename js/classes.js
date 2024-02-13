class Sprite {
  constructor({position, 
               imageSrc, 
               scale=1, 
               framesMax=1,
               offset= {x:0 , y:0}  }){ // x,y defult obj(img) which the offset is for,, img cant be offset of any value
    this.position=position
   
    this.width =50
    this.height=150
    this.image= new Image()
    this.image.src = imageSrc
    this.scale= scale
    this.framesMax= framesMax
    this.framesCurrent=0
    this.framesElapsed =0
    this.framesHold=7 //every 10th frame we will loop thro the anima
    this.offset=offset
  }
  draw(){
    c.drawImage(this.image,
                //croping
                this.framesCurrent * (this.image.width/this.framesMax),
                0,
                this.image.width/this.framesMax,
                this.image.height,

                
                this.position.x - this.offset.x, 
                this.position.y - this.offset.y, 
                (this.image.width/this.framesMax) *this.scale,
                this.image.height * this.scale)
  }
  animateFrames(){
       this.framesElapsed++
    if( this.framesElapsed % this.framesHold ===0){ //useing % to get remainder
      if (this.framesCurrent < this.framesMax-1) {
      this.framesCurrent++
    } else {
      this.framesCurrent=0
    }
    }
  }
// 
  update(){
    this.draw()
    this.animateFrames()
 
     

  }

}

class Fighter extends Sprite{ // inherting from sprite cls
  constructor({position,
               velocity,
               color='red', 
               imageSrc, 
               scale=1, 
               framesMax=1, 
               offset= {x:0 , y:0},
               sprites,
               attackBox = {offset: {}, width: undefined, height: undefined}
              }){
    super({position, 
           imageSrc, 
           scale, 
           framesMax, 
           offset}) //calls the constructor func of the parents
    
    this.velocity=velocity
    this.width =50
    this.height=150
    this.lastKey
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y
      } ,
      offset: attackBox.offset,
      width: attackBox.width,
      height: attackBox.height
     
    }
    this.color=color
    this.isAttacking
    this.health=100
    this.framesCurrent=0
    this.framesElapsed =0
    this.framesHold=7
    this.sprites= sprites

    for(const sprite in this.sprites){  // looping throu images in index sprite
      sprites[sprite].image = new Image()
      sprites[sprite].image.src = sprites[sprite].imageSrc
    }
   
  }

  


  update(){
    this.draw()
    this.animateFrames()

    // attack boxes
    this.attackBox.position.x= this.position.x +this.attackBox.offset.x
    this.attackBox.position.y= this.position.y +this.attackBox.offset.y
   
    //this.position.y=this.position.y +10
    //this.position.y +=10


    // this is where we draw the attack box
  
  //  c.fillRect(this.attackBox.position.x,
    //           this.attackBox.position.y,
      //         this.attackBox.width, 
         //      this.attackBox.height) // object that is used to draw a filled rectangle on a canvas element.

    
    this.position.x +=this.velocity.x
    this.position.y +=this.velocity.y
// gravity func. 
    if (this.position.y + this.height+ this.velocity.y >= canvas.height-96){
      this.velocity.y=0 
      this.position.y=330
    } else 
      this.velocity.y +=gravity
   // console.log(this.position.y)
  }

  attack(){
    this.switchSprite('attack1')
    this.isAttacking= true
   
  }
  switchSprite(sprite){ // switch statement evaluates an expression and compares it with multiple cases
    if(this.image ===this.sprites.attack1.image && this. framesCurrent< this.sprites.attack1.framesMax -1)
      return
    switch(sprite){
       case 'idle':
       if (this.image!== this.sprites.idle.image){
         this.image= this.sprites.idle.image
        this.framesMax =this.sprites.idle.framesMax
       this.framesCurrent = 0
       }
        break
      case 'run':
        if (this.image!== this.sprites.run.image) {
         this.image= this.sprites.run.image
        this.framesMax =this.sprites.run.framesMax 
         this.framesCurrent = 0
        }
        break
      case 'jump':
        if (this.image!== this.sprites.jump.image) {
        this.image= this.sprites.jump.image
    this.framesMax =this.sprites.jump.framesMax 
         this.framesCurrent = 0
        }
        break
        case 'fall':
        if (this.image!== this.sprites.fall.image) {
        this.image= this.sprites.fall.image
    this.framesMax =this.sprites.fall.framesMax 
         this.framesCurrent = 0
        }
        break
        case 'attack1':
        if (this.image!== this.sprites.attack1.image) {
        this.image= this.sprites.attack1.image
    this.framesMax =this.sprites.attack1.framesMax 
         this.framesCurrent = 0
        }
        break
        
    }
  }
  
}