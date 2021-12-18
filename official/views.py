from django.db import models
from django.shortcuts import render


def admin_login(request):
    context = {
        'is_admin_login' : True,
    }
    return render(request,'adminpage/loginadmin.html',context)

def stories(request):
    context = {
        'is_stories' : True,
    }
    return render(request,'adminpage/stories.html',context)

def testimonial(request):
    context = {
        'is_testimonial' : True,
    }
    return render(request,'adminpage/testimonial.html',context)

def admin_dashboard(request):
    context = {
        'is_admin_dashboard' : True,
    }
    return render(request,'adminpage/index.html',context)


def pending_verification(request):
    context = {
        'is_admin_dashboard' : True,
    }
    return render(request,'adminpage/verification-pending.html',context)


def verified_user(request):
    context = {
        'is_verified_user' : True,
    }
    return render(request,'adminpage/verified-user.html',context)


def males(request):
    context = {
        'is_males' : True,
    }
    return render(request,'adminpage/males.html',context)


def females(request):
    context = {
        'is_females' : True,
    }
    return render(request,'adminpage/females.html',context)




def deletedprofiles(request):
    context = {
        'is_DeletedProfiles' : True,
    }
    return render(request,'adminpage/DeletedProfiles.html',context)

