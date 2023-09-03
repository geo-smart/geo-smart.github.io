from pathlib import Path

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

def locateAllPages(root: str = ""):
  dir = Path(root)
  pages = sorted(dir.glob("*.html"))
  output(f"Located {len(pages)} site pages...")
  return pages

def locateAll(root: str, glob: str, ignore: list[str] = None):
  """
  root (str)
  The directory in which to search for files.
  
  glob (str)
  The glob to match files to, e.g. "*.txt" to match all files
  with the ".txt" extension.

  ignore (list[str])
  A list of file names to ignore. Glob will proceed as normal
  and each match will be checked against this blacklist.
  """

  dir = Path(root)
  all = sorted(dir.glob(glob))
  output(f"Located {len(all)} {glob} files: {[str(file) for file in all]}")

  if ignore:
    ignore = {str(Path(root) / file) for file in ignore}
    files = [file for file in all if str(file) not in ignore]
    pruned = list(set(all) - set(files))
    output(f"Ignored {len(pruned)} of located files: {[str(file) for file in pruned]}")
    return files
  else:
    return all