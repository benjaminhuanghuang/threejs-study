# Making a 3D web runner game

<https://www.youtube.com/watch?v=TsmhYonWyZ4&list=PLbEtFK5YvXKU2UhV1_mXlb21LlB7HdPjJ&index=12>

<https://minapecheux.com/projects/3d-web-runner-tutorial>

online demo: https://www.minapecheux.com/games/hyperspeed/

1. Create a basic 3D Scene
<https://www.youtube.com/watch?v=zklHTcaGV44&list=PLbEtFK5YvXKU2UhV1_mXlb21LlB7HdPjJ&index=13&pp=iAQB>

2. Design Game class
<https://www.youtube.com/watch?v=TsmhYonWyZ4&list=PLbEtFK5YvXKU2UhV1_mXlb21LlB7HdPjJ&index=12>

3. Modelling the spaceship
<https://www.youtube.com/watch?v=PhqWAcWnjvc&list=PLbEtFK5YvXKU2UhV1_mXlb21LlB7HdPjJ&index=11>

Ship is a group

4. Making an infinite plane with a shader
<https://www.youtube.com/watch?v=sQZLNuU7jWM&list=PLbEtFK5YvXKU2UhV1_mXlb21LlB7HdPjJ&index=10>
<https://medium.com/geekculture/making-a-3d-web-runner-game-4-making-an-infinite-plane-with-a-shader-48a0c63bc8d2>

three.js and infinite forward grid movement
<https://stackoverflow.com/questions/51470309/three-js-and-infinite-forward-grid-movement>

5. Spawning obstacles and bonuses
<https://www.youtube.com/watch?v=R3FL6MQtqLM&list=PLbEtFK5YvXKU2UhV1_mXlb21LlB7HdPjJ&index=9>

6. Getting user inputs
<https://www.youtube.com/watch?v=pZ-FeR_0sR8&list=PLbEtFK5YvXKU2UhV1_mXlb21LlB7HdPjJ&index=8>

7. Collision detection
<https://www.youtube.com/watch?v=L9fAYWQIfbg&list=PLbEtFK5YvXKU2UhV1_mXlb21LlB7HdPjJ&index=7>

8. UI
https://www.youtube.com/watch?v=qJHAEXIUgjc&list=PLbEtFK5YvXKU2UhV1_mXlb21LlB7HdPjJ&index=6



9. Game over logic

```js
if(this.health <= 0){
    this.gameOver();
}
```

10. Add sounds and music
<https://www.youtube.com/watch?v=KTxB5GDEefo&list=PLbEtFK5YvXKU2UhV1_mXlb21LlB7HdPjJ&index=4>

use [howler.js](https://howlerjs.com/)


Error howler.min.js:2  The AudioContext was not allowed to start. It must be resumed (or created) after a user gesture on the page.



11. Improvements
<https://www.youtube.com/watch?v=xpkv0HWFrmQ&list=PLbEtFK5YvXKU2UhV1_mXlb21LlB7HdPjJ&index=3>

fog

shakeCamera
carmeraLerp

createScorePopup

12. Stats panels

<https://www.youtube.com/watch?v=CWoK39_m2-c&list=PLbEtFK5YvXKU2UhV1_mXlb21LlB7HdPjJ&index=2>

Use
<https://github.com/mrdoob/stats.js>
<https://cdnjs.cloudflare.com/ajax/libs/stats.js/7/Stats.min.js>

13. UI
<https://www.youtube.com/watch?v=2RYIx8JZGWw&list=PLbEtFK5YvXKU2UhV1_mXlb21LlB7HdPjJ&index=1>
