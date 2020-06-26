import React from "react";
import "./App.css";

const API_HOST = "http://localhost:8000";

let _csrfToken = null;

async function getCsrfToken() {
  if (_csrfToken === null) {
    const response = await fetch(`${API_HOST}/csrf/`, {
      credentials: "include",
    });
    const data = await response.json();
    _csrfToken = data.csrfToken;
  }
  return _csrfToken;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    fetch(`${API_HOST}/posts/`)
      .then((res) => res.json())
      .then((data) => this.setState({ posts: data }));
  }

  showBoasts = () => {
    fetch(`${API_HOST}/posts/only_boasts/`)
      .then((res) => res.json())
      .then((data) => this.setState({ posts: data }));
  };

  showRoasts = () => {
    fetch(`${API_HOST}/posts/only_roasts/`)
      .then((res) => res.json())
      .then((data) => this.setState({ posts: data }));
  };

  showAllPosts = () => {
    fetch(`${API_HOST}/posts/`)
      .then((res) => res.json())
      .then((data) => this.setState({ posts: data }));
  };

  sortByScore = () => {
    let scoreSorted = this.state.posts.sort(function (a, b) {
      return b.score - a.score;
    });
    this.setState({ posts: scoreSorted });
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
        <button onClick={this.sortByScore}>Sort posts by score</button>
        <div>
          {this.state.posts.map((post) => {
            return (
              <div className={this.props.boast ? "boast" : "roast"}>
                <h3>{this.props.title}</h3>
                <p>{this.props.post}</p>
                <p>Submitted at {this.props.submit_time}</p>
                <p>Total score: {this.props.score}</p>
                <button>Up Vote {this.props.up_votes}</button>
                <button>Down Vote {this.props.down_votes}</button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
