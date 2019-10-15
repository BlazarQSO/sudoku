module.exports = function solveSudoku(matrix) {
    let n = matrix[0].length;

    for (let i = 0; i < n; i++) {
        let row = matrix[i];
        let colm = [];
        for (let p = 0; p < n; p++) {
            colm.push(matrix[p][i]);
        }

        for (let j = 0; j < n; j++) {                    
            for (let k = j + 1; k < n; k++) {                        
                if ((row[j] == row[k] && row[j] != 0 && row[k] != 0) ||
                    (colm[j] == colm[k] && colm[j] != 0 && colm[k] != 0)) {
                    return false;
                }
            }
        }
    }

    let region = [];
    for (let k1 = 0; k1 < n / 3; k1++) {
        for (let k2 = 0; k2 < n / 3; k2++) {
            for (let i = k1 * 3; i < k1 * 3 + 3; i++) {
                for (let j = k2 * 3; j < k2 * 3 + 3; j++) {
                    region.push(matrix[i][j]);
                }
            }
            for (let t = 0; t < n; t++) {
                for (let s = t + 1; s < n; s++) {
                    if (region[t] == region[s] && region[s] != 0) {
                        return false;
                    }
                }
            }
            region = [];
        }
    }
    
    return true;
}
