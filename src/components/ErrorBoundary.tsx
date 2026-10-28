import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[70vh] flex items-center justify-center px-margin-mobile">
          <div className="card-moroccan p-space-xl text-center max-w-md w-full">
            <span className="material-symbols-outlined text-5xl text-gold-metallic">report</span>
            <h1 className="font-serif text-2xl font-semibold text-text-on-dark-primary mt-space-md mb-space-sm">
              Une erreur est survenue
            </h1>
            <p className="text-on-surface-variant text-sm mb-space-lg break-words">
              {this.state.error?.message || 'Erreur inattendue'}
            </p>
            <button onClick={() => window.location.reload()} className="btn-primary">
              Recharger la page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
