---
title: Appendix G - Python Cheatsheet
---

## Introduction to the Python Cheatsheet
This cheatsheet provides a quick reference for fundamental Python concepts, syntax, and common practices. Python is the language of choice for this course due to its readability, extensive libraries, and widespread use in AI, machine learning, and robotics. This appendix is designed to help you quickly recall essential Python elements as you develop code for your humanoid robotics projects.

---

## 1. Basics & Syntax

### Comments
```python
# This is a single-line comment

"""
This is a
multi-line comment (docstring)
"""
```

### Variables
- No explicit type declaration; types are inferred.
```python
name = "Alice"
age = 30
height = 1.75
is_student = True
```

### Basic Data Types
- **Integers**: `int` (e.g., `10`, `-5`)
- **Floating-point numbers**: `float` (e.g., `3.14`, `-0.5`)
- **Strings**: `str` (e.g., `"hello"`, `'world'`, `"""multi-line"""`)
- **Booleans**: `bool` (`True`, `False`)

### Operators
- **Arithmetic**: `+`, `-`, `*`, `/`, `%` (modulo), `**` (exponent), `//` (floor division)
- **Comparison**: `==`, `!=`, `<`, `>`, `<=`, `>=`
- **Logical**: `and`, `or`, `not`
- **Assignment**: `=`, `+=`, `-=`, `*=` etc.

### Input/Output
```python
# Output
print("Hello, World!")
print(f"My name is {name} and I am {age} years old.") # F-strings for easy formatting

# Input
user_input = input("Enter your name: ")
num_str = input("Enter a number: ")
num_int = int(num_str) # Convert input string to integer
```

## 2. Data Structures

### Lists (Mutable, Ordered, Allow Duplicates)
```python
my_list = [1, 2, 3, "apple", True]
print(my_list[0])       # Access element: 1
print(my_list[-1])      # Last element: True
my_list.append(4)       # Add element
my_list.remove("apple") # Remove by value
my_list[0] = 10         # Modify element
print(len(my_list))     # Length

# Slicing
sub_list = my_list[1:3] # [2, 3]
```

### Tuples (Immutable, Ordered, Allow Duplicates)
```python
my_tuple = (1, 2, "banana")
print(my_tuple[0]) # Access element: 1
# my_tuple[0] = 10 # Error: Tuples are immutable
```

### Dictionaries (Mutable, Unordered before Python 3.7, Key-Value Pairs)
```python
my_dict = {"name": "Bob", "age": 25, "city": "New York"}
print(my_dict["name"])    # Access value: "Bob"
my_dict["age"] = 26        # Modify value
my_dict["country"] = "USA" # Add new key-value pair
del my_dict["city"]        # Delete entry
print("age" in my_dict)    # Check if key exists: True
print(my_dict.keys())      # Get all keys
print(my_dict.values())    # Get all values
print(my_dict.items())     # Get all key-value pairs
```

### Sets (Mutable, Unordered, Unique Elements Only)
```python
my_set = {1, 2, 3, 2, 1} # {1, 2, 3}
my_set.add(4)            # Add element
my_set.remove(1)         # Remove element

set1 = {1, 2, 3}
set2 = {3, 4, 5}
print(set1.union(set2))       # {1, 2, 3, 4, 5}
print(set1.intersection(set2)) # {3}
```

## 3. Control Flow

### If/Elif/Else
```python
x = 10
if x > 0:
    print("Positive")
elif x < 0:
    print("Negative")
else:
    print("Zero")
```

### For Loops (Iterating over sequences)
```python
# Iterate over a list
for item in [1, 2, 3]:
    print(item)

# Iterate with range
for i in range(5): # 0, 1, 2, 3, 4
    print(i)

# Iterate with index and value (enumerate)
for index, value in enumerate(['a', 'b', 'c']):
    print(f"{index}: {value}")

# Iterate over dictionary keys/values/items
for key in my_dict: # or my_dict.keys()
    print(key)
for value in my_dict.values():
    print(value)
for key, value in my_dict.items():
    print(f"{key}: {value}")
```

### While Loops
```python
count = 0
while count < 3:
    print(count)
    count += 1
```

