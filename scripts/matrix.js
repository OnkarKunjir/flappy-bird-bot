class Matrix{
    //uses p5 random function....
    constructor(rows , cols){
        this.rows = rows;
        this.cols = cols;
        this.data = [];
        for(var i=0;i<this.rows;i++){
            this.data[i] = [];
            for(var j=0;j<this.cols;j++){
                this.data[i][j] = 0;
            }
        }
    }

    display(){
        //function to display in console...
        console.table(this.data);
    }

    add(n){
        //function to add matrix with matrix or add const...
        if(n instanceof Matrix){
            if(n.rows == this.rows && this.cols == this.cols){
                for(var i=0;i<this.rows;i++){
                    for(var j=0;j<this.cols;j++){
                        this.data[i][j] += n.data[i][j];
                    }
                }
            }

            else if(this.cols == this.cols){
                //to add bias specificly
                for(var i=0;i<this.rows;i++){
                    for(var j=0;j<this.cols;j++){
                        this.data[i][j] += n.data[0][j];
                    }
                }
            }

        }

        else{
            for(var i=0;i<this.rows;i++){
                for(var j=0;j<this.cols;j++){
                    this.data[i][j] += n;
                }
            }
        }
    }

    randomize(){
        //function to initialize matrix with random values...
        for(var i=0;i<this.rows;i++){
            for(var j=0;j<this.cols;j++){
                this.data[i][j] =  random(-1 , 1);
            }
        }
    }

    map(func){
        //function to map matrix value in function
        for(var i=0;i<this.rows;i++){
            for(var j=0;j<this.cols;j++){
                var x = this.data[i][j];
                this.data[i][j] = func(x);
            }
        }
    }


    transpose(){
        //function to take transpose...
        let result = new Matrix(this.cols , this.rows);
        for(var i=0;i<this.rows;i++){
            for(var j=0;j<this.cols;j++){
                result.data[j][i] = this.data[i][j];
            }
        }
        return result;
    }

    tolist(){
        var l = [];
        for(var i=0;i<this.rows;i++){
            l.push(this.data[i]);
        }
        return l;
    }

    static fromList(l){
        let m = new Matrix(l.length , l[0].length);
        for(var i=0;i<m.rows;i++){
            m.data[i] = l[i];
        }
        return m;
    }

    static matmul(a, b){
        //function for matrix multiplication...
        if(a.cols == b.rows){
            let result = new Matrix(a.rows , b.cols);
            for(let i=0;i<result.rows;i++){
                for(let j=0;j<result.cols;j++){
                    var sum = 0;
                    for(var k=0;k<a.cols;k++){
                        sum += a.data[i][k]*b.data[k][j]; 
                    }
                    result.data[i][j] = sum;
                }
            }
            return result;
        }
    }

    mult(n){
        for(var i=0;i<this.rows;i++){
            for(var j=0;j<this.cols;j++){
                this.data[i][j] *= n;
            }
        }
    }

    copy(){
        var m = new Matrix(this.rows , this.cols);

        for(var i=0;i<this.rows;i++){
            for(var j=0;j<this.cols;j++){
                m.data[i][j] = this.data[i][j];
            }
        }
        return m;
    }

}