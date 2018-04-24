import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
import { Button as ButtonBoot } from 'styled-button-component';

setOptions({
  addonPanelInRight: true,
  showAddonPanel: false,
});

class Button extends React.Component {
  constructor(props) {
    super();

    this.state = {
      open: false,
    };
  }

  handleOnClickReadme() {
    this.setState({
      open: !this.state.open,
    }, () => {
      setOptions({
        showAddonPanel: this.state.open,
      });
    });
  }

  render() {
    const { open } = this.state;
    return (
      <ButtonBoot style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        fontWeight: 400,
        lineHeight: 1.5,
        fontSize: '1rem',
        marginLeft: '10px',
        marginTop: '8px',
        marginBottom: '-10px',
      }}
      light onClick={() => this.handleOnClickReadme()}>
        {open ? 'Close Readme' : 'Open Readme'}
      </ButtonBoot>
    );
  }
};

const readmeDecorator = (story) => (
  <div>
    <Button />
    {story()}
  </div>
);

const loadStories = () => {
  addDecorator(readmeDecorator);
  require('./stories/');
  // You can require as many stories as you need.
};

configure(loadStories(), module);
