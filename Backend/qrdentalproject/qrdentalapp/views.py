from django.http import HttpResponse
from django.contrib.auth import authenticate, login
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist

import os
import uuid

from .appconstants.responseconstants import *
from .models import Patient, Users, Treatments

import pyqrcode


def index(request):
    return HttpResponse("Hello, welcome to QR Dental Clinic!!!")

# @APIView
def Login(request):
    if request.method == "POST":
        username = request.data.get('username', None)
        password = request.data.get('password', None)
        user = authenticate(request, username, password)
        if user:
            _ = login(request, user)
            return msg_and_status_response("Logged in successfully", status.HTTP_200_OK)
        else:
            return msg_and_status_response("Invalid credentials", status.HTTP_401_UNAUTHORIZED)


class RegisterPatient(APIView):

    def post(self, request):
        print(request.data)
        data = {
            'uu': uuid.uuid4(),
            'name': request.data.get('name', None),
            'phone': request.data.get('phone', None),
            'email': request.data.get('email', None),
            # 'image': request.FILES.get("file", None),
            'age': request.data.get('age', None),
            # 'adhaar_num': request.data.get('adhaar_num', None),
            'gender': request.data.get('gender', None),
            'address': request.data.get('address', ""),
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
        user = {
            "username": new_profile.email,
            "password": password
        }
        Users.objects.create(**user)

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
    data = {
        'name': record.name,
        'phone': record.phone,
        'email': record.email,
        'gender': record.gender,
        'age': record.age,
        'profile_qr': record.profile_qr.url,
        'address': record.address
    }
    return data_and_status_response(data, status.HTTP_200_OK)
        
class TreatmentsView(APIView):

    def post(self, request):
        print(request.data)
        data = {
            'name': request.data.get('name', None),
            'duration_minutes': request.data.get('duration', 0),
            'description': request.data.get('description', "Default dental treatment description."),
            'visibility_type': request.data.get('visibility', "1")
        }
        obj = Treatments.objects.create(**data)
        print(obj.uu)
        return  msg_and_status_response("Treatment created", status.HTTP_201_CREATED)

    def get(self, request):
        uuid = request.GET.get('id')
        record = None
        try:
            record = Treatments.objects.get(uu= uuid)
        except Exception as ex:
            print(f"An error occured while trying to fetch treatments: {ex}")
        if record:
            data = {
                'Name': record.name,
                'Description': record.description,
                'Duration': record.duration_minutes
            }
            return data_and_status_response(data, status.HTTP_200_OK)
        return msg_and_status_response("Treatment not found.", status.HTTP_404_NOT_FOUND)


