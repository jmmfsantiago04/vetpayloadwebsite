"use client"

import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { handleLogout } from "@/app/actions/auth"
import { useRouter } from "next/navigation"

export function LogoutButton() {
  const router = useRouter()

  const onLogout = async () => {
    await handleLogout()
    router.push('/')
  }

  return (
    <Button 
      variant="outline" 
      onClick={onLogout}
      className="flex items-center gap-2"
    >
      <LogOut className="w-4 h-4" />
      Sair
    </Button>
  )
} 