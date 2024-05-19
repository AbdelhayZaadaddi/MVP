from .views import bonus_list_create, bonus_detail_update_delete
from django.urls import path


urlpatterns = [
    path('bonus/', bonus_list_create, name='bonus_list_bonus'),
    path('bonus/<int:pk>/', bonus_detail_update_delete, name='bonus-detail-update-delete'),
    #path('bonus/<int:pk>/', views.bonus, name='bonus'),
    #path('bonus/craete', views.create_bonus, name='create_bonus'),
]