'use client'

import { Component, ReactNode } from 'react'
import { AlertTriangle } from 'lucide-react'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'

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
        <Alert variant="destructive" className="relative">
          <AlertTriangle className="h-5 w-5" />
          <AlertTitle>Ops! Algo deu errado</AlertTitle>
          <AlertDescription className="mt-2">
            <p>
              Não foi possível carregar este conteúdo. Por favor, tente uma das seguintes opções:
            </p>
            <ul className="mt-2 space-y-1 list-disc list-inside">
              <li>Atualize a página</li>
              <li>Verifique sua conexão com a internet</li>
              <li>Tente novamente mais tarde</li>
            </ul>
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
              className="mt-4 border-destructive text-destructive hover:bg-destructive/10"
            >
              Tentar Novamente
            </Button>
          </AlertDescription>
        </Alert>
      )
    }

    return this.props.children
  }
} 