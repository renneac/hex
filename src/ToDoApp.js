/** @jsxImportSource @emotion/react */
import { css, Global } from '@emotion/react'
import ReactDOM from 'react-dom/client'

import { useEffect, useMemo, useState } from 'react'

////////////////////////////////////////////////////////
//css
////////////////////////////////////////////////////////
const globalStyles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: content-box;
    background-color: #fce7c8;
  }
`

export const s = {
  body: css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: '#B1C29E',
  }),
  mainHeader: css({
    fontSize: '70px',
    margin: '10px',
    color: '#F0A04B',
  }),
  inputFind: css({
    padding: '10px 100px',
    textAlign: 'center',
    margin: '15px',
    fontSize: '20px',
    border: '2px solid  #B1C29E',
    '::placeholder': {
      color: '#B1C29E',
    },
    ':focus': {
      borderColor: '#F0A04B',
      outline: 'none',
      color: '#F0A04B',
    },
  }),
  inputTask: css({
    padding: '30px 100px',
    textAlign: 'center',
    margin: '0px 15px',
    fontSize: '20px',
    border: '2px solid  #B1C29E',
    '::placeholder': {
      color: '#B1C29E',
    },
    ':focus': {
      borderColor: '#F0A04B',
      outline: 'none',
      color: '#F0A04B',
    },
  }),
  taskLayout: css({
    width: '243px',
    border: '2px solid black',
    padding: '30px 100px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '10px',
    fontSize: '20px',
    margin: '10px',
    border: '2px solid  #B1C29E',
  }),
  deleteAllButton: css({
    padding: '15px',
    margin: '20px 20px 10px 20px',
    backgroundColor: '#FADA7A',
    color: '#F0A04B',
    border: '2px solid #B1C29E',
    borderRadius: '10px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: '0.3s',
    '&:hover': {
      backgroundColor: '#F0A04B',
      color: 'white',
    },
  }),
}

// add task vkladanie uloh - hotovo
// edit task uprava uloh
// nastavit stav uloh splene, in progres... - v stave false pridat prepinac
// vymazanie konkretnej ulohy
// vyhladavanie
// vymazanie vsetkeho

////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

export const ToDoApp = () => {
  let currentList

  const localStorageName = 'TodoList'
  const [todoList, setTodoList] = useState(
    JSON.parse(localStorage.getItem(localStorageName))
      ? JSON.parse(localStorage.getItem(localStorageName))
      : []
  )

  const CheckSubmit = e => {
    if (e.key === 'Enter') {
      let createNewTask = {
        id: new Date().getTime(),
        value: e.target.value,
        completed: false,
      }
      setNewTask(createNewTask)
    }
  }

  // add task
  const [inputValue, setInputValue] = useState('')
  const [newTask, setNewTask] = useState()
  console.log(todoList)

  // update task
  const [editing, setEditing] = useState(false)
  const [currentListId, setCurrentListId] = useState('')
  const [updateValue, setUpdateValue] = useState('')

  // search
  const [searching, setSearching] = useState(false)
  const [search, setSearch] = useState('')

  // update
  const CheckUpdate = e => {
    if (e.key === 'Enter') {
      todoList[todoList.findIndex(item => item.id == e.target.id)].value = updateValue

      setTodoList([...todoList])

      setEditing(false)
    }
  }

  // edit
  const EditTask = e => {
    setEditing(true)

    setUpdateValue(todoList[todoList.findIndex(item => item.id == e.target.value)].value)

    setCurrentListId(e.target.value)
  }

  const RemoveAll = () => {
    setTodoList([])
  }

  // complete task
  const CompleteTask = e => {
    let isCompleted = todoList.findIndex(item => item.id == e.target.value)

    todoList[isCompleted].completed = !todoList[isCompleted].completed

    setTodoList([...todoList])
  }

  // delete task
  const RemoveTask = e => {
    setTodoList(
      todoList.filter(newList => {
        return newList.id != e.target.value
      })
    )
  }

  // search task
  const SearchTask = e => {
    setSearch(e)

    e === '' ? setSearching(false) : setSearching(true)

    setEditing(false)
  }

  const filteredTodoList = useMemo(() => {
    return todoList.filter(task => {
      return task.value.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    })
  }, [search, todoList])

  searching === false ? (currentList = todoList) : (currentList = filteredTodoList)

  useEffect(() => {
    if (newTask !== undefined) {
      todoList.push(newTask)
      setNewTask(undefined)

      setSearching(false)
    }
    setEditing(false)
  }, [newTask, todoList])

  useEffect(() => {
    // save todo list into local storage
    localStorage.setItem(localStorageName, JSON.stringify(todoList))
  })

  return (
    <div css={s.body}>
      <Global styles={globalStyles} />
      <h1 css={s.mainHeader}>ToDoApp</h1>
      <div>
        <input
          css={s.inputFind}
          type='text'
          id='searchInput'
          placeholder='Hladaj ulohu'
          onChange={e => SearchTask(e.target.value)}
        ></input>
      </div>
      <form
        onSubmit={e => {
          e.preventDefault()
          setInputValue('')
        }}
      >
        <input
          css={s.inputTask}
          autoFocus
          value={inputValue}
          placeholder='Zapisat dalsiu ulohu.'
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={CheckSubmit}
        ></input>
      </form>
      <button onClick={RemoveAll} css={s.deleteAllButton}>
        Delete all.
      </button>
      {editing === true ? (
        <form
          onSubmit={e => {
            e.preventDefault()
            setUpdateValue('')
          }}
        >
          <div>
            <h3>Uprava ulohy</h3>
            <textarea
              rows='5'
              autoFocus
              value={updateValue}
              id={currentListId}
              onChange={e => setUpdateValue(e.target.value)}
              onKeyDown={CheckUpdate}
            />
          </div>
        </form>
      ) : (
        ''
      )}
      <div>
        {currentList.map((task, index) => (
          <div key={index} css={s.taskLayout}>
            <div>
              <h3>Úloha: {index + 1}</h3>
            </div>
            <div>
              <p>{task.value}</p>
            </div>
            <div>
              <button value={task.id} onClick={CompleteTask}>
                {'Splnene'}:{task.completed === true ? 'ano' : 'nie'}
              </button>
              <button value={task.id} onClick={EditTask}>
                Edit
              </button>
              <button value={task.id} onClick={RemoveTask}>
                Vymazat
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
