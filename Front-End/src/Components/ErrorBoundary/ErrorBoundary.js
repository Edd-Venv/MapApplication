import React from "react";

class ErrorBoundary extends React.Component {
  state = { hasError: false, errorMessage: "" };

  componentDidCatch = (error, info) => {
    this.setState({ hasError: true, errorMessage: error });
  };
  render() {
    if (this.state.hasError)
      return <h1>Unable To Load Map Please Refresh Brower :) .</h1>;
    else return this.props.children;
  }
}

export default ErrorBoundary;
