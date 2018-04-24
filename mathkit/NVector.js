class NVector {
    constructor(arr) {
        this.dim = arr.length;
        this.val = arr;
    }

    print() {
        console.log(this.toString());
    }

    toString() {
        let str = '( ' +  this.val[0].toFixed(2);
        for(let k = 1; k < this.dim; k++) {
            str += '  ' + this.val[k].toFixed(2);
        }
        str += ' )';
        return str;
    }

    toArray() {
        return this.val;
    }

    copy() {
        let arr = this.val.slice();
        return new NVector(arr);
    }

    get(k) {
        return this.validIndex(k) ? this.val[k] : undefined;
    }

    set(k, value) {
        if (this.validIndex(k)) this.val[k] = value;
    }

    validIndex(k) {
        return k >= 0 && k < this.dim;
    }

    matchDim(vector) {
        return this.dim === vector.dim;
    }

    sum(vector) {
        if(this.matchDim(vector)) {
            for(let k = 0; k < this.dim; k++) {
                this.val[k] += vector.val[k];
            }
        }
    }

    cSum(vector) {
        let res = this.copy();
        res.sum(vector);
        return res;
    }

    prod(scalar) {
        for(let k = 0; k < this.dim; k++){
            this.val[k] = scalar * this.val[k];
        }
    }

    cProd(scalar) {
        let res = this.copy();
        res.prod(scalar);
        return res;
    }

    opp() {
        this.prod(-1.0);
    }

    cOpp() {
        let res = this.copy();
        res.opp();
        return opp;
    }

    sub(vector) {
        this.sum(vector.opp());
    }

    cSub(vector) {
        let res = this.copy();
        res.sub();
        return opp;
    }

    swap(k1, k2) {
        if(this.validIndex(k1) && this.validIndex(k2)) {
            let temp = this.val[k1];
            this.val[k1] = this.val[k2];
            this.val[k2] = temp;
        }
    }

    maxAbsIndex(r) {
        let max = 0.0;
        let k;
        if(this.validIndex(r)) {
            for(let i = r || 0; i < this.dim; i++) {
                if(Math.abs(this.val[i]) >= max) {
                    max = Math.abs(this.val[i]);
                    k   = i;
                }
            }
            return k;
        }
    }

    fill(value) {
        this.val = Array.apply(null, Array(this.dim)).map(Number.prototype.valueOf, value);
    }

    static zeros(n) {
        let arr = Array.apply(null, Array(n)).map(Number.prototype.valueOf, 0.0);
        return new NVector(arr);
    }

    static ones(n) {
        let ones = NVector.zeros(n);
        for(let k = 0; k < n; k++) {
            ones.val[k] += 1.0;
        }
        return ones;
    }
}