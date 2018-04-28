/*
@license        : Dahoux Sami 2018 - © Copyright All Rights Reserved.
@author         : Dahoux Sami
@created        : 28/04/2018
@file           : GField.js
@description    : Module designed to represent Newtonian Gravitational field in an arbitrary position vector.
 */

class GField {
    cosntructor(mass, initialPosition) {
        this.mass   = mass;
        this.pos    = initialPosition;
        this.n      = mass.length;

        this.field  = new NField(function(vector) {
            let r = Vector3.zeros();
            let g = Vector3.zeros();

            for(let k = 0; k < this.n; k++) {
                r = vector.dist(this.pos[k]);
                if(r > Number.EPSILON) {
                    g.sum(-GField.G * this.mass[k] / Math.pow(r, 3));
                }
            }
            return g;
        }, 3, 3);
    }
}

GField.G = 6.67408e-11;