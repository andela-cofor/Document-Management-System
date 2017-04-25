import React, { Component } from 'react';
import classnames from 'classnames';

class FlashMessage extends Component {
  render() {
    const { id, type, text } = this.props.message;
    return (
      <div className={classnames('alert', {
        'alert-success': type === 'success',
        'alert-danger': type === 'error'
      })}
      >
        {text}
      </div>
    );
  }
}

FlashMessage.propTYpes = {
  message: React.PropTypes.object.isRequired
};

export default FlashMessage;
