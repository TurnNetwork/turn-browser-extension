 import React, {Component} from 'react'
 class ErrorBoundary extends Component {
    constructor(props:any) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error:any) {
      return { hasError: true };
    }
  
    render() {
    //@ts-ignore
        return this.props.children;
    }
}

  export default ErrorBoundary