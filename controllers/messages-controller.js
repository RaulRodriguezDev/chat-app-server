import Message from '../models/message.js'

const getMessages = async (req, res) => {
    const ownId = req.uid
    const messageFrom = req.params.from

    const last = await Message.find({
        $or: [
            { from: ownId, to: messageFrom },
            { from: messageFrom, to: ownId }
        ]
    })
    .sort({createdAt: 'desc'})
    .limit(30)

    res.json({
        ok: true,
        messages: last
    })
}

export { getMessages }