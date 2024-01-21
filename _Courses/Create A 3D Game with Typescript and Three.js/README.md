# Create A 3D Game with Typescript and Three.js

https://www.youtube.com/watch?v=tbLPKsuSH9U&list=PLUfCxqsVtJj9dFRKdYftCwy3a19eYKBLQ

https://github.com/aarcoraci?tab=repositories

## Create project

```bash
    npm create vite@latest
    
    cd <project-name>
    npm i three 
    npm i -D @types/three

    npm run dev
```

## 1. Create a scene

## 2. Load texture and map

## 3. Add tank

## 4. Move tank

Update PlayerTank.ts, handleKeyDown() and handleKeyUp()

Update GameEntities.ts

```ts
public update = (_deltaT: number) => {};
```

## 5. Add walls

add texture\wall.png

define mapSize in GameScene.ts

Add _collider into GameEntities.ts


## 6. Add bullets

## 7. Shooting effect

Add utils\MathUtil.ts

Update playerTank.ts

## 8. Explosion effect

Add effect\Explosion.ts
Update Bullets.ts

## 9. Add enemy tanks

Update ResourceManager.ts

Add EnemyTank.ts

Update GameScene.ts

Add collision between enemy tanks and bullets
