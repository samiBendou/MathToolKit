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
        let dif = this.sub(vector);
        return new ENVector(dif.toArray()).norm();
    }

    copy() {
        let arr = this.val;
        return new ENVector(arr);
    }
}