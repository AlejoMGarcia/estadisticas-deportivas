const MatchScore = function(lastName, score, teamName) {
    this.lastName = lastName,
    this.score = score,
    this.teamName = teamName
}

const calculateTotalScore = (teamPoints) => {
    let scoreTotal = 0
    teamPoints.forEach(point => {
        scoreTotal += point.score
    });

    return scoreTotal
}

const TeamScore = function(teamName, teamPoints) {
    this.teamName = teamName,
    this.points = teamPoints
    this.totalScore = calculateTotalScore(teamPoints)
}

const getWinningTeam = (homeTeamScore, visitTeamScore) => {
    if(homeTeamScore.totalScore > visitTeamScore.totalScore) 
        return homeTeamScore.teamName
    else
        return visitTeamScore.teamName
}

const getScoreTeam = (matchScores, team) => {
    const pointsTeam = matchScores.filter((score) => {
        return score.teamName == team.name
    })
    return new TeamScore(team.name, pointsTeam)
}

const Match = function(homeTeam, visitTeam, matchScores) {
    this.matchScores = matchScores,
    this.homeTeam = homeTeam,
    this.visitTeam = visitTeam,
    this.homeTeamScore = getScoreTeam(matchScores, homeTeam),
    this.visitTeamScore = getScoreTeam(matchScores, visitTeam)
    this.teamWinner = getWinningTeam(this.homeTeamScore, this.visitTeamScore)
}

Match.highestScoringPlayer = (match) => {
    const playersScoring = []

    match.matchScores.forEach(matchScore => {
        if(!playersScoring[matchScore.lastName]){
            playersScoring[matchScore.lastName] = 
                { 
                    player: { 
                        name: matchScore.lastName, 
                        team: matchScore.teamName 
                    }, 
                    totalScore: matchScore.score 
                }
        }
        else
            playersScoring[matchScore.lastName].totalScore += matchScore.score
    });

    let highestScorePlayer
    for (var key in playersScoring) {
        playerScoring = playersScoring[key]
        if (!highestScorePlayer || highestScorePlayer.totalScore < playerScoring.totalScore)
            highestScorePlayer = playerScoring
    }
    return highestScorePlayer
}

Match.distributionPointsPerTypeAnnotatione = (match) => {
    const distributionPoints = { doble: 0, triple: 0}

    match.matchScores.forEach(matchScore => {
        if(matchScore.score == 2)
            distributionPoints.doble++
        else
            distributionPoints.triple++
    });

    return distributionPoints
}


module.exports = { Match, TeamScore, MatchScore }

