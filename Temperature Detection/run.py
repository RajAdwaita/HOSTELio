##Created by Dhwani Trivedi 

import cv2
from smbus2 import SMBus
from mlx90614 import MLX90614
from datetime import datetime
import time

#Connect Raspberry Pi with SDA =3, SCL = 5, and 5V and
#Gnd, also do remember checking the Contactless folder
#in D Drive where if i2c does not work if i2c is not detected at 5a

video = cv2.VideoCapture(0)
faceCascade = cv2.CascadeClassifier("haarcascade_frontalface_default.xml")
font = cv2.FONT_HERSHEY_COMPLEX_SMALL
org = (150,450)
color = (255, 0, 0)
thickness = 1
fontScale = 2


while True:
    success,img = video.read()
    cv2.putText(img, 'Developed by: Dhwani Trivedi',org, font, 1, (0,255,255), thickness,cv2.LINE_AA)
    cv2.putText(img, 'EC Department, BVM Engineering College',(80,470), font, 1, (255,0,255), thickness,cv2.LINE_AA)
    grayImg = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = faceCascade.detectMultiScale(grayImg,1.1,4)
    keyPressed = cv2.waitKey(1)


    bus = SMBus(1)
    sensor = MLX90614(bus, address=0x5A)
#print ("Ambient Temperature :", sensor.get_ambient())
    celcius = sensor.get_object_1()
    far = ((celcius * 1.8)+32.0)
    temp = 'Temperature: '+ str(round(far, 2)) + ' F'
    #print ("Object Temperature :", temp)
    bus.close()

    cv2.putText(img, temp,(10,40),cv2.FONT_HERSHEY_COMPLEX,1,(255,0,0),1,cv2.LINE_AA)
    t = datetime.now()
    z = t.strftime("%c")
    s= str(z)
    cv2.putText(img,s,(10,65), font, 1, (0,0,0), thickness,cv2.LINE_AA)

    for x,y,w,h in faces:
        img = cv2.rectangle(img,(x,y),(x+w,y+h),(0,0,0),3)

        x = datetime.now()
        y= x.strftime("%Y.%m.%d-%H%M%S")
        timestamped = str(y)
        picName = timestamped + '.jpg'

        path='/home/pi/tempdetected/'+ picName

        if (far >= 99.5):
            cv2.imwrite(path,img)
        cv2.waitKey(3)


    cv2.imshow('live video',img)

    if(keyPressed & 0xFF==ord('q')):
        break

video.release()
cv2.destroyAllWindows()
