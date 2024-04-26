from django.contrib import admin
from .models import NewUser, Company, Employes, Trader

# Register your models here.

admin.site.register(NewUser)
admin.site.register(Company)
admin.site.register(Employes)
admin.site.register(Trader)

