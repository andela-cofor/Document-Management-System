/*import React, { Component } from 'react';
import Tour from 'react-user-tour';

export default class UserTour extends Component {
  constructor() {
    super();
    this.state = {
      isTourActive: true,
      tourStep: 1
    };
  }

  render() {
    return (
      <div>
        <Tour
          active={this.state.isTourActive}
          step={this.state.tourStep}
          onNext={step => this.setState({ tourStep: step })}
          onBack={step => this.setState({ tourStep: step })}
          onCancel={() => this.setState({ isTourActive: false })}
          steps={[
            {
              step: 1,
              selector: '.nav-wrapper',
              title: <div style={{ color: 'blue' }}>My Web</div>,
              body: <div style={{ color: 'green' }}>Site</div>
            },
            {
              {/*step: 2,
              selector: '.my-website-is-amazing',
              title: <div style={{ color: 'blue' }}>Wow</div>,
              body: <div style={{ color: 'yellow' }}>so good</div>*/}
            }
          ]}
        />
      </div>
    );
  }
}*/
