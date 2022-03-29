import { Component } from '@angular/core';

interface Faction {
  name: string;
}

interface player {
  id : number,
  faction : string,
  inHand : number,
  popularity : number,
  stars : number,
  territories : number,
  resources : number,
  structureBonus : number,
  score : number,
  workersMechsStructures : number
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'angular-scythe-scorer';
  playerCount = 0;

  // Keeps tracks of players with unselected faction
  shibaCount = 0;

  playerCountButtonPressed = false;
  calculateButtonPressed = false;

  highestScore = -1;
  winnerId = 0;
  tiedPlayerIds = <number[]>[];
  tieBreakerNeeded = false;

  availableFactions: Faction[] = [
    {name: 'Crimea'},
    {name: 'Nordic'},
    {name: 'Polania'},
    {name: 'Rusviet'},
    {name: 'Saxony'},
    {name: 'Albion'},
    {name: 'Togawa'}
  ];
  selectedFactions = new Set<string>();

  players: player[] = [
    {
      id : 1,
      faction : 'Shiba',
      inHand : 0,
      popularity : 0,
      stars : 0,
      territories : 0,
      resources : 0,
      structureBonus : 0,
      score : 0,
      workersMechsStructures : 0
    }
  ];

  goToBottom() {
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 100);
  }

  onInputPlayerCount(target: EventTarget) {
    const value = (target as HTMLInputElement).value;
    const parsedValue = parseInt(value);

    if(Number.isInteger(parsedValue)) {
      this.playerCount = parsedValue;
    }
    else this.playerCount = 0;
  }

  onClickOnePlayer() {
    this.playerCount = 1;
    this.onClickPlayerCount();
  }

  onClickPlayerCount() {
    if (this.playerCount > 1) {
      for (let i = 1; i < this.playerCount; i++) {
        let newPlayer: player = {
          id : i + 1,
          faction : 'Shiba',
          inHand : 0,
          popularity : 0,
          stars : 0,
          territories : 0,
          resources : 0,
          structureBonus : 0,
          score : 0,
          workersMechsStructures : 0
        }

      this.players.push(newPlayer);
      }
    }

    this.shibaCount = this.playerCount;
    this.playerCountButtonPressed = true;
  }

  onClickCalculateScore() {
    this.highestScore = -1;
    this.winnerId = -1;
    this.tiedPlayerIds = [];

    for (let i = 0; i < this.players.length; i++) {
      let multipliers = [];

      if (this.players[i].popularity > 12) {
        multipliers = [5, 4, 3];
      }
      else if (this.players[i].popularity > 6) {
        multipliers = [4, 3, 2];
      }
      else {
        multipliers = [3, 2, 1];
      }

      this.players[i].score =
      this.players[i].inHand
      + multipliers[0] * this.players[i].stars
      + multipliers[1] * this.players[i].territories
      + multipliers[2] * Math.floor(this.players[i].resources / 2)
      + this.players[i].structureBonus;

      if (this.players[i].score > this.highestScore) {
        this.highestScore = this.players[i].score;
        this.winnerId = this.players[i].id;
      }
      else if (this.players[i].score == this.highestScore) {
        if (!this.tiedPlayerIds.includes(this.winnerId)) {
          this.tiedPlayerIds.push(this.winnerId);
        }
        if (!this.tiedPlayerIds.includes(this.players[i].id)) {
          this.tiedPlayerIds.push(this.players[i].id);
        }
      }
    }

    // //Try to break tie
    // if (this.tiedPlayerIds.length > 0) {
    //   let highestWorkersMechsStructures = -1;
    //   let newTiedPlayerIds = <number[]>[];

    //   for(let i = 0; i < this.tiedPlayerIds.length; i++) {
    //     if (this.players[this.tiedPlayerIds[i]-1].workersMechsStructures > highestWorkersMechsStructures) {

    //     }
    //   }
    // }

    this.calculateButtonPressed = true;
    this.goToBottom();
  }
}
