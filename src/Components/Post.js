import React, { Component } from "react";

export class IndividualPost extends Component {
  render() {
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
  }
}
