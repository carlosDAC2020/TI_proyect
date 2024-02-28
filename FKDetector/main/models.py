from django.db import models

class Medio(models.Model):
    name = models.CharField( max_length=50)
    description = models.TextField()
    rss_url = models.URLField(blank=True)

    def __str__(self) -> str:
        return self.name