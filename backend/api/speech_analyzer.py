# # speech_analyzer.py
# import librosa
# import numpy as np
# import os
# from scipy import stats

# def analyze_speech(file_path):
#     """Analyze speech file and return metrics on 1-5 scale"""
#     try:
#         # Load audio file
#         y, sr = librosa.load(file_path, sr=None)
#         duration = librosa.get_duration(y=y, sr=sr)
        
#         # 1. Clarity - based on spectral flatness (lower is clearer)
#         spectral_flatness = librosa.feature.spectral_flatness(y=y)
#         clarity_score = 5 - (np.mean(spectral_flatness) * 4)  # Convert to 1-5 scale
#         clarity_score = np.clip(clarity_score, 1, 5)
        
#         # 2. Tone - based on pitch consistency
#         f0, _, _ = librosa.pyin(y, fmin=80, fmax=400)
#         f0 = f0[~np.isnan(f0)]  # Remove NaN values
#         if len(f0) > 0:
#             tone_score = 5 - (np.std(f0) / 50)  # Lower std deviation = more consistent tone
#             tone_score = np.clip(tone_score, 1, 5)
#         else:
#             tone_score = 3  # Neutral if no pitch detected
            
#         # 3. Volume - based on RMS energy
#         rms = librosa.feature.rms(y=y)
#         avg_volume = np.mean(rms)
#         # Normalize volume to 1-5 scale (adjust thresholds based on your audio)
#         volume_score = np.interp(avg_volume, [0.01, 0.1], [1, 5])
#         volume_score = np.clip(volume_score, 1, 5)
        
#         # 4. Pauses - based on silence detection
#         non_silent = librosa.effects.split(y, top_db=30)
#         pause_durations = []
#         for i in range(1, len(non_silent)):
#             pause_duration = (non_silent[i][0] - non_silent[i-1][1]) / sr
#             pause_durations.append(pause_duration)
        
#         avg_pause = np.mean(pause_durations) if pause_durations else 0
#         # Score based on optimal pause duration (0.3-0.6 seconds)
#         if avg_pause < 0.3:
#             pause_score = 3  # Too few pauses
#         elif avg_pause > 0.8:
#             pause_score = 2  # Too many/long pauses
#         else:
#             pause_score = 4  # Good pause control
        
#         # 5. Pacing - based on syllable rate
#         spectral_centroid = librosa.feature.spectral_centroid(y=y, sr=sr)
#         spectral_centroid_diff = np.diff(spectral_centroid, axis=1)
#         syllable_rate = np.mean(np.abs(spectral_centroid_diff)) * 10
        
#         # Normalize to 1-5 scale (adjust based on your data)
#         pacing_score = np.interp(syllable_rate, [5, 20], [1, 5])
#         pacing_score = np.clip(pacing_score, 1, 5)
        
#         return {
#             'clarity': round(float(clarity_score), 1),
#             'tone': round(float(tone_score), 1),
#             'volume': round(float(volume_score), 1),
#             'pauses': float(pause_score),
#             'pacing': round(float(pacing_score), 1)
#         }
        
#     except Exception as e:
#         print(f"Error analyzing speech: {str(e)}")
#         return None


import librosa
import numpy as np
import scipy.stats as stats
from scipy.signal import butter, lfilter

def butter_bandpass(lowcut, highcut, fs, order=5):
    """Design a bandpass filter for audio preprocessing."""
    nyq = 0.5 * fs
    low = lowcut / nyq
    high = highcut / nyq
    b, a = butter(order, [low, high], btype='band')
    return b, a

def apply_bandpass_filter(data, lowcut, highcut, fs, order=5):
    """Filter audio signal to focus on speech frequencies."""
    b, a = butter_bandpass(lowcut, highcut, fs, order)
    return lfilter(b, a, data)

def analyze_speech(file_path):
    """Analyze speech audio for clarity, tone, volume, pauses, and pacing."""
    try:
        # Load and standardize audio
        y, sr = librosa.load(file_path, sr=22050)
        
        # Preprocess: Remove DC offset and filter speech range (80-300 Hz)
        y = y - np.mean(y)
        y = apply_bandpass_filter(y, 80, 300, sr)
        
        # 1. Clarity: Measure spectral consistency
        spec_flatness = np.mean(librosa.feature.spectral_flatness(y=y))
        spec_contrast = librosa.feature.spectral_contrast(y=y, sr=sr)
        clarity = (1 - spec_flatness) * (1 - stats.variation(spec_contrast[0]))
        clarity_score = np.interp(clarity, [0, 1], [1, 5])
        
        # 2. Tone: Analyze pitch stability
        f0, voiced_flag, _ = librosa.pyin(y, fmin=80, fmax=400)
        f0_voiced = f0[voiced_flag]
        
        if len(f0_voiced) > 0:
            pitch_variation = np.std(f0_voiced)
            voiced_percentage = np.mean(voiced_flag)
            tone_score = np.mean([5 - (pitch_variation / 50), voiced_percentage * 5])
            tone_score = np.clip(tone_score, 1, 5)
        else:
            tone_score = 3  # Neutral fallback
        
        # 3. Volume: Assess loudness and dynamic range
        rms = np.mean(librosa.feature.rms(y=y))
        peak = np.max(np.abs(y))
        dynamic_range = 20 * np.log10(peak / (rms + 1e-6))  # Avoid division by zero
        volume_score = np.mean([
            np.interp(rms, [0.01, 0.1], [1, 5]),
            np.interp(dynamic_range, [10, 40], [1, 5])
        ])
        volume_score = np.clip(volume_score, 1, 5)
        
        # 4. Pauses: Detect and evaluate silence gaps
        non_silent = librosa.effects.split(y, top_db=30)
        silence_durations = []
        
        for i in range(1, len(non_silent)):
            gap = (non_silent[i][0] - non_silent[i-1][1]) / sr
            silence_durations.append(gap)
        
        if silence_durations:
            avg_pause = np.mean([d for d in silence_durations if 0.1 < d < 2])  # Filter outliers
            pause_score = np.interp(avg_pause, [0.2, 0.7], [5, 2]) if avg_pause else 3
        else:
            pause_score = 3  # Neutral if no pauses
        
        # 5. Pacing: Estimate speech tempo and energy
        onset_strength = librosa.onset.onset_strength(y=y, sr=sr)
        tempo = librosa.beat.tempo(onset_envelope=onset_strength, sr=sr)[0]
        pacing_score = np.mean([
            np.interp(tempo, [80, 160], [1, 5]),  # Reasonable speech tempo range
            np.interp(np.mean(onset_strength), [0.1, 0.5], [1, 5])
        ])
        
        # Return scores rounded to 1 decimal
        return {
            'clarity': round(clarity_score, 1),
            'tone': round(tone_score, 1),
            'volume': round(volume_score, 1),
            'pauses': round(pause_score, 1),
            'pacing': round(pacing_score, 1)
        }
        
    except Exception as e:
        print(f"Speech analysis failed: {str(e)}")
        return None

# Example usage
if __name__ == "__main__":
    result = analyze_speech("sample.wav")
    if result:
        print("Analysis Results:", result)