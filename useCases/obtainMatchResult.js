const { getMatchResult, getTeam } = require('../infraestructure/matchRepository')

const obtainMatchResult = () => {
    console.log("Funcion para obtener resultado del partido")
    const homeTeam = getTeam('A')
    const visitTeam = getTeam('B')

    return getMatchResult(homeTeam, visitTeam)
}

module.exports = obtainMatchResult 