from django.shortcuts import render
from .models import Profile,UserSpeech
from rest_framework.response import Response
from .serializers import ProfileSerializer,UserSignupSerializer,UserSpeechSerializer
from rest_framework import generics,permissions,status,viewsets
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView

#Customizing TOken claims(added username)
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        return token

#Get or updated profile
class ProfileGetUpdateView(generics.RetrieveUpdateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user.profile

#Login and get access token
class LoginView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

#Refreshing access token
class RefreshAccessToken(TokenRefreshView):
    pass

#User Signup View
class SignupView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSignupSerializer
    permission_classes = [permissions.AllowAny]

#User Logout View
class LogoutView(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        try:
            refresh_token = request.data.get('refresh')
            if not refresh_token:
                return Response({
                    'data':'Refresh token is required'
                }, status=status.HTTP_400_BAD_REQUEST)
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({''
            'data':"Logged out"
                             },status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({
                'data':"Invalid refresh token"
            }, status=status.HTTP_400_BAD_REQUEST)


#User Speech (get,get_single,create,update and delete)

class UserSpeechViewSet(viewsets.ModelViewSet):
    serializer_class = UserSpeechSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return UserSpeech.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

#Speech metrics viewset

class SpeechMetricsAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self,request,speech_id):
        try:
            speech = UserSpeech.objects.get(pk = speech_id)
            metrics = speech.metrics

            if not metrics:
                return Response({
                    "error":"Metrics not availabe yet"
                },status=status.HTTP_202_ACCEPTED)
            
            data = {
                "title": speech.title,
                "metrics": {
                    "Clarity": metrics.clarity,
                    "Tone": metrics.tone,
                    "Volume": metrics.volume,
                    "Pauses": metrics.pauses,
                    "Pacing": metrics.pacing
                }
            }
            return Response(data)
        except UserSpeech.DoesNotExist:
            return Response(
                {"error":"Speech not found"},
                status=status.HTTP_404_NOT_FOUND
            )
        


