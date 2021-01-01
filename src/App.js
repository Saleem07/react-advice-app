import React from "react";
import axios from "axios";
import "./App.css";

class App extends React.Component {
  state = { advice: "" };

  componentDidMount() {
    this.fetchAdvice();
  }
  randomDigit = () => {
    return Math.floor(Math.random() * 50) + 1;
  };
  fetchAdvice = async () => {
    try {
      const res = await axios.get(
        `https://api.adviceslip.com/advice/${this.randomDigit()}`
      );

      const data = JSON.parse(res.data + "}");
      const { advice } = data.slip;
      this.setState({ advice });
    } catch (err) {
      this.setState({ advice: "Error... cannot fetch" });
      console.log(err);
    }
  };

  render() {
    //Destructuring advice

    const { advice } = this.state;
    return (
      <div className="app">
        <div className="card">
          <h1 className={`heading ${advice.length > 90 ? "text-size" : ""}`}>
            {advice}
          </h1>
          <button className="button" onClick={this.fetchAdvice}>
            <span>Want Free Advice?</span>
          </button>
        </div>
      </div>
    );
  }
}

export default App;
