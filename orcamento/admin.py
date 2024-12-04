from django.contrib import admin
from .models import TipoAcao, Acao

@admin.register(TipoAcao)
class TipoAcaoAdmin(admin.ModelAdmin):
    list_display = ('nome_acao',) 
    search_fields = ('nome_acao',) 


@admin.register(Acao)
class AcaoAdmin(admin.ModelAdmin):
    list_display = ('tipo_acao', 'investimento', 'data_prevista', 'data_cadastro')
    list_filter = ('tipo_acao', 'data_prevista') 
    search_fields = ('tipo_acao__nome_acao', 'investimento') 
    date_hierarchy = 'data_prevista'  
