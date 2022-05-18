import GeneticAlgorithm from './algorithm/GeneticAlgorithm.js'

const submitForm = document.getElementById('solve').onsubmit = (e) => {
    e.preventDefault()

    const iterationsNumber = Number(document.getElementById('iterationsNumber').value)
    const populationSize = Number(document.getElementById('populationSize').value)
    const chromosomeSize = Number(document.getElementById('chromosomeSize').value)
    const crossoverProbability = Number(document.getElementById('crossoverProbability').value)
    const mutationProbability = Number(document.getElementById('mutationProbability').value)

    const genetic = new GeneticAlgorithm(populationSize, chromosomeSize, crossoverProbability, mutationProbability)
    while (genetic.generationCounter <= iterationsNumber) {
        genetic.step()
    }

    if (Chart.getChart("chart")) {
        Chart.getChart("chart").destroy()
        Chart.getChart("chart2").destroy()
    }

    const chart = document.getElementById('chart').getContext('2d')
    const chart2 = document.getElementById('chart2').getContext('2d')

    new Chart(chart, {
        type: 'line',
        data: {
            labels: genetic.meanFitnessValues.map((_, i) => i),
            datasets: [
                {
                    label: 'Mean fitness',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: genetic.meanFitnessValues,
                },
                {
                    label: 'Max fitness',
                    backgroundColor: 'rgb(0, 99, 50)',
                    borderColor: 'rgb(0, 99, 50)',
                    data: genetic.maxFitnessValues,
                }
            ]
          },
        options: {}
    })

    genetic.bestChromosomes.sort((a, b) => a.fitness - b.fitness);
    const bestIndividual = genetic.bestChromosomes[0];

    const result = document.getElementById('result')
    result.innerHTML = 'Best individual:  ' + bestIndividual.chromosome

    new Chart(chart2, {
        type: 'scatter',
        data: {
            datasets: [
                {
                    label: 'Points',
                    backgroundColor: 'rgb(211, 211, 211)',
                    data: genetic.functionPoints
                },
                {
                    label: 'Best individual',
                    backgroundColor: 'rgb(0, 0, 0)',
                    data: [{x: parseInt(bestIndividual.chromosome.slice(0, bestIndividual.chromosome.length / 2).join(''), 2), y: parseInt(bestIndividual.chromosome.slice(bestIndividual.chromosome.length / 2).join(''), 2)}]
                }
            ]
          },
        options: {}
    })
}
