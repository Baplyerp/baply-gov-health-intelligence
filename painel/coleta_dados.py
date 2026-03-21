import requests
import psycopg2 # Se não tiver, rode: pip install psycopg2-binary

# Configurações do seu Supabase (Pegue em Project Settings > Database)
DB_NAME = "postgres"
DB_USER = "postgres"
DB_PASS = "SUA_SENHA_DO_SUPABASE"
DB_HOST = "db.exnnwewwkuiysgdmttgg.supabase.co"
DB_PORT = "5432"

def atualizar_populacao_ma():
    # API do IBGE: População estimada 2024 para o Maranhão (UF 21)
    url = "https://servicodados.ibge.gov.br/api/v1/projecoes/populacao/21"
    
    response = requests.get(url)
    if response.status_code == 200:
        dados = response.json()
        populacao = dados['projecao']['populacao']
        print(f"População real detectada no Maranhão: {populacao}")
        
        # Aqui conectaríamos ao seu Supabase para dar o UPDATE na tabela regioes_saude
        # Por enquanto, vamos focar em garantir que o Next.js exiba isso.
    else:
        print("Erro ao acessar API do IBGE")

if __name__ == "__main__":
    atualizar_populacao_ma()