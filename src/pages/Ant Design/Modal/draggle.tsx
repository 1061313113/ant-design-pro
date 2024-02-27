import { Button, Modal } from 'antd';
import React from 'react';
import Draggable from 'react-draggable';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      disabled: true,
      bounds: { left: 0, top: 0, bottom: 0, right: 0 },
    };
    this.draggleRef = React.createRef();
  }

  showModal = () => {
    this.setState({ open: true });
  };

  handleOk = (e) => {
    console.log(e);
    this.setState({ open: false });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({ open: false });
  };

  onStart = (_event, uiData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = this.draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    this.setState({
      bounds: {
        left: -targetRect.left + uiData.x,
        right: clientWidth - (targetRect.right - uiData.x),
        top: -targetRect.top + uiData.y,
        bottom: clientHeight - (targetRect.bottom - uiData.y),
      },
    });
  };

  render() {
    const { open, disabled, bounds } = this.state;
    return (
      <>
        <Button onClick={this.showModal}>Open Draggable Modal</Button>
        <Modal
          title={
            <div
              style={{
                width: '100%',
                cursor: 'move',
              }}
              onMouseOver={() => {
                if (disabled) {
                  this.setState({ disabled: false });
                }
              }}
              onMouseOut={() => {
                this.setState({ disabled: true });
              }}
              onFocus={() => {}}
              onBlur={() => {}}
            >
              Draggable Modal
            </div>
          }
          open={open}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          modalRender={(modal) => (
            <Draggable disabled={disabled} bounds={bounds} onStart={this.onStart}>
              <div ref={this.draggleRef}>{modal}</div>
            </Draggable>
          )}
        >
          <p>
            Just don't learn physics at school and your life will be full of magic and miracles.
          </p>
          <br />
          <p>Day before yesterday I saw a rabbit, and yesterday a deer, and today, you.</p>
        </Modal>
      </>
    );
  }
}

export default App;
