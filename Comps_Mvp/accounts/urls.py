from django.urls import path
from .views import UserUpdate, UserCreate, UserProfile, BlacklistTokenUpdateView

app_name = 'users'

urlpatterns = [
    path('create/', UserCreate.as_view(), name="create_user"),
    path('profile/', UserProfile.as_view(), name="user_profile"),
    path('user/logout/blacklist/', BlacklistTokenUpdateView.as_view(), name='blacklist-token'),
]