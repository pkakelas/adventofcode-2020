const fs = require('fs')

const getInput = () => {
    const input = fs.readFileSync('./input.txt')
    const lines = String(input).split('\n')
    const res = []

    for (const line of lines) {
        const tokens = line.split(' ')
        const letter = tokens[1][0]
        const pass = tokens[2]
        const [a, b] = tokens[0].split('-')
        res.push({letter, pass, a: +a, b: +b})
    }

    return res
}

const main = () => {
    const input = getInput()

    const solutionA = input.filter(({letter, pass, a, b}) => {
        const occ = (pass.match(new RegExp(letter, 'g')) || []).length
        return occ >= a && occ <= b
    })

    const solutionB = input.filter(({letter, pass, a, b}) => {
        return pass[a - 1] == letter ^ pass[b - 1] == letter
    })

    console.log("Solution a: ", solutionA.length)
    console.log("Solution b: ", solutionB.length)
}

main()