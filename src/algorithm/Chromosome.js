export default class Chromosome {
    constructor(chromosomeSize) {
        this.chromosomeSize = chromosomeSize
        this.fitness = 0

        this.chromosome = new Array(chromosomeSize).fill()
        this.chromosome = this.chromosome.map(() => Math.round(Math.random()))
    }

    getFitness() {
        this.x = parseInt(this.chromosome.slice(0, this.chromosome.length / 2).join(''), 2);
        this.y = parseInt(this.chromosome.slice(this.chromosome.length / 2).join(''), 2);

        // this.fitness = this.x ** 2 - this.y ** 2
        // this.fitness = this.x ** 2 + 1
        this.fitness = Math.sqrt((this.x) ** 2 + (this.y) ** 2);

        return this.fitness
    }
}
