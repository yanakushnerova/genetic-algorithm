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
        const offspring = []

        this.population.forEach(() => {
            let i1 = 0
            let i2 = 0
            let i3 = 0

            while (i1 === i2 || i1 === i3 || i2 === i3) {
                i1 = Math.floor(Math.random() * this.populationSize)
                i2 = Math.floor(Math.random() * this.populationSize)
                i3 = Math.floor(Math.random() * this.populationSize)
            }

            // console.log('iteration------------')
            // console.log('i1 ', this.population[i1], ' i2 ', this.population[i2], ' i3 ', this.population[i3])
            // console.log('i1 F', this.population[i1].getFitness(), ' i2 F', this.population[i2].getFitness(), ' i3 F', this.population[i3].getFitness())
            const bestFitness = Math.max(this.population[i1].getFitness(), this.population[i2].getFitness(), this.population[i3].getFitness())
            offspring.push(this.population.find(chromosome => chromosome.getFitness() === bestFitness))
        })
        
        // console.log(offspring)
        return offspring
    }

    crossover(population) {
        for (let i = 0; i < population.length; i += 2) {
            if (Math.random() <= this.crossoverProbability) {
                const split = Math.floor(Math.random() * (this.chromosomeSize))
                const firstChromosomePart = [population[i].chromosome.slice(0, split), population[i].chromosome.slice(split)]
                const secondChromosomePart = [population[i + 1].chromosome.slice(0, split), population[i + 1].chromosome.slice(split)]

                population[i].chromosome = firstChromosomePart[0].concat(secondChromosomePart[1])
                population[i + 1].chromosome = secondChromosomePart[0].concat(firstChromosomePart[1])

                // console.log("i chr", this.population[i].chromosome)
                // console.log("I + 1 chr", this.population[i + 1].chromosome)
            }
        }
    }

    mutation() {
        for (let i = 0; i < this.populationSize; i++) {
            if (Math.random() <= this.mutationProbability) {
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
        const offspring = this.selection()
        this.crossover(offspring)
        this.mutation()

        this.currentFitnessValues = this.population.map(individual => individual.getFitness());
        this.meanFitnessValues.push(this.currentFitnessValues.reduce((acc, cur) => acc + cur, 0) / this.population.length);
        this.maxFitnessValues.push(Math.max(...this.currentFitnessValues));
    }
}
