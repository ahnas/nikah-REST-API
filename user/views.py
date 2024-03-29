
from django.db.models import Q
from django.http import request
from datetime import datetime
from django.http.response import Http404, HttpResponse, HttpResponseNotAllowed, JsonResponse
from django.shortcuts import redirect, render
from collections import namedtuple
from rest_framework import generics,viewsets, mixins
from rest_framework.exceptions import ErrorDetail
from rest_framework.serializers import Serializer, SerializerMetaclass
from user import models
from rest_framework import status
from user.models import User, UserProperties,UserEducationLocationContact,Image,UserPreferences,LikeProfile,UserSearch,PassWordReset
from .serializers import UserPropertiesSerializer, UserSerializer, AuthTokenSerializer,UserImageSerializer,UserImageSkipSerializer, \
    UserImageForTwoImageSerializer,UserImageForTwoImageSerializer,UserImageForOneImageSerializer,ResetPasswordSerializer,\
        ChatUserSerializer,MessageSerializer
from rest_framework.authtoken.views import ObtainAuthToken,APIView
from rest_framework.settings import api_settings
from . import serializers
from rest_framework.permissions import IsAuthenticated, SingleOperandHolder,IsAdminUser
from rest_framework.authentication import TokenAuthentication
from django.db.models import Q
from . import helper as helper
import user
import datetime 
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
# from. import models


 # Create your views here.
 
class CreateUserView(generics.CreateAPIView):
    """Create a new user in the system"""
    serializer_class = UserSerializer

    


class CreateTokenView(ObtainAuthToken):
    """Create a new auth token for the user"""
    serializer_class = AuthTokenSerializer
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES


class ResetPasswordView(ObtainAuthToken):
    """Create a new auth token for the user"""
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    serializer_class = ResetPasswordSerializer
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES

class UserPropertiesViewSet(viewsets.ModelViewSet):
    """Manage recipes in the database"""
    serializer_class = serializers.UserPropertiesSerializer
    queryset = UserProperties.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        """Retrieve the recipes for the authenticated user"""
        return self.queryset.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        """Create a new recipe"""
        if self.queryset.filter(user=self.request.user).exists():
            profile =UserProperties.objects.get(user=self.request.user)
            profile.delete()
        serializer.save(user=self.request.user)

class UserEducationLocationContactViewSet(viewsets.ModelViewSet):
    """Manage recipes in the database"""
    serializer_class = serializers.UserEducationLocationContactSerializer
    queryset = UserEducationLocationContact.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        """Retrieve the recipes for the authenticated user"""
        return self.queryset.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        """Create a new recipe"""
        property =UserProperties.objects.filter(user=self.request.user).first()
        
        if self.queryset.filter(user=self.request.user).exists():
            education =UserEducationLocationContact.objects.get(user=self.request.user)
            education.delete()
        else:
            if UserPreferences.objects.filter(user=self.request.user).exists():
                prefinstance=UserPreferences.objects.get(user=self.request.user)
                prefinstance.delete()
            if UserSearch.objects.filter(user=self.request.user).exists():
                searchinstance=UserSearch.objects.get(user=self.request.user)
                searchinstance.delete()
            preference = UserPreferences()
            preference.user=self.request.user    
            preference.save()
            search = UserSearch()
            search.user=self.request.user    
            search.save()
        serializer.save(user=self.request.user,userProperties=property)

