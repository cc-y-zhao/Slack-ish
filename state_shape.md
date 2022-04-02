OVERALL STATE***************************************
state = {

    session: {
        user: {}
    },

    search: {
        users: [ {}, {}, {}, ... ],
        messages: [ {}, {}, {}, ... ],
        channels: [ {}, {}, {}, ... ]
    },

    channels: {
        id:  { users: {}, messages: {}, all_messages: [] },
        id:  { users: {}, messages: {}, all_messages: [] },
        ...,
        channel_list: [ {}, {}, {}, ... ],
        dm_list: [ {}, {}, {}, ... ]
    }

}


SESSION*********************************************

user: {
    id: Number,
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: ""
}

SEARCH*********************************************

-> state.search
search: {
    users: [],
    messages: [],
    channels: []
}

--> state.search.users (to list on nav bar)
users = [
    {
        id: Number,
        username: String,
        first_name: "",
        last_name: "",
        email: "",
    },
    ...
]

--> state.search.messages
// for future implementation of search for messages

--> state.search.channels
// for future implementation of search for channels



CHANNELS*********************************************

--> state.channels
channels: {
    id: {},
    id: {},
    ...,
    channel_list: [],
    dm_list: []
}

--> state.channels[id]
channels[id] = {
    id: Number,
    owner_id: Number,
    title: String,
    is_dm: Boolean,
    description: Text,
    users: {},
    messages: {},
    all_messages: [{}, {}, {}, ...]
}

--> state.channels[id].users
users = {
    id: {},
    id: {},
    ...
}

--> state.channels[id].users[id]
users[id] = {
    username: String,
    first_name: String,
    last_name: String,
}

--> state.channels[id].messages
messages = {
    id: {},
    id: {},
    ...
}

--> state.channels[id].messages[id]
messages[id] = {
    user_id: Number,
    channel_id: Number,
    content: Text
}

--> state.channels[id].all_messages //to map over in react
all_messages = [
    {
        user_id: Number,
        channel_id: Number,
        content: Text
    },
    ...
]

--> state.channels.channel_list (to list on nav bar)
channel_list: [
    {
        id: Number,
        owner_id: Number,
        title: "",
        is_dm: False,
        description: "",
        messages: {},
        users: {}
    },
    ...
]

--> state.channels.dm_list (to list on nav bar)
dm_list: [
    {
        id: Number,
        title: "",
        is_dm: True,
        messages: {},
        users: {}
    },
    ...
]
