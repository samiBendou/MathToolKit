/*
@license        : Dahoux Sami 2018 - © Copyright All Rights Reserved.
@author         : Dahoux Sami
@created        : 28/04/2018
@file           : NMatrix.js
@description    : Representation of numerical N x N Matrix vector space. Featuring LU decomposition, classic matrix
                  recognition & generation (lower, upper, diag, eye...), linear systems solving,
                  matrix inversion and determinant, fast exponentiation...

                  Algebraical operations noted with c (cSum) don't modify calling object and return a copy of the
                  result of operation. Other operations (sum, ...) store the result in the calling object.

                  Solving & inversion functions noted with lup (lupInv) take in parameters lu decomposition of the calling
                  matrix. You can get it by using lupDecomposition method. functions such as inv, det, solve calculate
                  LUP decomposition at each call.
 */

class NMatrix extends NPMatrix {
    constructor(arr) {
        super(arr);
    }

    copy() {
        let arr = this.toArray();
        return new NMatrix(arr);
    }

    isDiagonal() {
        for(let i = 0; i < this.nRow; i++) {
            for(let j =0; j < this.nRow; j++) {
                if(i !== j && this.get(i, j) !== 0) {
                    return false;
                }
            }
        }
        return true;
    }

    isUpper() {
        for(let i = 0; i < this.nRow; i++) {
            for(let j = 0; j < i; j++) {
                if(this.get(i, j) !== 0) {
                    return false;
                }
            }
        }
        return true;
    }

    isLower() {
        for(let i = 0; i < this.nRow; i++) {
            for(let j = i + 1; j < this.nRow; j++) {
                if(this.get(i, j) !== 0) {
                    return false;
                }
            }
        }
        return true;
    }

    //Trace of a matrix
    trace() {
        let trace = 0.0;
        for(let i = 0; i < this.nRow; i++) {
            trace += this.get(i, i);
        }
        return trace;
    }

    //Upper part of calling matrix
    upper() {
        let upper = NMatrix.zeros(this.nRow);
        for(let i = 0; i < this.nRow; i++) {
            for(let j = i; j < this.nCol; j++)
                upper.set(i, j, this.get(i, j));
        }
            return upper;
        }

    //Lower part of calling matrix
    lower() {
        let lower = NMatrix.zeros(this.nRow);
        for(let i = 0; i < this.nRow; i++) {
            for(let j = 0; j <= i; j++)
                lower.set(i, j, this.get(i, j));
        }
        return lower;
    }

    //Transpose a matrix
    trans() {
        let trans = this.copy();
        for(let i = 0; i < this.nRow; i++) {
            for(let j = 0; j < this.nCol; j++) {
                trans.set(i, j, this.get(j, i));
            }
        }
        return trans;
    }

    //Natural O(n2) matrix apply to vector.
    vProd(vector) {
        if(this.matchProduct(vector)) {
            let prod = vector.copy();
            prod.fill(0.0);
            for(let i = 0; i < this.nRow; i++) {
                for(let k = 0; k < this.nCol; k++) {
                    prod.val[i] += this.rows[i].val[k] * vector.val[k];
                }
            }
            vector.val = prod.val;
        }
    }

    //Natural O(n3) matrix product algorithm.
    mProd(matrix) {
        if(this.matchProduct(matrix)) {
            let prod = this.copy();
            prod.fill(0.0);
            for(let j = 0; j < this.nCol; j++) {
                for(let i = 0; i < this.nRow; i++) {
                    for(let k = 0; k < this.nCol; k++) {
                        prod.set(i, j, prod.get(i, j) + this.get(i, k) * matrix.get(k, j));
                    }
                }
            }
            this.rows = prod.rows;
        }
    }

    //Power of a matrix using fast exponentiation algorithm
    pow(n) {
        if(n > 1) {
            if(n % 2 === 0) {
                this.pow(this.prod(this), n / 2);
            }
            else if(n % 2 === 1) {
                this.prod(this.pow(this.cProd(this), (n - 1) / 2));
            }
        }
        else if(n === 0){
            this.rows = NMatrix.eye(this.nRow).rows;
        }
    }

    cPow(n) {
        let res = this.copy();
        res.pow(n);
        return res;
    }

    //Inverse of a Square Matrix
    inv() {
        let lu = this.lupDecompositon();
        return this.lupInv(lu);
    }

    //Determianant of a Square Matrix
    det() {
        let lu = this.lupDecompositon();
        return this.lupDet(lu);
    }

    //Solve THIS * X = b returns X as NVector
    solve(b) {
        let lu = this.lupDecompositon();
        return this.lupSolve(lu, b);
    }

