import { reactive } from 'vue'

export const notificationStore = reactive({
  notifications: [] as {
    id: number
    variant: 'success' | 'error' | 'warning' | 'info'
    title: string
    message: string
    timeout?: number
  }[],

  add(variant: any, title: any, message: any, timeout = 4000) {
    const id = Date.now()
    this.notifications.push({ id, variant, title, message, timeout })

    // Remover automáticamente después del timeout
    setTimeout(() => this.remove(id), timeout)
  },

  remove(id: number) {
    this.notifications = this.notifications.filter(n => n.id !== id)
  },
})
