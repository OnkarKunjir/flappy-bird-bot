class NeuralNetwork{
    constructor(input_n , hidden_n , output_n){

        if(input_n instanceof NeuralNetwork){
            this.input_nodes = input_n.input_nodes;
            this.hidden_nodes = input_n.hidden_nodes;
            this.output_nodes = input_n.output_nodes;

            //nn parameters...
            this.weights_ih = input_n.weights_ih.copy();
            this.weights_ho = input_n.weights_ho.copy();

            this.bias_h = input_n.bias_h.copy();
            this.bias_o = input_n.bias_o.copy();
        }
        else{
            //initalizing nn..
            this.input_nodes = input_n;
            this.hidden_nodes = hidden_n;
            this.output_nodes = output_n;

            //nn parameters...
            this.weights_ih = new Matrix(this.input_nodes , this.hidden_nodes);
            this.weights_ih.randomize();
            this.weights_ho = new Matrix(this.hidden_nodes , this.output_nodes);
            this.weights_ho.randomize();

            this.bias_h = new Matrix(1, this.hidden_nodes);
            this.bias_o = new Matrix(1 , this.output_nodes);
            this.bias_h.randomize();
            this.bias_o.randomize();
        }
        
    }

    sigmoid(x){
        //function for calculating feed forward network
        let s = 1/(1+Math.exp(-x));
        return s;
    }

    forwardpass(inputs){
        inputs = Matrix.fromList(inputs);
        let hidden = Matrix.matmul(inputs , this.weights_ih);
        hidden.add(this.bias_h);
        hidden.map(this.sigmoid);

        let output = Matrix.matmul(hidden , this.weights_ho);
        output.add(this.bias_o);
        output.map(this.sigmoid);
        
        return output.tolist();
    }


    //function for NEAT
    copy(){
        return new NeuralNetwork(this);
    }

    mutation_func(x , prob = 0.2){
        if(random(0,1)<prob){
            return x+randomGaussian(0 , 0.1);
        }
        return x;
    }

    mutate(){
        this.weights_ih.map(this.mutation_func);
        this.weights_ho.map(this.mutation_func);
        this.bias_h.map(this.mutation_func);
        this.bias_o.map(this.mutation_func);
    }   

}