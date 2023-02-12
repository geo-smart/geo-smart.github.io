from http.server import HTTPServer, SimpleHTTPRequestHandler
import sys
import os

def run(server_class=HTTPServer, handler_class=SimpleHTTPRequestHandler):
  server_address = ("", 8000)
  httpd = server_class(server_address, handler_class)
  httpd.serve_forever()

class NoExtensionHandler(SimpleHTTPRequestHandler):
  def do_GET(self):
    print("\n> unmodified path:", self.path)
    self.path = directory + self.path
    print("> with directory:", self.path)
    
    home_paths = ["/", "/docs/"]
    # The exclusion of paths with a period excludes image, js and other file types
    if self.path not in home_paths and not "." in self.path:
      self.path += ".html"
      print("> extension added:", self.path)

    if watch and watcher.check():
      print("> header modified, building new header...")
      
      with open("build/header.py", "rb") as source_file:
        code = compile(source_file.read(), "/build/header.py", "exec")
      sys.argv = ["server.py"]
      exec(code, {})

    SimpleHTTPRequestHandler.do_GET(self)

class FileWatcher(object):
  def __init__(self, path):
    self._cached_stamp = None
    self.filename = path

  def check(self):
    stamp = os.stat(self.filename).st_mtime

    print(f"> checking {self.filename} modified time:", stamp)
    if stamp != self._cached_stamp:
      self._cached_stamp = stamp
      return True # file changed
    else:
      return False # file unchanged

# *** MAIN *** #

directory = ""
watch = False

if len(sys.argv) == 1:
  print("Serving from root directory...")
  run(HTTPServer, NoExtensionHandler)

elif len(sys.argv) == 2:
  dir_flags = ["--docs", "--production"]
  head_flags = ["--watch"]

  if sys.argv[1] in dir_flags:
    directory = "/docs"
    print(f"Recieved '{sys.argv[1]}' flag, serving from /docs/ directory...")
    run(HTTPServer, NoExtensionHandler)

  elif sys.argv[1] in head_flags:
    watch = True
    watcher = FileWatcher("header.html")
    print("Serving from root directory...")
    print(f"Recieved '{sys.argv[1]}' flag, watching header.html for changes...")
    run(HTTPServer, NoExtensionHandler)
  
  else:
    print(f"Invalid flag provided. Expected one of {str(dir_flags + head_flags)}, got '{sys.argv[1]}'")

else:
  # We can serve from the docs folder or watch for head changes, but it doesn't make sense to do both. 
  print(f"Invalid number of arguments. Flags are mutually exclusive. Expected at most 1, got {len(sys.argv) - 1}")