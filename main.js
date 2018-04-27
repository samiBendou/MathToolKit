let m = NMatrix.ones(3);
let v = new NVector([1, 2, 3]);
let A = NMatrix.eye(3);

let B = m.cSum(m);
let C = m.cPow(2);

let u = m.cProd(v);

let R = NMatrix.scalar(3, 3);
let U = NMatrix.nScalar([2, 1], 5);

C.print();
m.print();
B.print();
v.print();
u.print();

A.print();

A.shiftRow(1, -1);
A.print();

A = NMatrix.eye(3);
A.shiftCol(1, -1);
A.print();

A = NMatrix.eye(3);
A.setCols([v,v,v]);
A.print();

A = NMatrix.eye(3);
A.setRows([v,v,v]);
A.print();

A = NMatrix.diag([2, 4, 6]);
console.log(A.det());
A.inv().print();
A.solve(v).print();