from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from .views import product_list_create, product_detail_update_delete

urlpatterns = [
    path('products/', product_list_create, name='product-list-create'),
    path('product/<int:pk>/', product_detail_update_delete, name='product-detail-update-delete'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)