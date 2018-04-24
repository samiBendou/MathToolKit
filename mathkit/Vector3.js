class Vector3 extends ENVector {
    copy() {
        let arr = this.val;
        return new Vector3(arr);
    }

    cross(vector) {
        let x = this.val[2] * vector.val[3] - this.val[3] * vector.val[2];
        let y = this.val[3] * vector.val[1] - this.val[1] * vector.val[3];
        let z = this.val[1] * vector.val[2] - this.val[2] * vector.val[1];
        return new Vector3([x, y, z]);
    }


}