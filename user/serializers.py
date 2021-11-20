from django.contrib.auth import get_user_model,authenticate
from django.db.models import fields
from django.db.models.base import Model
from django.utils.translation import gettext as _
from versatileimagefield.serializers import VersatileImageFieldSerializer


from rest_framework import serializers
from rest_framework.fields import ReadOnlyField
from . import models
import user
from rest_framework.response import Response
from rest_framework import status



class UserSerializer(serializers.ModelSerializer):
    """Serializer for the users object"""

    class Meta:
        model = get_user_model()
        fields = ('id','email','password')
        read_only_fields = ('id',)
        extra_kwargs = {'password': {'write_only': True, 'min_length': 5}}

    def create(self, validated_data):
        """Create a new user with encrypted password and return it"""
        return get_user_model().objects.create_user(**validated_data)



class AuthTokenSerializer(serializers.Serializer):
    """Serializer for the user authentication object"""
    email = serializers.CharField()
    password = serializers.CharField(
        style={'input_type': 'password'},
        trim_whitespace=False
    )
    
    def validate(self, attrs):
        """Validate and authenticate the user"""
        email = attrs.get('email')
        password = attrs.get('password')
        user = authenticate(
            request=self.context.get('request'),
            username=email,
            password=password
        )
        if not user:
            msg = _('Unable to authenticate with provided credentials')
            raise serializers.ValidationError(msg, code='authorization')
 
        attrs['user'] = user
        return attrs


class ResetPasswordSerializer(serializers.Serializer):
    """Serializer for the user authentication object"""
    password = serializers.CharField(
        style={'input_type': 'password'},
        trim_whitespace=False
    )
    newPassword = serializers.CharField(
        style={'input_type': 'password'},
        trim_whitespace=False
    )
    
    
    def validate(self, attrs):
        
        """Validate and authenticate the user"""
        request = self.context.get('request', None)
        if request:
            email = request.user.email
        password = attrs.get('password')
        newPassword = attrs.get('newPassword')
        user = authenticate(
            request=self.context.get('request'),
            username=email,
            password=password
        )
        if not user:
            msg = _('Unable to authenticate with provided credentials')
            raise serializers.ValidationError(msg, code='authorization')
 
        
        user.set_password(newPassword)
        user.save()
        request.user.auth_token.delete()
        attrs['user'] = user
        return attrs


class UserPropertiesSerializer(serializers.ModelSerializer):
    """Serialize a recipe"""
  
    class Meta:
        model = models.UserProperties
        fields = '__all__'
        read_only_fields = ('id','user')

class UserPropertieslessfieldSerializer(serializers.ModelSerializer):
    """Serialize user properties less fields"""
  
    class Meta:
        model = models.UserProperties
        fields = (
            'id', 'dateOfBirth', 'name', 'nationality','relegion','martialStatus','gender',
        )
        read_only_fields = ('id','dateOfBirth')
class UserEducationLocationContactSerializer(serializers.ModelSerializer):
    """Serialize a recipe"""
  
    class Meta:
        model = models.UserEducationLocationContact
        fields = '__all__'
        read_only_fields = ('id','user','userProperties')
class UserEducationLocationContactFilteredSerializer(serializers.ModelSerializer):
    """Serialize a education filtered"""
  
    class Meta:
        model = models.UserEducationLocationContact
        fields = (
            'id', 'highestEducation','nativeCity','workingas',
        )
        read_only_fields = ('id','highestEducation')
        
class Likeprodileserializer(serializers.ModelSerializer):
    class Meta:
        model = models.LikeProfile
        fields='__all__'

