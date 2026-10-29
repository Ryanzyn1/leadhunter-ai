'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [register, setRegister] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      if (register) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        })

        if (error) throw error

        if (data.session) {
          router.replace('/')
          router.refresh()
        } else {
          setMessage(
            'Cadastro solicitado! Verifique seu e-mail para confirmar a conta, se necessário.'
          )
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) throw error

        router.replace('/')
        router.refresh()
      }
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : 'Ocorreu um erro.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{
      minHeight: '100vh',
      background: '#0b0813',
      color: 'white',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20
    }}>
      <form onSubmit={handleSubmit} style={{
        background: '#1b1329',
        padding: 35,
        borderRadius: 16,
        width: '100%',
        maxWidth: 400
      }}>
        <h1 style={{ color: '#a855f7' }}>LeadHunter AI</h1>

        <h2>{register ? 'Criar conta' : 'Entrar na plataforma'}</h2>

        <input
          type="email"
          placeholder="Seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: '100%', padding: 12, marginBottom: 12 }}
        />

        <input
          type="password"
          placeholder="Sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
          required
          style={{ width: '100%', padding: 12, marginBottom: 12 }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: 12,
            background: '#9333ea',
            color: 'white',
            border: 0,
            borderRadius: 8
          }}
        >
          {loading ? 'Aguarde...' : register ? 'Criar conta' : 'Entrar'}
        </button>

        {message && <p role="status">{message}</p>}

        <button
          type="button"
          onClick={() => {
            setRegister(!register)
            setMessage('')
          }}
          style={{
            marginTop: 15,
            background: 'transparent',
            color: '#c084fc',
            border: 0
          }}
        >
          {register
            ? 'Já tenho uma conta'
            : 'Não tenho conta. Cadastrar'}
        </button>
      </form>
    </main>
  )
}
