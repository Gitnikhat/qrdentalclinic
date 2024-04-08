from django.urls import path

from . import views

from .views import RegisterPatient, TreatmentsView

urlpatterns = [
    path("", views.index, name="index"),

    path("register", RegisterPatient.as_view()),
    path("profile", views.view_profile),
    path("treatment", TreatmentsView.as_view())

]