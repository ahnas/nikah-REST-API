from django import forms
from django.forms.widgets import SelectMultiple, TextInput, Select, NumberInput, FileInput, PasswordInput
from user.models import Image

class ImageForm(forms.ModelForm):
    class Meta:
        model = Image
        fields = ('image','image_two','image_three')
        widgets = {
            'image': FileInput(attrs={'class': 'form-control','id':'image1', 'accept': 'image/*'}),
            'image_two': FileInput(attrs={'class': 'form-control','id':'image_two',  'accept': 'image/*'}),
            'image_three': FileInput(attrs={'class': 'form-control','id':'image_three',  'accept': 'image/*'}),
        }

   