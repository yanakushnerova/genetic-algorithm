import Chromosome from "./Chromosome.js"

export default class GeneticAlgorithm {
    constructor(populationSize, chromosomeSize, crossoverProbability, mutationProbability) {
        this.populationSize = populationSize
        this.chromosomeSize = chromosomeSize
        this.crossoverProbability = crossoverProbability
        this.mutationProbability = mutationProbability

        this.population = new Array(populationSize).fill()
        this.population = this.population.map(() => new Chromosome(this.chromosomeSize))
        this.generationCounter = 0

        this.maxFitnessValues = [] 
        this.meanFitnessValues = [] 
        this.currentFitnessValues = []
    }

    getPopulation() {
        console.log(this.population.map((chr) => chr.chromosome), "--", this.population.map((chr) => chr.getFitness()))
    }

    selection() {
        const bestOffspring = this.population.sort((a, b) => b.getFitness() - a.getFitness())[0];

        this.population[this.population.length - 1] = bestOffspring;
    }

    crossover() {
        for (let i = 0; i < this.population.length; i += 2) {
            if (Math.random() <= this.crossoverProbability) {
                const split = Math.floor(Math.random() * (this.chromosomeSize))
                const firstChromosomePart = [this.population[i].chromosome.slice(0, split), this.population[i].chromosome.slice(split)]
                const secondChromosomePart = [this.population[i + 1].chromosome.slice(0, split), this.population[i + 1].chromosome.slice(split)]

                this.population[i].chromosome = firstChromosomePart[0].concat(secondChromosomePart[1])
                this.population[i + 1].chromosome = secondChromosomePart[0].concat(firstChromosomePart[1])
            }
        }
    }

    mutation() {
        for (let i = 0; i < this.populationSize; i++) {
            let chance = this.mutationProbability;
            if (this.population[i].getFitness() > this.meanFitnessValues[this.meanFitnessValues.length - 1]) chance **= 2;
            if (Math.random() <= chance) {
                for (let j = 0; j < this.chromosomeSize; j++) {
                    if (Math.random() < this.mutationProbability) {
                        this.population[i].chromosome[j] === 0 ? this.population[i].chromosome[j] = 1 : this.population[i].chromosome[j] = 0
                    }
                }
            }
        }
    }

    step() {
        this.generationCounter += 1
        this.selection()
        this.crossover()
        this.mutation()

        this.currentFitnessValues = this.population.map(individual => individual.getFitness());
        this.meanFitnessValues.push(this.currentFitnessValues.reduce((acc, cur) => acc + cur, 0) / this.population.length);
        this.maxFitnessValues.push(Math.max(...this.currentFitnessValues));
    }
}
