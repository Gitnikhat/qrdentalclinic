from datetime import datetime, timedelta
import pytz
import calendar

from django.http import HttpResponse
from django.contrib.auth import authenticate, login, logout
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth.models import User
from django.core.mail import send_mail

import os
import uuid

from .appconstants.responseconstants import *
from .models import *

import pyqrcode

USER_TYPES_MAP = {
   '1': "Admin",
   '2': "System User",
   '3': "Patient"
}

GENDER_MAP = {
    'M': "Male",
    'F': "Female"
}

GENDER_REVERSE_MAP = {
    'Male': "M",
    'Female': "F"
}

def index(request):
    return HttpResponse("Hello, welcome to QR Dental Clinic!!!")

# @APIView
class LoginView(APIView):

    def post(self, request):
        username = request.data.get('username', None)
        password = request.data.get('password', None)
        user = authenticate(request, username= username, password= password)
        print("User:: ", user)
        if user is not None:
            login(request, user)
            record = DentaleaseUsers.objects.get(user= user)
            data = {
                "user_type": USER_TYPES_MAP.get(record.user_type)
            }
            return data_and_status_response(data, status.HTTP_200_OK)
        else:
            return msg_and_status_response("Invalid credentials", status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
def logout_user(request):
    logout(request)
    return msg_and_status_response("User logged out successfully", status.HTTP_200_OK)

class RegisterPatient(APIView):

    def post(self, request):
        print("Register".center(100, "*"))
        print(request.data)
        data = {
            'uu': uuid.uuid4(),
            'name': request.data.get('name', None),
            'phone': request.data.get('phone', None),
            'email': request.data.get('email', None),
        }
        password = request.data.get('password', None)
        obj = Patient.objects.create(**data)
        self.generate_profile_qr(obj.uu)
        self.create_user(obj.uu, password)
        return  msg_and_status_response("Patient created", status.HTTP_201_CREATED)

    def generate_profile_qr(self, uu):
        new_profile = Patient.objects.get(uu=uu)
        s = "/profile?id=" + str(uu)
        url = pyqrcode.create(s)

        media_root = settings.MEDIA_ROOT
        qr_codes_folder = os.path.join(media_root, 'qr_codes')

        if not os.path.exists(qr_codes_folder):
            os.makedirs(qr_codes_folder)

        file_name = f"{new_profile.uu}.png"
        file_path = os.path.join(qr_codes_folder, file_name)

        try:
            url.png(file_path, scale=6)
            new_profile.profile_qr = os.path.relpath(file_path, media_root) 
            new_profile.save()
            print("QR Code saved successfully:", file_path)
        except Exception as e:
            print("Error saving QR Code:", e)


    def create_user(self, uu, password):
        new_profile = Patient.objects.get(uu=uu)
        print("new profile,", new_profile)
        user = User.objects.create_user(new_profile.email, new_profile.email, password)
        user_data = {
            "user": user
        }
        DentaleaseUsers.objects.create(**user_data)
        return True


@api_view(['GET'])
def view_profile(request):
    import uuid
    uu = uuid.UUID(request.GET.get('id'))
    print(uu)
    record = None
    try:
        record = Patient.objects.get(uu= uu)
    except ObjectDoesNotExist as obe:
        print("An error occured while retrieving profile: {obe}")
        return msg_and_status_response("Patient profile not found.", status.HTTP_404_NOT_FOUND)
    if record:
        data = {
            'name': record.name,
            'phone': record.phone,
            'email': record.email,
            'gender': GENDER_MAP.get(record.gender),
            'age': record.age,
            'profile_qr': record.profile_qr.url,
            'address': record.address
        }
    else:
        data = {}
    return data_and_status_response(data, status.HTTP_200_OK)



@api_view(['POST'])
def edit_profile(request):
    print(request.data)
    # import uuid
    # uu = uuid.UUID(request.GET.get('id'))
    # print(uu)

    data = {
            'name': request.data.get("name"),
            'phone': request.data.get("phone"),
            'email': request.data.get("email"),
            'gender': GENDER_REVERSE_MAP.get(request.data.get("gender"), ""),
            'age': request.data.get("age"),
            'address': request.data.get("address")
        }

    try:
        Patient.objects.filter(email=data.get("email")).update(**data)
    except Exception as ex:
        print(f"An error occured while updating profile: {ex}")
        return msg_and_status_response("Patient edit profile failed.", status.HTTP_500_INTERNAL_SERVER_ERROR)

    return msg_and_status_response("Edit profile successful", status.HTTP_200_OK)


class TreatmentsView(APIView):

    def post(self, request):
        print(request.data)
        data = {
            'uu': uuid.uuid4(),
            'name': request.data.get('name', None),
            'duration_minutes': request.data.get('duration', 0),
            'description': request.data.get('description', "Default dental treatment description."),
            'visibility_type': request.data.get('visibility', "1"),
        }
        obj = Treatments.objects.create(**data)
        print(obj.uu)
        return  msg_and_status_response("Treatment created", status.HTTP_201_CREATED)

    def get(self, request):
        uuid = request.GET.get('id')

        if uuid:
            record = None
            try:
                record = Treatments.objects.get(uu= uuid)
            except Exception as ex:
                print(f"An error occured while trying to fetch treatments: {ex}")
            if record:
                data = {
                    'title': record.name,
                    'text': record.description,
                    'duration': record.duration_minutes,
                    'visibility': record.visibility_type,
                    'id': record.id,
                    'uu': record.uu
                }
                return data_and_status_response(data, status.HTTP_200_OK)
            return msg_and_status_response("Treatment not found.", status.HTTP_404_NOT_FOUND)
        else:
            records = Treatments.objects.all()
            data = []
            for record in records:
                data.append({
                    'title': record.name,
                    'text': record.description,
                    'duration': record.duration_minutes,
                    'visibility': record.visibility_type,
                    'id': record.id,
                    'uu': record.uu,
                    'delete_url': "http://localhost:8000/treatment/delete?id=" + str(record.uu)
                })
            print(f"data: {data}")
            return data_and_status_response(data, status.HTTP_200_OK)


class DoctorProfileView(APIView):

    def post(self, request):
        print(request.data)
        data = {
            'name': request.data.get('name', None),
            'age': request.data.get('age', 0),
            'qualification': request.data.get('qualification', 'BDS'),
            'experience': request.data.get('experience', 0),
            'image': request.FILES.get("image", None),
        }
        DoctorProfile.objects.all().delete()
        obj = DoctorProfile.objects.create(**data)
        print(obj.uu)
        return  msg_and_status_response("Doctor Profile Created", status.HTTP_201_CREATED)
    
    def get(self, request):
        uuid = request.GET.get('id')
        record = None
        try:
            record = DoctorProfile.objects.get(uu= uuid)
        except Exception as ex:
            print(f"An error occured while trying to fetch treatments: {ex}")
        if record:
            data = {
                'Name': record.name,
                'Docimage': record.image.url if record.image else "",
                'age': record.age,
                'qualification': record.qualification,
                'experience': record.experience
            }
            return data_and_status_response(data, status.HTTP_200_OK)
        return msg_and_status_response("Doctor-Profile not found.", status.HTTP_404_NOT_FOUND)


class SystemUsers(APIView):

    def post(self, request):
        print("System Users View".center(100, "*"))
        print(request.data)
        data = {
            'uu': uuid.uuid4(),
            'name': request.data.get('name', None),
            'phone': request.data.get('phone', None),
            'email': request.data.get('email', None),
            'user_type': request.data.get('usertype', None)
        }
        password = "1234"
        user = User.objects.create_user(data.get('email'), data.get('email'), password)
        user_data = {
            "user": user,
            "name": data.get('name'),
            "phone": data.get('phone'),
            "user_type": data.get('user_type')
        }
        DentaleaseUsers.objects.create(**user_data)
        return  msg_and_status_response("user created", status.HTTP_201_CREATED)

    def get(self, request):
        records = DentaleaseUsers.objects.all()
        # .exclude(user_type="3")
        print("All System Users: ", records)
        data = []
        for record in records:
            print( str(record.user.is_active), " record.user.is_active")
            data.append({
                'username': record.user.username,
                'name': record.name,
                'phone': record.phone,
                'email': record.user.email,
                'usertype':  USER_TYPES_MAP.get(record.user_type, 0),
                'active': str(record.user.is_active),
                'delete_url': "http://localhost:8000/admin/systemusers/delete?id=" + str(record.id)
            })
        return data_and_status_response(data, status.HTTP_200_OK)

@api_view(['DELETE'])
def delete_system_user(request):
    id =  request.GET.get("id")
    try:
        record = DentaleaseUsers.objects.get(id=id)
        user = record.user
        user_record = User.objects.get(id= user.id)
        user_record.is_active = False
        user_record.save()
        record.delete()
    except ObjectDoesNotExist:
        return msg_and_status_response("No such user", status.HTTP_204_NO_CONTENT)
    
    return msg_and_status_response("User deleted successfully", status.HTTP_200_OK)


@api_view(['DELETE', 'GET',])
def delete_treatment(request):
    id = request.GET.get('id')
    try:
        record = Treatments.objects.get(uu=id)
        record.delete()
        return msg_and_status_response("Treatment deleted successfully", status.HTTP_200_OK)
    except ObjectDoesNotExist as ode:
        print(ode)
        return msg_and_status_response("Treatment object does not exist", status.HTTP_204_NO_CONTENT)


def send_email(subject, msg, to_email = ["dentaleaseclinic@gmail.com"]): 
    try:
        subject = subject
        message = f'{msg} - Dentalease Clinic.'
        email_from = settings.EMAIL_HOST_USER
        recipient_list = to_email
        send_mail( subject, message, email_from, recipient_list)
        return True
    except Exception as ex:
        print(f"An exception has occured while sending the mail exception: {ex}")
        return False
    

@api_view(['POST'])
def send_contactus_mail(request):
    if request.method == "POST":
        name = request.data.get("name")
        email = request.data.get("email")
        message = request.data.get("message")
        
        mail_sent = send_email(
            f"New Contact Form Submission from {name}",
            f"Email: {email}\nMessage: {message}",
        )
        if mail_sent:
            return msg_and_status_response("Mail sent!", status.HTTP_200_OK)
        return msg_and_status_response("Mail not sent!", status.HTTP_500_INTERNAL_SERVER_ERROR)


class TimeslotsView(APIView):

    def post(self, request):
        selected_date= request.data.get('selected_date', None)
        holiday= request.data.get('holiday', False)
        try:
            obj =  Timeslots.objects.get(date = selected_date)
            obj.available_status = not holiday
            obj.save()
        except ObjectDoesNotExist as ode:
            print("Time slot object does not exist: ", ode)
            return msg_and_status_response("Timeslot object does not exist!", status.HTTP_204_NO_CONTENT)
        return  msg_and_status_response("Slot holiday status updated", status.HTTP_200_OK)


    def get(self, request):

        year = int(request.GET.get('year', datetime.now().year))
        month = int(request.GET.get('month', datetime.now().month))
        
        start_date = datetime(year, month, 1)
        end_date = start_date.replace(day=1, month=start_date.month+1) - timedelta(days=1)

        month_dates = []
        time_slots = Timeslots.objects.filter(date__gte=start_date, date__lte=end_date)
        for each in time_slots:
            available = not each.available_status
            if each.booked_slots == each.max_slots:
                available = False

            month_dates.append({
                'date': each.date.strftime('%Y-%m-%d'),
                'holiday': available,
                'show_date': not available,
                'day': calendar.day_name[each.date.weekday()]
            })
        return data_and_status_response(month_dates, status.HTTP_200_OK)
    

class BookAppointmentView(APIView):

    PENDING_FOR_APPROVAL = "Pending for approval"
    CONFIRMED = "Confirmed"
    REQUEST_FOR_CHANGE = "Request for change"
    CANCELLED = "Cancelled"
    COMPLETED = "Completed"

    def post(self, request):
        print(f"Request data book appointment: {request.data}")
        data = {
            "uu": uuid.uuid4(),
            "treatment_id": request.data.get("treatment", None),
            "patient_id": request.data.get("patient", None),
            "patient_remark": request.data.get("patient_remark", ""),
            "doctor_remark": request.data.get("doctor_remark", ""),
            "status": self.PENDING_FOR_APPROVAL
        }

        
        user_type = request.data.get("user_type", "")
        if user_type == "Admin":
            data['status'] = self.CONFIRMED

        time_slot_date = request.data.get("timeslot", None)
        # Convert string to datetime object
        date_object = datetime.strptime(time_slot_date, "%Y-%m-%dT%H:%M:%S.%fZ")

        # Convert to UTC timezone
        utc_timezone = pytz.timezone('UTC')
        utc_date = utc_timezone.localize(date_object)

        # Convert to IST timezone
        ist_timezone = pytz.timezone('Asia/Kolkata')
        ist_date = utc_date.astimezone(ist_timezone)

        # Format the datetime object
        formatted_date = ist_date.strftime("%Y-%m-%d")
        print("formated date", formatted_date)
        if time_slot_date:
            time_slot_record = Timeslots.objects.get(date = formatted_date)
            data['time_slot_id'] = time_slot_record.id

        obj = Appointments.objects.create(**data)
        print(obj.uu)

        self.generate_appointment_qr(obj.uu)

        booked_slots_count = time_slot_record.booked_slots
        print(f"booked slots count {booked_slots_count}")
        if booked_slots_count < time_slot_record.max_slots:
            booked_slots_count += 1
            time_slot_record.booked_slots = booked_slots_count
        if booked_slots_count == time_slot_record.max_slots:
            time_slot_record.available_status = False
        time_slot_record.save()

        treatment = Treatments.objects.get(id = data['treatment_id'])
        patient = Patient.objects.get(id=data['patient_id'])

        mail_sent = send_email(
            f"Appointment booked for {treatment.name} on {formatted_date}",
            f"Hi {patient.name}, \n Your appointment request is recieved. \n Treatment: {treatment.name} \n Date: {formatted_date} \n Appointment Status: {obj.status} \n You can use the below QR Code, {obj.appointment_qr.url} \n\n Please Note: A consultation fee of Rs. 150/- will be charged irrespective of the treatment.",
            to_email=['dentaleaseclinic@gmail.com', patient.email]
        )
        if mail_sent:
            return msg_and_status_response("Appointment booked and email sent!", status.HTTP_201_CREATED)
        return msg_and_status_response("Appointment could not be booked!", status.HTTP_500_INTERNAL_SERVER_ERROR)

    def generate_appointment_qr(self, uu):
        appointment_record = Appointments.objects.get(uu=uu)
        s = "/appointment?id=" + str(uu)
        url = pyqrcode.create(s)

        media_root = settings.MEDIA_ROOT
        qr_codes_folder = os.path.join(media_root, 'qr_codes')

        if not os.path.exists(qr_codes_folder):
            os.makedirs(qr_codes_folder)

        file_name = f"{appointment_record.uu}.png"
        file_path = os.path.join(qr_codes_folder, file_name)

        try:
            url.png(file_path, scale=6)
            appointment_record.appointment_qr = os.path.relpath(file_path, media_root) 
            appointment_record.save()
            print("QR Code saved successfully:", file_path)
        except Exception as e:
            print("Error saving QR Code:", e)

    def get(selg, request):
        id = request.GET.get("id", None)
        start_date = request.GET.get("from", None)
        end_date = request.GET.get("to", None)
        selected_date = request.GET.get("selectdate", None)

        if id:
            records = Appointments.objects.filter(id = id)
        elif selected_date:
            records = Appointments.objects.filter(time_slot_date = selected_date)
        elif start_date and end_date:
            records = Appointments.objects.filter(time_slot_date__gte= start_date, time_slot_date__lte= end_date)
        else:
            records = Appointments.objects.all()

        data = []
        if records:
            for each in records:
                data.append({
                    'id': each.id,
                    'uuid': each.uu,
                    'treatment': each.treatment.name,
                    'slot': each.time_slot.date,
                    'patient_name': each.patient.name,
                    'patient_contact': each.patient.email,
                    'patient_remark': each.patient_remark,
                    'doctor_remark': each.doctor_remark,
                    'qr': each.appointment_qr.url,  
                    'status': each.status,
                    'cancel_url': "http://localhost:8000/cancel/appointment?id=" + str(each.uu)
                })
        return data_and_status_response(data, status.HTTP_200_OK)
        

@api_view(['POST'])
def cancel_booking(request):
    print(f"Request data book appointment: {request.data}")
    id = request.GET.get("id")
    ba = BookAppointmentView()
    try:
        obj = Appointments.objects.get(uu=id)
        print(obj.uu)
    except ObjectDoesNotExist:
        return msg_and_status_response("No appointment exist!", status.HTTP_204_NO_CONTENT)
    time_slot_record = Timeslots.objects.get(id= obj.time_slot_id)

    booked_slots_count = time_slot_record.booked_slots
    print(f"booked slots count {booked_slots_count}")
    booked_slots_count -= 1
    print(f"new book slots: {booked_slots_count}")
    time_slot_record.booked_slots = booked_slots_count
    if booked_slots_count < time_slot_record.max_slots:
        time_slot_record.available_status = True
    time_slot_record.save()


    mail_sent = send_email(
        f"Appointment cancelled for {obj.treatment.name} on {obj.time_slot.date}",
        f"Hi {obj.patient.name}, \n Your appointment has been cancelled. \n Treatment: {obj.treatment.name} \n Date: {obj.time_slot.date} \n Appointment Status: {obj.status} \n\n Sorry for any inconvenience caused. Feel free to book appointment for another date.",
        to_email=['dentaleaseclinic@gmail.com', obj.patient.email]
    )
    if mail_sent:
        obj.status = ba.CANCELLED
        obj.save()
        return msg_and_status_response("Appointment cancelled and email sent!", status.HTTP_201_CREATED)
    return msg_and_status_response("Appointment could not be cancelled!", status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def get_patients_data(request):
    uuid = request.GET.get('id')

    if uuid:
        record = None
        try:
            record = Patient.objects.get(uu= uuid)
        except Exception as ex:
            print(f"An error occured while trying to fetch patient: {ex}")
        if record:
            data = {
                'name': record.name,
                'phone': record.phone,
                'email': record.email,
                'gender': GENDER_MAP.get(record.gender),
                'id': record.id,
                'uu': record.uu,
                'profile_qr': "http://localhost:8000/",
                'age': record.age,
                'address': record.address
            }
            return data_and_status_response(data, status.HTTP_200_OK)
        return msg_and_status_response("Patient not found.", status.HTTP_404_NOT_FOUND)
    else:
        records = Patient.objects.all()
        data = []
        for record in records:
            data.append({
                'name': record.name,
                'phone': record.phone,
                'email': record.email,
                'gender': GENDER_MAP.get(record.gender),
                'id': record.id,
                'uu': record.uu,
                'profile_qr': "http://localhost:8000/",
                'age': record.age,
                'address': record.address
            })
        return data_and_status_response(data, status.HTTP_200_OK)



