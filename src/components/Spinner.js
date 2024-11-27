import React, { Component } from 'react'
import loading from './loading.gif'
const spinner = () => {
  return (
    <div className='text-center'>
      <img src={loading} alt="hello" />
    </div>
  )
}
export default spinner;
