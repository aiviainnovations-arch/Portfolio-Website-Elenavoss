import { Component, type ReactNode } from "react";

type Props = { children: ReactNode; fallback: ReactNode };
type State = { hasError: boolean };

// Only class components can be error boundaries in React today. Used
// around the R3F hero canvas: if WebGL init or a texture load fails, this
// swaps in a static image instead of letting the error unmount the app.
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error("Hero 3D scene failed, falling back to static image:", error);
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}
