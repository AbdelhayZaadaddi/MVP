from django.contrib import admin
from .models import Admin, Company, Employes, Trader

# Register your models here.
admin.site.register(Admin)
admin.site.register(Company)
admin.site.register(Employes)
admin.site.register(Trader)

