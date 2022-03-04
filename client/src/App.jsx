import { useEffect, useState } from 'react';
import './App.scss';
import Header from './comp/Header';
import Main from './Main';

function App() {
  const [userSession, setUserSession] = useState([])
  useEffect(() => {
    (async () => {
      const res2 = await fetch('http://localhost:1000/users/userSession', {
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      })
      const data2 = await res2.json()
      setUserSession(data2)
    })();
  }, [])
  return (
    <div className="App">
      <Header userSession={userSession}/>
      <Main userSession={userSession}/>
    </div>
  );
}

export default App;
