const Player = function(name, lastName) {
    this.name = name,
    this.lastName = lastName
}

const Team = function(name, players) {
    this.name = name,
    this.players = players
}

module.exports = { Player, Team }