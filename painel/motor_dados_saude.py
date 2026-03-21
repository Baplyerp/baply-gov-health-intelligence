import pandas as pd
from pysus.online_data.SIH import download
import sqlalchemy
from datetime import datetime

# CONFIGURAÇÃO SUPABASE (Substitua pelos seus dados do "Project Settings > Database")
# Ex: postgres://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-sa-east-1.pooler.supabase.com:6543/postgres
DB_URL = "postgresql://postgres:[SUA_SENHA]@db.exnnwewwkuiysgdmttgg.supabase.co:5432/postgres"

def extrair_dados_maranhao():
    print("🚀 Iniciando captura de dados reais do SIH/SUS (Maranhão)...")
    
    # Baixa dados de internação do Maranhão (MA) - Fevereiro/2026
    # Nota: Em sistemas reais, puxamos o mês anterior pois o DATASUS tem delay.
    try:
        df = download('MA', 2026, 2)
        print(f"✅ {len(df)} registros encontrados!")
        
        # Limpeza rápida: Pegar internações por Município
        # MUNIC_RES é o código IBGE do município
        resumo = df.groupby('MUNIC_RES').size().reset_index(name='total_internacoes')
        resumo['mes_ano'] = '2026-02-01'
        resumo['indicador_nome'] = 'Internações Hospitalares (SIH)'
        
        # Conectar e Enviar ao Supabase
        engine = sqlalchemy.create_client(DB_URL)
        resumo.to_sql('monitoramento_sus_real', engine, if_exists='append', index=False)
        
        print("🔥 Dados reais injetados no Supabase com sucesso!")
        
    except Exception as e:
        print(f"❌ Erro na captura: {e}")

if __name__ == "__main__":
    extrair_dados_maranhao()