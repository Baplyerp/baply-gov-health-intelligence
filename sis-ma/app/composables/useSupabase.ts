import { createClient } from '@supabase/supabase-js'

export const useSupabase = () => {
  // 🛡️ Segurança: Puxamos as chaves do Nuxt Runtime Config (que lê do .env)
  const config = useRuntimeConfig()
  
  const supabaseUrl = config.public.supabaseUrl as string
  const supabaseKey = config.public.supabaseAnonKey as string

  if (!supabaseUrl || !supabaseKey) {
    console.warn('⚠️ Supabase: Chaves de API não encontradas no ambiente.')
  }

  // 🔌 Inicializa o motor de conexão
  const client = createClient(supabaseUrl, supabaseKey)

  // 🧠 Exemplo de Função de Inteligência Aplicada (Você chamará isso na tela)
  const getPanoramaSES = async () => {
    try {
      // Exemplo: buscando dados da tabela 'cenarios_regionais'
      const { data, error } = await client
        .from('cenarios_regionais')
        .select('*')
        .order('taxa_ocupacao', { ascending: false })

      if (error) throw error
      return data
    } catch (err) {
      console.error('Erro ao buscar panorama da SES-MA:', err)
      return null
    }
  }

  // Retornamos o cliente puro e as funções encapsuladas
  return {
    client,
    getPanoramaSES
  }
}