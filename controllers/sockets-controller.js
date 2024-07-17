import Message from '../models/message.js'
import User from '../models/user.js'

const userConnected = async ( uid ) => {

    const user = await User.findById( uid )
    user.online = true
    await user.save()
    return user
}

const userDisconnected = async ( uid ) => {

    const user = await User.findById( uid )
    user.online = false
    await user.save()
    return user
}

const getUsers = async ( uid ) => {
    const users = await User.find().sort('-online')
    return users
}

const setMessage = async ( payload ) => {
    try{
        const message = new Message( payload )
        await message.save()
        return message
    }catch(error){
        console.log(error)
        return null
    }
}
export { userConnected, userDisconnected, getUsers, setMessage }