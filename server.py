from http.server import HTTPServer, SimpleHTTPRequestHandler
import sys

def run(server_class=HTTPServer, handler_class=SimpleHTTPRequestHandler):
  server_address = ("", 8000)
  httpd = server_class(server_address, handler_class)
  httpd.serve_forever()

class NoExtensionHandler(SimpleHTTPRequestHandler):
  def do_GET(self):
    print("\n(DEBUG) unmodified path:", self.path)
    self.path = directory + self.path
    print("(DEBUG) with directory:", self.path)
    
    home_paths = ["/", "/docs/"]
    # The exclusion of paths with a period excludes image, js and other file types
    if self.path not in home_paths and not "." in self.path:
      self.path += ".html"
      print("(DEBUG) extension added:", self.path)
    SimpleHTTPRequestHandler.do_GET(self)

# *** MAIN *** #

if len(sys.argv) == 1:
  directory = ""
  run(HTTPServer, NoExtensionHandler)
elif len(sys.argv) == 2:
  flags = ["--docs", "--production"]

  if sys.argv[1] in flags:
    directory = "/docs"
    print(f"Recieved '{sys.argv[1]}' flag, serving from /docs/ directory...")
    run(HTTPServer, NoExtensionHandler)
  else:
    print(f"Invalid flag provided. Expected one of {str(flags)}, got '{sys.argv[1]}'")
else:
  print(f"Invalid number of arguments recieved expected at most 1, got {len(sys.argv) - 1}")