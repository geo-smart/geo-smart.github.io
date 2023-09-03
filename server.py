from http.server import HTTPServer, SimpleHTTPRequestHandler
import sys
import os

from build.inject import injectAllComponents
from build.utils import logStatus, output

watch = True
directory = ""
geosmart = r"""
   _____            _____ __  __          _____ _______ 
  / ____|          / ____|  \/  |   /\   |  __ \__   __|
 | |  __  ___  ___| (___ | \  / |  /  \  | |__) | | |   
 | | |_ |/ _ \/ _ \\___ \| |\/| | / /\ \ |  _  /  | |   
 | |__| |  __/ (_) |___) | |  | |/ ____ \| | \ \  | |   
  \_____|\___|\___/_____/|_|  |_/_/    \_\_|  \_\ |_|   
"""

# Found this funky little function on stack overflow:
# https://stackoverflow.com/questions/40419276/python-how-to-print-text-to-console-as-hyperlink
def link(uri, label=None):
  if label is None: 
    label = uri
  parameters = ""

  # OSC 8 ; params ; URI ST <name> OSC 8 ;; ST 
  escape_mask = "\033]8;{};{}\033\\{}\033]8;;\033\\"
  return escape_mask.format(parameters, uri, label)

def prepare(message: str):
  os.system("cls" if os.name=="nt" else "clear")
  output(geosmart)
  output(message)
  output("Server ready and waiting at " + link("http://localhost:8000/"), logStatus.GOOD)

# ============== #
# *** SERVER *** #

def run(server_class=HTTPServer, handler_class=SimpleHTTPRequestHandler):
  server_address = ("", 8000)
  httpd = server_class(server_address, handler_class)

  try:
    httpd.serve_forever()
  except:
    output("Recieved keyboard interrupt, exiting...\n", logStatus.WARN)

class NoExtensionHandler(SimpleHTTPRequestHandler):
  def do_GET(self):
    print("\nUnmodified path: " + self.path)
    output("\nUnmodified path: " + self.path)
    self.path = directory + self.path
    output("With directory: " + self.path)
    
    home_paths = ["/", "/docs/"]
    # The exclusion of paths with a period excludes image, js and other file types
    if self.path not in home_paths and not "." in self.path:
      self.path += ".html"
      output("Extension added: " + self.path)

    if watch and watcher.check():
      output("Component file modified, injecting updated component(s)...")
      injectAllComponents()

    SimpleHTTPRequestHandler.do_GET(self)

class FileWatcher(object):
  def __init__(self, paths: list[str]):
    self._cachedStamps = [None] * len(paths)
    self.watchPaths = paths

  def check(self):
    for index in range(len(self.watchPaths)):
      file = self.watchPaths[index]
      stamp = os.stat(file).st_mtime

      output(f"Checking {file} modified time: {stamp}, {self._cachedStamps[index]}", newLine=True)
      if stamp != self._cachedStamps[index]:
        self._cachedStamps[index] = stamp
        return True # file changed
    
    return False # file unchanged

# ============ #
# *** MAIN *** #

watcher = FileWatcher(["_header.html"])

if len(sys.argv) == 1:
  prepare("Serving from root directory...")
  run(HTTPServer, NoExtensionHandler)

elif len(sys.argv) == 2:
  dir_flags = ["--docs", "-d"]

  if sys.argv[1] in dir_flags:
    watch = False  # We can serve from the docs folder or watch for head changes, but it doesn't make sense to do both. 
    directory = "/docs"

    prepare(f"Recieved '{sys.argv[1]}' flag, serving from /docs/ directory...")
    run(HTTPServer, NoExtensionHandler)
  
  else:
    output(f"Invalid flag provided. Expected one of {str(dir_flags)}, got '{sys.argv[1]}'")

else:
  output(f"Invalid number of arguments. Expected at most 1, got {len(sys.argv) - 1}")