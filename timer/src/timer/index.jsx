import React, { Component } from "react";
import "./style.css";

class Timer extends Component {
  counter = null;
  state = {
    hour: 0,
    min: 0,
    sec: 0,
  };

  incrementValue = () => {
    if (this.state.sec % 59 == 0 && this.state.sec != 0) {
      this.setState(() => {
        // async func
        return {
          min:
            this.state.min % 59 == 0 && this.state.min != 0
              ? 0
              : ++this.state.min,
          sec: 0,
        };
      });

      if (this.state.min == 59) {
        this.setState({ hour: ++this.state.hour });
      }
    } else this.setState({ sec: ++this.state.sec });
  };

  decrementValue = () => {
    if (this.state.hour != 0 || this.state.min != 0 || this.state.sec != 0) {
      if (this.state.sec == 0) {
        this.setState(
          () => {
            return {
              min: this.state.min != 0 ? --this.state.min : 59,
              sec: 59,
            };
          },
          () => {
            if (this.state.min == 59)
              this.setState({ hour: --this.state.hour });
          }
        );
      } else {
        this.setState({ sec: --this.state.sec });
      }
    } else {
      // Nothing to do
    }
  };

  startTimer = () => {
    this.counter = setInterval(() => {
      this.decrementValue();
      if (this.state.hour == 0 && this.state.min == 0 && this.state.sec == 0) {
        clearInterval(this.counter);
        console.log("clear...");
      }
    }, 1000);
  };

  pauseTimer = () => {
    clearInterval(this.counter);
    this.counter = null;
  };

  resetTimer = () => {
    this.setState(() => {
      return {
        hour: 0,
        min: 0,
        sec: 0,
      };
    });
  };

  render() {
    return (
      <div className="container">
        <div className="display">
          <button onClick={this.decrementValue} className="btn">
            -
          </button>
          <span class="hms">{this.state.hour}</span>
          <span class="hms">{this.state.min}</span>
          <span class="hms">{this.state.sec}</span>
          <button onClick={this.incrementValue} className="btn">
            +
          </button>
        </div>
        <div className="control-area">
          <button onClick={this.startTimer} className="btn">
            START
          </button>
          <button onClick={this.pauseTimer} className="btn">
            PAUSE
          </button>
          <button onClick={this.resetTimer} className="btn">
            RESET
          </button>
        </div>
      </div>
    );
  }
}

export default Timer;
