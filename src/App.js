import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import{Task} from "./Task"
import {TaskList} from "./TaskList"
import 'fomantic-ui-css/semantic.css';
import {Button} from 'semantic-ui-react';
import axios from "axios"

class App extends Component{

  state = {
    list : [],
    tasks : [],
    currentList : {name:"", id:""}
  }

  componentDidMount(){
    const listUrl = 'http://127.0.0.1:5000/TaskList';
    axios.get(listUrl).then(res =>{
      this.setState({ list : res.data.tasklist });
    }).catch(err => alert(err));  
  }

  Updatetask = list => {
    this.setState({currentList : list })
    const getTasks = 'http://127.0.0.1:5000/Task?task_list='+list.id;
    axios.get(getTasks).then(res=>
        {
          this.setState({ tasks : res.data.task})
        }
      ).catch(err=>alert(err));
  }

  Updatetext= (e)=>{
    this.setState({[e.target.name]:e.target.value});
  }

  createnewEntity = (type,list)=>{
    const postTaskListUrl = 'http://127.0.0.1:5000/TaskList';
    const postTasks = 'http://127.0.0.1:5000/Task/';
    const getTasks = 'http://127.0.0.1:5000/Task?task_list='+list.id;

    if(type === 'list'){
      axios.post(postTaskListUrl,{name:this.state.newListName}).then(res=>{
        axios.get(postTasks).then(res=>{
          this.setState({list : res.data.tasklist});
        }).catch(err=>alert(err));
      }).catch(err=>alert(err));
    }

    else{
      axios.post(postTasks,{
        text : this.state.newTaskName,
        list_id : list.id
        }).then(res=>
        {axios.get(getTasks).then(res=>{
        this.setState({ tasks : res.data.task})
        }).catch(err=>alert(err))
      }).catch(err=>alert(err));
    }

  }

  updateTaskstatus = (id,list)=>{
   const putTaskUrl = 'http://127.0.0.1:5000/Task/'+id;
   const taskURL = 'http://127.0.0.1:5000/Task?task_list='+list.id;
    axios.put(putTaskUrl).then(res=>{
      axios.get(taskURL).then(res=>{
        this.setState({ tasks:res.data.task })
      }).catch(err=>alert(err))
    }).catch(err=>alert(err)); 
  };

  deleteTask = (id,list) =>{
    alert('do you really want to delete the task')
    const deleteTaskUrl = 'http://127.0.0.1:5000/Task/'+id;
    const taskURL = 'http://127.0.0.1:5000/Task?task_list='+list.id;
    axios.delete(deleteTaskUrl).then(res=>{
      alert('task has been deleted successfully');
      axios.get(taskURL).then(res=>{
        this.setState({tasks:res.data.task})
      }).catch(err=>alert(err))
    }).catch(err=>alert(err))
  }

  render(){
    return(
      <div className="App">
        
        <TaskList list = {this.state.list}
          Updatetask = {this.Updatetask}
          Updatetext = {this.Updatetext}
          createnewEntity = {this.createnewEntity}
        />

        <Task currentList = {this.state.currentList}
        tasks = {this.state.tasks}
        createnewEntity ={this.createnewEntity}
        Updatetext = {this.Updatetext}
        updateTaskstatus = {this.updateTaskstatus}
        deleteTask = {this.deleteTask}
        />
        
      </div>
    );
  }
}

export default App;
