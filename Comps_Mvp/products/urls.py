from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from . import views

urlpatterns = [
    path('available_categories/', views.available_categories, name='available_categories'),
    path('available_cities/', views.available_cities, name='available_cities'),
    path('available_companies/', views.available_companies, name='available_companies'),
    path('products/', views.product_list_create, name='product_list_create'),
    path('products/<int:pk>/', views.product_detail_update_delete, name='product_detail_update_delete'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
