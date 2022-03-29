# angular-scythe-scorer

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.5.

The app calculates one or more user's scores for the board game Scythe. It was inspired after some sessions in which the scoring phase took longer than desired.

It has the following features:

- Custom Angular component for entering each player's data in a dedicated card
- Angular structual directives for dynamically displaying cards, and entering various phases of the app
- Two-way data binding to efficiently update array of objects in main App component
- TypeScript Set to efficiently update unavailable options in dropdown selection
- Hand stylized via the latest official Angular Material components and theming and custom CSS
- Autoscroll to bottom on calculating scores to display results

### [Visit the app here on Github Pages!](https://arami265.github.io/angular-scythe-scorer/) (It can lead you back here)

<br>

## Examples:
Landing page
![Screenshot 1](/readme_img/screen1.png)

Player icon adapts to faction choice
![Screenshot 2](/readme_img/screen2.png)

User is not allowed to submit until a faction has been chosen for each player
![Screenshot 3](/readme_img/screen3.png)

Winning message
![Screenshot 4](/readme_img/screen4.png)

Message on player tie
![Screenshot 5](/readme_img/screen5.png)

<br>

## TODO:
- Implement backend services, to let multiple players asynchronously submit data
- Add tie-breaking logic layer
