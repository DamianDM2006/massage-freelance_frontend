import React, { Component } from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error: error
    };
  }

  componentDidCatch(error, info) {
    console.error(`Caught an error:`, error);
    console.error(`Component statack:`, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="err">
          <h2>Error: {this.state.error?.message}</h2>
          <p>Press the "HOME" or "Login" button to continue.</p>
        </div>
      )
    }
    return this.props.children;
  }
};
