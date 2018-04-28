/*
@license        : Dahoux Sami 2018 - © Copyright All Rights Reserved.
@author         : Dahoux Sami
@created        : 28/04/2018
@file           : NVector.js
@description    : Representation of a finite dimension numerical vector space. Featuring algebraical operations,
                  setters & getters, swappers and classic vectors generator such as ones, zeros...

                  Algebraical operations noted with c (cSum) don't modify calling object and return a copy of the
                  result of operation. Other operations (sum) store the result in the calling object.

 */

class NVector {
    constructor(arr) {
        this.dim = arr.length;      //Dimension of the vector
        this.val = arr.clone();     //Ordered values of vector : (x0, x1, ..., xDim)
    }

    print() {
        console.log(this.toString());
    }

    toString() {
        let str = '( ' +  this.val[0].toFixed(2);
        for(let k = 1; k < this.dim; k++) {
            str += '  ' + this.val[k].toFixed(2);
        }
        str += ' )';
        return str;
    }

    toArray() {
        return this.val.clone();
    }

    copy() {
        //Hard copy of a vector.
        let arr = this.val.clone();
        return new NVector(arr);
    }

    //CHARACTERIZATION OF VECTORS
    validIndex(k) {
        return k >= 0 && k < this.dim;
    }

    matchDim(vector) {
        return this.dim === vector.dim;
    }

    //SETTERS & GETTERS
    get(k) {
        return this.validIndex(k) ? this.val[k] : undefined;
    }

    set(k, value) {
        if (this.validIndex(k)) this.val[k] = value;
    }

    //ALGEBRAICAL OPERATIONS

    //Sum of two vectors
    sum(vector) {
        if(this.matchDim(vector)) {
            for(let k = 0; k < this.dim; k++) {
                this.val[k] += vector.val[k];
            }
        }
    }

    cSum(vector) {
        let res = this.copy();
        res.sum(vector);
        return res;
    }

    //Scalar multiplication
    prod(scalar) {
        for(let k = 0; k < this.dim; k++){
            this.val[k] = scalar * this.val[k];
        }
    }

    cProd(scalar) {
        let res = this.copy();
        res.prod(scalar);
        return res;
    }

    //Opposite of a vector
    opp() {
        this.prod(-1.0);
    }

    cOpp() {
        let res = this.copy();
        res.opp();
        return res;
    }

    //Subtraction of two vectors
    sub(vector) {
        let newVector = vector.cOpp();
        this.sum(newVector);
    }

    cSub(vector) {
        let res = this.copy();
        res.sub(vector);
        return res;
    }

    //SWAPS & SUBS

    //Permutation of two elements (x(k1 - 1), xk2, ..., x(k2 - 1), xk1, ..., xDim)
    swap(k1, k2) {
        if(this.validIndex(k1) && this.validIndex(k2)) {
            let temp = this.val[k1];
            this.val[k1] = this.val[k2];
            this.val[k2] = temp;
        }
    }

    //Sub Vector got from the calling vector (xk1, x(k1 +1), ..., x(k2))
    subVect(k1, k2) {
        let subVect = this.copy();
        let end = k2 || this.dim;
        if(this.validIndex(k1) && this.validIndex(end)) {
            if(k2 > k1) {
                subVect.dim = k2 - k1 + 1;
                subVect.val = this.val.slice(k1, k2);
            }
        }
        return subVect;
    }

    //Set a sub range (x(k1 - 1), v0, v1, ..., v(dim(v)), ...; xDim)
    setSubVect(k1, vector) {
        let k2 = k1 + vector.length;
        if(this.validIndex(k1) && this.validIndex(k2)) {
            for(let k = k1; k < k2; k++)
                this.val[k] = vector.val[k - k1];
        }
    }

    //Find index of the max absolute value element.
    maxAbsIndex(r) {
        let max = 0.0;
        let k;
        if(this.validIndex(r)) {
            for(let i = r || 0; i < this.dim; i++) {
                if(Math.abs(this.val[i]) >= max) {
                    max = Math.abs(this.val[i]);
                    k   = i;
                }
            }
            return k;
        }
    }

    //Fill vector with value
    fill(value) {
        this.val = Array.apply(null, Array(this.dim)).map(Number.prototype.valueOf, value);
    }

    static zeros(n) {
        let arr = Array.apply(null, Array(n)).map(Number.prototype.valueOf, 0.0);
        return new NVector(arr);
    }

    static ones(n) {
        return NVector.scalar(1, n);
    }

    static scalar(x, n) {
        let scalar = NVector.zeros(n);
        for(let k = 0; k < n; k++) {
            scalar.val[k] = x;
        }
        return scalar;
    }

    static canonical(k, n) {
        let canonical = NVector.zeros(n);
        if(k < n) {
            canonical.val[k] = 1;
        }
        return canonical;
    }
}