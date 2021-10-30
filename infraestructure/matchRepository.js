const path = require('path');
const fs = require('fs');
const { Team, Player } = require('../domain/team');
const { MatchScore, Match } = require('../domain/match');

const getTeam = (teamName) => {
    const pathTeamSheet = path.join(__dirname, '../basket/equipo-' + teamName + ".txt");
    const teamSheet = fs.readFileSync(pathTeamSheet)

    const players = teamSheet.toString().split('\n').map((row) => {
            return new Player(row.split(' ')[0], row.split(' ')[1])
        }
    )

    return new Team(teamName, players)
}

const getTeamByPointScorer = (homeTeam, visitTeam, lastName) => {
    const playerHomeTeam = homeTeam.players.find((player) => {
        return player.lastName == lastName
    })

    if(playerHomeTeam) return homeTeam
    else return visitTeam
}

const getMatchResult = (homeTeam, visitTeam) => { 
    const pathScoreSheet = path.join(__dirname, '../basket/partido.log');
    const scoreSheet = fs.readFileSync(pathScoreSheet)

    const scores = scoreSheet.toString().split('\n')
        .filter((row) => {
            return row.split(',').length != 1 //Saco las filas vacías en caso que haya
        })
        .map((row) => {
            const lastName = row.split(',')[0]
            const score = (row.split(',')[1] == 'DOBLE') ? 2 : 3
            const team = getTeamByPointScorer(homeTeam, visitTeam, lastName)

            return new MatchScore(lastName, score, team.name)
        }
    )

    return new Match(homeTeam, visitTeam, scores)
}

module.exports = { getMatchResult, getTeam }