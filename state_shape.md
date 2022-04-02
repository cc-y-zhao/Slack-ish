state = {
    session: {
        user: {id: 1, username: '', firstName: '', lastName: '', password: '', email: ''}
    },
    search: {
        users: [], messages: [], channels: []
    },
    messages: {

    },
    channels: {
        id: { messages: {}, users: {}, ...},
        ...
        channel_list: [ { messages: {}, users: {}, ...}, ...]
    }
}
