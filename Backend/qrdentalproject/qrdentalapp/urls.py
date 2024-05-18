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
    path("update-appointment", views.update_booking),

    path("send-contact-email", views.send_contactus_mail),

    path("total-appointments", views.get_total_appointments),
    path("upcoming-appointments", views.get_upcoming_appointments),
    path("total-patients-count", views.get_total_active_patients),

    path("user/total-appointments", views.get_total_appointments_user),
    path("patient/upcoming-appointments", views.get_upcoming_appointments_user),

    path("get-report", views.get_monthly_report),

]