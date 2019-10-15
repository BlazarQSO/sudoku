module.exports = function solveSudoku(matrix) {
    let n = matrix[0].length;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] == 0) {
                matrix[i][j] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            } else {
                let temp = matrix[i][j];
                matrix[i][j] = [temp];
            }
        }
    }
    
    while (matrix.join("").length > 153) {

        let region = new Array(3);
        for (let q = 0; q < region.length; q++) {
            region[q] = new Array(3);
        }
        for (let k1 = 0; k1 < 3; k1++) {
            for (let k2 = 0; k2 < 3; k2++) {
                let item = "";
                for (let i = k1 * 3; i < k1 * 3 + 3; i++) {
                    for (let j = k2 * 3; j < k2 * 3 + 3; j++) {
                        if (matrix[i][j].length == 1) {
                            item += matrix[i][j][0];
                        }
                    }
                }
                region[k1][k2] = item;
            }
        }

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {

                if (matrix[i][j].length > 1) {

                    let row = "";
                    for (let r = 0; r < n; r++) {
                        if (matrix[i][r].length == 1) {
                            row += matrix[i][r][0];
                        }
                    }

                    let colm = "";
                    for (let c = 0; c < n; c++) {
                        if (matrix[c][j].length == 1) {
                            colm += matrix[c][j][0];
                        }
                    }

                    let x = Math.trunc(j / 3);
                    let y = Math.trunc(i / 3);
                    let allNumbers = region[y][x] + row + colm;

                    for (let d = 0; d < allNumbers.length; d++) {
                        if (matrix[i][j].toString().includes(allNumbers[d])) {
                            let index = matrix[i][j].indexOf(Number(allNumbers[d]));
                            matrix[i][j].splice(index, 1);
                        }
                    }
                }

            }
        }
    }
    let matrix2 = new Array(9);
    for (let q = 0; q < region.length; q++) {
         matrix2[q] = new Array(9);
    }
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            matrix2[i][j] = matrix[i][j][0];
        }
    }

    return matrix2;
}
