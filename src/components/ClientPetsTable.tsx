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
import { Pencil, Trash2, Plus, History, PawPrint, ArrowUpDown } from 'lucide-react'
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

type SortField = 'name' | 'type' | 'breed' | 'age' | 'weight';
type SortOrder = 'asc' | 'desc';

export function ClientPetsTable({ pets: initialPets }: ClientPetsTableProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sortField, setSortField] = useState<SortField>('name')
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')
  const [pets, setPets] = useState<Pet[]>(initialPets)
  const router = useRouter()

  const handleSort = (field: SortField) => {
    const newOrder = field === sortField && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(newOrder);

    const sortedPets = [...pets].sort((a, b) => {
      let comparison = 0;
      
      switch (field) {
        case 'name':
        case 'breed':
        case 'type':
          comparison = a[field].localeCompare(b[field]);
          break;
        case 'age':
        case 'weight':
          comparison = a[field] - b[field];
          break;
      }

      return newOrder === 'asc' ? comparison : -comparison;
    });

    setPets(sortedPets);
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown className="w-4 h-4 ml-1" />;
    return (
      <ArrowUpDown 
        className={`w-4 h-4 ml-1 transform ${sortOrder === 'desc' ? 'rotate-180' : ''} text-primary`} 
      />
    );
  };

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

      <Table>
        <TableHeader>
          <TableRow className="hover:bg-gray-50/50">
            <TableHead className="py-2">
              <button
                onClick={() => handleSort('name')}
                className="flex items-center hover:text-primary transition-colors"
              >
                Nome {getSortIcon('name')}
              </button>
            </TableHead>
            <TableHead className="py-2">
              <button
                onClick={() => handleSort('type')}
                className="flex items-center hover:text-primary transition-colors"
              >
                Tipo {getSortIcon('type')}
              </button>
            </TableHead>
            <TableHead className="py-2">
              <button
                onClick={() => handleSort('breed')}
                className="flex items-center hover:text-primary transition-colors"
              >
                Raça {getSortIcon('breed')}
              </button>
            </TableHead>
            <TableHead className="py-2">
              <button
                onClick={() => handleSort('age')}
                className="flex items-center hover:text-primary transition-colors"
              >
                Idade {getSortIcon('age')}
              </button>
            </TableHead>
            <TableHead className="py-2">
              <button
                onClick={() => handleSort('weight')}
                className="flex items-center hover:text-primary transition-colors"
              >
                Peso {getSortIcon('weight')}
              </button>
            </TableHead>
            <TableHead className="text-right py-2">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pets.length > 0 ? (
            pets.map((pet) => (
              <TableRow key={pet.id} className="hover:bg-gray-50/50">
                <TableCell className="py-2 font-medium">{pet.name}</TableCell>
                <TableCell className="py-2">
                  {pet.type === 'dog' ? 'Cachorro' : pet.type === 'cat' ? 'Gato' : 'Outro'}
                </TableCell>
                <TableCell className="py-2">{pet.breed}</TableCell>
                <TableCell className="py-2">{pet.age} anos</TableCell>
                <TableCell className="py-2">{pet.weight} kg</TableCell>
                <TableCell className="text-right py-2">
                  <div className="flex justify-end items-center gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="icon" className="hover:bg-primary/10 h-8 w-8">
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

                    <Dialog open={isEditDialogOpen} onOpenChange={(open) => {
                      setIsEditDialogOpen(open)
                      if (!open) setSelectedPet(null)
                    }}>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="hover:bg-primary/10 h-8 w-8"
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
                          className="hover:bg-red-50 h-8 w-8"
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
                  </div>
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
                  <PawPrint className="h-8 w-8 text-muted-foreground/50" />
                  <p>Nenhum pet cadastrado</p>
                  <p className="text-sm">Clique em &quot;Adicionar Pet&quot; para começar</p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
} 