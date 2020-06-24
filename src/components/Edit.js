import React, { Component } from "react";
import { Form, Modal, Button } from "semantic-ui-react";

class Edit extends Component {
  initialState = {
    form: {
      post: "",
      category: "",
    },
  };

  state = this.initialState;

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.id !== this.props.id) {
      const post = this.props.getUserById(this.props.id);

      this.setState({
        form: {
          post: post.post,
          username: post.category,
        },
      });
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      form: { ...this.state.form, [name]: value },
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { post, category } = this.state.form;
    const { updateRow } = this.props;

    const updatedPost = {
      post,
      category,
    };

    updateRow(this.props.id, updatedPost);
    this.props.onClose();
  };

  render() {
    const { post, category } = this.state.form;
    const { isOpen, onClose } = this.props;

    return (
      <Modal open={isOpen} onClose={onClose} closeIcon>
        <Modal.Header>Edit User</Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field>
              <Form.Input
                label="Post Name"
                name="post"
                value={post}
                onChange={this.handleChange}
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
            <Button type="submit" content="Submit" />
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

export default Edit;
