/** @jsxImportSource @emotion/react */
import * as theme from './theme'
import { css, Global } from '@emotion/react'
import ReactDOM from 'react-dom/client'

import { useEffect, useMemo, useState } from 'react'

////////////////////////////////////////////////////////
//css
////////////////////////////////////////////////////////

export const s = {
  body: css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: theme.layout.fullScreenHeight,
    background: theme.background.primaryBackground,
  }),
  mainHeader: css({
    fontSize: theme.main.font.xxxl,
    margin: theme.main.spacing.sm,
    color: theme.color.accentColor,
  }),
  inputFind: css({
    padding: `${theme.main.spacing.xs} ${theme.main.spacing.xxl}`,
    textAlign: 'center',
    margin: theme.main.spacing.xs,
    fontSize: theme.main.font.md,
    background: `linear-gradient(135deg, ${theme.color.primaryBackgroundStart}, ${theme.color.primaryBackgroundEnd})`,
    border: `2px solid ${theme.color.primaryText}`,
    '::placeholder': {
      color: theme.color.primaryText,
    },
    ':focus': {
      borderColor: theme.color.accentColor,
      outline: 'none',
      color: theme.color.accentColor,
    },
  }),
  inputTask: css({
    padding: `${theme.main.spacing.md} ${theme.main.spacing.xxl}`,
    textAlign: 'center',
    margin: `0 ${theme.main.spacing.xs}`,
    fontSize: theme.main.font.md,
    background: `linear-gradient(135deg, ${theme.color.primaryBackgroundStart}, ${theme.color.primaryBackgroundEnd})`,
    border: `2px solid ${theme.color.primaryText}`,
    '::placeholder': {
      color: theme.color.primaryText,
    },
    ':focus': {
      borderColor: theme.color.accentColor,
      outline: 'none',
      color: theme.color.accentColor,
    },
  }),
  taskLayout: css({
    width: '243px',
    border: `2px solid ${theme.color.primaryText}`,
    padding: `${theme.main.spacing.md} ${theme.main.spacing.xl}`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: theme.main.spacing.xs,
    fontSize: theme.main.font.md,
    margin: theme.main.spacing.xs,
    color: theme.color.primaryText,
  }),
  deleteAllButton: css({
    padding: theme.main.spacing.sm,
    margin: `${theme.main.spacing.md} ${theme.main.spacing.md} ${theme.main.spacing.xs} ${theme.main.spacing.md}`,
    backgroundColor: theme.color.linkColor,
    color: theme.color.primaryBackgroundStart,
    border: `2px solid ${theme.color.primaryText}`,
    borderRadius: '10px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: '0.3s',
    '&:hover': {
      backgroundColor: theme.color.linkHoverColor,
      color: theme.color.primaryBackgroundStart,
    },
  }),
  editForm: css({
    marginTop: theme.main.spacing.md,
    padding: theme.main.spacing.md,
    border: `1px solid ${theme.color.accentColor}`,
    borderRadius: '5px',
    backgroundColor: 'rgba(30, 30, 30, 0.8)',
  }),
  editFormInner: css({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.main.spacing.xs,
  }),
  editHeading: css({
    fontSize: theme.main.font.lg,
    color: theme.color.accentColor,
    marginBottom: theme.main.spacing.xs,
    textAlign: 'center',
  }),
  editTextarea: css({
    padding: theme.main.spacing.xs,
    fontSize: theme.main.font.md,
    border: `1px solid ${theme.color.accentColor}`,
    borderRadius: '3px',
    backgroundColor: '#444',
    color: theme.color.primaryText,
    '&:focus': {
      borderColor: theme.color.accentColor,
      outline: 'none',
      backgroundColor: '#555',
    },
  }),
  buttonContainer: css({
    display: 'flex',
    gap: theme.main.spacing.xs,
    '& button': {
      padding: `${theme.main.spacing.xs} ${theme.main.spacing.sm}`,
      fontSize: theme.main.font.sm,
      letterSpacing: '2px',
      backgroundColor: theme.color.primaryBackgroundEnd,
      color: theme.color.primaryText,
      border: `1px solid ${theme.color.accentColor}`,
      borderRadius: '5px',
      cursor: 'pointer',
      transition: '0.3s',
      '&:hover': {
        backgroundColor: theme.color.accentShadowDark,
        color: theme.color.primaryText,
        borderColor: theme.color.accentShadowLight,
      },
      '&:active': {
        backgroundColor: theme.color.accentShadowMedium,
      },
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
      <Global styles={theme.globalStyles} />
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
          css={s.editForm}
        >
          <div css={s.editFormInner}>
            <h3 css={s.editHeading}>Uprava ulohy</h3>
            <textarea
              rows='5'
              autoFocus
              value={updateValue}
              id={currentListId}
              onChange={e => setUpdateValue(e.target.value)}
              onKeyDown={CheckUpdate}
              css={s.editTextarea}
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
            <div css={s.buttonContainer}>
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
