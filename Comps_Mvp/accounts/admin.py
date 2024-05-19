from django.contrib import admin
from .models import NewUser, Company, Employee, Trader

# Register your models here.

admin.site.register(NewUser)
admin.site.register(Company)
admin.site.register(Employee)
admin.site.register(Trader)
