import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          background: '#f8f9fa',
          padding: '20px'
        }}>
          <div style={{
            maxWidth: '400px',
            width: '100%',
            background: 'white',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
            borderRadius: '12px',
            padding: '30px',
            textAlign: 'center'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              margin: '0 auto 20px',
              background: '#fee2e2',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              color: '#dc2626'
            }}>
              ⚠️
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '12px' }}>
              Something went wrong
            </h3>
            <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>
              We're sorry, but something unexpected happened. Please refresh the page and try again.
            </p>
            {this.state.error && (
              <details style={{ marginBottom: '20px', textAlign: 'left' }}>
                <summary style={{ fontSize: '14px', color: '#666', cursor: 'pointer' }}>
                  Error details
                </summary>
                <pre style={{ 
                  marginTop: '8px', 
                  fontSize: '12px', 
                  color: '#dc2626', 
                  background: '#fef2f2', 
                  padding: '8px', 
                  borderRadius: '4px',
                  overflow: 'auto',
                  whiteSpace: 'pre-wrap'
                }}>
                  {this.state.error.message}
                </pre>
              </details>
            )}
            <button
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
