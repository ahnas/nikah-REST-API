from django.urls import path
from . import views

app_name = 'web' 

urlpatterns = [
    path('', views.index,name="index"), 
    path('login/', views.login,name="login"),
    path('signup/', views.signup,name="signup"),
    path('profiler/', views.profiler,name="profiler"), 
    path('profilerB/', views.profilerB,name="profilerB"),
    path('imageupload/', views.imageupload,name="imageupload"),
    path('home/', views.home,name="home"),
    path('viewprofile/<int:id>', views.viewprofile,name="viewprofile"),
    path('youlike/', views.youlike,name="youlike"),
    path('match/', views.match,name="match"),
    path('pending/', views.pending,name="pending"),
    path('modify/', views.modify,name="modify"),
    path('likesyou/', views.likesyou,name="likesyou"),
    path('addphotos/', views.addphotos,name="addphotos"),
    path('myprofile/', views.myprofile,name="myprofile"), 
    path('changepass/', views.changepass,name="changepass"), 
    path('partnerpref/', views.partnerpref,name="partnerpref"), 
    path('basicpref/', views.basicpref,name="basicpref"),
    path('delete/', views.delete,name="delete"),
  path('chats/', views.chats,name="chats"),
]