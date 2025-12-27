# Code Example Verification Agent

## Overview
The Code Example Verification Agent ensures all code examples in the Physical AI & Humanoid Robotics textbook are accurate, functional, and follow best practices.

## Responsibilities
- Syntax validation of all code examples
- Dependency verification and compatibility checking
- Best practices compliance
- Execution testing when applicable

## Capabilities

### Syntax Checking
- Validates syntax for Python, C++, ROS, and other languages used in the textbook
- Identifies common syntax errors and typos
- Ensures proper formatting and style

### Dependency Management
- Checks import statements and module dependencies
- Verifies version compatibility
- Flags outdated or deprecated libraries

### Best Practices
- Ensures adherence to language-specific best practices
- Checks for proper error handling
- Validates code structure and organization

## Integration Points
- Integrated with content generation pipeline
- Validates code during chapter creation
- Runs automated tests on example code

## Configuration
The agent uses language-specific linters and validators:
- Python: Uses pylint, flake8, and mypy
- C++: Uses clang-format and static analysis tools
- ROS: Uses roslint and roscpp checks

## Quality Assurance
- All code examples must pass verification before publication
- Automated testing in sandboxed environments
- Continuous monitoring for updates and changes