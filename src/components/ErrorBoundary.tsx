'use client'

import { Component, ReactNode } from 'react'
import { AlertTriangle } from 'lucide-react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="relative overflow-hidden rounded-lg border border-red-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
              <AlertTriangle className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-red-800">
                Ops! Algo deu errado
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Não foi possível carregar este conteúdo. Por favor, tente uma das seguintes opções:
              </p>
              <ul className="mt-2 space-y-1 text-sm text-gray-600 list-disc list-inside">
                <li>Atualize a página</li>
                <li>Verifique sua conexão com a internet</li>
                <li>Tente novamente mais tarde</li>
              </ul>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 inline-flex items-center rounded-md bg-red-50 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Tentar Novamente
              </button>
            </div>
          </div>
          <div className="absolute right-0 top-0 h-16 w-16 opacity-10">
            <AlertTriangle className="h-16 w-16 text-red-500 transform rotate-12" />
          </div>
        </div>
      )
    }

    return this.props.children
  }
} 