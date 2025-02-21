"use client"

import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { logout } from '@/app/actions/auth'
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

export function LogoutButton() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          Sair
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Sair da Conta</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja sair da sua conta? Você precisará fazer login novamente para acessar sua área do cliente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Não, permanecer conectado</AlertDialogCancel>
          <form action={logout}>
            <AlertDialogAction
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Sim, sair da conta
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
} 