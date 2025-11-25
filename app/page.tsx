"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"

export default function TextFormalizerPage() {
  const [inputText, setInputText] = useState("") 
  const [outputText, setOutputText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // method to handle text formalization
  const handleFormalize = async () => {
    if (!inputText.trim()) {
      setError("Por favor ingresa un texto")
      return
    }

    setIsLoading(true)
    setError("")
    //setOutputText('')
    setOutputText(inputText) // simulate output for now

    try {
      // const response = ... backend
      //const data = await response.json()
      // setOutputText(data.formalizedText)
    } catch (err) {
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopyOutput = () => {
    navigator.clipboard.writeText(outputText)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-3 text-pretty">
            Simplificador de textos
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Convierte textos legales en lenguaje simple que todos puedan entender
          </p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-lg">
            <div className="space-y-4">
              <div>
                <label htmlFor="input" className="block text-base font-extrabold text-slate-700 dark:text-slate-200 mb-2">
                  Texto legal
                </label>
                <textarea
                  id="input"
                  value={inputText}
                  onChange={(e) => {
                    setInputText(e.target.value)
                    setError("")
                  }}
                  placeholder="Pega aquí el texto legal que deseas simplificar..."
                  className="w-full h-64 p-4 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 resize-none"
                />
              </div>

              <Button
                onClick={handleFormalize}
                disabled={isLoading || !inputText.trim()}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Spinner className="w-4 h-4" />
                    <span>Simplificando...</span>
                  </>
                ) : (
                  <span>Simplificar texto</span>
                )}
              </Button>

              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 text-sm">
                  {error}
                </div>
              )}
            </div>
          </Card>

          {/* Output Section */}
          <Card className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-lg">
            <div className="space-y-4">
              <div>
                <label htmlFor="output" className="block text-base font-extrabold text-slate-700 dark:text-slate-200 mb-2">
                  Texto simplificado
                </label>
                <textarea
                  id="output"
                  value={outputText}
                  readOnly
                  placeholder="El texto simplificado aparecerá aquí..."
                  className="w-full h-64 p-4 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 resize-none"
                />
              </div>

              <Button
                onClick={handleCopyOutput}
                disabled={!outputText}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Copiar resultado
              </Button>
            </div>
          </Card>
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-white dark:bg-slate-800 rounded-lg p-8 border border-slate-200 dark:border-slate-700 shadow-lg">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Cómo usar</h2>
          <ul className="space-y-3 text-slate-700 dark:text-slate-300">
            <li className="flex gap-3">
              <span className="text-blue-600 dark:text-blue-400 font-bold">1.</span>
              <span>Pega un texto legal o jurídico en el recuadro izquierdo</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 dark:text-blue-400 font-bold">2.</span>
              <span>Haz clic en el botón "Simplificar texto"</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 dark:text-blue-400 font-bold">3.</span>
              <span>El texto simplificado en lenguaje cotidiano aparecerá en el recuadro derecho</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 dark:text-blue-400 font-bold">4.</span>
              <span>Haz clic en "Copiar resultado" para copiar el texto a tu portapapeles</span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  )
}
