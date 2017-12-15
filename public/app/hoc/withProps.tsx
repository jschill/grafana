import React, { Component } from 'react';

const WithProps = (WrappedComponent, passedProps) => {
    return (
        class Route extends Component {
            render() {
                const props = Object.assign({}, this.props, passedProps);
                return  <WrappedComponent {...props} />;
            }
        }
    );
};

export default WithProps;
