import React, { useEffect, useState } from 'react'
import { getDocs, addDoc, collection, deleteDoc, doc } from 'firebase/firestore'
import { db, auth } from '../firebase-config'
import { useNavigate } from 'react-router-dom'
import './Tasks.css'

const Tasks = ( {isAuth} ) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [details, setDetails] = useState('')
  const [taskList, setTaskList] = useState([]);

  const tasksCollectionRef = collection(db, 'tasks')

  const deleteTask = async (id) => {
    const postDoc = doc(db, 'tasks', id);
    await deleteDoc(postDoc);
    window.location.reload()
  };

  useEffect(() => {
    const getTasks = async () => {
      const data = await getDocs(tasksCollectionRef);
      setTaskList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getTasks();
  }, []);
  
  let navigate = useNavigate();

  const createTask = async () => {
    await addDoc(tasksCollectionRef, 
      {
        title,
        description, 
        details, 
        author: {
          name: auth.currentUser.displayName, 
          id: auth.currentUser.uid 
        } 
      });
    navigate('/')
  };
  
  return (
    <div className='tasksPage'>
      <div className='left'>
        <div className='userTasks'>
          <h2>Your Tasks:</h2>
          {taskList.map((task) => {
            return (
              <div className="task">
                {isAuth && (task.author.id === auth.currentUser.uid) && (
                  <div className='showtask'>
                    <div className="taskHeader">      
                        <h1> {task.title}</h1>
                      
                    </div>
                    <div className="taskContainer">
                      <div className='taskDescription'>
                        <h3> {task.description}: </h3>
                      </div>
                      <div className="taskBody">
                        {task.details} 
                      </div> 
                    </div>
                    
                    <h4 className='Submission'>Submitted By: {task.author.name}
                      <div className="deleteTask">
                        {isAuth && (task.author.id === auth.currentUser.uid) && (
                          <button onClick={() => {deleteTask(task.id);}}>
                            {" "}
                            &#128465;
                          </button>
                        )}
                      </div>
                    </h4>
                  </div> )}
              </div>
            );
          })}
        </div>
        <div className='Accepted-Tasks'>
          <h2>Accepted Tasks:</h2>
        </div>
      </div>
      <div className='tasksContainer'>
        <h1> Create a Task </h1>
        <div className='inputGroup'>
          <label> Title: </label>
          <input 
            placeholder='Task Title...' 
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            />
        </div>
        <div className='inputGroup'>
          <label> Description: </label>
          <input 
            placeholder='Task Description...' 
            onChange={(event) => {
              setDescription(event.target.value);
            }}
            />
        </div>
        <div className='inputGroup'>
          <label> Task: </label>
          <textarea 
            placeholder='Task Details...'
            onChange={(event) => {
              setDetails(event.target.value);
            }}/>
        </div>
        <button 
          type="button" 
          className="btn btn-primary" 
          onClick={createTask}>Submit New Task</button>
      </div>
    </div>
  )
}

export default Tasks