class TestAuthView(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    serializer_class =serializers.UserSerializer
    
    def get(self,request,format=None):
        

        email= str(self.request.user.email)
        return HttpResponse(email)
    
class LoadHeaderView(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    serializer_class =serializers.UserSerializer
    
    def get(self,request,format=None):
        image = Image.objects.filter(user=self.request.user).first()
        user = UserProperties.objects.filter(user=self.request.user).first()
        nameUser = str(user.name)
        imageUrl=str(image.image.url)
        nmID=str(image.nmId)
        return HttpResponse(nameUser +','+imageUrl+','+nmID)


# UserAllData = namedtuple('UserAllData', ('userproperties', 'usereducation'))
# class UserAllViewSet(viewsets.ViewSet):
#     """
#     A simple ViewSet for listing the Tweets and Articles in your Timeline.
#     """
#     def list(self, request):
#         userdata = UserAllData(
#             userproperties=models.UserProperties.objects.all(),
#             usereducation=models.UserEducationLocationContact.objects.all(),
#         )
#         serializer =serializers.UserCollectionSerializer(userdata)
#         return serializer.data
def set_if_not_none(mapping, key, value):
    if value is not None and value !='':
        mapping[key] = value


class UserPropertiesAll(viewsets.ModelViewSet):
    """Manage recipes in the database"""
    serializer_class = serializers.UserAllserializer
    queryset = models.Image.objects.filter(is_verified=True)
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        """Retrieve the recipes for the authenticated user"""
        userVerification = Image.objects.get(user=self.request.user)
        if userVerification.is_verified==False:
            raise Http404
        user = models.UserProperties.objects.get(user=self.request.user)
        gender ='female'
        if user.gender=='female':
            gender='male'
        sort_params = {}
        likedprofile = LikeProfile.objects.filter(liked_by_user=userVerification)
        likeduserlist=[]
        for i in likedprofile:
                likeduserlist.append(i.liked_user)
        set_if_not_none(sort_params, 'profile__gender', gender)
        
        if self.request.query_params.get('NMID'):
            print("Searching")
            nmID=self.request.query_params.get('NMID')
            print(nmID)
            return self.queryset.filter(**sort_params,nmId__startswith=nmID)

        if self.request.query_params.get('search')=='true/':
            userpreference = UserSearch.objects.filter(user=self.request.user).last()
            if userpreference.ageFrom != 0 and userpreference.ageTo != 0:
                current_time = datetime.datetime.now() 
                year_from = current_time.year-userpreference.ageTo
                year_To = current_time.year-userpreference.ageFrom
                date_From = str(year_from)+'-01-01'
                date_To= str(year_To)+'-12-30'
                datedange=[str(date_From), str(date_To)]
                set_if_not_none(sort_params, 'profile__dateOfBirth__range', datedange)   
            if userpreference.heightFrom != 0 and userpreference.heightTo != 0:
                fromHeight =userpreference.heightFrom 
                toHeight= userpreference.heightTo
                set_if_not_none(sort_params, 'profile__height__gte', fromHeight-1)
                set_if_not_none(sort_params, 'profile__height__lte', toHeight+1)
            if userpreference.weightFrom != 0 and userpreference.weightTo != 0:
                fromWeight =userpreference.weightFrom 
                toWeight= userpreference.weightTo
                set_if_not_none(sort_params, 'profile__weight__gte', fromWeight-1)
                set_if_not_none(sort_params, 'profile__weight__lte', toWeight+1)
            set_if_not_none(sort_params, 'profile__smoking', userpreference.smoking)
            set_if_not_none(sort_params, 'profile__drinking', userpreference.drinking)
            set_if_not_none(sort_params, 'profile__complexion', userpreference.complexion)
            set_if_not_none(sort_params, 'profile__bodyType', userpreference.bodyType)
            set_if_not_none(sort_params, 'profile__martialStatus', userpreference.martialStatus)
            set_if_not_none(sort_params, 'profile__community', userpreference.community)
        return self.queryset.filter(**sort_params).exclude(user__email__in=likeduserlist)
    
    def perform_create(self, serializer):
        """Create a new recipe"""
        serializer.save(user=self.request.user)
    
    def get_serializer_class(self):
        """Return appropriate serializer class"""
        if self.action == 'retrieve':
            # raise Http404 if user has no subscription
            return serializers.UserAllserializerDetailled

        return self.serializer_class

class UpadteUserPreferences(APIView):
    queryset = models.UserPreferences.objects.all()
    serializer_class = serializers.UserPreferencesSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    def post(self, request, *args, **kwargs):
        updateData = models.UserPreferences.objects.get(user=self.request.user)
        updateData.martialStatus = request.POST['martialStatus']
        updateData.community = request.POST['community']
        print(updateData.community)
        updateData.ageFrom = request.POST['ageFrom']
        updateData.ageTo = request.POST['ageTo']
        updateData.heightFrom = request.POST['heightFrom']
        updateData.heightTo = request.POST['heightTo']
        updateData.workingas=request.POST['workingas']
        updateData.workingwith=request.POST['workingwith']
        updateData.martialStatus = request.POST['martialStatus']
        updateData.weightFrom = request.POST['weightFrom']
        updateData.weightTo = request.POST['weightTo']
        updateData.complexion = request.POST['complexion']
        updateData.workingas = request.POST['workingas']
        updateData.education=request.POST['education']
        updateData.district=request.POST['district']
        updateData.country=request.POST['country']
        updateData.city=request.POST['city']
        updateData.save()
        return JsonResponse({'message':'Success'})


class GetUserPreferencesViewset(viewsets.ModelViewSet):
    """Manage recipes in the database"""
    serializer_class = serializers.UserPreferencesSerializer
    queryset = UserPreferences.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        """Retrieve the recipes for the authenticated user"""
        return self.queryset.filter(user=self.request.user)



class GetUserSearchViewset(viewsets.ModelViewSet):
    """Manage recipes in the database"""
    serializer_class = serializers.UserPreferencesSerializer
    queryset = UserSearch.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        """Retrieve the recipes for the authenticated user"""
        if not self.queryset.filter(user=self.request.user).exists():
            newSearch =UserSearch()
            newSearch.user=self.request.user
            newSearch.save()
        return self.queryset.filter(user=self.request.user)



class UserSearchUpdate(APIView):
    queryset = models.UserSearch.objects.all()
    serializer_class = serializers.UserPreferencesSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    def post(self, request, *args, **kwargs):
        updateData = models.UserSearch.objects.get(user=self.request.user)
        updateData.martialStatus = request.POST['martialStatus']
        updateData.community = request.POST['community']
        updateData.ageFrom = request.POST['ageFrom']
        updateData.ageTo = request.POST['ageTo']
        updateData.bodyType = request.POST['bodyType']
        updateData.heightFrom = request.POST['heightFrom']
        updateData.heightTo = request.POST['heightTo']
        updateData.martialStatus = request.POST['martialStatus']
        updateData.weightFrom = request.POST['weightFrom']
        updateData.weightTo = request.POST['weightTo']
        updateData.smoking = request.POST['smoking']
        updateData.drinking = request.POST['drinking']
        updateData.complexion = request.POST['complexion']
        updateData.workingas = request.POST['workingas']
        updateData.save()
        return JsonResponse({'message':'Success'})

class LikedProfiles(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    """
    List all Likeprodiles, or create a new snippet.
    """
    def get(self, request, format=None):
        Likeprodiles = LikeProfile.objects.all()
        serializer = serializers.Likeprodileserializer(Likeprodiles, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        liked_by_user = Image.objects.get(user=self.request.user)


        user =User.objects.get(id=request.data['liked_user'])
        if LikeProfile.objects.filter(liked_by_user=liked_by_user,liked_user=user).exists():
            LikeProfile.objects.filter(liked_by_user=liked_by_user,liked_user=user).delete()
            return Response({'message':"success"})
        data=LikeProfile()
        data.liked_by_user=liked_by_user
        data.liked_user=user
        data.save()
        serializer = serializers.Likeprodileserializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

class LikedProfilesDetailed(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    """
    Retrieve, update or delete a snippet instance.
    """
    def get_object(self, pk):
        try:
            return LikeProfile.objects.get(pk=pk)
        except LikeProfile.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = serializers.Likeprodileserializer(snippet)
        return Response(serializer.data) 

    def put(self, request, pk, format=None):
        snippet = self.get_object(pk)

        serializer = serializers.Likeprodileserializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response()





class UserLikedProfiles(viewsets.ModelViewSet):
    """Manage recipes in the database"""
    serializer_class = serializers.UserAllserializer
    queryset = models.Image.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        """Retrieve the recipes for the authenticated user"""
        
        userVerification = Image.objects.get(user=self.request.user)
        if userVerification.is_verified==False:
            raise Http404
        likedprofile = LikeProfile.objects.filter(liked_by_user=userVerification)
        likeduserlist=[]
        for i in likedprofile:
            print(i.liked_user)
            likeduserlist.append(i.liked_user)
        ##Maching Check  Start
        Likedbyme = LikeProfile.objects.filter(liked_by_user=userVerification)
        LikedbymeList=[]
        for i in Likedbyme:
            LikedbymeList.append(i.liked_user)
        matched=LikeProfile.objects.filter(liked_user=self.request.user,liked_by_user__user__in = LikedbymeList)
        matchedList=[]
        for i in matched:
            matchedList.append(i.liked_by_user.nmId)
        ##Maching Check End
        return self.queryset.filter(user__email__in=likeduserlist).exclude(nmId__in=matchedList)
    def perform_create(self, serializer):
        """Create a new recipe"""
        serializer.save(user=self.request.user)
    
    def get_serializer_class(self):
        """Return appropriate serializer class"""
        if self.action == 'retrieve':
            # raise Http404 if user has no subscription
            return serializers.UserAllserializerDetailled

        return self.serializer_class


class UaerpropertiesLikedandAndNonLiked(viewsets.ModelViewSet):
    """Manage recipes in the database"""
    serializer_class = serializers.UserAllserializer
    queryset = models.Image.objects.filter(is_verified=True)
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        """Retrieve the recipes for the authenticated user"""
        userVerification = Image.objects.get(user=self.request.user)
        if userVerification.is_verified==False:
            raise Http404


        user = models.UserProperties.objects.get(user=self.request.user)
        gender ='female'
        if user.gender=='female':
            gender='male'
        sort_params = {}
        set_if_not_none(sort_params, 'profile__gender', gender)
        # userpreference = UserPreferences.objects.filter(user=self.request.user).last()
        # if userpreference.ageFrom != 0 and userpreference.ageTo != 0:
        #     current_time = datetime.datetime.now() 
        #     year_from = current_time.year-userpreference.ageTo
        #     year_To = current_time.year-userpreference.ageFrom
        #     date_From = str(year_from)+'-01-01'
        #     date_To= str(year_To)+'-12-30'
        #     datedange=[str(date_From), str(date_To)]
        #     set_if_not_none(sort_params, 'profile__dateOfBirth__range', datedange)   
        # if userpreference.heightFrom != 0 and userpreference.heightTo != 0:
        #     fromHeight =userpreference.heightFrom 
        #     toHeight= userpreference.heightTo
        #     set_if_not_none(sort_params, 'profile__height__gte', fromHeight-1)
        #     set_if_not_none(sort_params, 'profile__height__lte', toHeight+1)
        # if userpreference.weightFrom != 0 and userpreference.weightTo != 0:
        #     fromWeight =userpreference.weightFrom 
        #     toWeight= userpreference.weightTo
        #     set_if_not_none(sort_params, 'profile__weight__gte', fromWeight-1)
        #     set_if_not_none(sort_params, 'profile__weight__lte', toWeight+1)
        # set_if_not_none(sort_params, 'profile__smoking', userpreference.smoking)
        # set_if_not_none(sort_params, 'profile__drinking', userpreference.drinking)
        # set_if_not_none(sort_params, 'profile__complexion', userpreference.complexion)
        # set_if_not_none(sort_params, 'profile__bodyType', userpreference.bodyType)
        # set_if_not_none(sort_params, 'profile__martialStatus', userpreference.martialStatus)
        # set_if_not_none(sort_params, 'profile__community', userpreference.community)
        # set_if_not_none(sort_params, 'education__profession', userpreference.profession)
        return self.queryset.filter(**sort_params)
    
    def perform_create(self, serializer):
        """Create a new recipe"""
        serializer.save(user=self.request.user)
    
    def get_serializer_class(self):
        """Return appropriate serializer class"""
        if self.action == 'retrieve':
            # raise Http404 if user has no subscription
            return serializers.UserAllserializerDetailled

        return self.serializer_class


class LikedYouProfile(viewsets.ModelViewSet):
    """Manage recipes in the database"""
    serializer_class = serializers.UserAllserializer
    queryset = models.Image.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        """Retrieve the recipes for the authenticated user"""
        
        userVerification = Image.objects.get(user=self.request.user)
        if userVerification.is_verified==False:
            raise Http404

        #Liked Profile check Start
        likedprofile = LikeProfile.objects.filter(liked_user=self.request.user)
        likeduserlist=[]
        for i in likedprofile:
            likeduserlist.append(i.liked_by_user.nmId)

        #Liked Profile check End

        ##Maching Check  Start
        Likedbyme = LikeProfile.objects.filter(liked_by_user=userVerification)
        LikedbymeList=[]
        for i in Likedbyme:
            LikedbymeList.append(i.liked_user)
        matched=LikeProfile.objects.filter(liked_user=self.request.user,liked_by_user__user__in = LikedbymeList)
        matchedList=[]
        for i in matched:
            matchedList.append(i.liked_by_user.nmId)
        ##Maching Check End

        return self.queryset.filter(nmId__in=likeduserlist).exclude(nmId__in=matchedList)


    def perform_create(self, serializer):
        """Create a new recipe"""
        serializer.save(user=self.request.user)
    
    def get_serializer_class(self):
        """Return appropriate serializer class"""
        if self.action == 'retrieve':
            # raise Http404 if user has no subscription
            return serializers.UserAllserializerDetailled

        return self.serializer_class


class MatchedProfiles(viewsets.ModelViewSet):
    """Manage recipes in the database"""
    serializer_class = serializers.UserAllserializer
    queryset = models.Image.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        """Retrieve the recipes for the authenticated user"""
        
        userVerification = Image.objects.get(user=self.request.user)
        if userVerification.is_verified==False:
            raise Http404
        likedprofile = LikeProfile.objects.filter(liked_by_user=userVerification)
        likeduserlist=[]
        for i in likedprofile:
            print(i.liked_user)
            likeduserlist.append(i.liked_user)
        ##Maching Check  Start
        Likedbyme = LikeProfile.objects.filter(liked_by_user=userVerification)
        LikedbymeList=[]
        for i in Likedbyme:
            LikedbymeList.append(i.liked_user)
        matched=LikeProfile.objects.filter(liked_user=self.request.user,liked_by_user__user__in = LikedbymeList)
        matchedList=[]
        for i in matched:
            matchedList.append(i.liked_by_user.nmId)
        ##Maching Check End
        return self.queryset.filter(nmId__in=matchedList)
    def perform_create(self, serializer):
        """Create a new recipe"""
        serializer.save(user=self.request.user)
    
    def get_serializer_class(self):
        """Return appropriate serializer class"""
        if self.action == 'retrieve':
            # raise Http404 if user has no subscription
            return serializers.UserAllserializerDetailled

        return self.serializer_class



class Profesions(APIView):
    """
    List all Likeprodiles, or create a new snippet.
    """
    def get(self, request, format=None):
        professionTable = models.ProfessionTable.objects.all()
        serializer = serializers.ProfesionsSerializer(professionTable,many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = serializers.ProfesionsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)


class BasicPreferences(APIView):
    queryset = models.UserPreferences.objects.all()
    serializer_class = serializers.UserPreferencesSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    def post(self, request, *args, **kwargs):
        updateData = models.UserPreferences.objects.get(user=self.request.user)
        updateData.martialStatus = request.POST['martialStatus']
        updateData.ageFrom = request.POST['ageFrom']
        updateData.ageTo = request.POST['ageTo']    
        updateData.community = request.POST['community']
        updateData.heightFrom = request.POST['heightFrom']
        updateData.heightTo = request.POST['heightTo']
        updateData.weightFrom = request.POST['weightFrom']
        updateData.weightTo = request.POST['weightTo']
        updateData.complexion = request.POST['complexion']
        updateData.district = request.POST['district']
        updateData.city = request.POST['city']
        updateData.country = request.POST['country']
        updateData.EduSpezialization = request.POST['EduSpezialization']
        updateData.physicalStatus = request.POST['physicalStatus']
        updateData.save()
        return JsonResponse({'message':'Success'})


class updateUserPropertiesDetails(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    def put(self, request, *args, **kwargs):

        instance = models.UserProperties.objects.get(user_id = self.request.user)
     
        serializer = serializers.UpdateUserPropertiesSerializer(instance, data=request.data, **kwargs)
        if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
            

    def get(self, request, format= None):
        instance = models.UserProperties.objects.get(user_id = self.request.user)
        serializer = serializers.UpdateUserPropertiesSerializer(instance)
        return Response(serializer.data)


class userdetailsFillCheck(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    serializer_class =serializers.UserSerializer
    
    def get(self,request,format=None):
        userProperties = UserProperties.objects.filter(user=self.request.user)
        user = UserEducationLocationContact.objects.filter(user=self.request.user)
        userImage = Image.objects.filter(user=self.request.user)
        profilecheck={
            "userProperties":userProperties.exists(),
            "user":user.exists(),
            "userImage":userImage.exists(),
        }

        return Response(profilecheck)
      
class updateUserEducationalDetails(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    def put(self, request, *args, **kwargs):
        instance = models.UserEducationLocationContact.objects.get(user_id = self.request.user)
        serializer = serializers.updateUserLocationSerializer(instance, data=request.data, **kwargs)
        if serializer.is_valid():
                serializer.save()
                return Response(serializer.data) 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
      
    def get(self, request, format= None):
        instance = models.UserEducationLocationContact.objects.get(user_id = self.request.user)
        serializer = serializers.updateUserLocationSerializer(instance)
        return Response(serializer.data)
      
      
class updateUserImage(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    def put(self, request, *args, **kwargs):
        instance = models.Image.objects.get(user_id = self.request.user)
        serializer = serializers.updateUserImage(instance, data=request.data, **kwargs)
        if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
        return Response(serializer.data)

    def get(self, request, format= None):
        instance = models.Image.objects.get(user_id = self.request.user)
        serializer = serializers.updateUserImage(instance)
        return Response(serializer.data)



class UserImageViewSet(viewsets.GenericViewSet,
                            mixins.ListModelMixin,
                            mixins.CreateModelMixin,mixins.UpdateModelMixin):
    """Base viewset for user owned recipe attributes"""
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    queryset = Image.objects.all()
    serializer_class = UserImageSerializer


    def get_queryset(self):
        """Return objects for the current authenticated user only"""
        return self.queryset.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        """Create a new object"""
        checkImageExisting = Image.objects.filter(user=self.request.user)
        is_verified=False
        if checkImageExisting.exists():
            is_verified=Image.objects.get(user=self.request.user).is_verified
            Image.objects.get(user=self.request.user).delete()

        LogedInUser = self.request.user
        nmIDString = 'NM'+str(10000+self.request.user.id)
        
        serializer.save(is_verified=is_verified,nmId=nmIDString,user=self.request.user,profile=LogedInUser.userproperties,education=LogedInUser.usereducationlocationcontact)
        return Response(status=status.HTTP_204_NO_CONTENT)
    def get_serializer_class(self):
        """Return appropriate serializer class"""
        if self.request.POST:
            try:
                
                image = self.request.FILES['image']
            except:
                return UserImageSkipSerializer
            if image:
                try:
                    image_two = self.request.FILES['image_two']
                except:
                    return UserImageForOneImageSerializer
            if image_two:
                try:
                    image_three = self.request.FILES['image_three']
                except:
                    return UserImageForTwoImageSerializer
        return self.serializer_class


class UserImageUpdateViewSet(viewsets.GenericViewSet,
                            mixins.ListModelMixin,
                            mixins.CreateModelMixin,mixins.UpdateModelMixin):
    """Base viewset for user owned recipe attributes"""
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    queryset = Image.objects.all()
    serializer_class = UserImageSerializer


    def get_queryset(self):
        """Return objects for the current authenticated user only"""
        return self.queryset.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        """Create a new object"""
        checkImageExisting = Image.objects.filter(user=self.request.user)
        is_verified=False
        if checkImageExisting.exists():
            is_verified=Image.objects.get(user=self.request.user).is_verified
            Image.objects.get(user=self.request.user).delete()

        LogedInUser = self.request.user
        nmIDString = 'NM'+str(10000+self.request.user.id)
        
        serializer.save(is_verified=is_verified,nmId=nmIDString,user=self.request.user,profile=LogedInUser.userproperties,education=LogedInUser.usereducationlocationcontact)
        return Response(status=status.HTTP_204_NO_CONTENT)
    def get_serializer_class(self):
        """Return appropriate serializer class"""
        if self.request.POST:
            try:
                image = self.request.FILES['image']
            except:
                return UserImageSkipSerializer
            if image:
                try:
                    image_two = self.request.FILES['image_two']
                except:
                    return UserImageForOneImageSerializer
            if image_two:
                try:
                    image_three = self.request.FILES['image_three']
                except:
                    return UserImageForTwoImageSerializer
        return self.serializer_class
class Getpreferenceofuser(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    """
    Retrieve, update or delete a snippet instance.
    """
    def get_object(self, pk):
        try:
            return UserPreferences.objects.get(user_id=pk)
        except UserPreferences.DoesNotExist:
            raise Http404
    
    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = serializers.UserPreferencesSerializer(snippet)
        return Response(serializer.data)

class DeleteAccount(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def delete(self, request, *args, **kwargs):
        user=self.request.user
        user.delete()

        return Response({"result":"user delete"})



class GetLikesAndMatches(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self,request,format=None):

        youLikecount = models.LikeProfile.objects.filter(liked_by_user__user=self.request.user).count()
        likedyoucount=models.LikeProfile.objects.filter(liked_user=self.request.user).count()
        Likedbyme = LikeProfile.objects.filter(liked_by_user__user=self.request.user)
        LikedbymeList=[]
        for i in Likedbyme:
            LikedbymeList.append(i.liked_user)
        matched=LikeProfile.objects.filter(liked_user=self.request.user,liked_by_user__user__in = LikedbymeList)
        matchedList=[]
        for i in matched:
            matchedList.append(i.liked_by_user.nmId)

        

        profilecheck={
            "youLikecount":youLikecount,
            "likedyoucount":likedyoucount,
            "matchedcount":len(matchedList)
        }

        return Response(profilecheck)
      
# class UserChats(generics.ListCreateAPIView):
#     """Manage recipes in the database"""
#     serializer_class = serializers.UserChatsserializer
#     queryset = models.UserChats.objects.all()


#     def get(self,request):
#         chats = models.UserChats.objects.all()
#         for chat in chats:
#             chat.ChatfromUserID=chat.ChatfromUser.user_id
#             print(chat.ChatfromUser.user_id)
#             if chat.ChatfromUser.user_id != 4 :
#                 chat.chatimage=chat.ChatfromUser.image.url
#                 chat.chatDisplayName=chat.ChatfromUser.nmId
#             else:
#                 print("ELse")
#                 image =Image.objects.get(user = chat.ChatToUser)
#                 chat.chatimage=image.image.url
#                 chat.chatDisplayName=image.nmId

#         queryset = chats
#         serializer = serializers.UserChatsserializer(queryset, many=True)
#         return Response(serializer.data)

#     def perform_create(self, serializer):
#         print(self.request)
#         chatName= self.request.POST['chatName']+'NM1207DS'
#         ChatToUser=User.objects.get(id=self.request.POST['ChatToUser'])
#         print(ChatToUser)
#         ChatfromUser=Image.objects.first()
#         print()
#         """Create a new recipe"""
#         serializer.save(chatName=chatName,ChatfromUser=ChatfromUser,ChatToUser=ChatToUser)



# class MessagesView(viewsets.ModelViewSet):
#     """Manage recipes in the database"""
#     serializer_class = serializers.Messagesserializer
#     queryset = models.Messages.objects.all()

#     def get_queryset(self):
#         """Retrieve the recipes for the authenticated user"""
#         return self.queryset.all()
#     def perform_create(self, serializer):
#         """Create a new recipe"""
#         serializer.save()


    
 
# class MessagesViewList(generics.ListCreateAPIView):
#     queryset = models.Messages.objects.all()
#     serializer_class=serializers.Messagesserializer
#     # authentication_classes = (TokenAuthentication,)
#     # permission_classes = (IsAuthenticated,)
#     """
#     Retrieve, update or delete a snippet instance.
#     """
#     def get(self,request):
#         chat = self.request.query_params.get('chatID')
#         print(chat,'*'*20)
#         messages = models.Messages.objects.filter(chat__chatName=chat)
        
#         for message in messages:
#             print(message.user)
#             userImage = Image.objects.first()
#             message.chatimage=userImage.image.url

        
#         queryset = messages
#         serializer = serializers.Messagesserializer(queryset, many=True)
#         return Response(serializer.data)
#     def perform_create(self, serializer):
#         user = User.objects.all().first()
#         userchat = models.UserChats.objects.get(chatName='NM100NM1207DS')
#         print(self.request.POST['chat'])
#         """Create a new message"""
#         serializer.save(user=user,chat=userchat)

class ChatView(generics.ListCreateAPIView):
    serializer_class = ChatUserSerializer
    queryset = models.Chat.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self,request):
        user=self.request.user
        ##Return ChatName
        if self.request.query_params.get('chatuser'):
            id=self.request.query_params.get('chatuser')
            if models.Chat.objects.filter(chat_user_one=user.id,chat_user_two=id).exists():
                chats=models.Chat.objects.get(chat_user_one=user.id,chat_user_two=id)
                queryset = chats
                serializer = ChatUserSerializer(queryset,context={'request': request})
                return Response(serializer.data)
            if models.Chat.objects.filter(chat_user_one=id,chat_user_two=user.id).exists():
                chats=models.Chat.objects.get(chat_user_one=id,chat_user_two=user.id)
                queryset = chats
                serializer = ChatUserSerializer(queryset,context={'request': request})
                return Response(serializer.data)
            raise Http404

        chats = models.Chat.objects.filter(Q(chat_user_one=self.request.user.id) | Q(chat_user_two =self.request.user.id))
        queryset = chats
        serializer = ChatUserSerializer(queryset, many=True,context={'request': request})
        return Response(serializer.data)

    def perform_create(self, serializer):
        chatUserOne=self.request.user.id
        chatUserTwo=self.request.POST['chat_user_two']
        UserOneBID=models.Image.objects.get(user__id=chatUserOne).nmId
        UserTwoBID=models.Image.objects.get(user__id=chatUserTwo).nmId  
        roomName=UserOneBID+UserTwoBID
        serializer.save(roome_name=roomName,chat_user_one=chatUserOne)


class MessageView(generics.ListCreateAPIView):
    serializer_class = MessageSerializer
    queryset = models.Message.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self,request):
        roomID=self.request.query_params.get('roomID')
        if models.Chat.objects.filter(id=roomID).exists():
            chat=models.Chat.objects.get(id=roomID)
            Messages = models.Message.objects.filter(chat=chat)
            queryset = Messages
            serializer = MessageSerializer(queryset, many=True,context={'request': request})
            return Response(serializer.data)
        raise Http404

    def perform_create(self, serializer):
        chatID=self.request.POST['chat']
        chat=models.Chat.objects.get(id=chatID)
        chat.lastUpdated=datetime.datetime.now()
        chat.save()
        serializer.save(user=self.request.user)

class DeletedRecordView(generics.ListCreateAPIView):
    """Manage recipes in the database"""
    serializer_class = serializers.DeletedRecordserializer
    queryset = models.DeletedRecord.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    

    def get(self,request):
        queryset = models.DeletedRecord.objects.all()
        serializer = serializers.DeletedRecordserializer(queryset, many=True)
        return Response(serializer.data)

    def perform_create(self, serializer):
        user=self.request.user
        name=user.userproperties.name
        phonenumber=user.userproperties.moblie
        gender=user.userproperties.gender
        email=user.email
        serializer.save(name=name,phoneNumber=phonenumber,gender=gender,email=email)




class DeletedRecordViewAdmin(generics.ListCreateAPIView):
    """Manage recipes in the database"""
    serializer_class = serializers.DeletedRecordserializer
    queryset = models.DeletedRecord.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,IsAdminUser)
    

    def get(self,request):
        queryset = models.DeletedRecord.objects.all()
        serializer = serializers.DeletedRecordserializer(queryset, many=True)
        return Response(serializer.data)





class ProfilesToAdminDashboardVIew(viewsets.ModelViewSet):
    """Manage recipes in the database"""
    serializer_class = serializers.AdminProfilesSerializer
    queryset = models.Image.objects.filter(is_verified=True)
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,IsAdminUser)

    def get_queryset(self):
        if self.request.query_params.get('gender')=='male':
             return self.queryset.filter(profile__gender='male')
        elif self.request.query_params.get('gender')=='female':
             return self.queryset.filter(profile__gender='female')
        return self.queryset.all()
    
    def perform_create(self, serializer):
        """Create a new recipe"""
        serializer.save()
    
    def get_serializer_class(self):
        """Return appropriate serializer class"""
        if self.action == 'retrieve':
            # raise Http404 if user has no subscription
            return serializers.UserAllserializerDetailled

        return self.serializer_class


class PendingverificationAdminView(viewsets.ModelViewSet):
    """Manage recipes in the database"""
    serializer_class = serializers.AdminProfilesSerializer
    queryset = models.Image.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,IsAdminUser,)

    def get_queryset(self):
        # print(self.request.query_params.get('status')*20)
        if self.request.query_params.get('search'):
             value=self.request.query_params.get('search')
             return self.queryset.filter(Q(nmId__startswith=value)|Q(profile__name__startswith=value)|Q(profile__moblie__startswith=value)|Q(profile__martialStatus__startswith=value))

        if self.request.query_params.get('status')=='False':
            return self.queryset.filter(is_verified=False)
        elif self.request.query_params.get('status')=='True':
             return self.queryset.filter(is_verified=True)
        return self.queryset.all()
    
    def perform_create(self, serializer):
        """Create a new recipe"""
        serializer.save()
    
    def get_serializer_class(self):
        """Return appropriate serializer class"""
        if self.action == 'retrieve':
            # raise Http404 if user has no subscription
            return serializers.UserAllserializerDetailled

        return self.serializer_class



class AdminVerification(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,IsAdminUser)

    def get_object(self, pk):
        try:
            return Image.objects.get(pk=pk)
        except Image.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        image = self.get_object(pk)
        image.is_verified=True
        image.save()
        serializer = serializers.UserImageSerializer(image)
        return Response(serializer.data) 

class SerachProfilebyAdmin(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,IsAdminUser)

    def get_object(self, pk):
        try:
            return Image.objects.get(pk=pk)
        except Image.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        image = self.get_object(pk)
        image.is_verified=True
        image.save()
        serializer = serializers.UserImageSerializer(image)
        return Response(serializer.data) 


class RemoveVerificationView(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,IsAdminUser)

    def get_object(self, pk):
        try:
            return Image.objects.get(pk=pk)
        except Image.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        image = self.get_object(pk)
        image.is_verified=False
        image.save()
        serializer = serializers.UserImageSerializer(image)
        return Response(serializer.data) 




class GetProfileCounts(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,IsAdminUser)

    def get(self, request,format=None):
        males=models.Image.objects.filter(profile__gender='male')
        females=models.Image.objects.filter(profile__gender='female')
        count=0
        if models.LikeProfile.objects.filter().exists():
            likedProfiles = models.LikeProfile.objects.all()
            for like in likedProfiles:
                likedByUser=models.Image.objects.get(user=like.liked_user).id
                if models.LikeProfile.objects.filter(liked_user=like.liked_by_user.user,liked_by_user=likedByUser).exists():
                    count+=1
            
            count/=2
        todaysRegisterc=0
        notverifiedc=0
        verifiedc=0
        todaysRegister = models.Image.objects.filter(profileCreatedAt=datetime.date.today())
        if todaysRegister.exists():
           todaysRegisterc=todaysRegister.count()
        notVerified =models.Image.objects.filter(is_verified=False)
        if notVerified.exists():
            notverifiedc=notVerified.count()
        verified =models.Image.objects.filter(is_verified=True)
        if verified.exists():
            verifiedc=verified.count()
        profilecounts={
            'males':males.count(),
            'females':females.count(),
            "matched":int(count),
            'todaysRegister':todaysRegisterc,
            "notverified":notverifiedc,
            "verified":verifiedc
        }
        return Response(profilecounts) 

class ViewPassword(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,IsAdminUser)
    def get(self,request,format=None):
        instance = PassWordReset.objects.all()
        serilizers = GetUserPasswordSerilizer(instance, many=True)
        return Response(serilizers.data)
        