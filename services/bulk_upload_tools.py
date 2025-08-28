import sys

sys.path.append("../web-app/backend")

from utilities.models import Tools
import pandas as pd
from sqlalchemy import create_engine

if __name__ == "__main__":
    df = pd.read_csv("tools.csv").to_dict(orient="records")
    for tool_data in df:
        tool = Tools(**tool_data)
        db.session.add(tool)
    db.session.commit()
