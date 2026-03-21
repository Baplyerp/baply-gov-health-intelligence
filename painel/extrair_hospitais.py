import requests
import pandas as pd
from supabase import create_client

# Configurações (Use as mesmas que você colocou no Next.js)
URL = "https://exnnwewwkuiysgdmttgg.supabase.co"
KEY = "SUA_ANON_KEY"
supabase = create_client(URL, KEY)

def buscar_unidade_real(cnpj):
    print(f"🔍 Consultando Brazil API para o CNPJ: {cnpj}...")
    url_api = f"https://brasilapi.com.br/api/cnpj/v1/{cnpj}"
    
    response = requests.get(url_api)
    if response.status_code == 200:
        d = response.json()
        unidade = {
            "cnpj": d['cnpj'],
            "nome_fantasia": d['nome_fantasia'] or d['razao_social'],
            "municipio": d['municipio'],
            "natureza_juridica": d['natureza_juridica']
        }
        
        # Salva no Supabase
        supabase.table("unidades_saude_ma").upsert(unidade).execute()
        print(f"✅ Unidade '{unidade['nome_fantasia']}' integrada ao banco!")
    else:
        print("❌ Erro ao consultar Brazil API")

if __name__ == "__main__":
    # Exemplo: CNPJ de um Hospital Público do MA (substitua por um real para testar)
    buscar_unidade_real("12345678000199")