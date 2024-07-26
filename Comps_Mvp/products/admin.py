from django.contrib import admin
from .models import Product, Company, City

# Register your models here.

class ProductAdmin(admin.ModelAdmin):
    search_fields = ['category']

admin.site.register(Product)
admin.site.register(Company)
admin.site.register(City)