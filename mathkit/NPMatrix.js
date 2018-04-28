/*
@license        : Dahoux Sami 2018 - © Copyright All Rights Reserved.
@author         : Dahoux Sami
@created        : 28/04/2018
@file           : NPMatrix.js
@description    : Representation of numerical N x P Matrix vector space. Featuring algebraical operations,
                  setters & getters, swappers and classic matrix generator such as ones, zeros...
                  The matrix is stored by rows. Each row of a matrix is a NVector.

                  Algebraical operations noted with c (cSum) don't modify calling object and return a copy of the
                  result of operation. Other operations (sum, ...) store the result in the calling object.
 */

class NPMatrix {
    constructor(arr) {
        this.nRow = arr.length;                                         //Number of rows in matrix
        this.nCol = (arr[0].length !== undefined) ? arr[0].length : 1;  //Number of columns in matrix
        this.rows   = [];                                               //Rows of matrix, array of NVector

        for(let i = 0; i < this.nRow; i++) {
            this.rows.push(new NVector(arr[i].clone())); //Array is hard copied at construction
        }
    }

    print() {
        console.log(this.toString());
    }

    toString() {
        let str = '\n' + this.rows[0].toString();
        for(let i = 1; i < this.nRow; i++) {
            str += '\n' + this.rows[i].toString();
        }
        str += '\n';
        return str;
    }

    //Return JavaScript two-dimensional numeric Array
    toArray() {
        let arr = new Array(this.nRow);
        for(let i = 0; i < this.nRow; i++) {
            arr[i] = new Array(this.nCol);
            for(let j = 0; j < this.nCol; j++) {
                arr[i][j] = this.get(i, j);
            }
        }
        return arr;
    }

    //Hard copy of a matrix.
    copy() {
        let arr = this.toArray();
        return new NPMatrix(arr);
    }

    fill(value) {
        for(let i = 0; i < this.nRow; i++)
            this.rows[i].fill(value);
    }

    //CHARACTERIZATION OF MATRIX

    isSquare() {
        return this.nRow === this.nCol;
    }

    validRowIndex(i) {
        return i >= 0 && i < this.nRow && i >= 0 && i < this.nRow;
    }

    validColIndex(j) {
        return j >= 0 && j < this.nCol && j >= 0 && j < this.nCol;
    }

    validIndex(i, j) {
        return this.validRowIndex(i) && this.validColIndex(j);
    }

    matchSize(matrix) {
        return this.nRow === matrix.nRow && this.nCol === matrix.nCol;
    }

    //Check if two matrix can be multiplied.
    matchProduct(matrix) {
        if(matrix.nRow !== undefined)
            return this.nCol === matrix.nRow;
        else if(matrix.dim !== undefined)
            return this.nCol === matrix.dim;
    }

    //VECTOR SPACE OPERATIONS (see NVector.js for more details)
    sum(matrix) {
        if(this.matchSize(matrix)) {
            for(let i = 0; i < this.nRow; i++) {
                this.rows[i].sum(matrix.rows[i]);
            }
        }
    }

    cSum(matrix) {
        let res = this.copy();
        res.sum(matrix);
        return res;
    }


    opp() {
        this.sProd(-1.0);
    }

    cOpp() {
        let res = this.copy();
        res.opp();
        return res;
    }

    sub(matrix) {
        let newMatrix = matrix.cOpp();
        this.sum(newMatrix);
    }

    cSub(matrix) {
        let res = this.copy();
        res.sub(matrix);
        return res;
    }

    sProd(scalar) {
        for(let i = 0; i < this.nRow; i++){
            this.rows[i].prod(scalar);
        }
        return this;
    }

    //ALEGEBRICAL OPERATIONS

    //Natural O(n2) matrix apply to vector.
    vProd(vector) {
        let prod = NPMatrix.zeros(this.nRow, 1);
        prod.setCol(0, vector);
        prod = this.cProd(prod);

        vector.dim = prod.nRow;
        vector.val = prod.col(0).val;
    }

