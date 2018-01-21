import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Particles from 'react-particles-js'
import ParticleSettings from '../assets/particleSettings'

class Home extends Component {
  render() {
    return (
      <div className="flex flex-col">
      <Particles
      params={
        ParticleSettings
      }
        canvasClassName="particles"
      />
      <div className="hf-icon"></div>
        <div className="card h-24">
          <span className="text-4xl home-title"> Hide&Fee </span>
          <span className="text-base subtitle"> Find the hidden fees in every cryptocurrency transaction.</span>
        </div>
        <div className="card">
          <Link to="/dashboard" className="btn mb-8">
            Buy a Coin
          </Link>
          <Link to="/dashboard" className="btn">
            Sell a Coin
          </Link>
        </div>
      </div>
    );
  }
}

export default Home;
