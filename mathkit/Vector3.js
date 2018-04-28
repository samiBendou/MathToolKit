/*
@license        : Dahoux Sami 2018 - © Copyright All Rights Reserved.
@author         : Dahoux Sami
@created        : 28/04/2018
@file           : Vector3.js
@description    : Module inheriting from ENVector
*/

class Vector3 extends ENVector {
    copy() {
        let arr = this.val;
        return new Vector3(arr);
    }

    //3D Coordinate getters
    x()     {return this.val[0];}

    y()     {return this.val[1];}

    z()     {return this.val[2];}

    r()     {return this.norm();}

    rXY()   {return this.x() * this.x() + this.y() * this.y();}

    theta() {return Math.atan2(this.x(), this.y());}

    phi()   {return Math.atan2(this.rXY(), this.z());}


    xYZ()       {return new Vector3(this.val.clone());}

    rThetaZ()   {return new Vector3([this.rXY(), this.theta(), this.z()]);}

    rThetaPhi() {return new Vector3([this.r(), this.theta(), this.phi()]);}


    //3D Coordinates setters
    setX(x) {this.val[0] = x;}

    setY(y) {this.val[1] = y;}

    setZ(z) {this.val[2] = z;}

    setR(r) {this.prod(r / this.norm());}

    setTheta(theta) {
        let rotationMatrix = Matrix3.rotationZ(-this.theta).prod(Matrix3.rotationZ(theta));
        rotationMatrix.prod(this);
    }

    setXYZ(x, y, z) {
        this.val = [x, y, z];
    }

    setRThetaZ(r, theta, h) {
        this.val = [r * Math.cos(theta), r * Math.sin(theta), h];
    }

    setRThetaPhi(r, theta, phi) {
        this.val = [r * Math.sin(phi) * Math.cos(theta), Math.sin(phi) * Math.sin(theta), r * Math.cos(phi)]
    }

    //Geometrical Transforms
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
        let x = this.val[2] * vector.val[3] - this.val[3] * vector.val[2];
        let y = this.val[3] * vector.val[1] - this.val[1] * vector.val[3];
        let z = this.val[1] * vector.val[2] - this.val[2] * vector.val[1];
        return new Vector3([x, y, z]);
    }

    static zeros() {
        return new Vector3(NVector.zeros(3).toArray());
    }

    static ones() {
        return new Vector3(NVector.ones(3).toArray());
    }

    static scalar(x) {
        return new Vector3(NVector.scalar(x, 3).toArray());
    }
}