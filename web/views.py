from django.http.response import HttpResponseRedirect
from django.shortcuts import render,get_object_or_404,redirect
from django.http import HttpResponse
from django.urls import reverse
from django.contrib.auth.decorators import login_required
import json
import os
from random import randint, randrange
from user import forms
from user.models import Image, UserEducationLocationContact,UserProperties,User,UserPreferences,PassWordReset,UserProperties
from user.forms import UserPreferencesForm, UserPropertiesForm,UserEducationLocationContactForm
from web.models import Profile
from web.forms import ImageForm
from django.contrib.auth import get_user_model
from django.conf import settings
from django.core.mail import send_mail,EmailMultiAlternatives
from django.contrib.auth import authenticate

def index(request):
    context = {
        "is_index" : True
    }
    return render(request, 'web/index.html',context) 





def login(request): 
    context = {
        "is_login" : True
    }
    return render(request, 'web/login.html',context) 


def signup(request): 
    context = {
        "is_signup" : True 
    }
    return render(request, 'web/signup.html',context) 


def profiler(request): 
    form = UserPropertiesForm(request.POST or None)
    context = {
        "is_profiler" : True,
        "form":form
    }
    return render(request, 'web/profiler.html',context)  

def profilerB(request): 
    form = UserEducationLocationContactForm(request.POST or None)
    context = {
        "is_profilerB" : True,
        "form":form
    }
    return render(request, 'web/profilerB.html',context)  


def viewprofile(request,id): 
    context = {
        "is_viewprofile" : True ,
        "id":id
    }
    return render(request, 'web/viewprofile.html',context)  

def youlike(request):  
    
    context = {
        "is_youlike" : True 
    }
    return render(request, 'web/youlike.html',context) 

def match(request): 
    
    context = {
        "is_match" : True 
    }
    return render(request, 'web/match.html',context) 

def pending(request): 
    
    context = {
        "is_pending" : True 
    }
    return render(request, 'web/pending.html',context) 



def imageupload(request): 

    # if request.method == 'POST':


    #     image = request.FILES.get('image')
    #     email = request.POST.get('email1')
    #     user =   User.objects.filter(email=email).first()
        
    #     nmIDint=10000+user.id
    #     nmIDString = 'NM'+str(nmIDint)
    #     education= UserEducationLocationContact.objects.filter(user=user).first()
    #     profile= UserProperties.objects.filter(user=user).first()
    #     data = Image()
    #     data.height=200
        
    #     data.width=100
            
    #     data.image = image
    #     data.nmId=nmIDString
    #     data.user = user
    #     data.education=education
    #     data.profile=profile

        
    #     data.save()
       

        # return redirect ('web:home')
    return render(request, 'web/imageupload.html',context={'is_imageupload':True}) 



def home(request):
    search=request.GET.get('search', 'false')
    profileimage = Image.objects.all()
    userproperties = UserProperties.objects.all()
    profile = Profile.objects.all()
    context = {
        "is_home" : True,
        "profileimage":profileimage,
        "userproperties":userproperties,
        "profile":profile,
        "search":search
    }
    return render(request, 'web/home.html',context)

def modify(request):
    form = UserPreferencesForm(request.POST or None)
    context = {
        "is_modify" : True,    
        "form":form
        
    }
    return render(request, 'web/modify.html',context)


def likesyou(request):
    form = UserPreferencesForm(request.POST or None)
    context = {
        "is_likesyou" : True
        
    }
    return render(request, 'web/likesyou.html',context) 

