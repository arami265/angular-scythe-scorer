import { Component, OnInit, OnDestroy } from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Subject} from 'rxjs';

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
export class AppComponent implements OnInit, OnDestroy {
  destroyed = new Subject<void>();

  constructor(public breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium
    ])
    .subscribe(result => {
      if (result.matches) {
        // console.log('one column')
        // this.num_columns = 1;
        this.changeNumColumns(1);
      }
    })

    this.breakpointObserver.observe([
      Breakpoints.Large
    ])
    .subscribe(result => {
      if (result.matches) {
        // console.log('two columns')
        // this.num_columns = 2;
        this.changeNumColumns(2);
      }
    })

    this.breakpointObserver.observe([
      Breakpoints.XLarge
    ])
    .subscribe(result => {
      if (result.matches) {
        // console.log('three columns')
        // this.num_columns = 3;
        this.changeNumColumns(3);
      }
    })
  }

  numColumns = 1;

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

  changeNumColumns(maxColumns : number) {
    if (maxColumns <= this.playerCount) {
      this.numColumns = maxColumns;
    }
    else this.numColumns = this.playerCount;
  }

  getMatGridClass() {
    if (this.numColumns > 1) {
      return "centered almost-full-width"
    }
    else return "centered"
  }

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

    if (this.breakpointObserver.isMatched([
      Breakpoints.XLarge
    ])) this.changeNumColumns(3);
    if (this.breakpointObserver.isMatched([
      Breakpoints.Large
    ])) this.changeNumColumns(2);
    if (this.breakpointObserver.isMatched([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium
    ])) this.changeNumColumns(1);

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

  ngOnDestroy(): void {
      this.destroyed.next();
      this.destroyed.complete();
  }

}
