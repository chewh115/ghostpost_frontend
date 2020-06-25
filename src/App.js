import React from "react";
import "./App.css";
import { IndividualPost } from "./Components/Post.js";

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

  showBoasts = () => {
    const boastList = this.state.posts.filter(
      (post) => post.boast_or_roast === true
    );
    this.setState({ posts: boastList });
  };

  showRoasts = () => {
    const roastList = this.state.posts.filter(
      (post) => post.boast_or_roast !== true
    );
    this.setState({ posts: roastList });
  };

  showAllPosts = () => {
    fetch("http://127.0.0.1:8000/posts/")
      .then((res) => res.json())
      .then((data) => this.setState({ posts: data }));
  };

  render() {
    return (
      <div>
        <h1>Boasts and Roasts:</h1>
        <a href>Add your own boast or roast</a>
        <br /> <br />
        <button onClick={this.showBoasts}>See only Boasts</button>
        <button onClick={this.showRoasts}>See only Roasts</button>
        <button onClick={this.showAllPosts}>See all posts</button>
        <div>
          {this.state.posts.map((post) => {
            return (
              <div>
                <IndividualPost
                  boast={post.boast}
                  title={post.title}
                  post={post.post}
                  submit_time={post.submit_time}
                  score={post.score}
                  up_votes={post.up_votes}
                  down_votes={post.down_votes}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
