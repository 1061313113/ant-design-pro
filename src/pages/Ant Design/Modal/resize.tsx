import { Button, Modal } from 'antd';
import React from 'react';
import Draggable from 'react-draggable';
import { Resizable } from 'react-resizable';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      width: 520,
      height: 400,
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

  render() {
    const { open, width, height } = this.state;
    return (
      <>
        <Button onClick={this.showModal}>Open Draggable and Resizable Modal</Button>
        <Modal
          title="Draggable and Resizable Modal"
          open={open}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          modalRender={(modal) => (
            <Draggable>
              <Resizable
                width={width}
                height={height}
                onResizeStop={(e, direction, ref) => {
                  this.setState({
                    width: ref.style.width,
                    height: ref.style.height,
                  });
                }}
              >
                <div ref={this.draggleRef}>{modal}</div>
              </Resizable>
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
