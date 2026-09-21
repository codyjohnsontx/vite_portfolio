# Serves this folder and writes whatever is POSTed to /save/<name> into out/.
import http.server, os, re
class H(http.server.SimpleHTTPRequestHandler):
    def do_POST(self):
        m = re.fullmatch(r"/save/([A-Za-z0-9._-]+)", self.path)
        if not m: self.send_error(404); return
        body = self.rfile.read(int(self.headers["Content-Length"]))
        os.makedirs("out", exist_ok=True)
        open(os.path.join("out", m.group(1)), "wb").write(body)
        self.send_response(204); self.end_headers()
http.server.ThreadingHTTPServer(("127.0.0.1", 8197), H).serve_forever()
