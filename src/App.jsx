import './App.css'
import GetAll from './GetAll'
import AddRecipe from './AddRecipe'

const App = () => {
  return (
    <div>
      <h1>Recipes</h1>
      <AddRecipe />
      <GetAll />
    </div>
  )
}

export default App
