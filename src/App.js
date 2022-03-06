import React, { useState } from 'react'
import { nanoid } from 'nanoid'
import FilterButton from './components/FilterButton';
import Todo from './components/Todo';
import Form from './components/Form';

const FILTER_MAP = {
  All: () => true,
  Active: task => !task.complete,
  Completed: task => task.complete
}

const FILTER_NAMES = Object.keys(FILTER_MAP)

function App(props) {

  const [ tasks, setTasks ] = useState(props.tasks)
  const [filter, setFilter] = useState("All")

  const addTask = (name) => {
    const newTask = {
      id: `todo-${nanoid()}`,
      name: name,
      complete: false
    }

    setTasks([...tasks, newTask])
  }

  const deleteTask = (id) => {
    const remainingTasks = tasks.filter(task => task.id !== id)
    setTasks(remainingTasks)
  }

  const editTask = (id, newName) => {
    const editedTaskList = tasks.map(task => {
      if (id === task.id) {
        return { ...task, name: newName}
      }
      return task
    })
    setTasks(editedTaskList)
  }

  const toggleTaskCompleted = (id) => {
    const updatedTasks = tasks.map(task => {
      if (id === task.id) {
        return {...task, complete: !task.complete}
      }
      return task
    })
    setTasks(updatedTasks)
  }

  const taskList = tasks
  .filter(FILTER_MAP[filter])
  .map(task => (
    <Todo 
      id={task.id}
      key={task.id}
      name={task.name} 
      complete={task.complete} 
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ))

  const filterList = FILTER_NAMES.map(name => (
    <FilterButton 
      key={name} 
      name={name} 
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ))

  const tasksNoun = tasks.length === 1 ? 'task' : 'tasks' 
  const headingText = `${tasks.length} ${tasksNoun} remaining`

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
        <Form addTask={addTask}/>
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  )
}

export default App;
