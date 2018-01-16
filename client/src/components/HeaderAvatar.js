import React, {Component} from 'react'
import Avatar from 'material-ui/Avatar'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class HeaderAvatar extends Component {

    render() {
        const name = this.props.name
        return(
            <Avatar size={33}>{name[0]}</Avatar>
        )
    }
}

HeaderAvatar.propTypes = {
    name: PropTypes.string
}

function mapStateToProps (state) {
    return {
      name: state.user.user.name
    }
}

export default connect(mapStateToProps)(HeaderAvatar)