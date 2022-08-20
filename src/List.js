import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { MdDone } from 'react-icons/md'
import { RiRestartLine } from 'react-icons/ri'

const List = ({ items, deleteItem, completeFunc, restartFunc }) => {
  // const [isCompleted, setIscompleted] = React.useState(false)

  // const completeTask = (id) => {
  //   const updateTask = items.map((item) => {
  //     if (item.id === id) {
  //       return { ...item, completed: true }
  //     }
  //     return item
  //   })
  //   console.log(items)

  // }

  return (
    <div className='grocery-list'>
      {items.map((item) => {
        const { id, title, completed } = item
        return (
          <article key={id} className='grocery-item'>
            <p className={`title ${completed && 'completed'}`}>{title}</p>
            <div className='btn-container'>
              {/* <button type='button' className='edit-btn'>
                <FaEdit onClick={() => editFunc(id)} />
              </button> */}

              {/* <button type='button' className='edit-btn'>
                <MdDone onClick={() => editFunc(id, title)} />
              </button> */}

              {!completed ? (
                <button type='button' className='edit-btn'>
                  <MdDone onClick={() => completeFunc(id, title)} />
                </button>
              ) : (
                <button type='button' className='delete-btn'>
                  <RiRestartLine onClick={() => restartFunc(id, title)} />
                </button>
              )}
              <button
                type='button'
                className='delete-btn'
                onClick={() => deleteItem(id, title)}
              >
                <FaTrash />
              </button>
            </div>
          </article>
        )
      })}
    </div>
  )
}

export default List
