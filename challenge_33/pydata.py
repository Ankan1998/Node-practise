import json
import sys
if (len(sys.argv)==1):
    def json_returner():
        data_set = {"key1": [1, 2, 3], "key2": [4, 5, 6]}

        json_dump = json.dumps(data_set)
        return json_dump

    print(json_returner())
    sys.stdout.flush()
else:
    def cmd_line(x):
        return x+"2"
    print(cmd_line(sys.argv[1]))