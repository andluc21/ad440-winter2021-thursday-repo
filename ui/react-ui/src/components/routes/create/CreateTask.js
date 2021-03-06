
import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import './Create.css';



function CreateTask() {
   
    const [values, setValues] = useState({
        taskId: '',
        title: '',
        description: '',
        createdDate: '',
        duedate: '',
        completed: '',
        completedDate: ''
    });

    const set = name => {
        return ({ target: { value } }) => {
            setValues(oldValues => ({ ...oldValues, [name]: value }));
        }
    };

    const saveFormData = async () => {
        
        let url_str = 'http://localhost:3000/users/1/tasks';
        let url = new URL(url_str);
        let hrefUrl = url.href
        let jsonUrl = JSON.stringify(hrefUrl);
        let splitUrl = jsonUrl.split("/")
        const userId = splitUrl[4]
        
        // ${userid}

        console.log(userId)

        console.log(JSON.stringify(values));
        const response = await fetch('https://nsc-fun-dev-usw2-thursday.azurewebsites.net/api/users/' +userId + '/tasks', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        });
        if (response.status !== 200) { 
            throw new Error(`Request failed: ${response.status}`);
        }
    }




    const submitHandler = async (event) => {
        event.preventDefault();
        try {
            await saveFormData();
            alert('Task input complete');
            setValues({
                taskId: '',
                title: '',
                description: '',
                createdDate: '',
                duedate: '',
                completed: '',
                completedDate: ''
            });
        } catch (e) {
            alert(`Creating a task has failed. ${e.message}`);
        }
    }

    return (
        
        <form className="taskForm" onSubmit={submitHandler}>
        <NavLink to={`/`} onClick={null}>
                    <Button variant="outline-primary" size="sm">Home</Button>
                </NavLink>
            <h2>Create Task</h2>
            <label>taskId: &nbsp;&nbsp;
            <input  type="text" required
                    value={values.taskId} onChange={set('taskId')}/>
            </label>


            <label>title: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input  type="text" required
                    value={values.title} onChange={set('title')}/>
            </label>

            <label>description: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input
                    type="text" required
                    value={values.description} onChange={set('description')}
                />
            </label>

            <label>createdDate: &nbsp;&nbsp;&nbsp;
            <input
                    type="text" required
                    value={values.createdDate} onChange={set('createdDate')}
                />
            </label>
            <label>duedate: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input
                    type="text" required
                    value={values.duedate} onChange={set('duedate')}
                />
            </label>
            <label>completed: &nbsp;&nbsp;&nbsp;
            <input
                    type="text" 
                    value={values.completed} onChange={set('completed')}
                />
            </label>
            <label>completedDate: &nbsp;&nbsp;&nbsp;
            <input
                    type="text" 
                    value={values.completedDate} onChange={set('completedDate')}
                />
            </label>

            <button className="taskButton" variant="outline-primary" type="submit">Submit</button>
        </form>
    );
}

export default CreateTask;