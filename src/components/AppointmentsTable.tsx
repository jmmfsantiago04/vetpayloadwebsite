"use client"

import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { cancelAppointment } from '@/app/actions/appointments'
import { useRouter } from 'next/navigation'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface Pet {
  id: string
  name: string
  type: string
}

interface User {
  id: string
  email: string
}

interface Appointment {
  id: string
  date: string
  time: string
  pet: Pet
  owner: User
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled'
  notes?: string
  createdAt?: string
}

interface AppointmentsTableProps {
  appointments: Appointment[]
}

const STATUS_COLORS = {
  scheduled: 'bg-blue-50 text-blue-700',
  confirmed: 'bg-green-50 text-green-700',
  completed: 'bg-gray-50 text-gray-700',
  cancelled: 'bg-red-50 text-red-700',
}

const STATUS_LABELS = {
  scheduled: 'Agendada',
  confirmed: 'Confirmada',
  completed: 'Concluída',
  cancelled: 'Cancelada',
}

const ITEMS_PER_PAGE = 5

export function AppointmentsTable({ appointments }: AppointmentsTableProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const router = useRouter()

  const totalPages = Math.ceil(appointments.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentAppointments = appointments.slice(startIndex, endIndex)

  const handleCancel = async (id: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await cancelAppointment(id)
      if (result.error) {
        setError(result.error)
        return
      }
      router.refresh()
    } catch (error) {
      console.error('Error cancelling appointment:', error)
      setError('Ocorreu um erro ao cancelar a consulta. Por favor, tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  const renderPaginationItems = () => {
    const items = []
    
    if (totalPages <= 7) {
      // If 7 or fewer pages, show all page numbers
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault()
                setCurrentPage(i)
              }}
              isActive={currentPage === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        )
      }
    } else {
      // Always show first page
      items.push(
        <PaginationItem key={1}>
          <PaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault()
              setCurrentPage(1)
            }}
            isActive={currentPage === 1}
          >
            1
          </PaginationLink>
        </PaginationItem>
      )

      // Add ellipsis if current page is far from start
      if (currentPage > 3) {
        items.push(
          <PaginationItem key="ellipsis-1">
            <PaginationEllipsis />
          </PaginationItem>
        )
      }

      // Show current page and neighbors
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault()
                setCurrentPage(i)
              }}
              isActive={currentPage === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        )
      }

      // Add ellipsis if current page is far from end
      if (currentPage < totalPages - 2) {
        items.push(
          <PaginationItem key="ellipsis-2">
            <PaginationEllipsis />
          </PaginationItem>
        )
      }

      // Always show last page
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault()
              setCurrentPage(totalPages)
            }}
            isActive={currentPage === totalPages}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      )
    }

    return items
  }

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="rounded-lg border bg-white">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-gray-50/50">
              <TableHead>Data</TableHead>
              <TableHead>Horário</TableHead>
              <TableHead>Pet</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Observações</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.length > 0 ? (
              currentAppointments.map((appointment) => (
                <TableRow key={appointment.id} className="hover:bg-gray-50/50">
                  <TableCell>
                    {format(new Date(appointment.date), "dd 'de' MMMM", { locale: ptBR })}
                  </TableCell>
                  <TableCell>{appointment.time}</TableCell>
                  <TableCell>
                    {appointment.pet.name} ({appointment.pet.type === 'dog' ? 'Cachorro' : appointment.pet.type === 'cat' ? 'Gato' : 'Outro'})
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="secondary"
                      className={STATUS_COLORS[appointment.status]}
                    >
                      {STATUS_LABELS[appointment.status]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {appointment.notes || '-'}
                  </TableCell>
                  <TableCell className="text-right">
                    {appointment.status === 'scheduled' && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            disabled={isLoading}
                          >
                            Cancelar
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-white">
                          <AlertDialogHeader>
                            <AlertDialogTitle>Cancelar Consulta</AlertDialogTitle>
                            <AlertDialogDescription>
                              Tem certeza que deseja cancelar a consulta agendada para {format(new Date(appointment.date), "dd 'de' MMMM", { locale: ptBR })} às {appointment.time}?
                              Esta ação não pode ser desfeita.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Não, manter consulta</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleCancel(appointment.id)}
                              className="bg-red-500 hover:bg-red-600 text-white"
                            >
                              {isLoading ? "Cancelando..." : "Sim, cancelar consulta"}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell 
                  colSpan={6} 
                  className="h-24 text-center text-muted-foreground"
                >
                  Nenhuma consulta agendada
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  setCurrentPage(page => Math.max(1, page - 1))
                }}
                aria-disabled={currentPage === 1}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
            
            {renderPaginationItems()}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  setCurrentPage(page => Math.min(totalPages, page + 1))
                }}
                aria-disabled={currentPage === totalPages}
                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
} 