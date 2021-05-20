from icalendar import Calendar, Event
import requests
from datetime import timedelta, date
import datetime
import time
from flask import Flask
from flask_cors import CORS, cross_origin


app = Flask(__name__)
cors = CORS(app, resources={r"/foo": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route("/get_edt")
@cross_origin(origin='*', headers=['Content-Type', 'Authorization'])
def get_edt():
    r = requests.get(
        "https://ade-uga.grenet.fr/jsp/custom/modules/plannings/anonymous_cal.jsp?resources=40442&projectId=8&calType=ical&firstDate=2021-01-04&lastDate=2021-06-23")
    cal = Calendar.from_ical(r.text)
    json_r = []
    for x in cal.walk()[1:]:
        event = {}
        for y in x:
            event[y] = x[y]
        json_r.append(event)
    json_r2 = []
    for x in json_r:
        event = {}
        today = datetime.datetime.now()
        event["START"] = (x["DTSTART"].dt.replace(
            tzinfo=None) - today).total_seconds()
        event["END"] = (x["DTEND"].dt.replace(
            tzinfo=None) - today).total_seconds()
        event["summary"] = str(x["SUMMARY"])
        if event["END"] < 0:
            pass
        else:
            json_r2.append(event)
    return {"cours": json_r2}


@app.route("/get_edt_d1")
@cross_origin(origin='*', headers=['Content-Type', 'Authorization'])
def get_edt_d1():
    r = requests.get(
        "https://ade-uga.grenet.fr/jsp/custom/modules/plannings/anonymous_cal.jsp?resources=40441&projectId=8&calType=ical&firstDate=2021-01-04&lastDate=2021-06-23")
    cal = Calendar.from_ical(r.text)
    json_r = []
    for x in cal.walk()[1:]:
        event = {}
        for y in x:
            event[y] = x[y]
        json_r.append(event)
    json_r2 = []
    for x in json_r:
        event = {}
        today = datetime.datetime.now()
        event["START"] = (x["DTSTART"].dt.replace(
            tzinfo=None) - today).total_seconds()
        event["END"] = (x["DTEND"].dt.replace(
            tzinfo=None) - today).total_seconds()
        event["summary"] = str(x["SUMMARY"])
        if event["END"] < 0:
            pass
        else:
            json_r2.append(event)
    return {"cours": json_r2}


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5001, debug=True)
