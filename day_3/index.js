const fs = require('fs')

const getMap = () => {
    const input = fs.readFileSync('./input.txt')
    return String(input).split('\n')
}

const treeExists = (line, idx) => line[idx % line.length] == '#'

const countTrees = (map, hor, ver) => {
    let treesCount = 0

    for (let i = 0, j = 0; i < map.length; i += hor, j += ver) {
        if (treeExists(map[i], j)) {
            treesCount++
        }
    }

    return treesCount
}

const main = () => {
    const map = getMap()
    const slopes = [[1, 1], [1, 3], [1, 5], [1, 7], [2, 1]]

    console.log("Solution a:", countTrees(map, 1, 3))

    const reducer = (p, [i, j]) => p * countTrees(map, i, j)
    console.log("Solution b:", slopes.reduce(reducer, 1))
}

main()