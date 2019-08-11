import React, { PureComponent } from 'react';

export default function HocComponent(WrappedComponent, WrappedProps, functional = true) {
  const FnComponent = props => <WrappedComponent {...WrappedProps} {...props} />;
  class ClassComponent extends PureComponent {
    render() {
      console.log(WrappedProps);
      console.log(this.props);
      return <WrappedComponent {...WrappedProps} {...this.props} />;
    }
  }
  return functional ? FnComponent : ClassComponent;
}
