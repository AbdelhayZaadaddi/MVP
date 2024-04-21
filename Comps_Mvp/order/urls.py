from django.urls import path
from .views import new_order, get_orders, get_order, update_order, delete_order

urlpatterns = [
    path('orders/new/', new_order, name='new_order'),
    path('orders/', get_orders, name='get_orders'),
    path('orders/<int:pk>/', get_order, name='get_order'),
    path('orders/<int:pk>/update/', update_order, name='update_order'),
    path('orders/<int:pk>/delete/', delete_order, name='delete_order'),
]