def addphotos(request):
    imageForm = ImageForm(request.POST or None) 
    pk=106
    if request.method == 'POST':
        pk=request.POST.get('imageId')
        item =  get_object_or_404(Image,pk=pk)
        if len(request.FILES) != 0:
            try:
                temp= request.FILES['image']
                if len(item.image) > 0:
                   if item.image.url !='/media/default.jpg':
                        os.remove(item.image.path)
                item.image=temp
            except:
                pass
            try:
                temp= request.FILES['image_two']
                if len(item.image_two) > 0:
                    if item.image_two.url !='/media/default.jpg':
                        os.remove(item.image_two.path)
                item.image_two=temp                   
            except:
                pass
            try:
                temp=request.FILES['image_three']
                if len(item.image_three) > 0:
                    if item.image_three.url !='/media/default.jpg':
                        os.remove(item.image_three.path)
                item.image_three=temp
            except:
                pass
        form = ImageForm(request.POST,instance=item)
        if form.is_valid():
            data = form.save(commit=False)
            data.save()
        return redirect('web:myprofile')

    context = {
        "is_addphotos" : True,
        "form":imageForm
    }
    return render(request, 'web/addphotos.html',context)

def myprofile(request):
    
    form = UserPreferencesForm
    formpro=UserPropertiesForm
    formedu = UserEducationLocationContactForm
    context = {
        "is_myprofile" : True,
        "form":form,
        "formedu":formedu,
        "formpro":formpro,
        
    }
    return render(request, 'web/myprofile.html',context) 

def changepass(request):
    context = {
        "is_changepass" : True
        
    }
    return render(request, 'web/changepass.html',context)

def partnerpref(request):
    form = UserPreferencesForm
    formpro=UserPropertiesForm
    formedu = UserEducationLocationContactForm
    context = {
        "is_partnerpref" : True,
        "form":form,
        "formedu":formedu,
        "formpro":formpro,
        
    }
    return render(request, 'web/partnerpref.html',context)

def basicpref(request):
    form = UserPreferencesForm
    formedu = UserEducationLocationContactForm
    formpro=UserPropertiesForm
    context = {
        "is_basicpref" : True,
        "form":form,
        "formedu":formedu,
        "formpro":formpro
        
    }
    return render(request, 'web/basicpref.html',context)



def delete(request):

    context = {
        "is_delete" : True
    }
    return render(request, 'web/delete.html',context) 

def chats(request):
    form = UserPreferencesForm(request.POST or None)
    context = {
        "is_chats" : True
        
    }
    return render(request, 'web/chat.html',context)


def resetpass(request):
    context = {
        "is_resetpass" : True
    }
    if request.POST:
        email=request.POST.get('email')
        if User.objects.filter(email=email).exists():
            username=User.objects.get(email=email)
            user = get_user_model().objects.get(email=email)

            password = User.objects.make_random_password()
            name= user.email
            if UserProperties.objects.filter(user=username).exists():
                name=UserProperties.objects.get(user=username).name
            user.set_password(password)
            user.save()
            if PassWordReset.objects.filter(user=user).exists():
                resetInstance = PassWordReset.objects.get(user=user.email)
                resetInstance.password=password
                resetInstance.save()
            else:
                resetObject=PassWordReset()
                resetObject.user=user.email
                resetObject.password=password
                resetObject.save()
        else:
            context['error']='Email not found in our record'
            return render(request, 'web/resetpass.html',context) 
        print(email)
        subject = 'Password Reset Nikahmalabar.com'
        message = f'Hi , Welcome to nikah Malabar'
        html_content = "<h4>Hi, "+name+" ,</h4><br><p>There’s no need to worry we will assign you a temporary password <span style='color:green;font-weight:600;font-size:25px;'>"+password+"</span>  to log in and make sure not to share with anyone. You can change the password to something memorable later from your account. Thank you for staying with ‘ NIkahMalabar’</p>"
        email_from = settings.EMAIL_HOST_USER
        recipient_list = [email]
        msg = EmailMultiAlternatives(subject, message, email_from, recipient_list)
        msg.attach_alternative(html_content, "text/html")
        msg.send()
        response_data = {
                "status" : "true",
                "title" : "Success",
                "message" : "Password Send to Email"
            }
        return HttpResponse(json.dumps(response_data), content_type='application/javascript')

        
    return render(request, 'web/resetpass.html',context) 

    
def chattwo(request):
    context  = {
      
    }
    return render(request,'chatbox/index.html',context)


def chat_direct(request):
    context  = {
      
    }
    return render(request,'chatbox/chat-direct.html',context)







