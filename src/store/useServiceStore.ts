import { create } from "zustand"
import { useNotificationStore } from "./useNotificationStore"

interface ServiceStore {
  // Service modals
  showTaxiModal: boolean
  setShowTaxiModal: (show: boolean) => void
  showCleaningModal: boolean
  setShowCleaningModal: (show: boolean) => void
  showLaundryModal: boolean
  setShowLaundryModal: (show: boolean) => void
  waiterCallConfirm: boolean
  setWaiterCallConfirm: (show: boolean) => void

  // Actions
  callWaiter: () => void
  confirmWaiterCall: () => void
}

export const useServiceStore = create<ServiceStore>((set) => ({
  // Service modals
  showTaxiModal: false,
  setShowTaxiModal: (show) => set({ showTaxiModal: show }),
  showCleaningModal: false,
  setShowCleaningModal: (show) => set({ showCleaningModal: show }),
  showLaundryModal: false,
  setShowLaundryModal: (show) => set({ showLaundryModal: show }),
  waiterCallConfirm: false,
  setWaiterCallConfirm: (show) => set({ waiterCallConfirm: show }),

  // Actions
  callWaiter: () => {
    set({ waiterCallConfirm: true })
  },

  confirmWaiterCall: () => {
    set({ waiterCallConfirm: false })
    useNotificationStore.getState().setWaiterCalled(true)
    setTimeout(() => useNotificationStore.getState().setWaiterCalled(false), 3000)
  },
}))
