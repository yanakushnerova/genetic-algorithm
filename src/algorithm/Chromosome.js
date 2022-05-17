export default class Chromosome {
    constructor(chromosomeSize) {
        this.chromosomeSize = chromosomeSize
        this.fitness = 0

        this.chromosome = new Array(chromosomeSize).fill()
        this.chromosome = this.chromosome.map(() => Math.round(Math.random()))
    }

    getFitness() {
        this.fitness = this.chromosome.reduce((a, b) => a + b, 0)
        return this.fitness
    }
}
