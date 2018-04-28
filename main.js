////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//NVector Test

const dim = 3;
const angle = Math.PI / 2;


let vector1 = new ENVector([1, 0, 0]);
let vector2 = new ENVector([0, 1, 0]);
let scalar = 10;

console.log("***NVector TESTS***");

console.log("Vector 1 :");
vector1.print();
console.log("Vector 2 :");
vector2.print();

console.log("Sum :");
vector1.cSum(vector2).print();

console.log("Sub :");
vector1.cSub(vector2).print();

console.log("Product with " + scalar);
vector1.cProd(scalar).print();

console.log("Swap Test :");
vector1.set(0, 6);
vector1.swap(0, 1);
vector1.print();


console.log("Fill Test :");
vector1.fill(5);
vector1.print();

console.log("***NVector TESTS***");
console.log("Scalar Product : " + vector1.dot(vector2));
console.log("Norm of vector1 :" + vector1.norm());
console.log("Distance between 1 & 2 : " + vector1.dist(vector2));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//NPMatrix Test

let matrix1 = NPMatrix.ones(3, 3);
let matrix2 = NPMatrix.ones(3, 3);
let matrix3 = NPMatrix.ones(3, 3);

console.log("***NPMAtrix TESTS***");

console.log("Matrix 1 :");
matrix1.print();
console.log("Matrix 2 :");
matrix2.print();
console.log("Matrix 3 :");
matrix3.print();

console.log("Sum 1 + 2 : ");
matrix1.cSum(matrix2).print();

console.log("Sub 1 + 2 : ");
matrix1.cSub(matrix2).print();

console.log("Extern product with " + scalar);
matrix2.cProd(scalar).print();

console.log("Extern product with " + 3 * scalar);
matrix2.cProd(3 * scalar).print();

console.log("Prod 1 x 2 : ");
matrix1.cProd(matrix2).print();

console.log("Linear apply Mat1 x Vect2 : ");
matrix1.cProd(vector2).print();

let matrixCol = NPMatrix.ones(3, 1);
let matrixRaw = NPMatrix.ones(1, 3);

console.log('Matrix product tests');
matrixCol.cProd(matrixRaw).print();
matrixRaw.cProd(matrixCol).print();

console.log("Transposition tests");
matrixCol.trans().print();
matrixRaw.trans().print();


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//NField Test


let opp = function(vector) {
    return vector.cOpp();
};

console.log("***NField TESTS***");

console.log("Field f : x -> -x. Value in vector 1");
let f = new NField(opp, 3, 3);
f.value(vector1).print();


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Vector3 Test

let vector3D1 = new Vector3([1, 0, 0]);
let vector3D2 = new Vector3([0, 1, 0]);
let vector3D3 = new Vector3([0, 0, 1]);

console.log("***Vector3 TESTS***");
console.log("Vector 1 :");
vector3D1.print();
console.log("Vector 2 :");
vector3D2.print();
console.log("Vector 3 :");
vector3D3.print();

console.log("Cross product 1 x 2");
vector3D1.cCross(vector3D2).print();

console.log("Norm of vectors");
console.log("(1) : " + vector3D1.r());
console.log("(2) : " + vector3D2.r());
console.log("(3) : " + vector3D3.r());

console.log("Theta of vectors");
console.log("(1) : " + vector3D1.theta());
console.log("(2) : " + vector3D2.theta());
console.log("(3) : " + vector3D3.theta());

console.log("Phi of vectors");
console.log("(1) : " + vector3D1.phi());
console.log("(2) : " + vector3D2.phi());
console.log("(3) : " + vector3D3.phi());

/*
console.log("Rotation X function");
console.log("Vector 1 :");
vector3D1.rotateX(angle);
vector3D1.print();

console.log("Vector 2 :");
vector3D2.rotateX(angle);
vector3D2.print();

console.log("Vector 3 :");
vector3D3.rotateX(angle);
vector3D3.print();

console.log("Rotation Y function");
console.log("Vector 1 :");
vector3D1.rotateY(angle);
vector3D1.print();

console.log("Vector 2 :");
vector3D2.rotateY(angle);
vector3D2.print();

console.log("Vector 3 :");
vector3D3.rotateY(angle);
vector3D3.print();


console.log("Rotation Z function");
console.log("Vector 1 :");
vector3D1.rotateZ(angle);
vector3D1.print();

console.log("Vector 2 :");
vector3D2.rotateZ(angle);
vector3D2.print();

console.log("Vector 3 :");
vector3D3.rotateZ(angle);
vector3D3.print();


console.log("Set Theta Test");
console.log("Vector 1 :");
vector3D1.setTheta(angle);
vector3D1.print();

console.log("Vector 2 :");
vector3D2.setTheta(angle);
vector3D2.print();

console.log("Vector 3 :");
vector3D3.setTheta(angle);
vector3D3.print();


console.log("Set Phi Test");
console.log("Vector 1 :");
vector3D1.setPhi(angle);
vector3D1.print();

console.log("Vector 2 :");
vector3D2.setPhi(angle);
vector3D2.print();

console.log("Vector 3 :");
vector3D3.setPhi(angle);
vector3D3.print();
*/

console.log("Rotate Around Test");
console.log("Vector 1 around y :");
vector3D1.rotateAround(Vector3.canonical(1), angle);
vector3D1.print();
console.log("Vector 2 around x :");
vector3D2.rotateAround(Vector3.canonical(0), angle);
vector3D2.print();
console.log("Vector 2 around x :");
vector3D2.rotateAround(Vector3.canonical(0), angle);
vector3D2.print();