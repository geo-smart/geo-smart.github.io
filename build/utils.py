class logStatus:
  GOOD = "\033[92m"
  WARN = "\033[93m"
  FAIL = "\033[91m"

silent = False
def setOutputMode(isSilent):
  global silent
  silent = isSilent

def formatLog(data, status = None):
  pre = ""
  if status == logStatus.GOOD:
    pre = "($) "
  if status == logStatus.WARN:
    pre = "(?) "
  if status == logStatus.FAIL:
    pre = "(!) "
  return f"{status}{pre}{data}\033[0m"

def output(data, status = None, newLine = False, end="\n"):
  data = str(data)
  if silent: return
  if newLine: print("")
  if status: print(formatLog(data, status), end=end)
  else: print(data, end=end)