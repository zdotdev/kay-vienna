import axios from 'axios'
import { useEffect, useState } from 'react'
import DeleteItem from './DeleteItem'
import EditItem from './EditItem'

// Define a function to compare two items based on their cuisine
function sortByCuisine (a, b) {
  if (a.cuisine < b.cuisine) {
    return -1
  }
  if (a.cuisine > b.cuisine) {
    return 1
  }
  return 0 // If both cuisines are equal, no change in order
}

const GetAll = () => {
  const [data, setData] = useState([]) // Initialize data as an empty array

  useEffect(() => {
    axios
      .get(
        'https://gleeful-bubblegum-71bb8d.netlify.app/.netlify/functions/api'
      )
      .then(response => {
        // Sort the data by cuisine before setting it
        const sortedData = response.data.sort(sortByCuisine)
        setData(sortedData)
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  return (
    <div>
      <ul>
        {data.map(item => (
          <li key={item._id}>
            <p>{item.name}</p>
            <p>{item.ingredients}</p>
            <p>{item.instructions}</p>
            <p>{item.cuisine} Cuisine</p>
            <DeleteItem _id={item._id} />
            <EditItem itemId={item._id} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default GetAll
