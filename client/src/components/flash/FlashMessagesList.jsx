import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlashMessage from './FlashMessage';


/**
 * @class FlashMessagesList
 * @extends {Component}
 */
class FlashMessagesList extends Component {
  /**
   * @returns {object} message
   * @memberof FlashMessagesList
   */
  render() {
    const messages = this.props.messages.map(message =>
      <FlashMessage key={message.id} message={message} />
    );
    return (
      <div>
      {messages}
      </div>
    )
  }
}

FlashMessagesList.propTypes = {
  messages: React.PropTypes.array.isRequired
};


/**
 * @param {any} state
 * @returns {object} message
 */
function mapStateToProps(state) {
  return {
    messages: state.flashMessages
  };
}

export default connect(mapStateToProps)(FlashMessagesList);
