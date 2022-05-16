# Generated by Django 2.2.24 on 2022-05-12 17:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("models", "8247_update_primary_descriptors_config"),
    ]

    operations = [
        migrations.CreateModel(
            name='BulkIndexQueue',
            fields=[
                ('resourceinstanceid', models.UUIDField(primary_key=True, serialize=False, unique=True)),
                ('createddate', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'db_table': 'bulk_index_queue',
                'managed': True,
            },
        )
    ]
