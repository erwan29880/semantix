FROM python:3.9

WORKDIR /app
COPY requirements.txt /app

RUN apt-get update -y
RUN pip install -U pip
RUN pip install -r requirements.txt

CMD tail -f /dev/null