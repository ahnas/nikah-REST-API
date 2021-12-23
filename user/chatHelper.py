from .models import *
def getUserNameofChat(logeinUser,chatUserOne,chatUserTwo):
    if User.objects.get(id=chatUserOne) != logeinUser:
        name = UserProperties.objects.get(user=User.objects.get(id=chatUserOne)).name.split(' ')
        print('Name',name)
        if len(name)>1:
            fullName=name[0]+'&nbsp;'+name[1]
            return fullName
        return UserProperties.objects.get(user=User.objects.get(id=chatUserOne)).name
        
    
    name=UserProperties.objects.get(user=User.objects.get(id=chatUserTwo)).name.split(' ')
    if len(name)>1:
        fullName=name[0]+'&nbsp;'+name[1]
        return fullName
    return UserProperties.objects.get(user=User.objects.get(id=chatUserTwo)).name


def getchatToUserID(logeinUser,chatUserOne,chatUserTwo):
    if User.objects.get(id=chatUserOne) != logeinUser:
        return User.objects.get(id=chatUserOne).id
    return User.objects.get(id=chatUserTwo).id
def getchatImage(logeinUser,chatUserOne,chatUserTwo):
    if User.objects.get(id=chatUserOne) != logeinUser:
        return Image.objects.get(user=User.objects.get(id=chatUserOne))
    return Image.objects.get(user=User.objects.get(id=chatUserTwo))