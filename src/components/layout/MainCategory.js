import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getCategories } from '../../actions/categoryActions'
import Category from '../common/Category'
import MainTodo from './MainTodo'
import '../../styles/MainCategory.scss'

class MainCategory extends Component {
  constructor() {
    super()
    this.state = {
      categoryList: []
    }
  }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/login')
    } else {
      getCategories().then(categoryList => {
        this.setState({
          categoryList: categoryList
        })
      })
    }
  }

  render() {
    var categoryList = this.state.categoryList.map(category => {
      return <Category key={category.id} category={category} />
    })

    return (
      <div className='MainCategory'>
        <div className='category-list'>{categoryList}</div>
        <MainTodo />
      </div>
    )
  }
}

MainCategory.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps)(withRouter(MainCategory))
