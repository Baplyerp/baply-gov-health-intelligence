import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  
  // 🔑 Conexão Segura com Supabase
  const supabase = createClient(
    config.public.supabaseUrl,
    config.public.supabaseAnonKey
  )

  // 📊 Query Econométrica: Busca ocupação e cruza com a capacidade
  const { data: ocupacaoReal, error } = await supabase
    .from('dim_unidades')
    .select(`
      nome,
      capacidade_leitos,
      fato_ocupacao (
        leitos_ocupados,
        custo_operacional_dia
      )
    `)

  if (error) throw createError({ statusCode: 500, statusMessage: error.message })

  // 🧠 Processamento dos Dados (O "Coração" do BI)
  const regioes = ocupacaoReal.map(u => u.nome.replace('Hosp. ', ''))
  const taxas = ocupacaoReal.map(u => {
    const ultimoRegistro = u.fato_ocupacao[0]
    return Math.round((ultimoRegistro.leitos_ocupados / u.capacidade_leitos) * 100)
  })

  return {
    timestamp: new Date().toISOString(),
    kpis: [
      { id: 'ocupacao', titulo: 'Ocupação Global', valor: `${Math.round(taxas.reduce((a, b) => a + b, 0) / taxas.length)}%`, tendencia: '+1.2%', status: 'warning', descricao: 'Média da rede física' },
      { id: 'custo', titulo: 'Custo Diário/Leito', valor: 'R$ 4.120', tendencia: '-2.1%', status: 'success', descricao: 'Análise de eficiência' }
    ],
    pressaoRegional: {
      regioes: regioes,
      taxas: taxas
    }
  }
})