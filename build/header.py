import sys
import os

silent = False
def output(data):
  if not silent:
    print(data)

def getHeaderHTML(dir):
  filePath = dir + "header.html"

  output("Reading HTML data from " + filePath)
  with open(filePath, "r") as file:
    lines = file.readlines()
    file.close()

  return lines

def headerHTMLtoJS(lines):
  output("Converting HTML data to a JavaScript statement...")

  header = "const content = '"  
  for line in lines:
    # We are condensing down to a single line, we don't
    # need the whitespace.
    data = line.strip()

    # If the line doesn't end with an > character, it
    # could be ending with an HTML attribute e.g. foo="bar"
    # and that needs a space after it!
    if (data[-1] != ">"):
      data += " "
    header += data
  header += "';\n"
  return header

def updateHeaderJS(dir, header):
  filePath = dir + "js/header.js"
  writeLines = []

  output("Reading JavaScript data from " + filePath)
  with open(filePath, "r") as file:
    readLines = file.readlines()
    file.close()

    for line in readLines:
      writeLines.append(line)
  
  writeLines[0] = header
  output("Replaced header line, writing new data to " + filePath)
  with open(filePath, "w") as file:
    file.writelines(writeLines)

def main():
  output("\nRunning header compilation script...")
  
  path = os.getcwd()
  directory = ""
  if "build" in path:
    output("Execution starting in /build/ directory, adjusting relative paths")
    directory = "../"
  else:
    output("Execution starting in root directory, using normal paths.")

  lines = getHeaderHTML(directory)
  header = headerHTMLtoJS(lines)
  updateHeaderJS(directory, header)

  print("\nSuccess!")

if len(sys.argv) == 1:
  silent = False
  main()

elif len(sys.argv) == 2:
  flags = ["--silent", "--s"]

  if sys.argv[1] in flags:
    silent = True
    main()
  else:
    print(f"Invalid flag provided. Expected one of {str(flags)}, got '{sys.argv[1]}'")

else:
  print(f"Invalid number of arguments recieved expected at most 1, got {len(sys.argv) - 1}")