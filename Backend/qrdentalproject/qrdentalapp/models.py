from django.db import models

from uuid import uuid4


ADMIN = '1'
RECEPTIONIST = '2'
PATIENT = '3'

USER_TYPES = (
    (ADMIN, "Admin"),
    (RECEPTIONIST, "Receptionist"),
    (PATIENT, "Patient"),
)

MALE = "M"
FEMALE = "F"

GENDERS = (
    (MALE, "Male"),
    (FEMALE, "Female"),
)

AVAILABLE = "Available"
BOOKED = "Booked"
TENTATIVE = "Tentative"


PENDING_FOR_APPROVAL = 'P'
CONFIRMED = 'C'
REQUEST_FOR_CHANGE = "R"
CANCELLED = "CL"

APPOINTMENT_STATUS_TYPES = (
    (PENDING_FOR_APPROVAL, "Pending for approval"),
    (CONFIRMED, "Confirmed"),
    (REQUEST_FOR_CHANGE, "Request for change"),
    (CANCELLED, "Cancelled")
)


CASH = 'C'
ONLINE = 'O'

PAYMENT_MODES = (
    (CASH, "Cash"),
    (ONLINE, "Online"),
)

class Users(models.Model):
    uu = models.UUIDField(unique=True, default=uuid4())
    username = models.CharField(max_length=250)
    password = models.CharField(max_length=20)
    user_type = models.CharField(choices=USER_TYPES, max_length=1, default="3")

    def __str__(self):
        return self.username
    

class DoctorProfile(models.Model):
    uu = models.UUIDField(unique=True, default=uuid4())
    name = models.CharField(max_length= 250)
    image = models.FileField(blank=True, null=True) #optional
    age = models.IntegerField()
    qualification = models.CharField(max_length=250)
    experience = models.FloatField()

    def __str__(self):
        return self.name
    

class Patient(models.Model):
    uu = models.UUIDField(unique=True, default=uuid4())
    name = models.CharField(max_length= 250)
    phone = models.CharField(max_length= 10)
    email = models.CharField(max_length=250) #username
    image = models.FileField(blank=True, null=True) #optional
    age = models.IntegerField()
    adhaar_num = models.CharField(max_length=12)
    gender = models.CharField(choices=GENDERS, max_length=1)
    profile_qr = models.FileField()  

    def __str__(self):
        return self.name


class Treatments(models.Model):
    uu = models.UUIDField(unique=True, default=uuid4())
    name = models.CharField(max_length= 250)
    duration_minutes = models.IntegerField()
    visibility_type = models.CharField(choices=USER_TYPES, max_length=1, default="1")

    def __str__(self):
        return self.name

class Timeslots(models.Model):
    uu = models.UUIDField(unique=True, default=uuid4())
    date = models.DateField()
    from_time = models.TimeField()
    to_time = models.TimeField()
    status = models.CharField(max_length=20, default=AVAILABLE)


class Appointments(models.Model):
    uu = models.UUIDField(unique=True, default=uuid4())
    treatment = models.ForeignKey(Treatments, on_delete= models.CASCADE)
    time_slot = models.ForeignKey(Timeslots, on_delete= models.CASCADE)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    patient_remark = models.TextField()
    doctor_remark = models.TextField()
    appointment_qr = models.FileField()  
    status = models.CharField(choices=APPOINTMENT_STATUS_TYPES, default="P", max_length= 2)

    def __str__(self):
        return self.patient.name + " - " + self.treatment.name
    

class Reciept(models.Model):
    uu = models.UUIDField(unique=True, default=uuid4())
    reciept_date = models.DateField(auto_now_add= True)
    appointment = models.ForeignKey(Appointments, on_delete= models.CASCADE)
    paid_amount = models.FloatField()
    payment_mode = models.CharField(choices= PAYMENT_MODES, max_length=1)

    def __str__(self):
        return self.appointment.patient.name + " - " + self.appointment.treatment.name + " - " + self.reciept_date


