from django.db import migrations
from datetime import datetime, timedelta


def forward(apps, schema_editor):
    Timeslots = apps.get_model('qrdentalapp', 'Timeslots')
    start_date = datetime(2024, 5, 1)
    end_date = datetime(2030, 12, 31)
    current_date = start_date
    while current_date <= end_date:
        if not Timeslots.objects.filter(date=current_date).exists():
            if current_date.weekday() == 6:  # Sunday
                Timeslots.objects.create(date=current_date, available_status=False)
            else:
                Timeslots.objects.create(date=current_date)
        current_date += timedelta(days=1)


class Migration(migrations.Migration):

    dependencies = [
        ('qrdentalapp', '0017_remove_timeslots_uu_alter_appointments_uu_and_more'),
    ]

    operations = [
        migrations.RunPython(forward),
    ]
