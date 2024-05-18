import axios from 'axios'
import { useState, useEffect } from 'react'

const EditItem = ({ itemId }) => {
  const [item, setItem] = useState({})
  const [showDialog, setShowDialog] = useState(false)
  const [updatedName, setUpdatedName] = useState('')
  const [updatedIngredients, setUpdatedIngredients] = useState('')
  const [updatedInstructions, setUpdatedInstructions] = useState('')
  const [updatedCuisine, setUpdatedCuisine] = useState('')

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`/api/items/${itemId}`)
        setItem(response.data)
        setUpdatedName(response.data.name)
        setUpdatedIngredients(response.data.ingredients)
        setUpdatedInstructions(response.data.instructions)
        setUpdatedCuisine(response.data.cuisine)
      } catch (error) {
        console.error('Failed to fetch item:', error)
      }
    }

    fetchItem()
  }, [itemId])

  const handleUpdate = async () => {
    try {
      await axios.put(
        `https://gleeful-bubblegum-71bb8d.netlify.app/.netlify/functions/api/${itemId}`,
        {
          name: updatedName,
          ingredients: updatedIngredients,
          instructions: updatedInstructions,
          cuisine: updatedCuisine
        }
      )
      // Close the dialog and optionally show success message
      setShowDialog(false)
      alert('Item updated successfully!')
    } catch (error) {
      console.error('Failed to update item:', error)
      alert('There was an error updating the item.')
    }
  }

  return (
    <div>
      <button onClick={() => setShowDialog(true)}>Edit</button>
      {showDialog && (
        <form onSubmit={handleUpdate}>
          <label>
            Name
            <input
              type='text'
              value={updatedName}
              onChange={e => setUpdatedName(e.target.value)}
            />
          </label>
          <label>
            Ingredients
            <textarea
              value={updatedIngredients}
              onChange={e => setUpdatedIngredients(e.target.value)}
            />
          </label>
          <label>
            Instructions
            <textarea
              value={updatedInstructions}
              onChange={e => setUpdatedInstructions(e.target.value)}
            />
          </label>
          <label>
            Cuisine
            <select
              value={updatedCuisine}
              onChange={e => setUpdatedCuisine(e.target.value)}
            >
              <option value=''>Select Cuisine</option>
              <option value='Hawaiian'>Hawaiian Cuisine</option>
              <option value='Chinese'>Chinese Cuisine</option>
              <option value='Filipino'>Filipino Cuisine</option>
              <option value='Thai'>Thai Cuisine</option>
            </select>
          </label>
          <button type='submit'>Update</button>
          <button onClick={() => setShowDialog(false)}>Cancel</button>
        </form>
      )}
    </div>
  )
}

export default EditItem
