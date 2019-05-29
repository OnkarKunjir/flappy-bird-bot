class bar{
    constructor(){
        this.gap = 100;
        this.width = 50;

        this.pos = createVector(width+random(0 , 40) ,0);
        this.divpt = random(0 , height-this.gap);
        
        this.barVelocity = createVector(-5 , 0);

        this.inframe = true;

    }

    update(){
        this.pos.add(this.barVelocity);
        if(this.pos.x + this.width <0){
            this.inframe = false;
        }
    }

    display(){
        push();
        stroke(255);
        //drawing upper bar
        rect(this.pos.x , 0 , this.width , this.divpt);
        //drawing lower bar
        rect(this.pos.x , this.divpt+this.gap , this.width , (height - this.divpt+this.gap) );
        pop();
    }
}