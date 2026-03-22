import { defineEventHandler } from 'h3'

export default defineEventHandler(async () => {
  // Simulação de delay para garantir que o 'pending' do Nuxt funcione
  await new Promise(resolve => setTimeout(resolve, 600))

  return {
    timestamp: new Date().toISOString(),
    kpis: [
      { id: 'ocupacao', titulo: 'Ocupação Global', valor: '84.5%', tendencia: '+2.1%', status: 'warning', descricao: 'Pressão na macrorregião Sul' },
      { id: 'custo', titulo: 'Custo Médio/Internação', valor: 'R$ 4.230', tendencia: '-5.4%', status: 'success', descricao: 'Economia via otimização de escala' },
      { id: 'mortalidade', titulo: 'Taxa de Mortalidade', valor: '1.2%', tendencia: '-0.3%', status: 'success', descricao: 'Dentro da margem da OCDE' },
      { id: 'giro', titulo: 'Giro de Leitos', valor: '4.2', tendencia: '+0.5', status: 'neutral', descricao: 'Dias médios por paciente' }
    ],
    serieTemporal: {
      meses: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'],
      internacoes: [1200, 1350, 1100, 1420, 1580]
    },
    pressaoRegional: {
      regioes: ['Imperatriz', 'Caxias', 'Balsas', 'Pinheiro', 'Sta. Inês', 'São Luís'],
      taxas: [92, 78, 65, 88, 54, 81]
    }
  }
})