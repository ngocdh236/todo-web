import './App.scss'

import React, { useContext, useState, useEffect } from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

import { ThemeContext } from './contexts/ThemeContext'
import { AuthContext } from './contexts/AuthContext'
import { DataContext } from './contexts/DataContext'
import TodoInfo from './components/TodoInfo'
import Nav from './pages/Nav'
import Register from './pages/Register'
import Login from './pages/Login'
import MainTodo from './pages/MainTodo'
import MainCategory from './pages/MainCategory'
import MainSchedule from './pages/MainSchedule'
import { setAuthToken } from './services/customAxios'

export default function App() {
  const { theme, setLightTheme, setDarkTheme } = useContext(ThemeContext)
  const { data, todoService, categoryService } = useContext(DataContext)
  const { auth, authService } = useContext(AuthContext)

  let user
  const token = localStorage.token

  if (token) {
    setAuthToken(token)
    user = jwt_decode(token)

    const currentTime = Date.now() / 1000
    if (user.exp < currentTime) {
      authService.logout()
    }
  }

  const [showAddNewTodo, setShowAddNewTodo] = useState(false)

  const toggleAddNewTodo = () => {
    setShowAddNewTodo(!showAddNewTodo)
  }

  useEffect(() => {
    switch (localStorage.getItem('theme')) {
      case 'Dark':
        setDarkTheme()
        break
      default:
        setLightTheme()
    }
    authService.setUser(user)
  }, [])

  useEffect(() => {
    if (auth.isAuthenticated) {
      todoService.getAll()
      categoryService.getAll()
    }
  }, [auth.isAuthenticated])

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        auth.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  )

  const onClick = () => {
    theme.isDark ? setLightTheme() : setDarkTheme()
  }

  const ButtonAddNewTodo = () => (
    <div className='d-flex justify-content-end'>
      <button className='button-light mt-4' onClick={toggleAddNewTodo}>
        + New Todo
      </button>
    </div>
  )

  const AddNewTodoPopUp = props => (
    <div className='NewTodoForm d-flex justify-content-center'>
      <div className='new-todo-container' onClick={toggleAddNewTodo} />
      <TodoInfo
        url={props.match.url}
        isNewTodo={true}
        todo={{ title: '' }}
        todoService={todoService}
        categories={data.categories}
        handleCancel={toggleAddNewTodo}
        category={
          data.categoryFilter.category.id > 0
            ? data.categoryFilter.category
            : null
        }
        deadline={data.dateFilter}
      />
    </div>
  )

  return (
    <BrowserRouter>
      <div className='App'>
        <Nav />

        <div className='px-5'>
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <PrivateRoute
            path='/(|categories|schedule)'
            component={ButtonAddNewTodo}
          />
          <PrivateRoute exact path='/' component={MainTodo} />
          <PrivateRoute path='/categories' component={MainCategory} />
          <PrivateRoute exact path='/schedule' component={MainSchedule} />

          {showAddNewTodo && (
            <PrivateRoute
              path='/(|categories|schedule)'
              component={AddNewTodoPopUp}
            />
          )}

          <button id='button-mode' onClick={onClick}>
            {theme.isDark ? <label>Light</label> : <label>Dark</label>}
          </button>
        </div>
      </div>
    </BrowserRouter>
  )
}
