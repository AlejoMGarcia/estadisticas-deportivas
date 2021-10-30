const { Match } = require("../domain/match")
const { getMatchResult, getTeam } = require('../infraestructure/matchRepository')

const highestScoringPlayer = () => {
    console.log("Funcion para obtener el máximo anotador del partido")
    const homeTeam = getTeam('A')
    const visitTeam = getTeam('B')

    const matchResult = getMatchResult(homeTeam, visitTeam)
    return Match.highestScoringPlayer(matchResult)
}

module.exports = highestScoringPlayer