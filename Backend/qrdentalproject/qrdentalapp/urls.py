from django.urls import path

from . import views

from .views import *

urlpatterns = [
    path("", views.index, name="index"),

    path("login", LoginView.as_view()),
    path("logout", views.logout_user),

    path("register", RegisterPatient.as_view()),
    path("profile", views.view_profile),
    path("editprofile", views.edit_profile),

    path("treatment", TreatmentsView.as_view()),
    path("treatment/delete", views.delete_treatment),
    path("timeslot", TimeslotsView.as_view()),
    path("patient", views.get_patients_data),


    path("docprofile", DoctorProfileView.as_view()),
    path("admin/systemusers", SystemUsers.as_view()),
    path("admin/systemusers/delete", views.delete_system_user),

    path("appointments", BookAppointmentView.as_view()),
    path("cancel/appointment", views.cancel_booking),


    path("send-contact-email", views.send_contactus_mail),


]