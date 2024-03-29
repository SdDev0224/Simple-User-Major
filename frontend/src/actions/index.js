export const GetUserList = (loading, createFlag) => {
    return {
        type: "LOAD_USER_LIST",
        loading,
        createFlag
    }
}

export const GetTaskList = (loading, createFlag, user_id) => {
    return {
        type: "LOAD_TASK_LIST",
        loading,
        createFlag,
        user_id
    }
}

export const CreateUser = () => {
    return {
        type: "CREATE_USER"
    }
}

export const UpdateUser = (user_id, firstname, lastname, birthday) => {
    return {
        type: "UPDATE_USER",
        user_id,
        firstname,
        lastname,
        birthday
    }
}

export const DeleteUser = (user_id) => {
    return {
        type: "DELETE_USER",
        user_id
    }
}

export const CreateTask = () => {
    return {
        type: "CREATE_NEW_TASK"
    }
}

export const UpdateTask = (task_id, title, overview) => {
    return {
        type: "UPDATE_TASK",
        task_id,
        title,
        overview
    }
}

export const DeleteTask = (task_id) => {
    return {
        type: "DELETE_TASK",
        task_id
    }
}

export const dataLoaded = (data, loading) => {
    return {
        type: "DATA_LOADED",
        data,
        loading
    }
}