    mProd(matrix) {
        if(this.matchProduct(matrix)) {
            let prod = NPMatrix.zeros(this.nRow, matrix.nCol);
            for(let j = 0; j < matrix.nCol; j++) {
                for(let i = 0; i < this.nRow; i++) {
                    for(let k = 0; k < this.nCol; k++) {
                        prod.set(i, j, prod.get(i, j) + this.get(i, k) * matrix.get(k, j));
                    }
                }
            }
            this.nRow = prod.nRow;
            this.nCol = prod.nCol;
            this.rows = prod.rows;
        }
    }

    //Product function selector.
    prod(element) {
        if(element.dim !== undefined)       //Element is a vector
            this.vProd(element);
        else if(element.nRow !== undefined) //Element is a matrix
            this.mProd(element);
        else //Element is a scalar
            this.sProd(element);
    }

    cProd(element) {
        if(element.dim !== undefined) { //Element is a vector
            let res = element.copy();
            this.prod(res);
            return res;
        }
        else {                          //Element is a matrix or a scalar
            let res = this.copy();
            res.prod(element);
            return res;
        }
    }

    //Transpose a matrix
    trans() {
        let trans = NPMatrix.zeros(this.nCol, this.nRow);
        for(let i = 0; i < this.nRow; i++) {
            for(let j = 0; j < this.nCol; j++) {
                trans.set(j, i, this.get(i, j));
            }
        }
        return trans;
    }

    //Get a shifted matrix according to Gauss Jordan algorithm.
    //  Shifted = [THIS | MATRIX] where Shifted is a N x (PThis + PMatrix)
    shifted(matrix) {
        let shifted = NPMatrix.zeros(this.nRow, matrix.nCol + this.nCol);
        for(let i = 0; i < this.nRow; i++) {
            for(let j = 0; j < this.nCol; j++) {
                shifted.set(i, j, this.get(i, j))
            }

            for(let j = this.nCol; j < matrix.nCol + this.nCol; j++) {
                shifted.set(i, j, matrix.get(i, j - this.nCol));
            }
        }
        return shifted;
    }

    //Apply Gauss Jordan elimination algorithm
    reduced() {
        let reduced = this.copy();
        let r = 0, k, i, j;
        let spin;
        for(j = 0; j < reduced.nCol; j++) {
            k = this.maxAbsIndexCol(j, r);
            if(Math.abs(reduced.get(k, j)) > Number.EPSILON) {
                reduced.rows[k] = reduced.rows[k].prod(1.0 / reduced.get(k, j));
                reduced.swapRow(k, r);
                spin = reduced.rows[r];
                for(i = 0; i < reduced.nRow; i++) {
                    if(i !== r) {
                        reduced.rows[i] = reduced.rows[i].sub(spin.prod(reduced.get(i, j)));
                    }
                }
                r++;
            }
        }
        return reduced;
    }


    //GETTERS OF MATRIX
    get(i, j) {
        if(this.validIndex(i, j)) {
            return this.rows[i].val[j];
        }
    }

    row(i) {
        if(this.validRowIndex(i)) {
            return this.rows[i].copy();
        }
    }

    getRows(i1, i2) {
        let start = i1 || 0;
        let end = i2 || this.nRow;
            if(end - start >= 0) {
                let arr = new Array(end-start + 1);
                for(let i = start; i <=end; i++) {
                    arr[i] = this.row(i);
                }
                return arr;
            }
    }

    col(j) {
        if(this.validColIndex(j)) {
            let col = NVector.zeros(this.nRow);
            for(let k = 0; k < this.nRow; k++) {
                col.set(k, this.rows[k].val[j]);
            }
            return col;
        }
    }

    getCols(j1, j2) {
        let start = j1 || 0;
        let end = j2 || nRow;
        if(end - start >= 0) {
            let arr = new Array(end - start + 1);
            for(let j = start; j <= end; j++) {
                arr[j] = this.col(j);
            }
            return arr;
        }
    }

    subMatrix(i1, j1, i2, j2) {
      if(this.validIndex(i1, j1) && this.validIndex(i2, j2)) {
          if(i2 >= i1 && j2 >= j1) {
              let subMatrix = NPMatrix.zeros(i2 - i1, j2 - j1);
              for(let i = i1; i <= i2; i++) {
                  for(let j = j1; j <= j2; j++) {
                      subMatrix.set(i, j, this.get(i, j));
                  }
              }
              return subMatrix;
          }
      }
    }

