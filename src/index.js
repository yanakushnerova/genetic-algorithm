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
    }

    const chart = document.getElementById('chart').getContext('2d')

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
                    backgroundColor: 'rgb(0, 99, 132)',
                    borderColor: 'rgb(0, 99, 132)',
                    data: genetic.maxFitnessValues,
                }
            ]
          },
        options: {}
    })

}
