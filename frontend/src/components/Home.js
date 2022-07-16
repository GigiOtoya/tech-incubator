import React, { useEffect, useState } from 'react'
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from '../firebase-config'

const Home = ({ isAuth }) => {
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
  
  return (
    <div className="homePage">
      {taskList.map((task) => {
        return (
          <div className="task">
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
                <button className='accept' onClick={'s'}>&#x2713;<b>Accept</b></button>
                {isAuth && (task.author.id === auth.currentUser.uid) && (
                  <button className='delete' onClick={() => {deleteTask(task.id);}}>
                    {" "}
                    &#128465;
                  </button>
                )}
              </div>
            </h4>
          </div>
        );
      })}
    </div>
  );
}

export default Home