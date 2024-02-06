import numpy as np


a = np.array([1, 2, 3])

b = np.array([1, 2, 4])


c = []
c.append(a)

c.append(b)
print(c)
# c =c[1:]
c.pop(0)
print(c)