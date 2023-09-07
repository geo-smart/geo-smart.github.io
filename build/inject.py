import os
import re
import copy
from pathlib import Path

from .utils import formatLog, locateAll, logStatus, output, setOutputMode

# =============== #
# FILE MANAGEMENT #

def readFileData(path: str | Path) -> list[str]:
  output(f"Reading HTML data from '{str(path)}'")

  with open(path, "r", encoding="utf8") as file:
    lines = file.readlines()

  return lines

def writeDataToFile(path: str, lines: list):
  output("Writing compiled HTML data to " + str(path) + "\n")

  with open(path, "w", encoding="utf8") as file:
    file.writelines(lines)

# =============== #
# DATA EXTRACTION #

def determineIndentation(line):
  indentation = 0

  for char in line:
    if char == " " or char == "\t":
      indentation += 1

    # Stop counting at the first non-space, non-tab character.
    else:
      break

  return indentation

# Checks for a component tag on the given string line. If
# there is a component, returns it string name. If end mode
# is true, checks for end tags, otherwise checks for start tags.
def checkForComponent(line: str, end: bool = False):
  pattern = r"<!--\s*%START\s*([A-Z-]*?)\s*-->"
  if end:
    pattern = r"<!--\s*%END\s*([A-Z-]*?)\s*-->"
  
  match = re.search(pattern, line)
  if not match:
    return None
  return match.group(1)

# Returns the index in lines at which the specified component's
# end tag is found, or -1 if the end tag is not found. Supports
# an optional starting offset within the lines.
def findComponentEnd(lines: list[str], name: str, start: int = 0):
  for index in range(start, len(lines)):
    found = checkForComponent(lines[index], True)

    if found == name:
      return index
    
  return -1

# =============== #
# DATA POPULATING #

def splitLineOnComponent(line) -> list[str]:
  pattern = r"<!--\s*%MLKY.*?\s*-->"
  parts = re.split(pattern, line)
  return parts

# Inserts a list into another list at the given index.
# Return the index of the end of the inserted subsection.
def insertSubsection(arr: list, sub: list, index: int):
  output(f"Inserting subsection of length {len(sub)} at {index}")
  arr[index:index] = sub
  return index + len(sub) - 1

# Removes subsection of a list, both indices are exclusive.
def cutSubsection(arr: list, start: int, end: int):
  output(f"Cutting subsection {start} : {end}")
  return arr[:start + 1] + arr[end:]

def indentLines(rawLines, amount):
  lines = copy.copy(rawLines)
  indent = " " * amount

  for index in range(len(rawLines)):
    lines[index] = indent + lines[index]

  return lines

# ======== #
#   MAIN   #

def injectComponent(targetFile):
  pageLines = readFileData(targetFile)
  writeLines = copy.copy(pageLines)

  index = 0
  modified = False

  for _ in range(len(writeLines)):
    if not index < len(writeLines):
      break

    found = checkForComponent(writeLines[index])
    if not found:
      index += 1
      continue
    indent = determineIndentation(writeLines[index])

    end = findComponentEnd(writeLines, found, index)
    if end < 0:
      raise SyntaxError(formatLog(f"Could not find component end tag for {found}", logStatus.FAIL))

    writeLines = cutSubsection(writeLines, index, end)
    modified = True

    rawData = readFileData(directory + "components/" + f"_{found.lower()}.html")
    rawData += ["\n"] # Ensure the closing tag is on the next line.

    componentData = indentLines(rawData, indent)
    index = insertSubsection(writeLines, componentData, index + 1)
  
  if modified:
    writeDataToFile(targetFile, writeLines)

def injectAllComponents(silent: bool = False):
  global directory
  setOutputMode(silent)
  output("Starting header injection...", logStatus.WARN, newLine=True)

  path = os.getcwd()
  directory = "./"
  if "build" in path:
    output("Execution starting in /build/ directory, adjusting relative paths\n")
    directory = "../"
  else:
    output("Execution starting in root directory, using normal paths\n")

  html = locateAll(directory, "*.html")
  pages = list(filter(lambda x: str(x)[0] != "_", html)) # remove components
  print(f"Ignored {len(html) - len(pages)} component files for a total of {len(pages)} pages")

  output("Starting scan for component tags...", newLine=True)
  for page in pages:
    injectComponent(page)

  output(f"Processed all {len(pages)} HTML files found\n", logStatus.GOOD)

if __name__ == "__main__":
  injectAllComponents()