const { getMatchResult, getTeam } = require('../infraestructure/matchRepository')
const { Match } = require("../domain/match")

const distributionPointsPerTypeAnnotation = () => {
    console.log("Funcion para obtener el máximo anotador del partido")
    const homeTeam = getTeam('A')
    const visitTeam = getTeam('B')

    const matchResult = getMatchResult(homeTeam, visitTeam)
    return Match.distributionPointsPerTypeAnnotatione(matchResult)
}

module.exports = distributionPointsPerTypeAnnotation