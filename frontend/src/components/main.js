import React from 'react'
import ReactTable from 'react-table'
import { Link } from 'react-router';
import 'react-table/react-table.css'

export default class DataTable extends React.Component {
    constructor() {
        super();
        this.renderEditable = this.renderEditable.bind(this);
    }

    componentWillMount() {
        if(this.props.id){
            this.props.getTasks(this.props.id)
        }else
            this.props.getData();
    }

    renderEditable(cellInfo) {
        const { tableData } = this.props
        return (
          <div
            style={{ backgroundColor: "#fafafa" }}
            contentEditable
            suppressContentEditableWarning
            onBlur={e => {
              const data = [...tableData.data];
              data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
            }}
            dangerouslySetInnerHTML={{
              __html: tableData.data[cellInfo.index][cellInfo.column.id]
            }}
          />
        );
    }

    render(){
        const { tableData } = this.props

        const column_user = [{
            Header: 'First Name',
            accessor: 'firstname',
            Cell: this.renderEditable
          },{
            Header: 'Last Name',
            accessor: 'lastname', // String-based value accessors!
            Cell: this.renderEditable
          }, {
            Header: 'Birthday',
            accessor: 'birthday',
            Cell: this.renderEditable
          }, {
            Header: 'Tasks',
            id: 'task_link',
            accessor: 'task_count',
            Cell: row => <Link to={{ pathname: `/${row.original.id}` }}>{row.value}</Link>
          }, {
            Header: '',
            id: 'task_buttons',
            Cell: row => <div><input type = 'button' value = 'update' onClick = {() => this.props.updateUser(row.original.id, row.original.firstname, row.original.lastname, row.original.birthday)} /> <input type = 'button' value = 'delete' onClick = {() => this.props.deleteUser(row.original.id)} /></div>
        }];

        const column_task = [{
            Header: 'Title',
            accessor: 'title', // String-based value accessors!
            Cell: this.renderEditable
          },{
            Header: 'Overview',
            accessor: 'overview', // String-based value accessors!
            Cell: this.renderEditable
          },{
            Header: '',
            id: 'task_buttons',
            Cell: row => <div><input type = 'button' value = 'update' onClick = {() => this.props.updateTask(row.original.id, row.original.title, row.original.overview)} /> <input type = 'button' value = 'delete' onClick = {() => this.props.deleteTask(row.original.id)} /></div>
        }];

        let columns;

        if(this.props.id)
            columns = column_task
        else
            columns = column_user

        if(tableData.loading)
            return (<div>Loading...</div>)
        return (
            tableData.data && (
                <div>
                    <h1 className ='title'>{this.props.title}</h1>
       
                    <div className = 'toolBar'>
                        <input type = 'button' className = 'inputbutton' value = {this.props.createbut} onClick = {this.props.createUser} />
                    </div>
       
                    <div className = 'clear'></div>
       
                    <ReactTable
                        data={tableData.data}
                        columns={columns}
                        defaultPageSize = {10}
                    />
       
                </div>
            )
        )
    }
}