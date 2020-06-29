import React from "react";

const API_HOST = "http://127.0.0.1:8000/posts/";

class SubmitNewPost extends React.Component {
  handleBoastOrRoast = () => {
    this.setState({ boast_or_roast: true });
  };

  handleTitle = (e) => {
    this.setState({ title: e.target.value });
  };

  handlePost = (e) => {
    this.setState({ post: e.target.value });
  };

  // This was very helpful with figuring out the correct headers: https://jasonwatmore.com/post/2020/02/01/react-fetch-http-post-request-examples
  handleCreate = () => {
    fetch(API_HOST, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        boast_or_roast: this.state.boast_or_roast,
        title: this.state.title,
        post: this.state.post,
      }),
    }).then((res) => console.log(res));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.handleCreate();
    console.log(this.state);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label for="boastOrRoast">Select if this is a boast: </label>
        <input
          type="radio"
          name="boastOrRoast"
          value={this.props.boast_or_roast}
          onChange={this.handleBoastOrRoast}
        />
        <label for="title"> Title: </label>
        <input
          type="text"
          name="title"
          value={this.props.title}
          onChange={this.handleTitle}
        />
        <label for="post"> Your post: </label>
        <input
          type="text"
          name="post"
          value={this.props.post}
          onChange={this.handlePost}
        />
        <button type="submit">Submit new post</button>
      </form>
    );
  }
}

export default SubmitNewPost;