class UserAllserializer(serializers.ModelSerializer):
    """Serialize a recipe"""
    image = VersatileImageFieldSerializer(
        sizes=[
            ('medium_square_crop', 'crop__400x400'),
        ]
    )
    image_two = VersatileImageFieldSerializer(
        sizes=[
            ('medium_square_crop', 'crop__400x400'),
        ]
    )
    image_three= VersatileImageFieldSerializer(
        sizes=[
            ('medium_square_crop', 'crop__400x400'),
        ]
    )
    user =serializers.PrimaryKeyRelatedField(
        queryset=models.UserProperties.objects.all()
    )
    profile = UserPropertieslessfieldSerializer(read_only=True)
    education= UserEducationLocationContactFilteredSerializer(read_only=True)
    is_liked = serializers.SerializerMethodField('is_liked_profile')
    def is_liked_profile(self, image):
        request = self.context.get('request', None)
        if request:
            liked_by_user=models.Image.objects.get(user=request.user)
            liked_user=models.User.objects.get(id=image.user_id)
            likedRedord =models.LikeProfile.objects.filter(liked_by_user=liked_by_user,liked_user=liked_user)
            if likedRedord.exists():
                return likedRedord.first().id
        return 0
    class Meta:
        model = models.Image
        fields = (
            'id', 'image','image_two','image_three', 'profile', 'education', 'user','nmId','is_liked',
        )
        read_only_fields = ('id',)


class UserAllserializerDetailled(UserAllserializer):
    """Serialize a recipe Details"""
    user = UserSerializer(read_only=True)
    profile=UserPropertiesSerializer(read_only=True)
    education=UserEducationLocationContactSerializer(read_only=True)



class UserPreferencesSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserPreferences
        fields='__all__'
        read_only_fields = ('user',)

class BasicUserPreferencesSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserPreferences
        fields=('ageFrom','ageTo','martialStatus','complexion','heightFrom','heightTo','weightFrom','weightTo','education','financialStatus','country','city')
        read_only_fields = ('user',)

class ProfesionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ProfessionTable
        fields='__all__'


class UpdateUserPropertiesSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserProperties
        fields = '__all__'
        read_only_fields = ('user','profileCreated','name','gender','preferredProfile','relegion')

class updateUserLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserEducationLocationContact
        fields = '__all__'
        read_only_fields = ('userProperties','user','locality')

class updateUserImage(serializers.ModelSerializer):
    user=UserSerializer()
    class Meta:
        model = models.Image
        fields = '__all__'





class UserImageSerializer(serializers.ModelSerializer):
    """Serialize a User Properties"""
    image = VersatileImageFieldSerializer(
        sizes=[
            ('medium_square_crop', 'crop__400x400'),
        ]
    )
    image_two = VersatileImageFieldSerializer(
        sizes=[
            ('medium_square_crop', 'crop__400x400'),
        ]
    )
    image_three= VersatileImageFieldSerializer(
        sizes=[
            ('medium_square_crop', 'crop__400x400'),
        ]
    )
    class Meta:
        model = models.Image
        fields = '__all__'
        read_only_fields = ('id','nmId','user','profile','education')

class UserImageForTwoImageSerializer(serializers.ModelSerializer):
    """Serialize a User Properties"""
    image = VersatileImageFieldSerializer(
        sizes=[
            ('medium_square_crop', 'crop__400x400'),
        ]
    )
    image_two = VersatileImageFieldSerializer(
        sizes=[
            ('medium_square_crop', 'crop__400x400'),
        ]
    )
    class Meta:
        model = models.Image
        fields = '__all__'
        read_only_fields = ('id','nmId','user','profile','education','image_three')

class UserImageForOneImageSerializer(serializers.ModelSerializer):
    """Serialize a User Properties"""
    image = VersatileImageFieldSerializer(
        sizes=[
            ('medium_square_crop', 'crop__400x400'),
        ]
    )
    class Meta:
        model = models.Image
        fields = '__all__'
        read_only_fields = ('id','nmId','user','profile','education','image_three','image_two')

class UserImageSkipSerializer(serializers.ModelSerializer):
    """Serialize a User Properties"""
    class Meta:
        model = models.Image
        fields = '__all__'
        read_only_fields = ('id','nmId','user','profile','education','image_three','image_two','image')




class UserChatsserializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserChats
        fields='__all__'
        read_only_fields=('ChatfromUser','ChatfromUserID','chatimage','chatDisplayName')


class Messagesserializer(serializers.ModelSerializer):
    class Meta:
        model = models.Messages
        fields='__all__'
        read_only_fields = ('chatimage','user',)