"use client"

import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, FileText, ArrowUpDown } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Skeleton } from "@/components/ui/skeleton"

interface Appointment {
  id: string
  date: string
  time: string
  type: string
  status: 'agendada' | 'confirmada' | 'concluida' | 'cancelada'
  notes?: string
  pet: {
    id: string
    name: string
  }
}

interface AppointmentsTableProps {
  appointments: Appointment[]
}

type SortField = 'date' | 'time' | 'pet' | 'type' | 'status';
type SortOrder = 'asc' | 'desc';

export function AppointmentsTable({ appointments: initialAppointments }: AppointmentsTableProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [sortField, setSortField] = useState<SortField>('date')
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments || [])

  const handleSort = (field: SortField) => {
    const newOrder = field === sortField && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(newOrder);

    const sortedAppointments = [...appointments].sort((a, b) => {
      let comparison = 0;
      
      switch (field) {
        case 'date':
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case 'time':
          comparison = a.time.localeCompare(b.time);
          break;
        case 'pet':
          comparison = a.pet.name.localeCompare(b.pet.name);
          break;
        case 'type':
        case 'status':
          comparison = a[field].localeCompare(b[field]);
          break;
      }

      return newOrder === 'asc' ? comparison : -comparison;
    });

    setAppointments(sortedAppointments);
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown className="w-4 h-4 ml-1" />;
    return (
      <ArrowUpDown 
        className={`w-4 h-4 ml-1 transform ${sortOrder === 'desc' ? 'rotate-180' : ''} text-primary`} 
      />
    );
  };

  const getStatusColor = (status: Appointment['status']) => {
    switch (status) {
      case 'agendada':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
      case 'confirmada':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200'
      case 'concluida':
        return 'bg-green-100 text-green-800 hover:bg-green-200'
      case 'cancelada':
        return 'bg-red-100 text-red-800 hover:bg-red-200'
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200'
    }
  }

  const getStatusText = (status: Appointment['status']) => {
    switch (status) {
      case 'agendada':
        return 'Agendada'
      case 'confirmada':
        return 'Confirmada'
      case 'concluida':
        return 'Concluída'
      case 'cancelada':
        return 'Cancelada'
      default:
        return status
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-48" />
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Horário</TableHead>
                <TableHead>Pet</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Detalhes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[1, 2, 3].map((index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-300" />
                      <Skeleton className="h-5 w-[100px]" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-300" />
                      <Skeleton className="h-5 w-[60px]" />
                    </div>
                  </TableCell>
                  <TableCell><Skeleton className="h-5 w-[120px]" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-[100px]" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-[100px] rounded-full" /></TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-8 w-8 rounded-full ml-auto" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-[var(--text-primary)]">Suas Consultas</h2>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="hover:bg-gray-50/50">
            <TableHead>
              <button
                onClick={() => handleSort('date')}
                className="flex items-center hover:text-primary transition-colors"
              >
                Data {getSortIcon('date')}
              </button>
            </TableHead>
            <TableHead>
              <button
                onClick={() => handleSort('time')}
                className="flex items-center hover:text-primary transition-colors"
              >
                Horário {getSortIcon('time')}
              </button>
            </TableHead>
            <TableHead>
              <button
                onClick={() => handleSort('pet')}
                className="flex items-center hover:text-primary transition-colors"
              >
                Pet {getSortIcon('pet')}
              </button>
            </TableHead>
            <TableHead>
              <button
                onClick={() => handleSort('type')}
                className="flex items-center hover:text-primary transition-colors"
              >
                Tipo {getSortIcon('type')}
              </button>
            </TableHead>
            <TableHead>
              <button
                onClick={() => handleSort('status')}
                className="flex items-center hover:text-primary transition-colors"
              >
                Status {getSortIcon('status')}
              </button>
            </TableHead>
            <TableHead className="text-right">Detalhes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <TableRow key={appointment.id} className="hover:bg-gray-50/50">
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    {format(new Date(appointment.date), "dd/MM/yyyy")}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    {appointment.time}
                  </div>
                </TableCell>
                <TableCell className="font-medium">{appointment.pet.name}</TableCell>
                <TableCell>{appointment.type}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(appointment.status)}>
                    {getStatusText(appointment.status)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="icon" className="hover:bg-primary/10">
                        <FileText className="w-4 h-4 text-primary" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Detalhes da Consulta</DialogTitle>
                        <DialogDescription>
                          Informações detalhadas sobre a consulta
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-1">Data e Hora</h4>
                          <p className="text-sm text-gray-600">
                            {format(new Date(appointment.date), "dd/MM/yyyy")} às {appointment.time}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Pet</h4>
                          <p className="text-sm text-gray-600">{appointment.pet.name}</p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Tipo de Consulta</h4>
                          <p className="text-sm text-gray-600">{appointment.type}</p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Status</h4>
                          <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(appointment.status)}`}>
                            {getStatusText(appointment.status)}
                          </span>
                        </div>
                        {appointment.notes && (
                          <div>
                            <h4 className="font-medium mb-1">Observações</h4>
                            <p className="text-sm text-gray-600">{appointment.notes}</p>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell 
                colSpan={6} 
                className="h-32 text-center text-muted-foreground"
              >
                <div className="flex flex-col items-center justify-center gap-2">
                  <Calendar className="h-8 w-8 text-muted-foreground/50" />
                  <p>Nenhuma consulta agendada</p>
                  <p className="text-sm">Entre em contato com a clínica para agendar uma consulta</p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
} 