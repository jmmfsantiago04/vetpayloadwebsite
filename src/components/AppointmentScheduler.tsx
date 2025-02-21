"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { addDays, format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle } from "lucide-react"
import { scheduleAppointment } from "@/app/actions/appointments"
import { useRouter } from "next/navigation"

interface Pet {
  id: string
  name: string
  type: 'dog' | 'cat' | 'other'
  breed: string
  age: number
  weight: number
  medicalHistory?: string
}

interface AppointmentSchedulerProps {
  pets: Pet[]
}

const AVAILABLE_TIMES = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
]

export function AppointmentScheduler({ pets }: AppointmentSchedulerProps) {
  const [date, setDate] = React.useState<Date>()
  const [selectedTime, setSelectedTime] = React.useState<string>()
  const [selectedPet, setSelectedPet] = React.useState<string>()
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [success, setSuccess] = React.useState<string | null>(null)
  const router = useRouter()

  const handleSchedule = async () => {
    if (!date || !selectedTime || !selectedPet) {
      setError("Por favor, selecione uma data, horário e pet para a consulta")
      return
    }

    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const formattedDate = format(date, 'yyyy-MM-dd')
      const result = await scheduleAppointment(formattedDate, selectedTime, selectedPet)
      
      if (result.error) {
        setError(result.error)
        return
      }

      setSuccess("Consulta agendada com sucesso!")
      setDate(undefined)
      setSelectedTime(undefined)
      setSelectedPet(undefined)
      router.refresh()
    } catch (error) {
      console.error('Error scheduling appointment:', error)
      setError("Ocorreu um erro ao agendar a consulta. Por favor, tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert>
          <CheckCircle className="h-4 w-4 text-green-500" />
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <label className="text-sm font-medium">Selecione o Pet</label>
        <Select
          value={selectedPet}
          onValueChange={setSelectedPet}
        >
          <SelectTrigger className="bg-white">
            <SelectValue placeholder="Selecione um pet" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {pets.map((pet) => (
              <SelectItem key={pet.id} value={pet.id}>
                {pet.name} ({pet.type === 'dog' ? 'Cachorro' : pet.type === 'cat' ? 'Gato' : 'Outro'})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border bg-white">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          locale={ptBR}
          disabled={(date) => date < new Date() || date > addDays(new Date(), 30)}
          className="bg-white"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Horário Disponível</label>
        <Select
          value={selectedTime}
          onValueChange={setSelectedTime}
          disabled={!date}
        >
          <SelectTrigger className="bg-white">
            <SelectValue placeholder="Selecione um horário" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {AVAILABLE_TIMES.map((time) => (
              <SelectItem key={time} value={time}>
                {time}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {date && selectedTime && (
        <div className="rounded-md bg-muted p-3">
          <p className="text-sm font-medium">
            Consulta para {format(date, "dd 'de' MMMM", { locale: ptBR })} às {selectedTime}
          </p>
        </div>
      )}

      <Button
        className="w-full"
        disabled={!date || !selectedTime || !selectedPet || isLoading}
        onClick={handleSchedule}
      >
        {isLoading ? "Agendando..." : "Agendar Consulta"}
      </Button>
    </div>
  )
} 