### Break and Continue
```python
for i in range(5):
    if i == 2:
        continue # Skip to next iteration
    if i == 4:
        break    # Exit loop
    print(i)
# Output: 0, 1, 3
```

## 4. Functions

### Defining a Function
```python
def greet(name):
    """Greets the person with the given name."""
    return f"Hello, {name}!"

message = greet("Alice")
print(message)

# Function with default argument
def say_hello(name="World"):
    print(f"Hello, {name}!")

say_hello()         # Hello, World!
say_hello("Bob")    # Hello, Bob!

# Function with variable arguments
def sum_all(*args):
    return sum(args)
print(sum_all(1, 2, 3)) # 6

def introduce(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")
introduce(name="Charlie", age=40) # name: Charlie, age: 40
```

### Lambda Functions (Anonymous Functions)
```python
add = lambda a, b: a + b
print(add(2, 3)) # 5
```

## 5. Classes & Objects (Object-Oriented Programming)

```python
class Dog:
    # Class attribute
    species = "Canis familiaris"

    def __init__(self, name, age):
        # Instance attributes
        self.name = name
        self.age = age

    # Instance method
    def bark(self):
        return f"{self.name} says Woof!"

    # Another instance method
    def get_age_in_dog_years(self, factor=7):
        return self.age * factor

# Create objects (instances) of the Dog class
my_dog = Dog("Buddy", 3)
your_dog = Dog("Lucy", 5)

print(my_dog.name)        # Access attribute: Buddy
print(my_dog.species)     # Access class attribute: Canis familiaris
print(my_dog.bark())      # Call method: Buddy says Woof!
print(your_dog.get_age_in_dog_years()) # Call method: 35
```

### Inheritance
```python
class Poodle(Dog):
    def __init__(self, name, age, color):
        super().__init__(name, age) # Call parent class constructor
        self.color = color

    def bark(self):
        return f"{self.name} says Yip! (and is {self.color})"

my_poodle = Poodle("Fluffy", 2, "white")
print(my_poodle.bark()) # Fluffy says Yip! (and is white)
```

## 6. Modules & Packages

- **Module**: A Python file (`.py`) containing definitions and statements.
- **Package**: A collection of modules in directories that contain a special `__init__.py` file (before Python 3.3, optional after).

### Importing
```python
import math
print(math.pi)

from math import sqrt, pi
print(sqrt(16))
print(pi)

from collections import defaultdict as dd
my_default_dict = dd(int)

import my_module # Assumes my_module.py is in the same directory or Python path
my_module.my_function()
```

## 7. File I/O

```python
# Writing to a file
with open("my_file.txt", "w") as f: # "w" for write, "a" for append
    f.write("Hello, Python!\n")
    f.write("This is a new line.")

# Reading from a file
with open("my_file.txt", "r") as f: # "r" for read
    content = f.read() # Read entire content
    print(content)

with open("my_file.txt", "r") as f:
    for line in f: # Read line by line
        print(line.strip()) # .strip() removes newline characters
```

## 8. Error Handling (Try-Except)

```python
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero!")
except TypeError as e:
    print(f"Type error: {e}")
else:
    print("Division successful") # Runs if no exception occurred
finally:
    print("Execution complete") # Always runs
```

## 9. Virtual Environments (`venv`)

- **Create**: `python -m venv myenv`
- **Activate**:
    - Linux/macOS: `source myenv/bin/activate`
    - Windows: `myenv\Scripts\activate`
- **Deactivate**: `deactivate`
- **Install packages**: `pip install package_name`
- **Generate requirements**: `pip freeze > requirements.txt`
- **Install from requirements**: `pip install -r requirements.txt`

## 10. Type Hinting (PEP 484, Optional but Recommended)

```python
def add_numbers(a: int, b: int) -> int:
    return a + b

from typing import List, Dict, Optional

def process_data(data: List[Dict[str, Optional[int]]]) -> None:
    # ... function logic
    pass
```

---

This cheatsheet is a starting point. Python's strength lies in its vast ecosystem of libraries. Always refer to the [Official Python Documentation](https://docs.python.org/3/) for the most accurate and in-depth information.