    maxAbsIndexRow(i, r) {
        let row = this.rows[i];
        return  row.maxAbsIndex(r);
    }

    maxAbsIndexCol(j, r) {
        let col = this.col(j);
        return col.maxAbsIndex(r);
    }

    //SETTERS OF MATRIX
    set(i, j, value) {
        if(this.validIndex(i, j)) {
            this.rows[i].val[j] = value;
        }
    }

    setRow(i, vector) {
        if(this.validRowIndex(i) && vector.dim === this.nCol) {
            this.rows[i] = vector.copy();
        }
    }

    setRows(vectors, i) {
        let start = i || 0;
        let end = start + vectors.length - 1;
        for(let i = start; i <= end; i++) {
            this.setRow(i, vectors[i]);
        }
    }

    setCol(j, vector) {
        if(this.validColIndex(j) && vector.dim === this.nRow) {
            for(let i = 0; i < this.nRow; i++) {
                this.rows[i].val[j] = vector.val[i];
            }
        }
    }

    setCols(vectors, j) {
        let start = j || 0;
        let end = start + vectors.length - 1;
        for(let j = start; j <= end; j++) {
            this.setCol(j, vectors[j]);
        }
    }

    setSubMatrix(i1, j1, matrix) {
        let i2 = i1 + matrix.nRow - 1;
        let j2 = j1 + matrix.nCol - 1;
        if(this.validIndex(i1, j1) && this.validIndex(i2, j2)) {
            for(let i = i1; i <= i2; i++) {
                for(let j = j1; j <= j2; j++) {
                    this.set(i, j, matrix.get(i - i1, j - j1));
                }
            }
        }
    }

    //SWAP, SHIFTS & SUBS
    swap(i1, j1, i2, j2) {
        if(this.validIndex(i1, j1) && this.validIndex(i2, j2)) {
            let temp = this.get(i1 ,j1);
            this.set(i1, j1, this.get(i2, j2));
            this.set(i2, j2, temp);
        }
    }

    swapRow(i1, i2) {
        if(this.validRowIndex(i1) && this.validRowIndex(i2)) {
            let temp = this.rows[i2];
            this.rows[i2] = this.rows[i1];
            this.rows[i1] = temp;
        }
    }

    swapCol(j1, j2) {
        if(this.validRowIndex(j1) && this.validRowIndex(j2)) {
            let temp = this.col(j2);
            this.setCol(j2, this.col(j1));
            this.setCol(j1, temp);
        }
    }

    //SHIFTS : Shifts a row/column iterations times. If iterations is < 0 than the shift direction changes.
    //         Else Shift Row moves rows downward and ShiftCol moves columns leftward.
    shiftRow(i, iterations) {
        let n = iterations % this.nRow;
        let temp = this.row(i);
        let index;
        for(let j = 0; j < this.nCol; j++) {
            index = (j + n) % this.nCol;
            index = (index < 0) ? index + this.nCol : index;
            temp.set(j, this.rows[i].get(index));
        }
        this.rows[i] = temp;
    }

    shiftCol(j, iterations) {
        let n = iterations % this.nCol;
        let temp = this.col(j);
        let index;
        for(let i = 0; i < this.nRow; i++) {
            index = (i + n) % this.nRow;
            index = (index < 0) ? index + this.nRow : index;
            temp.set(i, this.col(j).get(index));
        }
        this.setCol(j, temp);
    }

    //STATIC METHODS
    static zeros(n, p) {
        let arr = new Array(n);
        for(let i = 0; i < n; i++) {
            arr[i] = Array.apply(null, Array(p)).map(Number.prototype.valueOf, 0.0);
        }
        return new NPMatrix(arr);
    }

    static ones(n, p) {
        let ones = NPMatrix.zeros(n, p);
        for(let i = 0; i < n; i++) {
            for(let j = 0; j< p; j++) {
                ones.set(i, j, 1.0);
            }
        }
        return ones;
    }
}