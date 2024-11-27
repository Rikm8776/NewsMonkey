import './App.css';
import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  apiKey = process.env.REACT_APP_NEWS_API
  state={
    progress:0
  }
  progressHandler=(value)=>{
    this.setState({
      progress:value,
    })
  }
  render() {
    return (
      <div>
        <Router>
        <LoadingBar
        height={3}
        color='#f11946'
        progress={this.state.progress}
        onLoaderFinished={() => this.setState({ progress: 0 })}
      />
          <NavBar />
          <Routes>
          <Route exact path="/" element={<News apiKey={this.apiKey} progressHandler={this.progressHandler} key="general"/>} />
          <Route exact path="/business" element={<News apiKey={this.apiKey} progressHandler={this.progressHandler} key="business" category="business"/>} />
          <Route exact path="/health" element={<News apiKey={this.apiKey} progressHandler={this.progressHandler} key="health" category="health"/>} />
          <Route exact path="/science" element={<News apiKey={this.apiKey} progressHandler={this.progressHandler} key="science" category="science"/>} />
          <Route exact path="/entertainment" element={<News apiKey={this.apiKey} progressHandler={this.progressHandler} key="entertainment" category="entertainment"/>} />
          <Route exact path="/sports" element={<News apiKey={this.apiKey} progressHandler={this.progressHandler} key="sports" category="sports"/>} />
          <Route exact path="/technology" element={<News apiKey={this.apiKey} progressHandler={this.progressHandler} key="technology" category="technology"/>} />
          </Routes>
        </Router>
      </div>
    )
  }
}
