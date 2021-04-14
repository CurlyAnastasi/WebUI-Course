/* Task 3.
Function counts the area of each triangle and returns
sorted array of squares from the largest to smallest.
Input: array of objects with 4 params: vertices, and sizes.
Output: sorted array of triangles names;
*/

export function sortTriangles(arr) {
    let sidesNames = [];
    let sidesValues = [];
    let p = 0;
    let sortedArr = [];

    // Validation

    // check that it is an array
    if (!Array.isArray(arr)) return {status: 'failed', reason: instructions('Not array')};

    
    for (let triangle of arr) {

        // check that verticles have got 3 letters and is it a string
        if (typeof triangle.vertices !== 'string' || triangle.vertices.length !== 3 || triangle.vertices.match(/\d/)) {
            return {status: 'failed', reason: instructions('Vertice is uncorrect')};
        };

        // check that names of sides are correct and their values are positive numbers
        sidesNames = triangle.vertices.toLowerCase().split('');

        if (sidesNames.some(el => triangle[el] < 1 || typeof triangle[el] !== 'number' || !triangle.hasOwnProperty(el))) {
            return {status: 'failed', reason: instructions('Not a number')};
        };

        // check that all sides are correct
        sidesValues = sidesNames.map(el => triangle[el]);
        if (sidesValues[2] > sidesValues[0] + sidesValues[1] || sidesValues[1] > sidesValues[0] + sidesValues[2] || sidesValues[0] > sidesValues[1] + sidesValues[2]) {
            return {status: 'failed', reason: instructions('Unvalid sides')};
        };
    };

    // Count square of each triangle
    for (let triangle of arr) {
        sidesNames = triangle.vertices.toLowerCase().split('');
        sidesValues = sidesNames.map(el => triangle[el]);
        p = (sidesValues[0] + sidesValues[1] + sidesValues[2]) / 2;
        triangle.square = Math.sqrt(p * (p - sidesValues[0]) * (p - sidesValues[1]) * (p - sidesValues[2]));
    };
    
    sortedArr = arr.sort((a, b) => a.square - b.square).map(el => el.vertices);

    return sortedArr;
};

function instructions(name) {
    switch (name) {
        case 'Not array': return 'Unvalid type of params. Should be an array';
        case 'Vertice is uncorrect': return 'Unvalid params in triangle. Three vertices are needed. Name of vertice includes 3 letters';
        case 'Not a number': return 'Unvalid type of params in triangle. Must be a positive number. And names of sides are simillar to vertices';
        case 'Unvalid sides': return 'Unvalid params of side in triangle. Unposible to create a triangle with such sides';
    };
};

// console.log(sortTriangles([{ vertices: 'ABC', a: 10, b: 20,c: 22.36}, {vertices: 'BCD', b: 5, c:10, d: 15.3}, {vertices: 'DEF', d: 5, e:10, f: 15.3}]));
// console.log(sortTriangles([{ vertices: 'ABC', b: 10, b: 20,c: 22.36}, {vertices: 'BCD', b: 6, c:10, d: 15.3}, {vertices: 'DEF', d: 10, e:10, f: 15.3}]));
// console.log(sortTriangles([{ vertices: 'ABC', a: 10, b: 15, c: 22},{ vertices: 'CDE', e: 10, c: 20, d: 22.36},{ vertices: 'CDE', e: 5, c: 5, d: 5},{ vertices: 'FGH', f: 50, g: 25, h: 50}]));