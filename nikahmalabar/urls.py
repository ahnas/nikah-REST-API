from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/', include('user.urls')),
    path('',include('web.urls',namespace='web')), 
    path('official/',include('official.urls',namespace='official'))

]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

admin.site.site_header = "Nikah Malabar Administration"
admin.site.site_title = "Nikah Malabar Admin Portal"
admin.site.index_title = "Welcome to Nikah Malabar Admin Portal"