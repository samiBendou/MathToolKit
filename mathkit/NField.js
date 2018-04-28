/*
@license        : Dahoux Sami 2018 - © Copyright All Rights Reserved.
@author         : Dahoux Sami
@created        : 28/04/2018
@file           : NField.js
@description    : Class representing a numeric vector field f(u) = f(x1, x2, ..., xp). f output must be a vector.
                  f(u) = (f1(u), f2(u), ..., fn(u)).
                  This class is initialized with a JavaScript function representing the point expression of the
                  function. Used to solve differential equations.
 */

class NField {

    constructor(func, n, p) {
        this.inputDim   = p;
        this.outputDim  = n;
        this.h          = 0.1;

        let vector = NVector.zeros(p);          //We assume the field is define anywhere until it's defined in 0
        if(func(vector).dim === this.outputDim) {
            this.func = func;
        }
        else {
            console.log("Unable to create vectorial field with : " + func);
            this.func = function(vector) {return vector}
        }
    }

    //GETTERS

    //Point value of the field
    value(vector){
        return this.func(vector);
    }

    //Values on a set of point
    values(vectors) {
        let values = new Array(vectors.length);
        for(let k = 0; k < values.length; k++) {
            values[k] = this.value(vectors[k]);
        }
    }

    //Derivative of a vector field : df(v)/dx(k) using Euler schema
    diff(k, vector) {
        let dVector = NVector.canonical(k, this.inputDim).prod(this.h);
        return this.value(vector.cSum(dVector).get(k) - vector.get(k)).cProd(1 / this.h);
    }
}