const CustomError = require('../extensions/custom-error')

const chainMaker = {
    chain: [],

    getLength() {
        return this.chain.length
    },
    addLink(value = ' ') {
        this.chain.push(`( ${value} )`)
        return this
    },
    removeLink(position) {
        if (~~position !== position || position <= 0 || position > this.chain.length) {
            this.chain.length = 0
            throw new Error()
        }
        this.chain.splice(position - 1, 1)
        return this
    },
    reverseChain() {
        this.chain = this.chain.reverse()
        return this
    },
    finishChain() {
        const localChain = this.chain.join('~~')
        this.chain.length = 0
        return localChain
    },
}

module.exports = chainMaker
