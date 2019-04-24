# Clueless Backend

### Requirements
- Python 3.7
- Django 2.1.7
- Virtualenv 16.4.3
- pip 19.0.3

### Usage

Install python from https://www.python.org/downloads/

Install pip
```
> curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
...
> python get-pip.py --user
```
### Configure Virtual Environment
```
> pip3 install virtualenv
...
> virtualenv --python=python3.7 cluelessEnv
...
> source cluelessEnv/bin/activate
```
- To deactivate the env: `> deactivate`

### Install Requirements
```
> pip install -r requirements.txt
```

## Run Locally
```
> python manage.py runserver
```
- IP Address set to http://127.0.0.1:8000/

If database has no entries run:
```
> python manage.py loaddata initial_data
```
