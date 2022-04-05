import React from 'react';
import { Link, Route,  Routes } from 'react-router-dom';
import './App.css';
import Home from './Home';
import TodoListCss from './todo-list-folder/todo-list-css';
import TodoListCssClass from './todo-list-folder/todo-list-css-class';
import TodoListLibrary from './todo-list-folder/todo-list-library';


export default class App extends React.Component {
  
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <>
          <header className="">
            <span>
              <Link to="/">Accueil</Link>
            </span>
          </header>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/todo-list-css" element={<TodoListCss />} />
            <Route path="/todo-list-css-class" element={<TodoListCssClass />} />
            <Route path="/todo-list-library" element={<TodoListLibrary />} />
          </Routes>
        </>
      </div>
    )
  }
}
