import React, { Component, Fragment } from 'react';
import Chrono from './Chrono'
import './style.css';

import "https://use.fontawesome.com/releases/v5.3.1/js/all.js";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sessionLength: 25,
      breakLength: 5,
      currentTime: 1500,
      playing: false,
      type: true,
      time: 0
    }

    this.addTime = this.addTime.bind(this)
    this.subTime = this.subTime.bind(this)
    this.sub = this.sub.bind(this)
    this.play = this.play.bind(this)
    this.reset = this.reset.bind(this)
  }

  //ajoute du temps à currentTime ou breakTime
  addTime = (e, cible) => {
    const what = e.target.id
    what === 'session-increment' && this.state.sessionLength < 60 && this.state.playing === false ?
      this.setState({
        sessionLength: this.state.sessionLength += 1,
        currentTime: this.state.sessionLength * 60
      })
      : null
    what === 'break-increment' && this.state.breakLength < 60 && this.state.playing === false ?
      this.setState({ breakLength: this.state.breakLength += 1 })
      : null
  }

  //soustrait du temps à currentTime ou breakTime
  subTime = (e, cible) => {
    const what = e.target.id
    what === 'session-decrement' && this.state.sessionLength > 1 && this.state.playing === false ?
      this.setState({
        sessionLength: this.state.sessionLength -= 1,
        currentTime: this.state.sessionLength * 60
      })
      : null
    what === 'break-decrement' && this.state.breakLength > 1 && this.state.playing === false ?
      this.setState({ breakLength: this.state.breakLength -= 1 })
      : null
  }

  //soustrait 1 à currentTime
  sub() {
    this.setState({ currentTime: this.state.currentTime - 1 })
    console.log('Tick')
  }

  //reset de l'app
  reset = () => {
    clearInterval(this.timer);
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      playing: false,
      currentTime: 1500,
    })
    console.log('Reset')
  }

  //gere le boutton play/pause
  play() {
    !this.state.playing ? (
      this.timer = setInterval(this.sub, 100),
      this.setState({ playing: !this.state.playing })
    )
      : (clearInterval(this.timer),
        this.setState({ playing: !this.state.playing })
      )
  }

  componentDidUpdate() {
    let timeLeft = this.state.currentTime

    timeLeft === 0 && this.state.playing ?
      this.setState({
        currentTime: this.state.breakLength * 60,
        type: !this.state.type
      })
      : null

    timeLeft === 0 && !this.state.playing ?
      this.setState({
        currentTime: this.state.sessionLength * 60,
        type: !this.state.type
      })
      : null

    this.state.currentTime === 0 && this.state.playing ?
      this.setState({ playing: !this.state.playing })
      : null
  }

  render() {

    return (
      <Fragment>
        <div className="hero is-fullheight">
          <div className="hero-body">
            <div className="container">
              <div className="card">
                <div className="card-header">
                  <div className="card-header-title">
                    <h1 className="title">PomodoroClock</h1>
                  </div>
                </div>
                <div className="card-content">
                  <div className="session-time-block has-text-centered card">
                    <div className="card-header">
                      <div className="card-header-title">
                        <p id="session-label" className="subtitle">Session Length</p>
                      </div>
                    </div>
                    <div className="card-content">
                      <div className="buttons is-centered">
                        <button id="session-decrement" onClick={this.subTime} data-cible='session' className="button is-rounded">- TIME -
                  </button>
                        <button id="session-increment" onClick={this.addTime} data-cible='session' className="button is-rounded">+ TIME +
                  </button>
                      </div>
                      <p id="session-length" className="title">{this.state.sessionLength}</p>
                    </div>
                  </div>
                  <br />
                  <div className="break-length-block block has-text-centered card">
                    <div className="card-header">
                      <div className="card-header-title">
                        <p id="break-label" className="subtitle">Break Length</p>
                      </div>
                    </div>
                    <div className="card-content">
                      <div className="buttons is-centered">
                        <button id="break-decrement" onClick={this.subTime} data-cible='break' className="button is-rounded">- TIME -
                  </button>
                        <button id="break-increment" onClick={this.addTime} data-cible='break' className="button is-rounded">+ TIME +
                  </button>
                      </div>
                      <p id="break-length" className="title">{this.state.breakLength}</p>
                    </div>
                  </div>

                  <div className="buttons is-centered are-large">
                    <button id="start_stop" onClick={this.play} data-cible='session' className="button is-info">play/pause</button>
                    <button id="reset" onClick={this.reset} className="button is-danger">reset</button>
                  </div>
                  <Chrono time={this.state.currentTime} />
                  <p id="timer-label" className="subtitle has-text-centered">{this.state.type ? `session` : ' break'}</p>
                  <p className='subtitle'>this State Time: {this.state.time}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment >
    )
  }

}

export default App;