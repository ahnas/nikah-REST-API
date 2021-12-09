from django.urls import path,include
from official import views

app_name = 'official'


urlpatterns = [
    path('',views.admin_login,name = 'admin_login'),

    path('dashboard/',views.admin_dashboard,name = 'admin_dashboard'),
    path('pending-verifications/',views.pending_verification,name = 'pending_verification'),
    path('verified-user/',views.verified_user,name = 'verified_user'),

    path('males/', views.males,name = 'males'),
    path('females/',views.females,name = 'females'),
    path('succes-stories/',views.stories,name = 'stories'),
    path('testimonial/',views.testimonial,name = 'testimonial'),


]