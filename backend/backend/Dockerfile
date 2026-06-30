FROM python:3.10

WORKDIR /app

COPY requirements.txt .

RUN python -m pip install --upgrade pip
RUN python -m pip install -r requirements.txt

COPY . .

CMD ["gunicorn", "cafeteria.wsgi:application", "--bind", "0.0.0.0:$PORT"]