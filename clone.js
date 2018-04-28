Array.prototype.clone = function() {
    let newThis = new Array(this.length);
    for(let k = 0; k < newThis.length; k++) {
        newThis[k] = this[k];
    }
    return newThis;
};