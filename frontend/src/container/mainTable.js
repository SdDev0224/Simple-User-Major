import { connect } from 'react-redux'
import DataTable from '../components/main'
import { CreateUser, UpdateUser, DeleteUser, GetUserList } from '../actions'

const mapStateToProps = state => {
    return {
        tableData: state.mainReducer, title: 'User list', createbut: 'Add User'
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createUser: () => {
            dispatch(CreateUser()) 
        },
        updateUser: (user_id, firstname, lastname, birthday) => {
            dispatch(UpdateUser(user_id, firstname, lastname, birthday)) 
        },
        deleteUser: (user_id) => {
            dispatch(DeleteUser(user_id)) 
        },
        getData: () => { 
            dispatch(GetUserList(true, 'invisible')) 
        },
    }
}

const FullDataTable = connect(
    mapStateToProps, 
    mapDispatchToProps
)(DataTable)

export default FullDataTable