
import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
 import {  
   faCircleCheck, faPen, faTrashCan
 } from '@fortawesome/free-solid-svg-icons'
 import './App.css';





function App() {
//Task /Todo list / state
const [Todo, setTodo] = useState([]);
// Temp state
const [newTask, setNewTask] = useState('');
const [updateData, setUpdateData] = useState('');

// Add task 
  ///////////////////////////
  const addTask = () => {
    if(newTask) {
      let num = Todo.length + 1; 
      let newEntry = { id: num, title: newTask, status: false }
      setTodo([...Todo, newEntry])
      setNewTask('');
    }
  }

// delete task
const deleteTask = (id) => {
  let newTask = Todo.filter(task => task.id !== id)
  setTodo(newTask);
}

// mark task as done or completed
const markDone = (id) => {
  let newTask = Todo.map(task => {
    if(task.id == id){
      return ({ ...task, status: !task.status})
    }
    return task;
  })
  setTodo(newTask);
}

const cancelUpdate = () => {
  setUpdateData('');
}
// change task for update
const changeTask = (e) => {
  let newEntry = {
    id: updateData.id,
    title: e.target.value,
    status: updateData.status ? true : false
  }
  setUpdateData(newEntry);
}
// update task
const updateTask = () => {
  let filterRecords = [...Todo].filter(task => task.id !== updateData.id);
  let updateObject = [...filterRecords, updateData]
  setTodo(updateObject);
  setUpdateData('');
}

  return (
    <div className="container App">


      <br></br>
      <h2>Leave timetable (ReactJS)</h2>
      <br></br>

      {/*update task*/}
      {updateData && updateData ? (
        <>
        <div className='row' >
        <div className='col'  >
          <input placeholder="Update instead of change"
          value={ updateData && updateData.title} //ъпдейтва заглавието
          onChange={ (e) => changeTask(e)}
          className='form-control form-control-lg' 
          />
        </div>
        <div className='col-auto'>
          <button
          onClick={updateTask}
          className='btn btn-lg btn-success mr-20'
          >Update</button>
          <button
          onClick={cancelUpdate}
          className='bnt bnt-lg bnt-warning'
          >Cancel</button>
        </div>
    </div>
    <br/> {/* br подреди всико в линия */}
        </>


      ) : (
          <>
          {/* add Task*/}
      <div className='row'>
        <div className='col'>
          <input placeholder= "Write your name and period of leave "
           value={newTask} 
           onChange={(e) => setNewTask(e.target.value)}
           className="form-control form-control-lg"/>
        </div>
        <div className='col-auto'>
          <button 
          onClick={addTask}
          className='btn btn-lg btn-success'>
          Add task</button>
        </div>
      </div>
      <br/> <br/>
          </>

      )}

    {/*Display Todos */}
    {"ex. Ivanov 01.02.2023-10.02.2023"}

    {Todo && Todo

     .sort((a, b) => a.id > b.id ? 1 : -1)
     .map( (task, index) => {
        return(
          <React.Fragment key={task.id}>
            <div className="col taskBg">   
              <div className = {task.status ? 'done' : '' }>
              <span className="taskNumber">{index + 1}</span>
              <span className="taskText">{task.title}</span>
              </div>
              <div className='iconsWrap'>
                <span title = "Completed / Not completed"
                onClick={(e) => markDone(task.id)}
                >
                  <FontAwesomeIcon icon={faCircleCheck}/>
                </span>

              {task.status ? null : (
                <span title='Edit'
                onClick={ () => setUpdateData({
                  id: task.id,
                  title: task.title,
                  status: task.status ? true : false
                })}
                >
                <FontAwesomeIcon icon={faPen}/>
                </span>
              )}
                
              {task.status ? null : (

                <span title='Dlete'
                onClick={() => deleteTask(task.id)}
                >
                <FontAwesomeIcon icon={faTrashCan}/>
                </span>
              )}

                
              </div>
            </div>

          
          </React.Fragment>
        )
    } )

    }
      
    </div>
  );
}

export default App;
