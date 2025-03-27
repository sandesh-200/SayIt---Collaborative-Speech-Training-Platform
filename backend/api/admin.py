from django.contrib import admin
from .models import Profile,UserSpeech,SpeechMetrics

# Register your models here.

class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'bio', 'profile_picture')
admin.site.register(UserSpeech)
admin.site.register(SpeechMetrics)

admin.site.register(Profile, ProfileAdmin)