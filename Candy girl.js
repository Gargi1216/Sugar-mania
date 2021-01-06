class CandyGirl{
    constructor(x,y){
        var options={
            friction:0,
            restitution:1.0,
            density:1.2
        }
        this.body = Bodies.rectangle(x,y,50,100,options);
        this.width = 50;
        this.height = 100;
        //this.x = x;
        //this.y = y;
        this.image = loadImage("images/candy_animation11.png");
        World.add(world, this.body);
    }

    display(){
        push();
        imageMode(CENTER);
        image(this.image,this.body.position.x,this.body.position.y,this.width,this.height);
        pop();
    }
}