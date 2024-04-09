import sys
import pickle
import numpy as np
import warnings

warnings.filterwarnings("ignore", message="Trying to unpickle estimator")

study_time = int(sys.argv[1])
faliures = int(sys.argv[2])
absences = int(sys.argv[3])
last_grade  = int(sys.argv[4])

# study_time = 12
# faliures = 11
# absences = 14
# last_grade  = 80

if study_time <2:
  study_time = 1
elif study_time <=5:
  study_time = 2
elif study_time <=10:
  studytime = 3
else:
  study_time = 4

if faliures >= 3:
  faliures = 3

if absences > 93:
  absences = 93

last_grade = last_grade / 5

gp_file = '/Users/michaeldonkor/Dropbox/Uni Y3/Final Year Project/FYP Code/Propel Website/server/python/gradepredictor.pickle'

with open(gp_file, 'rb') as f:
  gp_model = pickle.load(f)

data = np.array([[study_time, faliures, absences, last_grade]]) #studytime_value, failures_value, absences_value, G2_value
prediction = gp_model.predict(data)
print(prediction[0]*5)

sys.stdout.flush()