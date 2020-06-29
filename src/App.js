import React from "react";
import "./App.css";
import IndividualPost from "./Components/Post.js";
import SubmitNewPost from "./Components/SubmitNew.js";

const API_HOST = "http://127.0.0.1:8000/posts/";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    fetch(`${API_HOST}`)
      .then((res) => res.json())
      .then((data) => this.setState({ posts: data }));
  }

  showBoasts = () => {
    fetch(`${API_HOST}only_boasts/`)
      .then((res) => res.json())
      .then((data) => this.setState({ posts: data }));
  };

  showRoasts = () => {
    fetch(`${API_HOST}only_roasts/`)
      .then((res) => res.json())
      .then((data) => this.setState({ posts: data }));
  };

  showAllPosts = () => {
    fetch(`${API_HOST}`)
      .then((res) => res.json())
      .then((data) => this.setState({ posts: data }));
  };

  sortByMostLiked = () => {
    let scoreSorted = this.state.posts.sort(function (a, b) {
      return b.score - a.score;
    });
    this.setState({ posts: scoreSorted });
  };

  sortByLeastLiked = () => {
    let scoreSorted = this.state.posts.sort(function (a, b) {
      return a.score - b.score;
    });
    this.setState({ posts: scoreSorted });
  };

  render() {
    return (
      <div>
        <h1>Boasts and Roasts:</h1>
        <SubmitNewPost />
        <br /> <br />
        <button onClick={this.showBoasts}>See only Boasts</button>
        <button onClick={this.showRoasts}>See only Roasts</button>
        <button onClick={this.showAllPosts}>See all posts</button>
        <button onClick={this.sortByMostLiked}>Sort posts by most liked</button>
        <button onClick={this.sortByLeastLiked}>
          Sort posts by least liked
        </button>
        <div>
          {this.state.posts.map((post) => {
            return (
              <IndividualPost
                id={post.id}
                boast={post.boast}
                title={post.title}
                post={post.post}
                submit_time={post.submit_time}
                score={post.score}
                up_votes={post.up_votes}
                down_votes={post.down_votes}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
