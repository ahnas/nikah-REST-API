from django.contrib.auth import get_user_model,authenticate
from django.db.models import fields
from django.db.models.base import Model
from django.utils.translation import gettext as _

from rest_framework import serializers
from . import models
import user


class UserSerializer(serializers.ModelSerializer):
    """Serializer for the users object"""

    class Meta:
        model = get_user_model()
        fields = ('email','password')
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
            'id', 'highestEducation', 'profession', 'professionType','nativeCity',
        )
        read_only_fields = ('id','highestEducation')
        
class Likeprodileserializer(serializers.ModelSerializer):
    class Meta:
        model = models.LikeProfile
        fields='__all__'

class UserAllserializer(serializers.ModelSerializer):
    """Serialize a recipe"""
    user =serializers.PrimaryKeyRelatedField(
        queryset=models.UserProperties.objects.all()
    )
    profile = UserPropertieslessfieldSerializer(read_only=True)
    education= UserEducationLocationContactFilteredSerializer(read_only=True)
    class Meta:
        model = models.Image
        fields = (
            'id', 'image', 'profile', 'education', 'user','nmId',
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
        fields = ('height','weight','nationality','ethnicGroup','relegion','martialStatus','numberofChildresn','complexion','bodyType','motherTongue','physicalStatus','fatherOccupation','motherOccupation','numberofsiblings','elderBrothers','marriedBrothers','youngerSisters','marriedSisters','financialStatus')

class updateUserLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserEducationLocationContact
        fields = ('nativeCountry','nativeState','primaryNumber','secondaryNumber','highestEducation','profession')

class updateUserImage(serializers.ModelSerializer):
    class Meta:
        model = models.Image
        fields = ('image','id')