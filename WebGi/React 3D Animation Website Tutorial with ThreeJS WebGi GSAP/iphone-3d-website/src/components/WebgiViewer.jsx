import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle,
  use,
} from "react";
import {
  ViewerApp,
  AssetManagerPlugin,
  GBufferPlugin,
  ProgressivePlugin,
  CanvasSnipperPlugin,
  TonemapPlugin,
  SSRPlugin,
  SSAOPlugin,
  BloomPlugin,
  GammaCorrectionPlugin,
  addBasePlugins,
  mobileAndTabletCheck,
  AssetManagerBasicPopupPlugin,
  TweakpaneUiPlugin,
} from "webgi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function WebgiViewer() {
  const canvasRef = useRef(null);

  const setupViewer = useCallback(async () => {
    // Initialize the viewer
    const viewer = new ViewerApp({
      canvas: canvasRef.current,
    });

    const manager = await viewer.addPlugin(AssetManagerPlugin);

    // Add plugins individually.
    await viewer.addPlugin(GBufferPlugin);
    await viewer.addPlugin(new ProgressivePlugin(32));
    await viewer.addPlugin(new TonemapPlugin(!viewer.useRgbm));
    await viewer.addPlugin(GammaCorrectionPlugin);
    await viewer.addPlugin(SSRPlugin);
    await viewer.addPlugin(SSAOPlugin);
    await viewer.addPlugin(BloomPlugin);

    viewer.renderer.refreshPipeline();
    await manager.addFromPath("scene-black.glb");
    viewer.getPlugin(TonemapPlugin).config.clipBackground = true;

    viewer.scene.activeCamera.setCameraOptions({ controlsEnabled: false });
    window.scrollTo(0, 0);

    
  }, []);

  useEffect(() => {
    setupViewer();
  }, []);

  return (
    <div className="webgi-canvas-container">
      <canvas ref={canvasRef} className="webgi-canvas" />
    </div>
  );
}

export default WebgiViewer;
