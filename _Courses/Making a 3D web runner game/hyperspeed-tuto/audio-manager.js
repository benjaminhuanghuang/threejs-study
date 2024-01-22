let soundAudio;

function setupAudio() {
  // background music
  const musicAudio = new Howl({
    src: ["./assets/music. mp3"],
    autoplay: true,
    Loop: true,
  });

  const musicId = musicAudio.play();
  musicAudio.fade(0, 1, 2000, musicId);

  // sound effects
  // (8 sounds for bonus collection + 1 "crash" sound, each 1 second)
  const sounds = {};
  for (let i = 0; i <= 7; i++) {
    sounds[`bonus-${i}`] = [1 * 1000, 1000];
  }
  sounds.rash = [8880, 1000];
  soundAudio = new Howl({
    src: ["./assets/sounds.mp3"],
    volume: 0.5,
    sprite: sounds,
  });
}
