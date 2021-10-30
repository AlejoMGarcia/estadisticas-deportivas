const chalk = require('chalk');
const obtainMatchResult = require('./useCases/obtainMatchResult')
const highestScoringPlayer = require('./useCases/highestScoringPlayer')
const distributionPointsPerTypeAnnotation = require('./useCases/distributionPointsPerTypeAnnotation')

const commands = [
    { 
        usage: 'matchResult',
        description: 'Funcion para obtener resultado del partido', 
        exec : obtainMatchResult,
    },
    {
        usage: 'highestScoring',
        description: 'Funcion para obtener el jugador con mayor puntaje del partido',  
        exec: highestScoringPlayer,
    },
    {
        usage: 'distribution',
        description: 'Funcion para obtener la distribución de puntaje por tipo de anotación',
        exec: distributionPointsPerTypeAnnotation
    }
]

const showUsageAfterError = (error) => {
    console.error(`Error: ${chalk.red.bold(error)}`)

    let usageText = `
        ${chalk.green.bold('Match console.')}

${chalk.green.bold('Usage:')} npm start ${chalk.blue.bold('<command>')}

${chalk.blue.bold('Commands:')}
`;


    commands.forEach(command => {
        usageText += `npm start ${(command.usage + ':').padEnd(15, ' ')} ${command.description} \n`; 
    });

    console.log(usageText);
    process.exit(1);
}

const execCommand = (process) => {
    const parameters = process.argv.slice(2);
    let commandParameter
    
    if (parameters.length != 1) {
        showUsageAfterError('No coloco la cantidad correcta de parámetros.')
    } else {
        commandParameter = parameters[0] // Slice node executable and console 
        console.info('Using command: ' + commandParameter); 
    }

    const commandToExec = commands.find((command) => {
        return command.usage == commandParameter
    })

    if(!commandToExec)
        showUsageAfterError('No seleccionó un comando valida.')
    else {
        console.info(JSON.stringify(commandToExec.exec(), null, "\t"))
        process.exit(0)
    }
}

execCommand(process);