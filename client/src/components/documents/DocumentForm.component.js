import React, { Component } from 'react';

class DocumentForm extends Component {
  constructor(props) {
    super(props);
  }

  /**
   * renders the Login component
   * @returns {void}
   * @memberOf Login
   */
  render() {
    this.props.userDocumentRequest().then((res) => {
      console.log(res);
    });
    return (
      <div class="row">
        <div class="col s12 m7">
          <div class="card">
            <div class="card-image">
              <img src="images/sample-1.jpg">
              <span class="card-title">Card Title</span>
            </div>
            <div class="card-content">
              <p>I am a very simple card. I am good at containing small bits of information.
              I am convenient because I require little markup to use effectively.</p>
            </div>
            <div class="card-action">
              <a href="#">This is a link</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DocumentForm.propTypes = {
  userDocumentRequest: React.PropTypes.func.isRequired
};

export default DocumentForm;
