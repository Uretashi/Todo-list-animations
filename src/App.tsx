import React from 'react';

import logo from './logo.svg';
import './App.css';

export default class App extends React.Component {
  
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <TodoList />
      </div>
    )
  }
}
