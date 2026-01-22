import { Physics } from "@react-three/rapier";

import Lights from "./Lights";
import { Level } from "./Level";
import Player from "./Player";
import useGame from "./stores/useGame";
import Effects from "./Effects";

export default function Experience() {
  const blocksCount = useGame((state) => state.blocksCount);
  const blocksSeed = useGame((state) => state.blocksSeed);

  return (
    <>
      {/* <OrbitControls makeDefault /> */}
      {/* <color args={['#bdedfc']} attach="background" /> */}
      <color args={["#252731"]} attach="background" />
      <Physics>
        <Lights />
        <Level count={blocksCount} seed={blocksSeed} />
        <Player />
      </Physics>
      <Effects />
    </>
  );
}
