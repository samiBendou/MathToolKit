/*
@license        : Dahoux Sami 2018 - © Copyright All Rights Reserved.
@author         : Dahoux Sami
@created        : 28/04/2018
@file           : ENVector.js
@description    : Module inheriting from NVector which represent Euclidean Space vector. Featuring norm based upon
                  inner product scalar and distance between two vectors.
 */

class ENVector extends NVector {

    dot(vector) {
        let dot = 0.0;
        for(let k = 0; k < this.dim; k++) {
            dot += this.val[k] * vector.val[k];
        }
        return dot;
    }

    norm() {
        return Math.sqrt(this.dot(this));
    }

    dist(vector) {
        let dif = this.cSub(vector);
        return dif.norm();
    }

    copy() {
        let arr = this.val.clone();
        return new ENVector(arr);
    }

    static zeros(n) {return new ENVector(NVector.zeros(n).toArray());}

    static ones(n) {return new ENVector(NVector.ones(n).toArray());}

    static scalar(x, n) {return new ENVector(NVector.scalar(x, n).toArray());}

    static canonical(k, n) {return new ENVector(NVector.canonical(k, n).toArray());}
}