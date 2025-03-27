from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'speeches', views.UserSpeechViewSet, basename='speech')

urlpatterns = [
    path('signup/', views.SignupView.as_view(), name="signup"),
    path('login/', views.LoginView.as_view(), name="login"),
    path('refresh/', views.TokenRefreshView.as_view(), name="refresh"),
    path('logout/', views.LogoutView.as_view(), name="logout"),
    path('profile/', views.ProfileGetUpdateView.as_view(), name="profile"),
    path('speech-metrics/<int:speech_id>/', views.SpeechMetricsAPI.as_view(), name="speech-metrics"),
    path('', include(router.urls)),  
]