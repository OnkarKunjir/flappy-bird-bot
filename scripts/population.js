var generation = 0;

class population{
    constructor(){
        this.size = 300;
        this.birds = [];
        for(var i=0;i<this.size;i++){
            this.birds[i] = new bird();
        }

        this.bar = new bar();
        this.mating_pool = [];
    }

    pick_one(){
        let index = 0;
        // Pick a random number between 0 and 1
        let r = random(1);
        // Keep subtracting probabilities until you get less than zero
        // Higher probabilities will be more likely to be fixed since they will
        // subtract a larger number towards zero
        while (r > 0) {
            r -= this.birds[index].fitness;
            // And move on to the next
            index += 1;
        }

        // Go back one
        index -= 1;

        // Make sure it's a copy!
        // (this includes mutation)
        return new bird(this.birds[index].brain.copy());
        //return birds[index].copy();
    }


    natural_selection(){
        console.log(++generation);
        //normalize the fitness to generate the mating pool
        //var max_score = 0;
        var sum = 0;
        for(var i=0;i<this.size;i++){
            //console.log(this.birds[i].score);
            sum+= this.birds[i].score;
            /*if(max_score<this.birds[i].score){
                max_score = this.birds[i].score;
            }*/
        }

        //console.log(sum);
        

        //generating mating pool
        this.mating_pool = [];
        
        for(var i=0;i<this.size;i++){
            this.birds[i].fitness = this.birds[i].score/sum;
            //console.log(this.birds[i].fitness);
        }

        var new_pop = [];
        for(var i=0;i<this.size;i++){
            new_pop.push(this.pick_one());
            new_pop[i].brain.mutate();
        }
        this.birds = new_pop;
            //var count = (this.birds[i].score / max_score) * 100;
            //this.mating_pool.push(this.birds[i]);    
            /*for(var j=0;j<count;j++){
                this.mating_pool.push(this.birds[i]);
            }

        }

        //console.log(this.mating_pool.length);
        
        //cross-over and mutation....
        var new_population = [];
        for(var i=0;i<this.size;i++){
            var b1 = random(this.mating_pool).brain;
            //var b2 = random(this.mating_pool).brain;
            var child_nn = b1.copy();
            child_nn.mutate();
            new_population.push(new bird(child_nn));
        }
        this.birds = new_population;*/
    }
    

    update(){
        this.bar.update();
        this.bar.display();
        if(!this.bar.inframe){
            this.bar = new bar();
        }

        var alive_count = 0;
        var max_score = 0;

        for(var i=0;i<this.size;i++){
            this.birds[i].applyGravity();
            this.birds[i].update(this.bar.pos.x ,this.bar.divpt , this.bar.gap);
            this.birds[i].checkcolision(this.bar.pos.x , this.bar.divpt , this.bar.gap , this.bar.width);
            this.birds[i].display();
            if(this.birds[i].score > max_score){
                max_score = this.birds[i].score;
            }
            if(this.birds[i].alive){
                alive_count++;
            }
        }

        if(alive_count == 0){
            //perform natural selection on birds
            this.natural_selection();
        }
        textSize(32);
        fill(255, 255, 255);
        text(max_score.toString() , 10, 30);

    }

}