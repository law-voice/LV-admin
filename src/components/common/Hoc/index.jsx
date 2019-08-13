import React, { PureComponent } from 'react';

export default function Hoc(WrappedComponent, WrappedProps, functional = true) {
  return functional
    ? props => <WrappedComponent {...WrappedProps} {...props} />
    : class ClassComponent extends PureComponent {
        render() {
          return <WrappedComponent {...WrappedProps} {...this.props} />;
        }
      };
}
