import logging
import os
import sys

tmc_logger = logging.getLogger(__name__)
_handler = logging.StreamHandler(sys.stdout)
_formatter = logging.Formatter("%(levelname)s %(message)s")
_handler.setFormatter(_formatter)
tmc_logger.addHandler(_handler)
tmc_logger.setLevel("INFO")

if os.environ.get("DEBUG") == "true":
    tmc_logger.setLevel("DEBUG")
    tmc_logger.debug("Logging at debug level")
