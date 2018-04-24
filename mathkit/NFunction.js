class NFunction {
    constructor(func, n) {
        let vector = NVector.zeros(n);
        if(func(vector) !== undefined) {
            this.func = func;
        }
    }

    values(vectors) {
        let values = new Array(vectors.length);
        for(let k = 0; k < values.length; k++) {

        }
    }
}