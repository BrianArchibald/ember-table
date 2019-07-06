import Service from '@ember/service';
import { later } from '@ember/runloop'
import { inject } from '@ember/service';
import { shuffle } from 'ember-composable-helpers/helpers/shuffle'

export default Service.extend({
  store: inject(),

  init() {
    this._super(...arguments);

    this.seedTeams();

    later(this, this.simulateGame, 1000);
  },

  seedTeams() {
    let teamNames = ['Manchester', 'Team2', 'Team3'];

    for(let i=0; i<teamNames.length; i++) {
      this.store.createRecord('team', { id: i, name: teamNames[i] });
    }

  },

  simulateGame() {

    let teams = this.store.peekAll('team');

    let shuffledTeams = shuffle(teams);

    let homeTeam = shuffledTeams[0];
    let awayTeam = shuffledTeams[1];

    let homeGoals = this.randomScore(4);
    let awayGoals = this.randomScore(3);

    console.log({homeGoals, awayGoals});
  },

  randomScore(maximumGoals) {
    return Math.round((Math.random() * maximumGoals))
  }
});
