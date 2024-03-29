import { router } from 'redux-saga-router';
import {browserHistory as history } from 'react-router'
import {put, call, take, select, fork, all, takeEvery} from 'redux-saga/effects'

const routes = {
    '/': function* loadingUser(){
        yield take('LOAD_USER_LIST');
        yield call(getTableDatafromDB);
    },

    '/:id': function* loadingTask(){
        yield take('LOAD_TASK_LIST');
        yield call(getTableTasksfromDB);
    }
}

function* createUser(){
    yield takeEvery('CREATE_USER', CreateNewUserFinish);
}

function* updateUser(){
    yield takeEvery('UPDATE_USER', UpdateUserFinish);
}

function* deleteUser(){
    yield takeEvery('DELETE_USER', DeleteUserFinish);
}

function* createTask(){
    yield takeEvery('CREATE_NEW_TASK', CreateNewTaskFinish);
}

function* updateTask(){
    yield takeEvery('UPDATE_TASK', UpdateTaskFinish);
}

function* deleteTask(){
    yield takeEvery('DELETE_TASK', DeleteTaskFinish);
}

const fetchUsers = () => {
    return fetch('http://localhost:3001').then(function(response) {
        return response.json().then(function(json) {
            return json.users;
        })
    })
};

const createnewUser = () => {
    return fetch('http://localhost:3001/users/create', {
        method: 'post'
    }).then(function(response) {
        if(response.ok){
            return fetchUsers();
        }
    })
};

const updateUserInfo = (userid, firstname, lastname, birthday) => {
    let bodydata = JSON.stringify({
        userid:userid, firstname:firstname, lastname:lastname, birthday:birthday   
    });
    return fetch('http://localhost:3001/users/update', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: bodydata
    }).then(function(response) {
        if(response.ok){
            return fetchUsers();
        }
    })
};

const deleteUserInfo = (userid) => {
    return fetch('http://localhost:3001/users/'+userid+'/destroy').then(function(response) {
        if(response.ok){
            return fetchUsers();
        }
    })
};

const createnewTask = (user_id) => {
    return fetch('http://localhost:3001/users/'+user_id+'/tasks/create', {
        method: 'post'
    }).then(function(response) {
        if(response.ok){
            return fetchTasks(user_id);
        }
    })
};

const UpdatingTask = (userid, task_id, title, overview) => {
    let bodydata = JSON.stringify({
        taskid: task_id, title:title, overview:overview 
    });

    return fetch('http://localhost:3001/users/'+userid+'/tasks/update', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: bodydata
    }).then(function(response) {
        if(response.ok){
            return fetchTasks(userid);
        }
    })
};

const DeletingTask = (userid, task_id) => {
    return fetch('http://localhost:3001/users/'+userid+'/tasks/'+task_id+'/destroy').then(function(response) {
        if(response.ok){
            return fetchTasks(userid);
        }
    })
};


const fetchTasks = (user_id) => {
    return fetch('http://localhost:3001/'+user_id).then(function(response) {
        return response.json().then(function(json) {
            return json.tasks;
        })
    })
};

export function* getTableDatafromDB(){
    try{
        const users = yield fetchUsers();
        yield put({type: 'DATA_LOADED', data: users, loading: false})
    }catch(error){
        yield put({type: 'DATA_LOAD_FAILURE', error})
    }
}

export function* CreateNewUserFinish(){
    try{
        const users = yield createnewUser();
        yield put({type: 'DATA_LOADED', data: users, loading: false})
    }catch(error){
        yield put({type: 'DATA_LOAD_FAILURE', error})
    }
}

export function* UpdateUserFinish(action){
    try{
        const users = yield updateUserInfo(action.user_id, action.firstname, action.lastname, action.birthday);
        yield put({type: 'DATA_LOADED', data: users, loading: false})
    }catch(error){
        yield put({type: 'DATA_LOAD_FAILURE', error})
    }
}

export function* DeleteUserFinish(action){
    try{
        const users = yield deleteUserInfo(action.user_id);
        yield put({type: 'DATA_LOADED', data: users, loading: false})
    }catch(error){
        yield put({type: 'DATA_LOAD_FAILURE', error})
    }
}

export function* CreateNewTaskFinish(){
    try{
        const state = yield select();
        const tasks = yield createnewTask(state.mainReducer.user_id);
        yield put({type: 'DATA_LOADED', data: tasks, loading: false})
    }catch(error){
        yield put({type: 'DATA_LOAD_FAILURE', error})
    }
}

export function* UpdateTaskFinish(action){
    try{
        const state = yield select();
        const tasks = yield UpdatingTask(state.mainReducer.user_id, action.task_id, action.title, action.overview);
        yield put({type: 'DATA_LOADED', data: tasks, loading: false})
    }catch(error){
        yield put({type: 'DATA_LOAD_FAILURE', error})
    }
}

export function* DeleteTaskFinish(action){
    try{
        const state = yield select();
        const tasks = yield DeletingTask(state.mainReducer.user_id, action.task_id);
        yield put({type: 'DATA_LOADED', data: tasks, loading: false})
    }catch(error){
        yield put({type: 'DATA_LOAD_FAILURE', error})
    }
}

export function* getTableTasksfromDB(){
    try{
        const state = yield select();
        const tasks = yield fetchTasks(state.mainReducer.user_id);
        yield put({type: 'DATA_LOADED', data: tasks, loading: false})
    }catch(error){
        yield put({type: 'DATA_LOAD_FAILURE', error})
    }
}

export function* mainSaga(){
    yield all([
        fork(router, history, routes),
        fork(createUser),
        fork(updateUser),
        fork(deleteUser),
        fork(createTask),
        fork(updateTask),
        fork(deleteTask)
    ])
}