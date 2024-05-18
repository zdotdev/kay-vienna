import axios from 'axios'
import { useState } from 'react'

function AddRecipe () {
  const [data, setData] = useState([])
  const [name, setName] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [instructions, setInstructions] = useState('')
  const [cuisine, setCuisine] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e, _id = null) => {
    e.preventDefault()

    if (
      !name.trim() ||
      !ingredients.trim() ||
      !instructions.trim() ||
      !cuisine.trim()
    ) {
      setError('All fields are required')
      return
    }

    const url = _id
      ? `https://gleeful-bubblegum-71bb8d.netlify.app/.netlify/functions/api/${_id}`
      : `https://gleeful-bubblegum-71bb8d.netlify.app/.netlify/functions/api`
    const method = _id ? 'put' : 'post'

    try {
      const response = await axios[method](url, {
        name,
        ingredients,
        instructions,
        cuisine
      })

      if (_id) {
        setData(data.map(item => (item._id === _id ? response.data : item)))
      } else {
        setData([...data, response.data])
      }

      setName('')
      setIngredients('')
      setInstructions('')
      setCuisine('')
      setError(null)
    } catch (error) {
      console.error(error.response?.data?.message || error.message)
      setError('An error occurred while saving the recipe.')
    }
    window.location.reload()
  }

  return (
    <div>
      <form onSubmit={e => handleSubmit(e)}>
        <label>
          Name
          <input
            type='text'
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </label>

        <label>
          Ingredients
          <textarea
            value={ingredients}
            onChange={e => setIngredients(e.target.value)}
          />
        </label>

        <label>
          Instructions
          <textarea
            value={instructions}
            onChange={e => setInstructions(e.target.value)}
          />
        </label>

        <label>
          Cuisine
          <select value={cuisine} onChange={e => setCuisine(e.target.value)}>
            <option value=''>Select Cuisine</option>
            <option value='Hawaiian'>Hawaiian Cuisine</option>
            <option value='Chinese'>Chinese Cuisine</option>
            <option value='Filipino'>Filipino Cuisine</option>
            <option value='Thai'>Thai Cuisine</option>
          </select>
        </label>
        <button type='submit'>Save</button>
      </form>
      {error && <div className='error'>{error}</div>}
    </div>
  )
}

export default AddRecipe
