import './App.css';
import Navbar from './components/navbar';
import React, { useState } from 'react'
import News from './components/news';
import { Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
const App = (props) => {
  const [progress, setProgress] = useState();
  const prog = (progress) => {
    setProgress({ progress: progress + 1 })
  }
  return (
    <>
      <Navbar title="NewsBar" />
      <LoadingBar
        color='#f11946'
        progress={progress}
      />
      <Routes>
        <Route exact path="/" element={<News category='general' prog={setProgress} />} />
        <Route path="/business" element={<News category='business' setProgress={setProgress} />} />
        <Route path="/entertainment" element={<News category='entertainment' setProgress={setProgress} />} />
        <Route path="/health" element={<News category='health' setProgress={setProgress} />} />
        <Route path="/science" element={<News category='science' setProgress={setProgress} />} />
        <Route path="/sports" element={<News category='sports' setProgress={setProgress} />} />
        <Route path="/technology" element={<News category='technology' setProgress={setProgress} />} />
      </Routes>
    </>
  )
}

export default App;
