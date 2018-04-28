/*
@license        : Dahoux Sami 2018 - © Copyright All Rights Reserved.
@author         : Dahoux Sami
@created        : 28/04/2018
@file           : NField.js
@description    :
 */

class NField {

    h = 0.1;

    constructor(func, n, p) {
        this.inputDim = p;
        this.outputDim = n;

        let vector = NVector.zeros(p);          //We assume the field is define anywhere until it's defined in 0
        if(func(vector).dim === this.outputDim) {
            this.func = func;
        }
        else {
            console.log("Unable to create vectorial field with : " + func);
            this.func = function(vector) {return vector}
        }
    }

    value(vector){
        return this.func(vector);
    }

    values(vectors) {
        let values = new Array(vectors.length);
        for(let k = 0; k < values.length; k++) {
            values[k] = this.value(vectors[k]);
        }
    }

    diff(k, vector) {
        let dVector = NVector.canonical(k, this.inputDim).prod(this.h);
        return this.value(vector.cSum(dVector).get(k) - vector.get(k)).cProd(1 / this.h);
    }
}