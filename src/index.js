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

    let globalCheck = 0;
    let globMatrix = new Array(9);
    for (let g = 0; g < 9; g++) {
        globMatrix[g] = new Array(9);
    }
    let oneCheck = true;
    let globIndex = 0;
    let stop = 0;
    while (matrix.join("").length > 153) {
        stop++;
        if (stop > 10000) {
            break;
        }
        if (matrix.join(",").includes(",,")) {
            for (let g = 0; g < 9; g++) {
                for (let gg = 0; gg < 9; gg++) {
                    let temp = [];
                    for (let h = 0; h < globMatrix[g][gg].length; h++) {
                        let s = globMatrix[g][gg][h];
                        temp.push(s);
                    }
                    matrix[g][gg] = temp;
                }
            }
            globIndex++;
            globalCheck = 0;
        }

        if (globalCheck != matrix.join("").length) {
            globalCheck = matrix.join("").length;
        } else {
            if (oneCheck) {
                for (let g = 0; g < 9; g++) {
                    for (let gg = 0; gg < 9; gg++) {
                        let temp = [];
                        for (let h = 0; h < matrix[g][gg].length; h++){
                            let s = matrix[g][gg][h];
                            temp.push(s);
                        }
                        globMatrix[g][gg] = temp;
                    }
                }
                oneCheck = false;
            }
            for (let k1 = 0; k1 < 3; k1++) {
                let brk = false;
                let count = 0;
                for (let k2 = 0; k2 < 3; k2++) {                            
                    for (let i = k1 * 3; i < k1 * 3 + 3; i++) {                                
                        for (let j = k2 * 3; j < k2 * 3 + 3; j++) {                                    
                            if (matrix[i][j].length > 1) {                                        
                                if (count == globIndex) {                                            
                                    matrix[i][j] = [matrix[i][j][0]];                                                                 
                                    brk = true;
                                    break;
                                }
                                count++;
                            }
                        }
                        if (brk) {
                            break;
                        }
                    }
                    if (brk) {
                        break;
                    }
                }
                if (brk) {
                    break;
                }
            }
        }

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

        for (let k1 = 0; k1 < 3; k1++) {
            for (let k2 = 0; k2 < 3; k2++) {
                let double = Array(9);
                for (var q = 0; q < double.length; q++) {
                    double[q] = new Array(2);
                }
                let index = 0;
                for (let i = k1 * 3; i < k1 * 3 + 3; i++) {
                    for (let j = k2 * 3; j < k2 * 3 + 3; j++) {
                        if (matrix[i][j].length == 2) {
                            double[index][0] = matrix[i][j][0];
                            double[index][1] = matrix[i][j][1];
                            index++;
                        }
                    }
                }
                
                let count = double.join("");
                count = count.replace(/,/g, "");
                if (count.length == 0) {
                    continue;
                }
                for (let t = 0; t < count.length / 2; t++) {
                    for (let p = t + 1; p < count.length / 2; p++) {
                        if (double[t][0] == double[p][0] && double[t][1] == double[p][1] ||
                            double[t][1] == double[p][0] && double[t][0] == double[p][1]) {

                            for (let i = k1 * 3; i < k1 * 3 + 3; i++) {
                                for (let j = k2 * 3; j < k2 * 3 + 3; j++) {
                                    if ((matrix[i][j].toString().includes(double[t][0]) ||
                                         matrix[i][j].toString().includes(double[t][1])) &&
                                        !(matrix[i][j].length == 2 &&
                                        (matrix[i][j][0] == double[t][0] && matrix[i][j][1] == double[t][1] ||
                                         matrix[i][j][1] == double[t][0] && matrix[i][j][0] == double[t][1]))) {

                                        let index = matrix[i][j].indexOf(double[t][0]);
                                        if (index > 0) {
                                            matrix[i][j].splice(index, 1);
                                        }
                                        index = matrix[i][j].indexOf(double[t][1]);
                                        if (index > 0) {
                                            matrix[i][j].splice(index, 1);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        for (let k1 = 0; k1 < 3; k1++) {
            for (let k2 = 0; k2 < 3; k2++) {
                
                for (let i = k1 * 3; i < k1 * 3 + 3; i++) {
                    for (let j = k2 * 3; j < k2 * 3 + 3; j++) {

                        if (matrix[i][j].length > 1) {
                            for (let u = 0; u < matrix[i][j].length; u++) {
                                let unic = matrix[i][j][u];
                                let check = true;
                                for (let i2 = (k1 * 3); i2 < k1 * 3 + 3; i2++) {
                                    for (let j2 = (k2 * 3); j2 < k2 * 3 + 3; j2++) {
                                        if (!(i == i2 && j == j2)) {
                                            for (let b = 0; b < matrix[i2][j2].length; b++) {
                                                if (unic == matrix[i2][j2][b]) {
                                                    check = false;
                                                }
                                            }
                                        }
                                    }
                                }

                                if (check) {
                                    matrix[i][j] = [unic];
                                }
                            }
                        }                        
                    }
                }
            }
        }
    }

    let matrix2 = new Array(9);
    for (let q = 0; q < matrix2.length; q++) {
        matrix2[q] = new Array(9);
    }
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            matrix2[i][j] = matrix[i][j][0];
        }
    }

    return matrix2;
}
