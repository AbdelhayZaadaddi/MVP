from django.urls import path
from .views import test, test2

urlpatterns = [
    path('test/', test, name='test'),
    path('test2/', test2, name='test2'),
]