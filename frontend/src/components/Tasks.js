import React, { useEffect, useState } from 'react'
import { getDocs, addDoc, collection, deleteDoc, doc } from 'firebase/firestore'
import { db, auth } from '../firebase-config'
import { useNavigate } from 'react-router-dom'

import './Tasks.css'

const Tasks = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [details, setDetails] = useState('')
  
  const tasksCollectionRef = collection(db, 'tasks')
  
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