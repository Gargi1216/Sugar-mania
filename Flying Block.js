class FlyingBlock {
    constructor(x,y){
        var options={
            isStatic:true
        }
        this.body = Bodies.rectangle(x,y,200,160,options);
        this.width = 200;
        this.height = 160;
        this.image = loadImage("images/block1.png");
        World.add(world,this.body);
    }

    display(){
        var pos = this.body.position;
        push();
        image(this.image,pos.x,pos.y,this.width,this.height);
        pop();
    }
}