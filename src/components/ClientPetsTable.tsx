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
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Pencil, Trash2, Plus, History } from 'lucide-react'

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
  onAddPet: (pet: Omit<Pet, 'id'>) => Promise<void>
  onUpdatePet: (id: string, pet: Partial<Pet>) => Promise<void>
  onDeletePet: (id: string) => Promise<void>
  onUpdateMedicalHistory: (id: string, history: string) => Promise<void>
}

export function ClientPetsTable({
  pets,
  onAddPet,
  onUpdatePet,
  onDeletePet,
  onUpdateMedicalHistory,
}: ClientPetsTableProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleAddPet = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const newPet = {
      name: formData.get('name') as string,
      type: formData.get('type') as 'dog' | 'cat' | 'other',
      breed: formData.get('breed') as string,
      age: Number(formData.get('age')),
      weight: Number(formData.get('weight')),
    }

    try {
      await onAddPet(newPet)
      setIsAddDialogOpen(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditPet = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!selectedPet) return
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const updatedPet = {
      name: formData.get('name') as string,
      type: formData.get('type') as 'dog' | 'cat' | 'other',
      breed: formData.get('breed') as string,
      age: Number(formData.get('age')),
      weight: Number(formData.get('weight')),
    }

    try {
      await onUpdatePet(selectedPet.id, updatedPet)
      setIsEditDialogOpen(false)
      setSelectedPet(null)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateMedicalHistory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!selectedPet) return
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const history = formData.get('medicalHistory') as string

    try {
      await onUpdateMedicalHistory(selectedPet.id, history)
      setSelectedPet(null)
    } finally {
      setIsLoading(false)
    }
  }

  const PetForm = ({ pet, onSubmit }: { pet?: Pet, onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void> }) => (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome</Label>
          <Input
            id="name"
            name="name"
            defaultValue={pet?.name}
            required
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="type">Tipo</Label>
          <select
            id="type"
            name="type"
            className="w-full p-2 border rounded-md"
            defaultValue={pet?.type}
            required
            disabled={isLoading}
          >
            <option value="dog">Cachorro</option>
            <option value="cat">Gato</option>
            <option value="other">Outro</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="breed">Raça</Label>
          <Input
            id="breed"
            name="breed"
            defaultValue={pet?.breed}
            required
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="age">Idade</Label>
          <Input
            id="age"
            name="age"
            type="number"
            defaultValue={pet?.age}
            required
            disabled={isLoading}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="weight">Peso (kg)</Label>
        <Input
          id="weight"
          name="weight"
          type="number"
          step="0.1"
          defaultValue={pet?.weight}
          required
          disabled={isLoading}
        />
      </div>
      <DialogFooter>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Salvando..." : "Salvar"}
        </Button>
      </DialogFooter>
    </form>
  )

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Pets</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Pet
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Novo Pet</DialogTitle>
              <DialogDescription>
                Preencha os dados do seu pet abaixo.
              </DialogDescription>
            </DialogHeader>
            <PetForm onSubmit={handleAddPet} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
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
              <TableRow key={pet.id}>
                <TableCell>{pet.name}</TableCell>
                <TableCell>
                  {pet.type === 'dog' ? 'Cachorro' : pet.type === 'cat' ? 'Gato' : 'Outro'}
                </TableCell>
                <TableCell>{pet.breed}</TableCell>
                <TableCell>{pet.age} anos</TableCell>
                <TableCell>{pet.weight} kg</TableCell>
                <TableCell className="text-right space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="icon">
                        <History className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Histórico Médico - {pet.name}</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleUpdateMedicalHistory} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="medicalHistory">Histórico Médico</Label>
                          <Textarea
                            id="medicalHistory"
                            name="medicalHistory"
                            defaultValue={pet.medicalHistory}
                            className="min-h-[200px]"
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
                        onClick={() => setSelectedPet(pet)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Editar Pet</DialogTitle>
                      </DialogHeader>
                      <PetForm pet={pet} onSubmit={handleEditPet} />
                    </DialogContent>
                  </Dialog>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Excluir Pet</AlertDialogTitle>
                        <AlertDialogDescription>
                          Tem certeza que deseja excluir {pet.name}? Esta ação não pode ser desfeita.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={async () => {
                            setIsLoading(true)
                            try {
                              await onDeletePet(pet.id)
                            } finally {
                              setIsLoading(false)
                            }
                          }}
                          className="bg-red-500 hover:bg-red-600"
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
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  Nenhum pet cadastrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
} 