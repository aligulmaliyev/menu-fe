import { create } from "zustand"

interface NotificationStore {
  // Success states
  waiterCalled: boolean
  setWaiterCalled: (called: boolean) => void
  orderPlaced: boolean
  setOrderPlaced: (placed: boolean) => void
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  // Success states
  waiterCalled: false,
  setWaiterCalled: (called) => set({ waiterCalled: called }),
  orderPlaced: false,
  setOrderPlaced: (placed) => set({ orderPlaced: placed }),
}))
