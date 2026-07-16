"use client";

import dynamic from "next/dynamic";
import { Component, type ErrorInfo, type ReactNode } from "react";
import type { CubeFaceId } from "@/data/site";
import { CubeFallback } from "./CubeFallback";
import type { CubeDemoCommand } from "./types";

const RubiksCubeScene = dynamic(() => import("./RubiksCubeScene").then((module) => module.RubiksCubeScene), {
  ssr: false,
  loading: () => (
    <div className="grid h-full min-h-[600px] place-items-center" role="status">
      <div className="text-center">
        <div className="mx-auto size-12 animate-spin rounded-2xl border-2 border-emerald-200/15 border-t-amber-200 shadow-[0_0_24px_rgba(82,183,136,0.16)]" />
        <p className="mt-4 text-sm text-emerald-100/55">正在加载 3D 玉石魔方…</p>
      </div>
    </div>
  ),
});

interface CubeViewportProps {
  selectedFace: CubeFaceId | null;
  command: CubeDemoCommand;
  paused: boolean;
  speed: number;
  loop: boolean;
  onSelect: (face: CubeFaceId) => void;
}

class CubeErrorBoundary extends Component<{ children: ReactNode; onSelect: (face: CubeFaceId) => void }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("3D cube unavailable", error, info.componentStack);
  }

  render() {
    return this.state.failed ? <CubeFallback onSelect={this.props.onSelect} /> : this.props.children;
  }
}

export function CubeViewport(props: CubeViewportProps) {
  return (
    <CubeErrorBoundary onSelect={props.onSelect}>
      <RubiksCubeScene {...props} />
    </CubeErrorBoundary>
  );
}
