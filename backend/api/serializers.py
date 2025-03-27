from rest_framework import serializers
from .models import Profile,UserSpeech
from django.contrib.auth.models import User

class UserSignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True,min_length=8,style={'input_type':'password'})
    confirm_password = serializers.CharField(write_only=True,min_length=8,style={'input_type':'password'})
    class Meta:
        model = User
        fields = ['username','first_name','last_name','email','password','confirm_password']
    
    def create(self, validated_data):
        validated_data.pop('confirm_password')
        user = User.objects.create_user(
            username = validated_data['username'],
            email = validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '') 
        )
        return user
    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username','email','first_name','last_name']


class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Profile
        fields = ['user','bio','profile_picture']
    #Update method for user model nested serializer does not support updated idrectly as it is ReadOnly field
    def update(self,instance,validated_data):
        user_data = validated_data.pop('user',None)
        if user_data:
            user_instance = instance.user

            for attr,value in user_data.items():
                setattr(user_instance,attr,value)
            user_instance.save()

        for attr,value in validated_data.items():
            setattr(instance,attr,value)
        instance.save()

        return instance
    

    
class UserSpeechSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSpeech
        fields = ['id','user','title','description','speech','duration','image','created_at','updated_at']
        read_only_fields = ['id','user','created_at','updated_at']

    def validate_speech(self,value):
        if not value.name.endswith('.mp3'):
            raise serializers.ValidationError("Only mp3 files are allowed")
        return value
    
    def validate_image(self,value):
        if value and not value.name.lower().endswith(('.png', '.jpg', '.jpeg')):
            raise serializers.ValidationError("Only PNG,JPG and JPEG images are allowed")
        return value
