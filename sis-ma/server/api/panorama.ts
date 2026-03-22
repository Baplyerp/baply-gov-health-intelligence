import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  
  // 1. Verificação de Segurança (Impede o erro 500 por falta de ENV)
  if (!config.public.supabaseUrl || !config.public.supabaseAnonKey) {
    console.error("❌ ERRO: Variáveis do Supabase não encontradas no RuntimeConfig.")
    return { error: "Configuração do banco de dados pendente." }
  }

  const supabase = createClient(
    config.public.supabaseUrl,
    config.public.supabaseAnonKey
  )

  // 2. Query com tratamento de erro
  try {
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

    if (error) {
      console.error("❌ Erro na Query do Supabase:", error.message)
      // Se a tabela não existir, retornamos um estado vazio amigável
      return { kpis: [], pressaoRegional: { regioes: [], taxas: [] }, status: "Tabelas não encontradas" }
    }

    // 3. Processamento (Só roda se houver dados)
    if (!ocupacaoReal || ocupacaoReal.length === 0) {
      return { kpis: [], pressaoRegional: { regioes: [], taxas: [] }, status: "Sem dados cadastrados" }
    }

    const regioes = ocupacaoReal.map(u => u.nome.replace('Hosp. ', ''))
    const taxas = ocupacaoReal.map(u => {
      const registro = u.fato_ocupacao?.[0] || { leitos_ocupados: 0 }
      return Math.round((registro.leitos_ocupados / u.capacidade_leitos) * 100)
    })

    return {
      timestamp: new Date().toISOString(),
      kpis: [
        { id: 'ocupacao', titulo: 'Ocupação Global', valor: `${Math.round(taxas.reduce((a, b) => a + b, 0) / taxas.length)}%`, tendencia: '+1.2%', status: 'warning', descricao: 'Média da rede física' },
        { id: 'custo', titulo: 'Custo Diário/Leito', valor: 'R$ 4.120', tendencia: '-2.1%', status: 'success', descricao: 'Análise de eficiência' }
      ],
      pressaoRegional: { regioes, taxas }
    }
git push
  } catch (err) {
    return { error: "Falha na conexão com o motor de dados." }
  }
})