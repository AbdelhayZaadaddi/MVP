from django.urls import path
from .views import UserCreate, UserUpdate, UserProfile, BlacklistTokenUpdateView, MyTokenObtainPairView, AddEmployeeView

urlpatterns = [
    path('create/', UserCreate.as_view(), name='user-create'),
    path('update/', UserUpdate.as_view(), name='user-update'),
    path('profile/', UserProfile.as_view(), name='user-profile'),
    path('add-employee/', AddEmployeeView.as_view(), name='add-employee'),
    path('logout/blacklist/', BlacklistTokenUpdateView.as_view(), name='blacklist'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
]
