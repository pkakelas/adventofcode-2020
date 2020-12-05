const fs = require('fs')
const input = fs.readFileSync('./input.txt')
const lines = String(input).split('\n')

const getB = (line, upchar, min = 0, max = 127) => {
    if (line.length == 1) {
        return line[0] == upchar ? max : min
    }

    return line[0] == upchar ?
        getB(line.slice(1), upchar, Math.ceil((min + max) / 2), max) :
        getB(line.slice(1), upchar, min, Math.floor((min + max) / 2));
}

const main = () => {
    const seats = []
    let mySeat 

    for (line of lines) {
        const r = getB(line.slice(0, 7), 'B', 0, 127)
        const c = getB(line.slice(7, 10), 'R', 0, 7)
        seats.push(r * 8 + c)
    }

    const min = Math.min(...seats)
    const max = Math.max(...seats)
    for (let i = min + 1; i < max - 1; ++i) {
        if (!seats.includes(i) && seats.includes(i + 1) && seats.includes(i - 1)) {
            mySeat = i
            break
        }
    }

    console.log('Solution a:', max)
    console.log('Solution b:', mySeat)
}

main()