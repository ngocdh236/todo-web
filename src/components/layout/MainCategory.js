import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
// import { getCategories } from '../../../actions/categoryActions'
import Category from '../common/Category'

class MainCategory extends Component {
  // componentDidMount() {
  //   if (!this.props.auth.isAuthenticated) {
  //     this.props.history.push('/login')
  //   } else {
  //     getCategories().then(categories => {
  //       // this.setState({
  //       //   todos: todos
  //       // })
  //       console.log(categories)
  //     })
  //   }
  // }

  render() {
    return <div><Category></Category></div>
  }
}

// MainCategory.propTypes = {
//   auth: PropTypes.object.isRequired,
//   errors: PropTypes.object
// }

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps)(withRouter(MainCategory))
