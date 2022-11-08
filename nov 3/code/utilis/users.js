const users = []

// addUser, removeUser, getUser, getUsersInRoom

const addUser = ({ id, username, room }) => {
    // to clean the data
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    // to Validate the data
    if (!username || !room) {
        return {
            error: 'Username and room are required!'
        }
    }

    // to Check for existing user
    const existingUser = users.find((user) => {
        return user.room === room && user.username === username
    })

    // to Validate username
    if (existingUser) {
        return {
            error: 'Username is in use!'
        }
    }

    // Store user
    const user = { id, username, room }
    users.push(user)
    return { user }
}

const removeUser = (id) => {
    const index = users.findIndex((user) => {
        return user.id === id
    })

    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}

addUser({
    id: 22,
    username: 'priya ',
    room: ' new'
})

addUser({
        id:44,
        username: 'mohana ',
        room: ' join'
    })
    addUser({
        id:34,
        username: 'anitha ',
        room: 'please join'
    })
// console.log(users)

// const res = addUser({
//     id:44,
//     username: 'mohana ',
//     room: ' join'
// })
//console.log(res)



// const removedUser = removeUser(22)

// console.log(removedUser)
// console.log(users)

const getUser = (id) => {
    return users.find((user) => user.id === id)
}
const user = getUser(34)
console.log(user)
const getUsersInRoom = (room) => {
    room = room.trim().toLowerCase()
    return users.filter((user) => user.room === room)
}

const userList = getUsersInRoom('new')
console.log(userList)
module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}

