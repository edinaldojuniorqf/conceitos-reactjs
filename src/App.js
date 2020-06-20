import './styles.css'
import React, { useState, useEffect } from "react"
import api from './services/api'

function App() {
  const [repositories, setRepositories] = useState([])
  
  async function handleAddRepository() {
    const data = {
      title: `New repo ${Date.now()}`
    }
    api.post('/repositories', data).then(res => {
      setRepositories([
        ...repositories,
        res.data,
      ])
    })
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`).then(() => {
      const index = repositories.findIndex(repo => repo.id === id)
      let othersRepositories = [...repositories]
      othersRepositories.splice(index, 1)
      setRepositories(othersRepositories)
    })
  }

  useEffect(() => {
    api.get('/repositories').then(res => {
      setRepositories(res.data)
    })
  }, [])

  return (
    <div>
      <ul data-testid="repository-list">
        { repositories.map(repo =>
          <li key={repo.title}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  )
}

export default App
