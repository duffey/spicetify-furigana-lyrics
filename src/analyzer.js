const Kuromoji = require("./kuromoji.js")

class Analyzer {
    init() {
        if (this.Analyzer !== undefined) {
            return Promise.resolve()
        }

        return new Promise(
            (resolve, reject) => {
                Kuromoji.builder(
                    {
                        dicPath: "https://www.unpkg.com/kuromoji@0.1.2/dict"
                    }
                ).build(
                    (error, analyzer) => {
                        if (error) {
                            return reject(error)
                        }

                        this.Analyzer = analyzer
                        resolve()
                    }
                )
            }
        )
    }

    parse(text = "") {
        if ((text.trim() === "") || (this.Analyzer === undefined)) return Promise.resolve([])

        const result = this.Analyzer.tokenize(text)
        for (const token of result) {
            token.verbose = {
                word_id: token.word_id,
                word_type: token.word_type,
                word_position: token.word_position
            }
            delete token.word_id
            delete token.word_type
            delete token.word_position
        }

        return Promise.resolve(result)
    }
}

export default new Analyzer()