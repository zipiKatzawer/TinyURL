import './App.css'
import React from 'react';
import ClicksBySource from './components/ClicksBySource.jsx';
import TotalClicksByUser from './components/TotalClicksByUser.jsx';
import ClicksByDay from './components/ClicksByDay.jsx';
function App() {

  return (
    <div className="App">
    <h1>TinyURL Analytics</h1>
    <h2>Clicks by Source</h2>
    <ClicksBySource linkId="666258f31601be7469cd3fec" />

    <h2>Total Clicks by User</h2>
    <TotalClicksByUser userId="66607c545e99e16d9be925ac" />
    {/* 666257ba71e9969aa18215ab */}
    <h2>Clicks by Day of the Week</h2>
    <ClicksByDay userId="666257ba71e9969aa18215ab" />
  </div>
  )
}

export default App
