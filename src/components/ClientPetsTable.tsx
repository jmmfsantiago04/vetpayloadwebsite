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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Pencil, Trash2, Plus, History, PawPrint } from 'lucide-react'
import { addPet, updatePet, deletePet, updateMedicalHistory } from '@/app/actions/pets'
import { useRouter } from 'next/navigation'
import { PetForm } from './PetForm'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface Pet {
  id: string
  name: string
  type: 'dog' | 'cat' | 'other'
  breed: string
  age: number
  weight: number
  medicalHistory?: string
}

interface ClientPetsTableProps {
  pets: Pet[]
}

export function ClientPetsTable({ pets }: ClientPetsTableProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleAddPet = async (data: Omit<Pet, 'id' | 'medicalHistory'>) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await addPet(data)
      if (result.error) {
        setError(result.error)
        return
      }
      setIsAddDialogOpen(false)
      router.refresh()
    } catch (error) {
      console.error('Error adding pet:', error)
      setError('Ocorreu um erro ao adicionar o pet. Por favor, tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditPet = async (data: Omit<Pet, 'id' | 'medicalHistory'>) => {
    if (!selectedPet) return
    setIsLoading(true)
    setError(null)

    try {
      const result = await updatePet(selectedPet.id, data)
      if (result.error) {
        setError(result.error)
        return
      }
      setIsEditDialogOpen(false)
      setSelectedPet(null)
      router.refresh()
    } catch (error) {
      console.error('Error updating pet:', error)
      setError('Ocorreu um erro ao atualizar o pet. Por favor, tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeletePet = async (id: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await deletePet(id)
      if (result.error) {
        setError(result.error)
        return
      }
      router.refresh()
    } catch (error) {
      console.error('Error deleting pet:', error)
      setError('Ocorreu um erro ao excluir o pet. Por favor, tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateMedicalHistory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!selectedPet) return
    setIsLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const history = formData.get('medicalHistory') as string

    try {
      const result = await updateMedicalHistory(selectedPet.id, history)
      if (result.error) {
        setError(result.error)
        return
      }
      setSelectedPet(null)
      router.refresh()
    } catch (error) {
      console.error('Error updating medical history:', error)
      setError('Ocorreu um erro ao atualizar o histórico médico. Por favor, tente novamente.')
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

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-[var(--text-primary)]">Seus Pets</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Pet
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Pet</DialogTitle>
              <DialogDescription>
                Preencha os dados do seu pet abaixo.
              </DialogDescription>
            </DialogHeader>
            <PetForm onSubmit={handleAddPet} isLoading={isLoading} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-lg border bg-white">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-gray-50/50">
              <TableHead>Nome</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Raça</TableHead>
              <TableHead>Idade</TableHead>
              <TableHead>Peso</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pets.map((pet) => (
              <TableRow key={pet.id} className="hover:bg-gray-50/50">
                <TableCell className="font-medium">{pet.name}</TableCell>
                <TableCell>
                  {pet.type === 'dog' ? 'Cachorro' : pet.type === 'cat' ? 'Gato' : 'Outro'}
                </TableCell>
                <TableCell>{pet.breed}</TableCell>
                <TableCell>{pet.age} anos</TableCell>
                <TableCell>{pet.weight} kg</TableCell>
                <TableCell className="text-right space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="icon" className="hover:bg-primary/10">
                        <History className="w-4 h-4 text-primary" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Histórico Médico - {pet.name}</DialogTitle>
                        <DialogDescription>
                          Registre ou atualize o histórico médico do seu pet.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleUpdateMedicalHistory} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="medicalHistory">Histórico Médico</Label>
                          <Textarea
                            id="medicalHistory"
                            name="medicalHistory"
                            defaultValue={pet.medicalHistory}
                            className="min-h-[200px] bg-white"
                            placeholder="Descreva o histórico médico do seu pet..."
                            disabled={isLoading}
                          />
                        </div>
                        <DialogFooter>
                          <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Salvando..." : "Salvar"}
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>

                  <Dialog open={isEditDialogOpen && selectedPet?.id === pet.id} onOpenChange={(open) => {
                    setIsEditDialogOpen(open)
                    if (!open) setSelectedPet(null)
                  }}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="hover:bg-primary/10"
                        onClick={() => setSelectedPet(pet)}
                      >
                        <Pencil className="w-4 h-4 text-primary" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Editar Pet</DialogTitle>
                        <DialogDescription>
                          Atualize as informações do seu pet.
                        </DialogDescription>
                      </DialogHeader>
                      <PetForm pet={pet} onSubmit={handleEditPet} isLoading={isLoading} />
                    </DialogContent>
                  </Dialog>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-white">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Excluir Pet</AlertDialogTitle>
                        <AlertDialogDescription>
                          Tem certeza que deseja excluir {pet.name}? Esta ação não pode ser desfeita.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="hover:bg-gray-50">
                          Cancelar
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={async () => {
                            await handleDeletePet(pet.id)
                          }}
                          className="bg-red-500 hover:bg-red-600 text-white"
                        >
                          {isLoading ? "Excluindo..." : "Excluir"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
            {pets.length === 0 && (
              <TableRow>
                <TableCell 
                  colSpan={6} 
                  className="h-32 text-center text-muted-foreground"
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <PawPrint className="h-8 w-8 text-muted-foreground/50" />
                    <p>Nenhum pet cadastrado</p>
                    <p className="text-sm">Clique em "Adicionar Pet" para começar</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
} 