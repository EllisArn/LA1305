import React, { useState, useEffect } from 'react'
import { getDocs, collection } from 'firebase/firestore'
import { db } from './firebase.js'
import auth from './auth.jsx'

auth()

function Home() {
  const portfolioRef = collection(db, 'portfolios')
  const [portfolios, setPortfolios] = useState([])
  useEffect(() => {
    async function getPortfolios() {
      const data = await getDocs(portfolioRef)
      setPortfolios(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getPortfolios()
  }, [])
  console.log(portfolios)
  return (
    <div>
      <h1>Portfolios</h1>
      <ul>
        {portfolios.map((portfolio) => (
          <li key={portfolio.id}>
            <a href={`/portfolios/#/${portfolio.id}`}>{portfolio.id}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default Home
