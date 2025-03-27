from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import Profile,UserSpeech,SpeechMetrics
from .speech_analyzer import analyze_speech
import os

@receiver(post_save,sender=User)
def create_or_update_user_profile(sender,instance,created,**kwargs):
    if created:
        Profile.objects.create(user=instance)
        print(f"Profile created for User: {instance.username}")
    else:
        print('User saved')
        

@receiver(post_save, sender=UserSpeech)
def analyze_speech_metrics(sender, instance, created, **kwargs):
    if created and instance.speech:
        file_path = instance.speech.path
        if os.path.exists(file_path):
            metrics = analyze_speech(file_path)
            if metrics:
                SpeechMetrics.objects.create(
                    speech=instance,
                    clarity=metrics['clarity'],
                    tone=metrics['tone'],
                    volume=metrics['volume'],
                    pauses=metrics['pauses'],
                    pacing=metrics['pacing']
                )