import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const getLocalStorage = () => {
  let list = localStorage.getItem('list')
  if (list) {
    return JSON.parse(list)
  } else {
    return []
  }
}

function App() {
  const [name, setName] = useState('')
  const [list, setList] = useState(getLocalStorage())

  const [alert, setAlert] = useState({
    show: false,
    msg: '',
    type: 'success',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name) {
      // display
      showAlert('enter a  task', 'danger', true)
    } else {
      // show alert
      const newItem = {
        id: new Date().getTime().toString(),
        title: name,
        completed: false,
      }

      setList([...list, newItem])
      setAlert({ show: true, msg: `${name} added`, type: 'success' })
      console.log(list)
      setName('')
    }
  }

  const showAlert = (msg = '', type = '', show = false) => {
    setAlert({ msg, type, show })
  }

  // edit function
  const completeFunc = (id, name) => {
    setList(
      list.map((item) => {
        if (item.id === id) {
          return { ...item, completed: true }
        }
        return item
      })
    )
    showAlert(`${name} completed`, 'success', true)
    console.log(list)
  }
  const restartFunc = (id, name) => {
    const newList = list.map((item) => {
      if (item.id === id) {
        return { ...item, completed: false }
      } else {
        return item
      }
    })
    setList(newList)
    showAlert(`${name} re-added`, 'danger', true)
  }

  const deleteItem = (id, name) => {
    const updateList = list.filter((item) => item.id !== id)

    setList(updateList)
    setAlert({ show: true, msg: `${name} removed`, type: 'danger' })
  }

  const clearAll = () => {
    setList([])
    setAlert({ show: true, msg: 'task emptied', type: 'danger' })
  }

  useEffect(() => {
    let notice = setTimeout(() => {
      setAlert({ show: false, msg: '', type: '' })
    }, 3000)
    return () => clearTimeout(notice)
  }, [alert])

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])

  return (
    <section className='section-center'>
      <div className='task-div'>
        <h4>task manager</h4>
      </div>
      <form className='grocery-form' onSubmit={handleSubmit}>
        {alert.show && <Alert alert={alert} />}
        <div className='form-control'>
          <input
            type='text'
            className='grocery'
            placeholder='e.g hit the gym!'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className='submit-btn' type='submit'>
            add task
          </button>
        </div>
      </form>

      {list.length > 0 && (
        <div className='grocery-container'>
          <List
            items={list}
            deleteItem={deleteItem}
            completeFunc={completeFunc}
            restartFunc={restartFunc}
          />
          <button
            className='clear-btn'
            type='button'
            onClick={() => clearAll()}
          >
            clear tasks
          </button>
        </div>
      )}
    </section>
  )
}

export default App
