'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface SearchInputProps {
  placeholder?: string
  className?: string
  onChange?: (value: string) => void
}

export function SearchInput({
  placeholder = 'Search...',
  className = '',
  onChange,
}: SearchInputProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''

  const handleSearch = (value: string) => {
    if (onChange) {
      onChange(value)
      return
    }

    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set('q', value)
    } else {
      params.delete('q')
    }
    router.push(`?${params.toString()}`)
  }

  return (
    <div className={`relative max-w-sm group ${className}`}>
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/50 transition-colors duration-200 group-hover:text-primary/50 group-focus-within:text-primary" />
      <Input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        className="h-10 pl-10 pr-4 text-sm bg-white shadow-sm rounded-full
          border-muted-foreground/20 
          placeholder:text-muted-foreground/50
          hover:border-primary/30 hover:shadow-md
          focus:border-primary focus:ring-1 focus:ring-primary/30 focus:shadow-md
          transition-all duration-200"
      />
      {query && (
        <button
          onClick={() => handleSearch('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-primary/70 transition-colors duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="hover:scale-110 transition-transform duration-200"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  )
} 