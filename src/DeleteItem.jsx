import axios from 'axios'
import { useState, useEffect } from 'react'

const DeleteItem = ({ _id }) => {
  const [items, setItems] = useState([])
  const [selectedItemId, setSelectedItemId] = useState(_id)

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('/api/items')
        setItems(response.data)
      } catch (error) {
        console.error('Failed to fetch items:', error)
      }
    }

    fetchItems()
  }, [])

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://gleeful-bubblegum-71bb8d.netlify.app/.netlify/functions/api/${selectedItemId}`
      )
      window.location.reload()
    } catch (error) {
      console.error('Failed to delete item:', error)
      alert('There was an error deleting the item.')
    }
  }

  return (
    <div>
      <button onClick={handleDelete}>Delete</button>
    </div>
  )
}

export default DeleteItem
