import React from 'react';

type Props = { children?: React.ReactNode };
type State = { error: Error | null };
/**
 * A reusable component for handling errors in a React (sub)tree.
 */
export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return {
      error,
    };
  }

  render() {
    if (this.state.error != null) {
      return (
        <div>
          <div>Error: {this.state.error.message}</div>
          <div>
            {/* FIXME: source ?? */}
            <pre>
              {JSON.stringify((this.state.error as any).source, null, 2)}
            </pre>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
