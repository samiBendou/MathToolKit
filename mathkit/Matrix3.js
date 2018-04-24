class Matrix3 extends NMatrix {
    static rotationX(theta) {
        return new NMatrix([[1, 0, 0],
                            [0, Math.cos(theta),-Math.sin(theta)],
                            [0, Math.sin(theta),Math.cos(theta)]]);
    }

    static rotationY(theta) {
        return new NMatrix([[Math.cos(theta), 0, Math.sin(theta)],
                            [0, 1, 0],
                            [-Math.sin(theta), 0,Math.cos(theta)]]);
    }

    static rotationZ(theta) {
        return new NMatrix([[Math.cos(theta), -Math.sin(theta), 0],
                            [Math.sin(theta), Math.cos(theta), 0],
                            [0, 0, 1]]);
    }
    copy() {
        let arr = this.val;
        return new Matrix3(arr);
    }
}