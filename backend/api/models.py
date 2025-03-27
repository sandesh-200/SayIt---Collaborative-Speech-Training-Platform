from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE,related_name='profile')
    bio = models.TextField(blank=True,null=True)
    profile_picture = models.ImageField(upload_to='profile_pics/',blank=True,null=True)

    def __str__(self):
        return f"Profile of {self.user.username}"
    


class UserSpeech(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,related_name='speeches')
    title = models.CharField(max_length=225)
    description = models.TextField(blank=True,null=True)
    speech = models.FileField(upload_to='speeches/')
    duration = models.DurationField()
    image = models.ImageField(upload_to='speech_images/',blank=True,null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
    
class SpeechMetrics(models.Model):
    speech = models.OneToOneField(UserSpeech,on_delete=models.CASCADE,related_name="metrics")
    clarity = models.FloatField(null=True,blank=True)
    tone = models.FloatField(null=True,blank=True)
    volume = models.FloatField(null=True,blank=True)
    pauses = models.FloatField(null=True,blank=True)

    pacing = models.FloatField(null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Mertices for {self.speech.title}"