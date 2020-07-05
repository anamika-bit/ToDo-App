import React from 'react';
import { Header, Icon, Image, Menu, Segment, Sidebar, Button, Modal, Input } from 'semantic-ui-react';

export const TaskList = (props) =>{
	return(
		<div>
			<Sidebar as={Menu} inverted vertical visible = {true}>
				
				<Menu.Item as='a'>
          			<h2>2 do App</h2>
        		</Menu.Item>

        		<Menu.Item as='a'>
          			<h2>TaskList</h2>
        		</Menu.Item>

        		

        		{
        			props.lists.map(function(list,index){
        				return(
        					<Menu.Item onClick={()=>props.Updatetask(list)} active={props.currentList.name ===list.name}>
        					{list.name}
        					</Menu.Item>
        				)
        			})
        		}

        		<br/>

        		<Modal trigger={<Button fluid color="green">Add TaskList</Button>}>
    				<Modal.Header>Select a Photo</Modal.Header>
    				<Modal.Content>
      				<Modal.Description>
        			<Header>Add TaskList Here</Header>
        				<Input name="NewTaskList" fluid placeholder='Add TaskList Here' onChange={props.Updatetext}/><br/>
        				<Button color="green" onClick={()=> props.createnewEntity("list")} >Click to add</Button>
    				</Modal.Description>
    				</Modal.Content>
  				</Modal>

      		</Sidebar>
		</div>
	);
};