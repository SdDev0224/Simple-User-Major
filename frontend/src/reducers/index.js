const mainReducer = (state = {data:[], loading: false}, action) => {
    switch (action.type){
        case 'LOAD_USER_LIST':
            return {...state, loading: true};
        case 'LOAD_TASK_LIST':
            return {...state, loading: true, user_id: action.user_id};
        case 'DATA_LOADED':
            return {...state, data: action.data, loading: action.loading}
        default:
            return state
    }
}

export default mainReducer