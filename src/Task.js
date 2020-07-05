import React from 'react';
import { Checkbox, Button, Input, Modal, Message} from 'semantic-ui-react';

export const Task = (props) =>{
	return(
		<div style={{marginLeft : "300px"}}>

			{
				props.currentList.name === "" && (
					<div>
						<Message info>
							<Message.Header>
							You haven't selected list yet
							</Message.Header>
							<p>please select the list from left side panel</p>
						</Message>
					</div>
				)
			}


			{
				props.currentList.name !== "" && (
					<div>
			<br/>
			<br/>
			<h1>Task Under {props.currentList.name}</h1><br/>
			
			{
				props.tasks.map(function(task){
					return(
						<div>
							<Checkbox label={task.text} checked ={task.Completed} onClick = {()=>props.updateTaskstatus(task.id)} /><br/>
							<Button color="red" onClick={()=>props.deleteTask(task.id)}>Delete</Button>
							<br/><br/>
						</div>
					)
				})
			}

			<Modal trigger={<Button color="green">Add new Task</Button>}>
    			<Modal.Header>Add a new Task</Modal.Header>
    			<Modal.Content>
      			<Modal.Description>
        		<p>
        			Type the name of the task you want to create
        		</p>
        		<Input name ="newTask"fluid placeholder='Ex. Need to work on Project....' onChange={props.Updatetext}/><br/>
        		<Button onClick={()=>props.createnewEntity("text",props.currentList.id)} fluid color = "green">Add List</Button>
    			</Modal.Description>
    			</Modal.Content>
  			</Modal>
  				</div>
  			)
  		}
			
		</div>
	);
};