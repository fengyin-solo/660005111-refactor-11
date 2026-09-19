import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import type { AnalysisResult } from '@/types'

export const useSignalStore = defineStore('signal', () => {
  const loading = ref(false)
  const result = ref<AnalysisResult | null>(null)
  const activeView = ref('spectrum')

  async function analyze(params: { modulation: string; samples: number; snr: number }) {
    loading.value = true
    try {
      const { data } = await axios.post('/api/generate', params)
      result.value = data
    } finally { loading.value = false }
  }

  async function importCSV(formData: FormData) {
    loading.value = true
    try {
      const { data } = await axios.post('/api/import', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      result.value = data
    } finally { loading.value = false }
  }

  return { loading, result, activeView, analyze, importCSV }
})