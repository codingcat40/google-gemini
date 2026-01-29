const {index} = require('./PineCone')
const {embedText} = require('./embeddings')

module.exports.storePrompt = async (userId, text, type = "prompt") => {
    const vector = await embedText(text)

    await index.upsert([
        {
            id: `${userId}-${Date.now()}`,
            values:  vector,
            metadata: {
                userId,
                type,
                text
            }
        }
    ])
}