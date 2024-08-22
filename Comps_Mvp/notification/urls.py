from django.urls import path
from .views import NotificationCreateView, NotificationListView, NotificationDetailView

urlpatterns = [
    path('notifications/', NotificationListView.as_view(), name='notification-list'),
    path('notifications/create/', NotificationCreateView.as_view(), name='notification-create'),
    path('notifications/<int:pk>/', NotificationDetailView.as_view(), name='notification-detail'),
]
