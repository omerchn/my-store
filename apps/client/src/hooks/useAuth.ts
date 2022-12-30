import create from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuth = create<{
  isAuthed: boolean
  login: () => void
  logout: () => void
}>()(
  persist(
    (set) => ({
      isAuthed: false,
      login: () => set({ isAuthed: true }),
      logout: () => set({ isAuthed: false }),
    }),
    {
      name: 'auth',
      getStorage: () => localStorage,
    }
  )
)
