
function buildUI() {
    const infoPanel = document.createElement("div");
    infoPanel.id = "into";

    const infoTitle = document.createElement("div");
    infoTitle.id = "title";
    infoTitle.innerText = "Captain's log";
    infoPanel.appendChild(infoTitle);

    const infoDivider1 = document.createElement("div");
    infoDivider1.className = "divider";
    infoPanel.appendChild(infoDivider1);

    const infoScore = document.createElement("div");
    infoScore.id = "score-row";
    const infoScoreLabel = document.createElement("div");
    infoScoreLabel.innerText = "Score:";
    this.divScore = document.createElement("div");
    this.divScore.id = "score";
    infoScore.appendChild(infoScoreLabel);
    infoScore.appendChild(this.divScore);
    infoPanel.appendChild(infoScore);

    const infoDistance = document.createElement("div");
    infoDistance.id = "distance-row";
    const infoDistanceLabel = document.createElement("div");
    infoDistanceLabel.innerText = "Distance:";
    this.divDistance = document.createElement("div");
    this.divDistance.id = "distance";
    infoDistance.appendChild(infoDistanceLabel);
    infoDistance.appendChild(this.divDistance);
    infoPanel.appendChild(infoDistance);

    const infoDivider2 = document.createElement("div");
    infoDivider2.className = "divider";
    infoPanel.appendChild(infoDivider2);

    const infoInputLabel = document.createElement("div");
    infoInputLabel.innerText = "Ship's Integrity:";
    infoPanel.appendChild(infoInputLabel);

    this.divHealth = document.createElement("input");
    this.divHealth.id = "health";
    this.divHealth.setAttribute("type", "range");
    this.divHealth.setAttribute("min", 0);
    this.divHealth.setAttribute("nax", 100);
    this.divHealth.setAttribute("disabled", true);
    infoPanel.appendChild(this.divHealth);

    document.body.appendChild(infoPanel);

    // game over panel
    this.divGameOverPanel = document.createElement("div");
    this.divGameOverPanel.id = "game-over-panel";
    this.divGameOverPanel.className = "hidden";
    const gameOverCol = document.createElement("div");
    gameOverCol.id = "game-over-column";

    const gameOverTitle = document.createElement("div");
    gameOverTitle.id = "game-over-title";
    gameOverTitle.innerText = "Hyperspeed";
    gameOverCol.appendChild(gameOverTitle);

    const gameOverScore = document.createElement("div");
    gameOverScore.id = "game-over-score-row";
    const gameOverScoreLabel = document.createElement("div");
    gameOverScoreLabel.innerText = "Score:";
    this.divGameOverScore = document.createElement("div");
    this.divGameOverScore.id = "game-over-score";
    gameOverScore.appendChild(gameOverScoreLabel);
    gameOverScore.appendChild(this.divGameOverScore);
    gameOverCol.appendChild(gameOverScore);

    const gameOverDistance = document.createElement("div");
    gameOverDistance.id = "game-over-distance-row";
    const gameOverDistanceLabel = document.createElement("div");
    gameOverDistanceLabel.innerText = "Distance:";
    this.divGameOverDistance = document.createElement("div");
    this.divGameOverDistance.id = "game-over-distance";
    gameOverDistance.appendChild(gameOverDistanceLabel);
    gameOverDistance.appendChild(this.divGameOverDistance);
    gameOverCol.appendChild(gameOverDistance);

    const gameOverReplayButton = document.createElement("button");
    gameOverReplayButton.id = " replay-button";
    gameOverReplayButton.innerText = "Replay";
    gameOverReplayButton.onclick = () => {
      this.running = true;
      this.divGameOverPanel.style.display = "none";
    };

    gameOverCol.appendChild(gameOverReplayButton);
    this.divGameOverPanel.appendChild(gameOverCol);
    document.body.appendChild(this.divGameOverPanel);
  }
