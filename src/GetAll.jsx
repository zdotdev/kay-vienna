import axios from 'axios'
import { useEffect, useState } from 'react'
import DeleteItem from './DeleteItem'
import EditItem from './EditItem'

const GetAll = () => {
  const [data, setData] = useState([]) // Initialize data as an empty array

  useEffect(() => {
    axios
      .get(
        'https://gleeful-bubblegum-71bb8d.netlify.app/.netlify/functions/api'
      )
      .then(response => {
        setData(response.data)
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
