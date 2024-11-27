import './App.css';
import React, { useState } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

function App() {
  const apiKey = process.env.REACT_APP_NEWS_API
  const [progress, setProgress] = useState(0)

  return (
    <div>
      <Router>
        <LoadingBar
          height={3}
          color='#f11946'
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
        <NavBar />
        <Routes>
          <Route exact path="/" element={<News apiKey={apiKey} setProgress={setProgress} key="general" />} />
          <Route exact path="/business" element={<News apiKey={apiKey} setProgress={setProgress} key="business" category="business" />} />
          <Route exact path="/health" element={<News apiKey={apiKey} setProgress={setProgress} key="health" category="health" />} />
          <Route exact path="/science" element={<News apiKey={apiKey} setProgress={setProgress} key="science" category="science" />} />
          <Route exact path="/entertainment" element={<News apiKey={apiKey} setProgress={setProgress} key="entertainment" category="entertainment" />} />
          <Route exact path="/sports" element={<News apiKey={apiKey} setProgress={setProgress} key="sports" category="sports" />} />
          <Route exact path="/technology" element={<News apiKey={apiKey} setProgress={setProgress} key="technology" category="technology" />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;