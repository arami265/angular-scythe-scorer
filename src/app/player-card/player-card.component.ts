import { Component, Input, Output, EventEmitter } from '@angular/core';

interface Faction {
  name: string;
}

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.css']
})
export class PlayerCardComponent {
  @Input() availableFactions! : Faction[];
  @Input() id! : number;

  @Input() shibaCount! : number;
  @Input() selectedFactions! : Set<string>;
  @Input() faction! : string;
  @Input() inHand! : number;
  @Input() popularity! : number;
  @Input() stars! : number;
  @Input() territories! : number;
  @Input() resources! : number;
  @Input() structureBonus! : number;
  @Input() workersMechsStructures! : number;

  @Output() shibaCountChange = new EventEmitter<number>();
  @Output() selectedFactionsChange = new EventEmitter<Set<string>>();
  @Output() factionChange = new EventEmitter<string>();
  @Output() inHandChange = new EventEmitter<number>();
  @Output() popularityChange = new EventEmitter<number>();
  @Output() starsChange = new EventEmitter<number>();
  @Output() territoriesChange = new EventEmitter<number>();
  @Output() resourcesChange = new EventEmitter<number>();
  @Output() structureBonusChange = new EventEmitter<number>();
  @Output() workersMechsStructuresChange = new EventEmitter<number>();

  constructor() { }

  onChangeFaction(value: string) {
    let oldFaction = this.faction;

    if (oldFaction != value) {
      this.faction = value;
      if (value == 'Shiba') {
        this.shibaCount += 1;
      }
      else {
        if (oldFaction == 'Shiba') this.shibaCount -= 1;
      }
    }

    this.selectedFactions.delete(oldFaction);
    this.selectedFactions.add(this.faction);

    this.selectedFactionsChange.emit(this.selectedFactions);
    this.shibaCountChange.emit(this.shibaCount);
    this.factionChange.emit(this.faction);
  }

  onInputInHand(target: EventTarget) {
    const value = (target as HTMLInputElement).value;
    const parsedValue = parseInt(value);

    if(Number.isInteger(parsedValue)) {
      this.inHand = parsedValue;
    }
    else this.inHand = 0;

    this.inHandChange.emit(this.inHand);
  }

  onChangePopularity(value: number | null) {
    if (value != null) {
      this.popularity = value;
    }

    this.popularityChange.emit(this.popularity);
  }

  onChangeStars(value: number | null) {
    if (value != null) {
      this.stars = value;
    }

    this.starsChange.emit(this.stars);
  }

  onInputTerritories(target: EventTarget) {
    const value = (target as HTMLInputElement).value;
    const parsedValue = parseInt(value);

    if(Number.isInteger(parsedValue)) {
      this.territories = parsedValue;
    }
    else this.territories = 0;

    this.territoriesChange.emit(this.territories);
  }

  onInputResources(target: EventTarget) {
    const value = (target as HTMLInputElement).value;
    const parsedValue = parseInt(value);

    if(Number.isInteger(parsedValue)) {
      this.resources = parsedValue;
    }
    else this.resources = 0;

    this.resourcesChange.emit(this.resources);
  }

  onInputStructureBonus(target: EventTarget) {
    const value = (target as HTMLInputElement).value;
    const parsedValue = parseInt(value);

    if(Number.isInteger(parsedValue)) {
      this.structureBonus = parsedValue;
    }
    else this.structureBonus = 0;

    this.structureBonusChange.emit(this.structureBonus);
  }

  onInputworkersMechsStructures(target: EventTarget) {
    const value = (target as HTMLInputElement).value;
    const parsedValue = parseInt(value);

    if(Number.isInteger(parsedValue)) {
      this.workersMechsStructures = parsedValue;
    }
    else this.workersMechsStructures = 0;

    this.workersMechsStructuresChange.emit(this.workersMechsStructures);
  }

}
