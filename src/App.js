import React from "react";
import "./App.css";

const API_HOST = "http://localhost:8000/posts/";

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

  sortByScore = () => {
    let scoreSorted = this.state.posts.sort(function (a, b) {
      return b.score - a.score;
    });
    this.setState({ posts: scoreSorted });
  };

  upvotePost = (id) => {
    fetch(`${API_HOST}${id}/up_vote`);
  };

  downvotePost = (id) => {
    fetch(`${API_HOST}${id}/down_vote`);
  };

  render() {
    return (
      <div>
        <h1>Boasts and Roasts:</h1>
        <p>Add your own boast or roast</p>
        <br /> <br />
        <button onClick={this.showBoasts}>See only Boasts</button>
        <button onClick={this.showRoasts}>See only Roasts</button>
        <button onClick={this.showAllPosts}>See all posts</button>
        <button onClick={this.sortByScore}>Sort posts by score</button>
        <div>
          {this.state.posts.map((post) => {
            return (
              <div className={post.boast ? "boast" : "roast"} key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.post}</p>
                <p>Submitted at {post.submit_time}</p>
                <p>Total score: {post.score}</p>
                <button onClick={this.upvotePost(post.id)}>
                  Up Vote {post.up_votes}
                </button>
                <button onClick={this.downvotePost(post.id)}>
                  Down Vote {post.down_votes}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
