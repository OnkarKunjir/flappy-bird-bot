class bird{
    constructor(nn){
        //bird natures for physics simulation....
        this.pos = createVector(30 , height/2);
        this.velocity = createVector(0,0);
        this.acc = createVector(0,0);
        this.mass = 10;
        this.maxvelocity = 4;

        //parameters required for jumping 
        this.jumpframe = 0;
        this.jumping = false;
        
        //parameters for genetic algorithm...
        this.alive = true;
        this.fitness = 0;
        this.score = 0;

        if(nn){
            this.brain = nn;
        }
        else{
            this.brain = new NeuralNetwork(4 , 6 , 1);
        }
    }

    applyForce(f){
        var f = f.copy();
        f.div(this.mass);
        this.acc.add(f);
    }

    checkcolision(x , ycut , gap , width){
        //check collison for upper bar
        if(this.pos.x > x && this.pos.x < x+width && this.pos.y>0 && this.pos.y < ycut){
            this.alive = false;
        }
        else if(this.pos.x > x && this.pos.x < x+width && this.pos.y>ycut+gap && this.pos.y<height){
            this.alive = false;
        }
    }

    applyGravity(){
        if(!this.jumping){
            var g = createVector(0 , 3);
            this.applyForce(g);
        }
    }

    jump(){
        //function to make brid jump...
        this.jumping = true;
    }

    update(x , y , gap){
        //function to update position of bird...
        var inputs = [[x/width , this.velocity.y /this.maxvelocity , (this.pos.y - y)/height , (y+gap-this.pos.y)/height]];
        var output = this.brain.forwardpass(inputs);
        if(Math.round(output[0][0]) == 1){
            //perform action based upon the condition
            this.jump();
        }
        
        if(this.alive){
            this.score++;
            this.velocity.add(this.acc);
            this.velocity.limit(this.maxvelocity);
            this.pos.add(this.velocity);
            this.acc.mult(0);
            if(this.pos.y+30 >= height){
                //this.alive = false;
                this.pos.y = height-30;
            }
            else if(this.pos.y-30 <= 0){
                this.pos.y = 30;
            }

            if(this.jumping){
                var jmp = createVector(0 , -3);
                this.applyForce(jmp);

                if(++this.jumpframe == 20){
                    this.jumpframe = 0;
                    this.jumping = false;
                }
            }
        }
    }

    display(){
        if(this.alive){
            push();
            fill(255 , 80);
            //translate(this.pos.x , this.pos.y);
            ellipse(this.pos.x , this.pos.y , 30 , 30);

            pop();
        }
    }
}