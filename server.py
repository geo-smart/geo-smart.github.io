from http.server import HTTPServer, SimpleHTTPRequestHandler

def run(server_class=HTTPServer, handler_class=SimpleHTTPRequestHandler):
  server_address = ("", 8000)
  httpd = server_class(server_address, handler_class)
  httpd.serve_forever()

class NoExtensionHandler(SimpleHTTPRequestHandler):
  def do_GET(self):
    print("(DEBUG)", self.path)
    # This excludes image, js and other file types as well as "/" which is index.html
    if self.path != "/" and not "." in self.path:
      self.path += ".html"
      print("(DEBUG) changed to:", self.path)
    SimpleHTTPRequestHandler.do_GET(self)

run(HTTPServer, NoExtensionHandler)