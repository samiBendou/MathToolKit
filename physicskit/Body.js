/*
@license        : Dahoux Sami 2018 - © Copyright All Rights Reserved.
@author         : Dahoux Sami
@created        : 28/04/2018
@file           : Body.js
@description    : Module designed to represent physical material point with electric charge. It can either be a planet
                  with high mass or a fundamental particle.
 */

class Body {

    constructor(intialPos, initialSpd, mass, charge) {
        this.r = initialPos;        //"Absolute" position of body (m)
        this.v = initialSpd;        //"Absolute" speed of body (m/s)
        this.m = mass || 0.0;       //Mass of body (kg)
        this.q = charge || 0.0;     //Electrical charge of body (C)
    }

    //Coordinates in phase space
    u(k) {
        if (k !== undefined) {
            return (k > 2) ? this.v.get(k - 3) : this.r.get(k);
        } else {
            let u = ENVector.zeros(6);
            for (let k = 0; k < 6; k++) {
                u.val[k] = (k > 2) ? this.v.get(k - 3) : this.r.get(k);
            }
            return u;
        }
    }

    setU(k, vector) {
        if(k === undefined) {
            if(vector.dim === 6) {
                this.r = vector.subVect(0, 2);
                this.v = vector.subVect(3);
            }
        } else if(typeof(vector) === "number"){
            (k > 2) ? (this.v.set(k - 3, vector)) : (this.r.set(k, vector));
        }
    }

    //Momentum of body
    p(k) {
        let p = this.v.copy();
        p.prod(this.m);
        return (k !== undefined) ? p.get(k) : p;
    }
}