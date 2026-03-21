import pandas as pd
from pysus.online_data.SIH import download
from sqlalchemy import create_engine
import os

# --- CONFIGURAÇÃO ---
# Use a string de conexão do seu Supabase (Project Settings > Database)
# Formato: postgresql://postgres.[REF]:[SENHA]@db.[REF].supabase.co:5432/postgres
DB_URL = "SUA_STRING_DE_CONEXAO_AQUI"

def processar_ano_ma(ano):
    print(f"📂 Iniciando processamento do ano {ano} para o Maranhão...")
    engine = create_engine(DB_URL)
    
    # Vamos baixar os meses de 1 a 12 (ou até o mês atual para 2026)
    limite_mes = 12 if ano < 2026 else 2 # Ajuste conforme o mês atual
    
    for mes in range(1, limite_mes + 1):
        try:
            print(f"⏳ Baixando MA - Mês {mes}/{ano}...")
            # O PySUS baixa o .dbc e já converte para DataFrame
            df = download('MA', ano, mes)
            
            # --- TRANSFORMAÇÃO (Lógica de Gestor) ---
            # Agrupamos por data para alimentar o seu gráfico de Área
            df['DT_INTER'] = pd.to_datetime(df['DT_INTER'], errors='coerce')
            resumo = df.groupby(df['DT_INTER'].dt.to_period('M')).size().reset_index(name='taxa_ocupacao_actual')
            
            # Preparar para o banco
            resumo.columns = ['mes_referencia', 'taxa_ocupacao_atual']
            resumo['mes_referencia'] = resumo['mes_referencia'].dt.to_timestamp()
            resumo['demanda_projetada'] = resumo['taxa_ocupacao_atual'] * 1.05 # Simulação de crescimento
            resumo['limite_critico'] = 80.0
            
            # Enviar para a tabela que criamos
            resumo.to_sql('indicadores_capacidade', engine, if_exists='append', index=False)
            print(f"✅ Mês {mes} enviado ao Supabase!")
            
        except Exception as e:
            print(f"⚠️ Erro no mês {mes}: {e}")

if __name__ == "__main__":
    processar_ano_ma(2025)
    # processar_ano_ma(2026) # Descomente quando quiser os dados de 2026