    //LUP decomposition of a Matrix
    lupDecompositon() {
        //Returns PA such as PA = LU where P is a row permutation array and A = L + U;
        let i, j, k, iMax;
        let lu = this.copy();
        let permutation = new Array(this.nRow);
        let n = lu.nRow;

        for (i = 0; i <= n; i++)
            permutation[i] = i; //Unit permutation matrix, permutation[i] initialized with i
        if(!this.isUpper() || !this.isLower) {
            for (i = 0; i < n; i++) {
                iMax = lu.maxAbsIndexCol(i, i);
                if (Math.abs(lu.get(iMax, i)) > Number.EPSILON) { //matrix is not degenerate
                    if (iMax !== i) {
                        i = permutation[i];

                        permutation[i] = permutation[iMax];

                        lu.swap(i, iMax);
                        //counting pivots starting from this.nRow (for determinant)
                        permutation[i]++;
                    }
                }
                for (j = i + 1; j < n; j++) {
                    if(lu.get(i, i) < Number.EPSILON) {
                        return undefined;
                    }
                    lu.set(j, i, lu.get(j, i) / lu.get(i, i));
                    for (k = i + 1; k < n; k++) {
                        lu.set(j, k, lu.get(j, k) - lu.get(j, i) * lu.get(i, k));

                    }
                }
            }
            return {a : lu, p : permutation};
        }
        else {
            return {a : lu, p : permutation};
        }
    }

    //Return L and U matrix
    lupMatrix() {
        let lu = this.lupDecompositon();
        let l = lu.a.lower();
        let u = lu.a.upper();
        for(let i = 0; i < this.nRow; i++) {
            l.set(i, i, 1.0);
        }
        return [l, u];
    }

    lupInv(lu) {
        let inv = NMatrix.zeros(this.nRow);
        if(lu !== undefined) {
            for (let j = 0; j < this.nRow; j++) {
                for (let i = 0; i < this.nRow; i++) {
                    if (lu.p[i] === j)
                        inv.set(i, j, 1.0);
                    else
                        inv.set(i, j, 0.0);

                    for (let k = 0; k < i; k++)
                        inv.set(i, j,  inv.get(i, j) - lu.a.get(i, k) * inv.get(k, j));
                }

                for (let i = this.nRow - 1; i >= 0; i--) {
                    for (let k = i + 1; k < this.nRow; k++)
                        inv.set(i, j, inv.get(i, j) - lu.a.get(i, k) * inv.get(k, j));

                    inv.set(i, j, inv.get(i, j) / lu.a.get(i, i));
                }
            }
            return inv;
        }
        else {
            return undefined;
        }
    }

    lupDet(lu) {
        if(lu !== undefined) {
            let det = lu.a.get(0, 0);
            for(let i = 1; i < this.nRow; i++) {
                det *= lu.a.get(i, i);
            }
            return ((lu.p[this.nRow] - this.nRow) % 2 === 0) ? det : -det;
        }
        else {
            return 0;
        }
    }

    lupSolve(lu, b) {
        if(this.nRow === b.dim && lu !== undefined) {
            let x = NVector.zeros(this.nRow);
            for(let i = 0; i < this.nRow; i++) {
                x.val[i] = b.val[lu.p[i]];

                for (let k = 0; k < i; k++)
                    x.val[i] -= lu.a.get(i, k) * x.val[k];
            }

            for (let i = this.nRow - 1; i >= 0; i--) {
                for (let k = i + 1; k < this.nRow; k++)
                    x.val[i] -= lu.a.get(i, k) * x.val[k];

                x.val[i] = x.val[i] / lu.a.get(i, i);
            }
            return x;
        }
        else {
            return undefined;
        }
    }

    static zeros(n) {
        return new NMatrix(NPMatrix.zeros(n , n).toArray());
    }

    static ones(n) {
        return new NMatrix(NPMatrix.ones(n , n).toArray());
    }

    //Returns Identity Matrix
    static eye(n) {
        let eye = NMatrix.zeros(n);
        for(let i = 0; i < n; i++) {
            eye.set(i, i, 1);
        }
        return eye;
    }

    //Returns a scalar Matrix filled with value
    static scalar(value, n) {
        return NMatrix.diag(Array.apply(null, Array(n)).map(Number.prototype.valueOf, value));
    }

    //Returns a n-scalar Matrix filled with values. If values.length = 2, the matrix is tri-diagonal. and values[1] is
    //the value of the diagonal.
    static nScalar(values, n) {
        let diags = Array(2 * values.length - 1);
        let size = 1;
        let minSize = n - values.length;
        for(let l = 0; l < values.length; l++) {
            diags[l] = Array.apply(null, Array(size + minSize)).map(Number.prototype.valueOf, values[l]);
            if(l > 0) {
                diags[l + values.length - 1] = Array.apply(null, Array(n - size + 1)).map(Number.prototype.valueOf, values[values.length - l - 1]);
            }
            size++;
        }
        return NMatrix.nDiag(diags);
    }

    //Returns diagonal matrix filled with arr Array
    static diag(arr) {
        let dim = arr.length;
        let diag = NMatrix.zeros(dim);
        for(let i = 0; i < dim; i++) {
            diag.set(i, i, arr[i]);
        }
        return diag;
    }

    //Returns a n-diagonal matrix filled with arr bi-dimensional array : arr[l] is the values of coefficients of the l-th
    //diagonal from the left. arr[middle] is the values of coefficients on the diagonal.
    static nDiag(arr) {
        let n = arr.length;
        let middle = (n - 1) / 2;
        let dim = arr[middle].length;
        let diag = NMatrix.zeros(dim);

        for(let l = -middle; l <= middle; l++) {
            for(let k = 0; k < dim - Math.abs(l); k++) {
                if(l < 0) {
                    diag.set(k - l, k, arr[l + middle][k]);
                }
                else {
                    diag.set(k , k + l, arr[l + middle][k]);
                }
            }
        }
        return diag;
    }
}

