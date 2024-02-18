# Welcome to QR Dental Clinic

Hi! Welcome to QR Dental Clinic project. This project is based on automating the appointment process flow using QR code and real time data analysis.

# Prerequisites
 1. Python 3.7+
 2. VScode/Pycharm/any IDE
 3. Git
 4. An account on github.com


## Initial Setup Guide (One-time)

- Create a folder (example: project) at desired location on your PC.
>**Note:** All the below commands are o be executed in the vscode terminal (cntrl + shift + `)
- Git clone this repository within this folder by running the following command,
> git clone https://github.com/shaikhsdf/qrdentalclinic.git
- Change directory to cloned repo,
> cd qr-dental-clinic\Backend\qrdentalproject (May vary based on your system path for the clone)
- Create a virtual environment by running the below command in terminal,
> python -m venv venv
- Activate the virtual environment created above,
> cmd
> .\venv\Scripts\activate
- Install all the requirements,
> pip install -r requirements.txt
- Run migrations,
> python manage.py migrate
- Run App:
> python manage.py runserver

The app will now be available at http://127.0.0.1:8000/

## Routine App Run Guide

- Change directory to your project code folder,
> cd qr-dental-clinic\Backend\qrdentalproject
- Activate the virtual environment,
> cmd
> .\venv\Scripts\activate
- Run the following command to fetch any new changes from the code repository,
> git pull
- Install all the requirements,
> pip install -r requirements.txt
- Run migrations,
> python manage.py migrate
- Run App:
> python manage.py runserver

The app will now be available at http://127.0.0.1:8000/

