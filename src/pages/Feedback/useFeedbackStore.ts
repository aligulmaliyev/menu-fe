import { create } from "zustand"

interface FeedbackStore {
  feedback: string
  setFeedback: (feedback: string) => void
  rating: number
  setRating: (rating: number) => void
  customerName: string
  setCustomerName: (name: string) => void

  // Actions
  submitFeedback: () => void
}

export const useFeedbackStore = create<FeedbackStore>((set, get) => ({
  feedback: "",
  setFeedback: (feedback) => set({ feedback }),
  rating: 0,
  setRating: (rating) => set({ rating }),
  customerName: "",
  setCustomerName: (name) => set({ customerName: name }),

  submitFeedback: () => {
    const { rating } = get()
    alert(`Rəyiniz üçün təşəkkür edirik! Reytinq: ${rating}/5`)
    set({
      feedback: "",
      rating: 0,
      customerName: "",
    })
  },
}))
