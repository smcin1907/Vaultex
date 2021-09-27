const defaultCassette = [
    ["cassettes", 4],
    ["5", 10000],
    ["10", 20000],
    ["20", 40000],
    ["50", 100000]
];

// ===============================================================================================

//console.log("Check input is an array:");
// Check input is an array
const checkInputIsArray = (order, errorMsg) => {
        if (!Array.isArray(order)) {
            errorMsg[1] = "Input is not an array."
            return false;
        } else {
            return true;
        }
}

//console.log(checkInputIsArray(1));
//console.log(checkInputIsArray(defaultCassette));

// ===============================================================================================

//console.log("Check number of cassettes ordered:");
// Check number of cassettes ordered
const checkNumberOfCassettes = (order, errorMsg) => {
    if (['', 1, 2, 3, 4].indexOf(order[0][1]) !== -1) {
        errorMsg[1] = "Cassette field must be left blank or be 1, 2, 3, or 4.";
        return false;
    } else {
        return true;
    }
}

//console.log(checkInputIsArray(1));
//console.log(checkInputIsArray(defaultCassette));

// ===============================================================================================

//console.log("Check input is not too long:");
// Check input is not too long
const checkInputLength = (order, errorMsg) => {
        if(order.length > 5) {
            errorMsg[1] = "Input array is too long.";
            return false;
        } else {
            return true;
        }
}

const cassetteTooLong = [
    ["cassettes", 4],
    ["cassettes", 0],
    ["5", 10000],
    ["10", 20000],
    ["20", 40000],
    ["50", 100000]
];

//console.log(checkInputLength(cassetteTooLong));
//console.log(checkInputLength(defaultCassette));

// ===============================================================================================

//console.log("Check each array[0] is unique");
// Check each array[0] is unique"
const checkUnique = (order, errorMsg) => {
    if(Array.isArray(order)) {
        const arrayFirsts = order.map(x => {
            return x[0]
        });
        let sortedArrayFirsts = arrayFirsts.sort()
        for (let i = 0; i < sortedArrayFirsts.length - 1; i++) {
            if (sortedArrayFirsts[i + 1] == sortedArrayFirsts[i]) {
                errorMsg[1] = "Input array contains duplicated fields.";
                return false;
            }
          }
        return true;
    }
}

const cassetteDuplicate = [
    ["cassettes", 4],
    ["20", 40000],
    ["20", 40000],
    ["50", 100000],
    ["50", 100000]
];
//console.log(checkUniqe(cassetteDuplicate));
//console.log(checkUniqe(defaultCassette));

// ===============================================================================================

//console.log("Check cassettes have valid denominations:");
// Check cassettes have valid denominations
const checkDenominations = (order, errorMsg) => {
    if(Array.isArray(order)) {
        for (let cassette of order) {
            if (cassette[0] !== "cassettes" && ['', '5', '10', '20', '50'].indexOf(cassette[0]) === -1) {
                errorMsg[1] = "Cassette's can only be requested in denominations of '5', '10', '20' & '50'.";
                return false;
            }
        }
        return true;
    }
}

const cassetteWrongDenomination = [
    ["cassettes", 4],
    ["19", 38000],
    ["20", 40000],
    ["50", 100000],
    ["50", 100000]
];
//console.log(checkDenominations(cassetteWrongDenomination));
//console.log(checkDenominations(defaultCassette));

// ===============================================================================================

//console.log("Check each cassette's cash value is valid:");
// Check each cassette's cash value is valid:
const checkCashValue = (order, errorMsg) => {
    if (Array.isArray(order)) {
        for (let cassette of order) {

            const denomination = cassette[0];
            const cashValue = cassette[1];
            const noteCount = cashValue / denomination;

            if (cassette[0] !== "cassettes" && [2000, 4000, 6000, 8000].indexOf(noteCount) === -1) {
                errorMsg[1] = "A cassette's cash value divided by it's denomination must equal 2000, 4000, 6000, 8000.";
                return false;
            }
        }
        return true;
    }
}

const cassetteWrongCashValue = [
    ["cassettes", 4],
    ["5", 12500],
    ["10", 15000],
    ["20", 40000],
    ["50", 100000]
];
//console.log(checkCashValue(cassetteWrongCashValue));
//console.log(checkCashValue(defaultCassette));

// ===============================================================================================

//console.log("Check the total note count does not exceed 8000:");
// Check the total note count does not exceed 80000:
const checkNoteCount = (order, errorMsg) => {
    
    let requestNoteCount = 0;

    if (Array.isArray(order)) {

        for (let cassette of order) {

            const denomination = cassette[0];
            const cashValue = cassette[1];

            if (cassette[0] !== "cassettes") {
                const cassetteNoteCount = cashValue / denomination;
                requestNoteCount += cassetteNoteCount;
            }
        }

        if (requestNoteCount > 8000) {
            errorMsg[1] = "The total number of requested notes can not exceed 8000";
                return false;
        }
        return true;
    }
}

const cassetteWrongNoteCount = [
    ["cassettes", 4],
    ["5", 20000],
    ["10", 40000],
    ["20", 100000],
    ["50", 200000]
];
//console.log(checkNoteCount(cassetteWrongNoteCount));
//console.log(checkNoteCount(defaultCassette));

// ===============================================================================================

//console.log(output);

export const validateOrder = (order) => {

    let output;
    let errorMsg = ["error", "error message"];

    if(order[0][1] === '') {
        output = ["valid", "order valid, send for packing"];
        return output;
    }

    const tests = [
        checkInputIsArray,
        checkInputLength,
        checkNumberOfCassettes,
        checkUnique,
        checkDenominations,
        checkCashValue,
        checkNoteCount
    ]

    const outcome = tests.every(test => test(order, errorMsg) === true);

    if(!outcome) {
        output = errorMsg;  
    } else {
        output = ["valid", "order valid, send for packing"];
    }

    return output;

}