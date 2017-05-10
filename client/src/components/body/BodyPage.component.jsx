import React, { Component } from 'react';
import { connect } from 'react-redux';

class BodyPage extends Component {
  /**
   * @returns {object} cards
   * @memberof Navbar
   */
  render() {
    return (
      <div>
        { window.location.pathname === '/app/'
        ? <div className="image">
          <img src="../../../image/books-659690_1280.jpg" alt="" />
        </div>
        : <h4 />
        }
      </div>
    );
  }
}

export default BodyPage;
