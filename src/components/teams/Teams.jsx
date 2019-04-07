import React, { Component } from 'react';
import './teams.scss';

class Teams extends Component {
  state = {
    teams: [],
    error: false,
    loaded: false
  }

  async componentDidMount() {
    try {
      const res = await fetch('http://localhost:3030/teams');
      const jsonData = await res.json();

      setTimeout(()=>{ // Just for the thrills
        this.setState({ teams: jsonData, loaded: true });
      }, (Math.random() * 1000) + 500);
    }
    catch(err) {
      console.error(err);
      this.setState({ error: err });
    }
  }

  render() {
    const { teams, loaded, error } = this.state;
    if (error) {
      return <h2>Sorry, There's been an error loading our data.</h2>
    }
    if (loaded) {
      const teamsWithImages = teams.with_images;
      const twiKeys = Object.keys(teamsWithImages);
      const teamsWithoutImages = teams.no_images;

      return (
        <React.Fragment>
          <h2 className="page-title">Teams</h2>
          <div className="teams-container">
          {twiKeys.map(key => (
            <Teams.Card
              key={key}
              teamName={teamsWithImages[key].name}
              teamImages={teamsWithImages[key].images}
            />
          ))}
          {teamsWithoutImages.map((teamName, idx) => (
            <Teams.Card
              key={idx}
              teamName={teamName}
            />
          ))}
          </div>
        </React.Fragment>
      );
    }
    else {
      return (
        <p>Loading teams...</p>
      );
    }
  }

  static Card = props => {
    const { teamName, teamImages } = props;
    const teamImage = teamImages && teamImages.length > 0
    ? teamImages[0]
    : './football.png';

    return (
      <div className="team-card">
        <img src={teamImage} alt="Team Logo" className="team-card__logo"/>
        <p className="team-card__name">{teamName}</p>
      </div>
    );
  };
}

export default Teams;