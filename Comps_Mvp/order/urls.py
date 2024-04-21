from django.urls import path
from .views import new_order, get_orders, get_order, update_order, delete_order

urlpatterns = [
    path('new/', new_order, name='new_order'),
    
]