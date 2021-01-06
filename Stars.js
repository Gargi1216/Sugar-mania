class Star {
    constructor(x,y){
        var options={
            isStatic:true
        }
        this.body = Bodies.rectangle(x,y,40,40,options);
        this.width = 40;
        this.height = 40;
        this.image = loadImage("images/star.png");
        World.add(world,this.body);
    }

    display(){
        var pos = this.body.position;
        push();
        image(this.image,pos.x,pos.y,this.width,this.height);
        pop();
    }
}