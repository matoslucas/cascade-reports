import React, { Component, } from "react";
import { Redirect } from "react-router-dom";
import auth from "../utils/Auth";


const ProtectedRoute = (WrappedComponent) => {


  // eslint-disable-next-line
  const HOC = class extends Component {


    state = {
      isLoading: true,
      isAuthenticated: false,
    };

    componentDidMount() {
      this.isAuthenticated()
    }

    isAuthenticated() {
      const _self = this

      let promise = auth.isAuthenticated()
      promise.then(user => {
        _self.setState({ isAuthenticated: true, isLoading: false })
      }).catch(e => {
        console.log(e)
        _self.setState({ isAuthenticated: false, isLoading: false })
      })

    }

    render() {
      const { isAuthenticated, isLoading } = this.state

      if (isLoading) {
        return <div className="loader border-top-info"></div>
      } else {
        if (isAuthenticated) {
          return <WrappedComponent {...this.props} />
        } else {
          return <Redirect
            to={{
              pathname: "/login",
              state: {
                from: this.props.location
              }
            }}
          />
        }
      }


    }
  };

  return HOC;
};

export default ProtectedRoute;
/*
export const ProtectedRoute = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (auth.isAuthenticated()) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};
*/