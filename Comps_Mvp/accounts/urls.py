from django.urls import path
from .views import UserCreate, UserUpdate, UserProfile, BlacklistTokenUpdateView, MyTokenObtainPairView

urlpatterns = [
    path('create/', UserCreate.as_view(), name='user-create'),
    path('update/', UserUpdate.as_view(), name='user-update'),
    path('profile/', UserProfile.as_view(), name='user-profile'),
    path('logout/blacklist/', BlacklistTokenUpdateView.as_view(), name='blacklist'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
]
