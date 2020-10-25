import React from "react";
import Background from "../UI/Background/Background";

class ErrorBoundary extends React.Component {
  state = { hasError: false, errorMessage: "" };

  componentDidCatch = (error, info) => {
    this.setState({ hasError: true, errorMessage: error });
  };
  render() {
    if (this.state.hasError)
      return (
        <Background>
          <h1 data-test="component-error-boundary">
            Unable To Load Map, We Are Working on It.
          </h1>
        </Background>
      );
    else return this.props.children;
  }
}

export default ErrorBoundary;
