from django.conf.urls import url
from django.urls import path, include
from rest_framework import routers
from .api import PresentationViewSet, RoomViewSet, ScheduleViewSet, RegistrationAPI, LoginAPI, UserAPI


router = routers.DefaultRouter()
router.register('presentation', PresentationViewSet, 'presentation')
router.register('room', RoomViewSet, 'room')
router.register('schedule', ScheduleViewSet, 'schedule')

urlpatterns = [
    url("^", include(router.urls)),
    url("^auth/register/$", RegistrationAPI.as_view()),
    url("^auth/login/$", LoginAPI.as_view()),
    url("^auth/user/$", UserAPI.as_view()),
]
