import React, { useEffect, useState } from 'react'
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from '../firebase-config'
import './Home.css'

const Home = ({ isAuth }) => {
  const [taskList, setTaskList] = useState([]);

  const tasksCollectionRef = collection(db, 'tasks')

  const deleteTask = async (id) => {
    const postDoc = doc(db, 'tasks', id);
    await deleteDoc(postDoc);
  };

  useEffect(() => {
    const getTasks = async () => {
      const data = await getDocs(tasksCollectionRef);
      setTaskList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getTasks();
  }, [deleteTask]);
  
  return (
    <div className="homePage">
      {taskList.map((task) => {
        return (
          <div className="task">
            <div className="taskHeader">
              <div className="title">
                <h1> {task.title}</h1>
              </div>
              <div className="deleteTask">
                {isAuth && task.author.id === auth.currentUser.uid && (
                  <button
                    onClick={() => {
                      deleteTask(task.id);
                    }}
                  >
                    {" "}
                    &#128465;
                  </button>
                )}
              </div>
            </div>
            <div className="taskContainer">
              <div className='taskDescription'>
                <h3> {task.description}: </h3>
              </div>
              <div className="taskBody">
                {task.details} 
              </div> 
            </div>
            <h4>Submitted By: {task.author.name}</h4>
          </div>
        );
      })}
    </div>
  );
}

export default Home