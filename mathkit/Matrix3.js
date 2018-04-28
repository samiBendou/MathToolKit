/*
@license        : Dahoux Sami 2018 - © Copyright All Rights Reserved.
@author         : Dahoux Sami
@created        : 28/04/2018
@file           : Matrix3.js
@description    :
 */

class Matrix3 extends NMatrix {
    copy() {
        let arr = this.val.clone();
        return new Matrix3(arr);
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

}