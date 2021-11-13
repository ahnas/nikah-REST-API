from django.db import models
import json

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db.models.deletion import CASCADE
from django.db.models.fields import BigAutoField
from django.db.models.fields.related import ForeignKey, OneToOneField
from django.http.response import JsonResponse
from django.utils import tree
from versatileimagefield.fields import VersatileImageField,PPOIField


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        """Create Save a User"""
        if not email:
            raise ValueError('User must have a Email')
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        if user:
            return user

    def create_superuser(self, email, password):
        """Create and Save a super User"""
        user = self.model(email=email)
        user.set_password(password)
        user.save(using=self.db)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    """"Custom Model"""
    email = models.EmailField(max_length=225, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'

    def __str__(self):
        return str(self.email)


    
class UserProperties(models.Model):

    GENDER_CHOICES = (('male', 'Male'),('female', 'Female'),('other', 'Other'))
    profileCreated_CHOICES = (('self','Self'),('parent','Parent'),('Relative','Relative'),('brother','Brother'),('sister','Sister'),('friend','Friend'),('other','Other'))
    martialStatus_CHOICES = (('Never Married','Never Married'),('Widowed','Widowed'),('Divorced','Divorced'),('Awaiting Divorse','Awaiting Divorse'),('Married','Married'))
    bodyType_CHOICES = ((None,None),('Slim','Slim'),('Average','Average'),('Athlatic','Athlatic'),('Heavy','Heavy'))
    community_CHOICES = (('A Muslim','A Muslim'),('Sunni','Sunni'),('Sunni (EK)','Sunni (EK)'),('Sunni (AP)','Sunni (AP)'),('Salafi (KNM)','Salafi (KNM)'),('Salafi (Markaz dawa)','Salafi (Markaz dawa)'),('Salafi (Wisdom)','Salafi (Wisdom)'),('Jamayath Islam ','Jamayath Islam '),('Thableeg Jamath ','Thableeg Jamath '),('Maliki','Maliki'),('Hanafi','Hanafi'),('Sayyid','Sayyid'),('Soofism','Soofism'),('Other','Other'))
    smoking_CHOICES = (('Yes','Yes'),('No','No'),('Occasionally','Occasionally'),('Addicted','Addicted'),('Social','Social'))
    financialStatus_CHOICES = (('Rich','Rich'),('Upper Middle Class','Upper Middle Class'),('Middle Class','Middle Class'),('Lower Middle Class','Lower Middle Class'),('Poor','Poor'))
    complexion_CHOICES = (('Very Fair','Very Fair'),('Fair','Fair'),('Wheatish','Wheatish'),('Wheatish Brown','Wheatish Brown'),('Olive skin','Olive skin'),('Brown','Brown'),('Dark','Dark'))
    relegion_CHOICES = (('Islam','Islam'),('Hindu','Hindu'),('Cristian','Cristian'),('Jainism','Jainism'),('Buddhist','Buddhist'),('Parsi','Parsi'),('Sikhism ','Sikhism '),('Others ','Others '),('Preferred not to say','Preferred not to say'))
    fatherOccupation_CHOICES = (('Private','Private'),('Self Employee','Self Employee'),('NRI','NRI'),('Home Maker','Home Maker'),('Govt Employee','Govt Employee'),('Retired','Retired'),('Buisness','Buisness'),('Coolie','Coolie'),('Farmer','Farmer'),('Others','Others'))
    motherOccupation_CHOICES = (('House Wife','House Wife'),('Private','Private'),('Self Employee','Self Employee'),('NRI','NRI'),('Home Maker','Home Maker'),('Govt Employee','Govt Employee'),('Retired','Retired'),('Buisness','Buisness'),('Coolie','Coolie'),('Farmer','Farmer'),('Others','Others'))
    ethnicGroup_CHOICES = (('Indian','Indian'),('Malayali','Malayali'),('Urdu Muslim','Urdu Muslim'),('Tamil','Tamil'),('Mixed-Race','Mixed-Race'),('Others','Others'),)
    physicalStatus_CHOICES = (('Normal','Normal'),('Deaf','Deaf'),('Dump','Dump'),('Blind','Blind'),('Physically Challenged','Physically Challenged'),('Mentally Challenged','Mentally Challenged'),('Other Disabilities','Other Disabilities'),)
    familyType_CHOICES = (('Nuclear Family','Nuclear Family'),('Joint Family','Joint Family'),('Extended Family','Extended Family'),('Other','Other'))
    whenmarry_CHOICES = (('Immediately','Immediately'),('Within 2 month','Within 2 month'),('Whithin 6 month','Whithin 6 month'),('Within 1 year','Within 1 year'),('Within 2 year','Within 2 year'),('More than 2 year','More than 2 year'),('Any time','Any time'))

    """User Properties"""
    user = models.OneToOneField(User,on_delete=models.CASCADE,unique=True)
    profileCreated =models.CharField(max_length=225,choices=profileCreated_CHOICES,default="self")
    name = models.CharField(max_length=225)
    gender = models.CharField(max_length=225,choices=GENDER_CHOICES,default="male")
    community = models.CharField(max_length=225,choices=community_CHOICES,default="Shafi")
    moblie = models.CharField(max_length=225)
    preferredProfile = models.CharField(max_length=225,choices=community_CHOICES,default="Shafi",null=True,blank=True)   
    dateOfBirth  = models.DateField()
    relegion = models.CharField(max_length=225,choices= relegion_CHOICES,default='Islam')
    nationality = models.CharField(max_length=225)
    height = models.IntegerField() 
    weight = models.IntegerField() 
    martialStatus = models.CharField(max_length=225,choices=martialStatus_CHOICES,default="single") 
    numberofChildresn = models.IntegerField(blank=True,null=True)   
    complexion = models.CharField(max_length=225,choices=complexion_CHOICES,default='Fair') 
    ethnicGroup = models.CharField(max_length=225,choices=ethnicGroup_CHOICES,default='Indian') 
    bodyType = models.CharField(max_length=225,choices=bodyType_CHOICES,default="slim") 
    physicalStatus = models.CharField(max_length=225,choices=physicalStatus_CHOICES,default="Normal")
    motherTongue = models.CharField(max_length=225)
    languagespoken = models.CharField(max_length=225,null=True,blank=True)
    familyType = models.CharField(max_length=225,choices=familyType_CHOICES,default="Nuclear Family",null=True,blank=True)
    fatherOccupation = models.CharField(max_length=225,choices=fatherOccupation_CHOICES,default='Private')
    motherOccupation = models.CharField(max_length=225,choices=motherOccupation_CHOICES,default='House Wife')
    numberofsiblings = models.IntegerField(null=True,blank=True)
    elderBrothers = models.IntegerField(null=True,blank=True)
    marriedBrothers = models.IntegerField(null=True,blank=True)
    youngerSisters = models.IntegerField(null=True,blank=True)
    marriedSisters = models.IntegerField(null=True,blank=True)
    financialStatus = models.CharField(max_length=225,choices=financialStatus_CHOICES,default="Middle Class")
    smoking = models.CharField(max_length=225,choices=smoking_CHOICES,default="No")
    drinking = models.CharField(max_length=225,choices=smoking_CHOICES,default="No")
    
    whenmarry=models.CharField(max_length=225,blank=True,null=True,choices=whenmarry_CHOICES,default='Immediately')
    
    class Meta:
        verbose_name_plural = ('UserProperties')
       
    def __str__(self):
        return str(self.name)
    
    class Meta:
        verbose_name = ('User Details')
        verbose_name_plural = ('User Details')



class UserEducationLocationContact(models.Model):

    performNamaz_CHOICES = (('Always', 'Always'),('Sometimes', 'Sometimes'),('Never', 'Never'),('Prefer not to say', 'Prefer not to say'))
    releagiosness_CHOICES = (('Very religious', 'Very religious'),('Religious', 'Religious'),('Not Religious', 'Not Religious'),('Prefer not to say', 'Prefer not to say'),('Any', 'Any'))
    attendIslamicServices_CHOICES = (('Yes', 'Yes'),('No', 'No'))
    highestEducation_CHOICES = (('Masters', 'Masters'),('Doctorate', 'Doctorate'),('Bachelors', 'Bachelors'),('Diploma', 'Diploma'),('ITI', 'ITI'),('Islamic Education', 'Islamic Education'),('High School', 'High School'),('Other', 'Other'))
    relation_CHOICE = (('Self', 'Self'),('Parent', 'Parent'),('Sibling', 'Sibling'),('Relative', 'Relatives'),('Friend', 'Friend'),('Uncle', 'Uncle'),('Other', 'Other'))
    readquran_CHOICES = (('Always', 'Always'),('Sometimes', 'Sometimes'),('Only Friday', 'Only Friday'),('During Ramadan', 'During Ramadan'),('Never', 'Never'),('Prefer not to say', 'Prefer not to say'))


    userProperties=OneToOneField(UserProperties,on_delete=models.CASCADE,unique=True)
    user = models.OneToOneField(User,on_delete=models.CASCADE,unique=True)
    highestEducation = models.CharField(max_length=225,choices=highestEducation_CHOICES,default="Masters")
    EduSpezialization = models.CharField(max_length=225,null=True,blank=True)
    workingwith = models.CharField(max_length=225,null=True)
    workingas = models.CharField(max_length=225,blank=True)
    annualincome=models.CharField(max_length=225,blank=True,null=True)
    
    nativeCountry = models.CharField(max_length=225)
    nativeState = models.CharField(max_length=225)
    nativeCity = models.CharField(max_length=225)

    currentCountry = models.CharField(max_length=225,null=True,blank=True)
    currentState = models.CharField(max_length=225,null=True,blank=True)
    currentCity = models.CharField(max_length=225,null=True,blank=True)

    houseName = models.CharField(max_length=225)
    locality = models.CharField(max_length=225)

    primaryNumber = models.CharField(max_length=225)
    secondaryNumber = models.CharField(max_length=225)
    preferedContact = models.CharField(max_length=225)
    relation = models.CharField(max_length=225,choices=relation_CHOICE,default="Self")
    describe = models.TextField(max_length=1000)

    performNamaz = models.CharField(max_length=225,choices=performNamaz_CHOICES,default="Always")
    religiousness = models.CharField(max_length=225,choices=releagiosness_CHOICES ,default='Religious')
    readQuran = models.CharField(max_length=225,choices=readquran_CHOICES,default="Yes")
    madrassaEducation = models.CharField(max_length=225)
    attendIslamicServices = models.CharField(max_length=225,choices=attendIslamicServices_CHOICES,default="Yes")

    

    # eliteclass = models.CharField(max_length=225)

    def __str__(self):
        return str(self.highestEducation)




    def __str__(self):
        return str(self.user)
    
    class Meta:
        verbose_name = ('User Religious Status')
        verbose_name_plural = ('User Religious Status')


   

class Image(models.Model):

    is_verified = models.BooleanField(default=False)
    nmId = models.CharField(max_length=10)
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    image = VersatileImageField('Profile',blank=True,null=True,upload_to="Profile/",default='default.jpg',ppoi_field='image_ppoi')
    image_ppoi = PPOIField()
    image_two                  = VersatileImageField(upload_to = "Profile/",default='default.jpg',ppoi_field='image_two_ppoi')
    image_two_ppoi = PPOIField()
    image_three                = VersatileImageField(upload_to = "Profile/",default='default.jpg' ,ppoi_field='image_three_ppoi') 
    image_three_ppoi = PPOIField()
    profile= models.OneToOneField(UserProperties,on_delete=models.CASCADE)
    education= models.OneToOneField(UserEducationLocationContact,on_delete=models.CASCADE)

    def __str__(self):
        return str(self.nmId)
    class Meta:
        verbose_name = ('Verification')
        verbose_name_plural = ('Verifications')
    

class UserPreferences(models.Model):

    martialStatus_CHOICES = ((None,'No Preference'),('Never Married','Never Married'),('Widowed','Widowed'),('Divorced','Divorced'),('Awaiting Divorse','Awaiting Divorse'),('Married','Married'))
    bodyType_CHOICES = ((None,'No Preference'),('Slim','Slim'),('Average','Average'),('Athlatic','Athlatic'),('Heavy','Heavy'))
    community_CHOICES = ((None,'No Preference'),('Shafi','Shafi'),('Malilki','Malilki'),('Hanafi','Hanafi'),('Hambali','Hambali'))
    smoking_CHOICES = ((None,'No Preference'),('Yes','Yes'),('No','No'),('Occasionally','Occasionally'),('Addicted','Addicted'))
    financialStatus_CHOICES = ((None,'No Preference'),('Rich','Rich'),('Upper Middle Class','Upper Middle Class'),('Middle Class','Middle Class'),('Lower Middle Class','Lower Middle Class'),('Poor','Poor'))
    complexion_CHOICES = ((None,'No Preference'),('Very Fair','Very Fair'),('Fair','Fair'),('Wheatish','Wheatish'),('Wheatish Brown','Wheatish Brown'),('Brown','Brown'),('Dark','Dark'))
    
    highestEducation_CHOICES = ((None,'No Preference'),('Masters', 'Masters'),('Doctorate', 'Doctorate'),('Bachelors', 'Bachelors'),('Diploma', 'Diploma'),('ITI', 'ITI'),('Islamic Education', 'Islamic Education'),('High School', 'High School'),('Other', 'Other'))
    

    """User Properties"""
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    community = models.CharField(max_length=225,choices=community_CHOICES,null=True,default=None,blank=True)
    ageFrom = models.IntegerField(default=0,null=True,blank=True)
    ageTo = models.IntegerField(default=0,null=True,blank=True)
    martialStatus = models.CharField(max_length=225,choices=martialStatus_CHOICES,default=None,null=True,blank=True,) 
    bodyType = models.CharField(max_length=225,choices=bodyType_CHOICES,default=None,null=True,blank=True)
    heightFrom = models.IntegerField(default=0,null=True,blank=True) 
    heightTo = models.IntegerField(default=0,null=True,blank=True) 
    weightFrom = models.IntegerField(default=0,null=True,blank=True)
    weightTo = models.IntegerField(default=0,null=True,blank=True)
    profession = models.CharField(max_length=225,blank=True)
    smoking = models.CharField(max_length=225,choices=smoking_CHOICES,default=None,null=True,blank=True)
    drinking = models.CharField(max_length=225,choices=smoking_CHOICES,default=None,null=True,blank=True)
    complexion = models.CharField(max_length=225,choices=complexion_CHOICES,default=None,null=True,blank=True)
    financialStatus = models.CharField(max_length=225,choices=financialStatus_CHOICES,default=None,null=True,blank=True)
    education = models.CharField(max_length=225,choices=highestEducation_CHOICES,default=None,null=True,blank=True)
    country = models.CharField(max_length=225,default=None,null=True,blank=True)
    district = models.CharField(max_length=225,default=None,null=True,blank=True)
    city = models.CharField(max_length=225,default=None,null=True,blank=True)
    



class LikeProfile(models.Model):
    liked_by_user = models.ForeignKey(Image,on_delete=models.CASCADE)
    liked_user = models.ForeignKey(User,on_delete=models.CASCADE)




class ProfessionTable(models.Model):
    professionName=models.CharField(max_length=100)
                                                                                          