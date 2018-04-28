/*
@license        : Dahoux Sami 2018 - © Copyright All Rights Reserved.
@author         : Dahoux Sami
@created        : 28/04/2018
@file           : Vector3.js
@description    : Module inheriting from ENVector representing 3D Euclidean space. Featuring cross product, coordinate
                  transforms and rotations.

                  - X, Y, Z       : Cartesian coordinates.

                  - R, THETA, Z   : Cylindrical coordinates.   |R       = RXY = sqrt(x2 + y2),
                                                               |THETA   = atan(y / x)
                                                               |Z       = z

                  - R, THETA, PHI : Spherical coordinates.     |R       = sqrt(x2 + y2 + z2),
                                                               |THETA   = atan(y / x),
                                                               |PHI     = atan(RXY / Z)
*/

class Vector3 extends ENVector {
    constructor(arr) {
        if(arr.length === 3) {
            super(arr);
        }
    }

    copy() {
        let arr = this.val.clone();
        return new Vector3(arr);
    }

    //3D COORDINATES GETTERS
    x()     {return this.val[0];}

    y()     {return this.val[1];}

    z()     {return this.val[2];}

    r()     {return this.norm();}

    rXY()   {return new Vector3([this.x(), this.y(), 0.0]);}

    theta() {return Math.atan2(this.y(), this.x());}

    phi()   {return Math.atan2(this.rXY().r(), this.z());}


    xYZ()       {return new Vector3(this.val.clone());}

    rThetaZ()   {return new Vector3([this.rXY().r(), this.theta(), this.z()]);}

    rThetaPhi() {return new Vector3([this.r(), this.theta(), this.phi()]);}


    //3D COORDINATES SETTERS
    setX(x) {this.val[0] = x;}

    setY(y) {this.val[1] = y;}

    setZ(z) {this.val[2] = z;}

    setXYZ(x, y, z) {this.val = [x, y, z];}

    setR(r) {this.prod(r / this.r());}

    setTheta(theta) {this.setRThetaZ(this.r(), theta, this.z());}

    setPhi(phi) {this.setRThetaPhi(this.r(), this.theta(), phi);}

    setRThetaZ(r, theta, z) {this.val = [r * Math.cos(theta), r * Math.sin(theta), z];}

    setRThetaPhi(r, theta, phi) {
        this.val = [r * Math.sin(phi) * Math.cos(theta),
                    Math.sin(phi) * Math.sin(theta),
                    r * Math.cos(phi)]
    }

    //GEOMETRICAL TRANSFORMATIONS
    rotateAround(axis, theta) {
        let rotationMatrix = Matrix3.rotationAround(axis, theta);
        rotationMatrix.prod(this);
    }

    rotateX(theta) {
        let rotationMatrix = Matrix3.rotationX(theta);
        rotationMatrix.prod(this);
    }
    rotateY(theta) {
        let rotationMatrix = Matrix3.rotationY(theta);
        rotationMatrix.prod(this);
    }
    rotateZ(theta) {
        let rotationMatrix = Matrix3.rotationZ(theta);
        rotationMatrix.prod(this);
    }


    cross(vector) {
        let x = this.y() * vector.z() - this.z() * vector.y();
        let y = this.z() * vector.x() - this.x() * vector.z();
        let z = this.x() * vector.y() - this.y() * vector.x();
        this.val = [x, y, z];
    }

    cCross(vector) {
        let res = this.copy();
        res.cross(vector);
        return res;
    }

    static zeros() {return new Vector3(NVector.zeros(3).toArray());}

    static ones() {return new Vector3(NVector.ones(3).toArray());}

    static scalar(x) {return new Vector3(NVector.scalar(x, 3).toArray());}

    static canonical(k) {return new Vector3(NVector.canonical(k, 3).toArray());}
}