import React, { Component } from "react";
import { Form, Modal, Button } from "semantic-ui-react";

class Add extends Component {
  initialState = {
    post: {
      post: "",
      category: "",
    },
  };

  state = this.initialState;

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      post: { ...this.state.post, [name]: value },
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { post, category } = this.state.post;
    const { addRow } = this.props;

    const newPost = {
      post,
      category,
    };

    addRow(newPost);
    this.setState(this.initialState);
  };

  render() {
    const { post, category } = this.state.post;

    return (
      <Modal trigger={<Button content="Add New Post" />} closeIcon>
        <Modal.Header>Add New User</Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field>
              <Form.Input
                label="Post Name"
                name="post"
                value={post}
                onChange={this.handleChange}
                autoFocus={true}
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                label="Category"
                name="category"
                value={category}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Button
              type="submit"
              content="Submit"
              disabled={!post || !category}
            />
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

export default Add;
