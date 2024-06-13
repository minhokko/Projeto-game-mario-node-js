const player1 = {
    nome: "Mario",
    velocidade: 4,
    manobrabilidade: 3,
    poder: 3,
    pontos: 0,
};

const player2 = {
    nome: "Luigi",
    velocidade: 3,
    manobrabilidade: 4,
    poder: 4,
    pontos: 0,
};

async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandomblock() {
    let random = Math.random()
    let result

    switch (true) {
        case random < 0.33:
            result = "RETA";
            break;
        case random < 0.66:
            result = "CURVA";
            break;
        default:
            result = "CONFRONTO"
            break;
    }

    return result
}

async function logRollResult(characterName, block, diceResult, attribute) {

    console.log(`${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`);
}

async function playRaceEngine(character1, character2) {
    for (let round = 1; round <= 5; round++) {
        console.log(`🏁 Rodada ${round}`);

        //sortear bloco
        let block = await getRandomblock()
        console.log(`Bloco: ${block}`);

        //Rolar dados
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        //teste de habilidade

        let testSkill1 = 0;
        let testSkill2 = 0;

        if (block === "RETA") {
            testSkill1 = diceResult1 + character1.velocidade;
            testSkill2 = diceResult2 + character2.velocidade;

            await logRollResult(character1.nome, "velocidade", diceResult1, character1.velocidade);
            await logRollResult(character2.nome, "velocidade", diceResult2, character2.velocidade);

        }
        if (block === "CURVA") {
            testSkill1 = diceResult1 + character1.manobrabilidade;
            testSkill2 = diceResult2 + character2.manobrabilidade;

            await logRollResult(character1.nome, "manobrabilidade", diceResult1, character1.manobrabilidade);
            await logRollResult(character2.nome, "manobrabilidade", diceResult2, character2.manobrabilidade);

        }
        if (block === "CONFRONTO") {
            let powerResult1 = diceResult1 + character1.poder;
            let powerResult2 = diceResult2 + character2.poder;

            console.log(`${character1.nome} confrontou com ${character2.nome}!⚔`);

            await logRollResult(character1.nome, "poder", diceResult1, character1.poder);
            await logRollResult(character2.nome, "poder", diceResult2, character2.poder);

            if (powerResult1 > powerResult2 && character2.pontos > 0) {
                console.log(`${character1.nome} venceu o confronto! ${character2.nome} perdeu 1 ponto ❌`)
                character2.pontos--;
            }

            if (powerResult2 > powerResult1 && character1.pontos > 0) {
                console.log(`${character2.nome} venceu o confronto! ${character1.nome} perdeu 1 ponto ❌`)
                character1.pontos--;
            }

            console.log(powerResult2 === powerResult1 ? "Confronto empatado!" : "");
        }

        //verificando o vencedor
        if (testSkill1 > testSkill2) {
            console.log(`${character1.nome} marcou um ponto!`);
            character1.pontos++;
        }

        else if (testSkill2 > testSkill1) {
            console.log(`${character2.nome} marcou um ponto!`);
            character2.pontos++;
        }

        console.log("-------------------------------------------")

    }

}

async function declareWinner(character1, character2) {
    console.log("Resultado final:");
    console.log(`${character1.nome}: ${character1.pontos}ponto(s)`)
    console.log(`${character2.nome}: ${character2.pontos}ponto(s)`)

    if (character1.pontos > character2.pontos) {
        console.log(`\n${character1.nome} venceu a corrida! 🏆`);

    } else if (character2.pontos > character1.pontos) {
        console.log(`\n${character2.nome} venceu a corrida! 🏆`);
    } else {
        console.log("A corrida terminou em empate!");
    }

}

(async function main() {
    console.log(`🏁🚦 Corrida entre ${player1.nome} e ${player2.nome} começando... \n`);

    await playRaceEngine(player1, player2);
    await declareWinner(player1, player2);
})();