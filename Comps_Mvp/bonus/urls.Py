from . import views
from django.urls import path


urlpatterns = [
    path('bonus', views.list_bonus, name='list_bonus'),
    path('bonus/<int:pk>/', views.bonus, name='bonus'),
    path('bonus/craete', views.create_bonus, name='create_bonus'),
]