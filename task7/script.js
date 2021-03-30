// Task 1 

function damagedOrSunk (board, attacks) {

    let result = {
        sunk:0,
        damaged:0,
        notTouched:0,
        points:0
    };
    let ships = {
        1:{size: 0, attacks:0}, 
        2:{size: 0, attacks:0}, 
        3:{size: 0, attacks:0}
    };

    // Reverse board's rows for easier iteration
    board.reverse();
    
    // Create an object of ships
    board.forEach(row => {
        row.forEach(el => {
            if (el == 1 || el == 2 || el == 3) ships[el].size += 1;
        });
    });

    // Count attacks
    attacks.forEach(el => {
        let attackedShip = board[el[1]-1][el[0]-1];
        if (attackedShip !== 0) ships[attackedShip].attacks += 1;
    });

    // Count points
    for (let i = 1; i <= 3; i++) {
        if (ships[i].attacks >= ships[i].size && ships[i].size !== 0) {
            result.sunk += 1;
            result.points += 1;
        };
        if (ships[i].attacks < ships[i].size && ships[i].attacks !== 0) {
            result.damaged += 1;
            result.points += 0.5;
        };
        if (ships[i].attacks == 0 && ships[i].size !== 0) {
            result.notTouched += 1;
            result.points -= 1;
        }
    };

    return result;
};

let board = [[0,0,0,2,2,0],
[0,3,0,0,0,0],
[0,3,0,1,0,0],
[0,3,0,1,0,0]];
let attacks = [[2, 1], [1, 3], [4, 2]];

console.log(damagedOrSunk(board, attacks));