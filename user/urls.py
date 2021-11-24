from django.db import router
from django.urls import path
from django.urls.conf import include
from rest_framework.routers import DefaultRouter

from . import views

app_name = 'user'



router = DefaultRouter()
router.register("properties",views.UserPropertiesViewSet)
router.register("Bproperties",views.UserEducationLocationContactViewSet)
router.register("collectproperties",views.UserPropertiesAll)
router.register("UaerpropertiesLikedandAndNonLiked",views.UaerpropertiesLikedandAndNonLiked)
router.register("GetUserSearch",views.GetUserSearchViewset)
router.register("GetUserPreferences",views.GetUserPreferencesViewset)
router.register("UserLikedProfiles",views.UserLikedProfiles)
router.register("LikedYouProfile",views.LikedYouProfile)
router.register('userImageUpload',views.UserImageViewSet)
router.register('UserImageUpdate',views.UserImageViewSet)
router.register("MatchedProfiles",views.MatchedProfiles)


urlpatterns = [
    path('create/', views.CreateUserView.as_view(), name='create'),
    path('token/', views.CreateTokenView.as_view(), name='token'),
    path('ResetPasswordView/', views.ResetPasswordView.as_view(), name='ResetPasswordView'),
    path('test_auth/',views.TestAuthView.as_view(),name='testauth'),
    path('header_load/',views.LoadHeaderView.as_view(),name='header_load'),
    path('userdetailsFillCheck/',views.userdetailsFillCheck.as_view(),name='userProfilecheck'),
    path('UpadteUserPreferences/',views.UpadteUserPreferences.as_view(),name='header_load'),
    path('UserSearchUpdate/',views.UserSearchUpdate.as_view(),name='UserSearchUpdate'),
    path('BasicPreferences/',views.BasicPreferences.as_view(),name='basicpreference'),
    path('likeprofile/', views.LikedProfiles.as_view()),
    path('Profesions/', views.Profesions.as_view()),
    path('likeprofile/<int:pk>/', views.LikedProfilesDetailed.as_view()),
    path('getpreferenceofuser/<int:pk>/', views.Getpreferenceofuser.as_view()),
    path('UpdateUserProperties/',views.updateUserPropertiesDetails.as_view()),
    path('UpdateUserLocationDetails/',views.updateUserEducationalDetails.as_view()),
    path('UpdateUserImage/',views.updateUserImage.as_view()),
    path('delete/',views.DeleteAccount.as_view(), name='delete'),
    path('GetLikesAndMatches/',views.GetLikesAndMatches.as_view(), name='delete'),
    path('chats/', views.UserChats.as_view()),
    path('getmessages/', views.MessagesViewList.as_view()),
    path('deletedrecord/', views.DeletedRecordView.as_view()),
    path('',include(router.urls)),

]