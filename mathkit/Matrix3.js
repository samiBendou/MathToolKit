/*
@license        : Dahoux Sami 2018 - © Copyright All Rights Reserved.
@author         : Dahoux Sami
@created        : 28/04/2018
@file           : Matrix3.js
@description    : Class representing 3D Matrix. Featuring rotation matrix.
 */

class Matrix3 extends NMatrix {
    copy() {
        let arr = this.toArray();
        return new Matrix3(arr);
    }

    static rotationAround(axis, theta) {
        let normalizedAxis = axis.cProd(1.0 / axis.norm());
        let id = Matrix3.eye();
        let u = new NPMatrix([normalizedAxis.val]);

        let q = Matrix3.zeros();
        for(let j = 0; j < 3; j++) {
            q.setCol(j, normalizedAxis.cCross(Vector3.canonical(j)));
        }

        let p = new Matrix3(u.trans().cProd(u).toArray());

        //R = P + cos(theta) * (I - P) + sin(theta) * Q
        q.prod(Math.sin(theta));

        id.sub(p);
        id.prod(Math.cos(theta));
        id.sum(q);

        p.sum(id);
        return p;
    }

    static rotationX(theta) {
        return new Matrix3([[1, 0, 0],
                            [0, Math.cos(theta),-Math.sin(theta)],
                            [0, Math.sin(theta),Math.cos(theta)]]);
    }

    static rotationY(theta) {
        return new Matrix3([[Math.cos(theta), 0, Math.sin(theta)],
                            [0, 1, 0],
                            [-Math.sin(theta), 0,Math.cos(theta)]]);
    }

    static rotationZ(theta) {
        return new Matrix3([[Math.cos(theta), -Math.sin(theta), 0],
                            [Math.sin(theta), Math.cos(theta), 0],
                            [0, 0, 1]]);
    }

    static zeros() {return new Matrix3(NMatrix.zeros(3).toArray());}

    static ones() {return new Matrix3(NMatrix.ones(3).toArray());}

    static eye() {return new Matrix3(NMatrix.eye(3).toArray());}

    static scalar(value) {return new Matrix3(NMatrix.scalar(value, 3).toArray());}

    static nScalar(values) {return new Matrix3(NMatrix.nScalar(values, 3).toArray());}

    static diag(arr) {return new Matrix3(NMatrix.diag(arr).toArray());}

    static nDiag(arr) {return new Matrix3(NMatrix.nDiag(arr).toArray());}
}