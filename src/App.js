import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    fetch("http://127.0.0.1:8000/posts/")
      .then((res) => res.json())
      .then((data) => this.setState({ posts: data }));
  }

  render() {
    return (
      <div>
        <h1>Boasts and Roasts:</h1>
        <div>
          {this.state.posts.map((post) => {
            return (
              <React.Fragment>
                <h3>{post.title}</h3>
                <p>{post.post}</p>
                <p>{post.submit_time}</p>
                <button>Up Vote {post.up_votes}</button>
                <button>Down Vote {post.down_votes}</button>
                <br />
              </React.Fragment>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
