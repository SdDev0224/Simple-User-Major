import { connect } from 'react-redux'
import DataTable from '../components/main'
import { CreateTask, GetTaskList, UpdateTask, DeleteTask } from '../actions'

const mapStateToProps = (state) => {
    return {
        tableData: state.mainReducer, title: "Task list", createbut: "Add Task"
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createUser: () => {
            dispatch(CreateTask()) 
        },
        updateTask: (task_id, title, overview) => {
            dispatch(UpdateTask(task_id, title, overview)) 
        },
        deleteTask: (task_id) => {
            dispatch(DeleteTask(task_id)) 
        },
        getTasks: (user_id) => { 
            dispatch(GetTaskList(true, 'invisible', user_id)) 
        },
    }
}

const FullTaskTable = connect(
    mapStateToProps, 
    mapDispatchToProps
)(DataTable)

export default FullTaskTable