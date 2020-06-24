import React, { Component } from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import { Input, Container } from "semantic-ui-react";
import Add from "./components/Add";
import View from "./components/View";

class App extends Component {
  initialState = {
    post: [
      { post: "hello", category: "floppydiskette" },
      { post: "beginner", category: "zeitgeist" },
      { post: "Pro", category: "siliconeidolon" },
    ],
    results: [],
    query: "",
  };

  state = this.initialState;

  componentDidUpdate(prevProps, prevState) {
    if (prevState.post !== this.state.post) {
      this.resetSearch();
    }
  }

  search = (event) => {
    const { post } = this.state;
    const { value } = event.target;

    this.setState({ query: value });

    const results = post.filter((post) => {
      const regex = new RegExp(value, "gi");
      return post.post.match(regex) || post.category.match(regex);
    });

    this.setState({ results });
  };

  resetSearch = () => {
    const { post, query } = this.state;

    const results = post.filter((post) => {
      const regex = new RegExp(query, "gi");
      return post.post.match(regex) || post.category.match(regex);
    });

    this.setState({ results });
  };

  getUserById = (id) => {
    const { post } = this.state;

    const u = post.filter((post) => post.post === id);

    return u[0];
  };

  addRow = (posts) => {
    const { post } = this.state;

    this.setState({ post: [...post, posts] });
  };

  updateRow = (id, postUpdate) => {
    const { post } = this.state;

    this.setState({
      post: post.map((post) => (post.post === id ? postUpdate : post)),
    });
  };

  deleteRow = (id) => {
    const { post } = this.state;

    this.setState({
      post: post.filter((post) => post.post !== id),
    });
  };

  render() {
    const { post, results, query } = this.state;
    const data = results.length === 0 && !query ? post : results;

    return (
      <Container>
        <Add addRow={this.addRow} />
        <View
          data={data}
          deleteRow={this.deleteRow}
          updateRow={this.updateRow}
          getUserById={this.getUserById}
        />
      </Container>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
