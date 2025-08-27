import requests

TEST_RECORDS = [
    {
        "name": "Working Families Party",
        "google_group_name": "grp-tmc-mem-wfp@movementcooperative.org",
        "haven_project_name": "proj-tmc-mem-wfp",
        "organization_type": "National Member",
        "data_owner_code": "WFP",
        "contact_email": "brittany@workingfamilies.org",
        "contact_name": "brittany bennett",
        "contact_phone": "123-456-7890",
        "domain": "workingfamilies.org",
        "website": "http://workingfamilies.org",
        "slack_channel": "wfp-shared-tmc",
    },
    {
        "name": "Popular Democracy",
        "google_group_name": "grp-tmc-mem-cpd@movementcooperative.org",
        "haven_project_name": "proj-tmc-mem-cpd",
        "organization_type": "National Member",
        "data_owner_code": "CPD",
        "contact_email": "rabia@populardemocracy.org",
        "contact_name": "Rabia Maral",
        "contact_phone": "987-654-3210",
        "domain": "populardemocracy.org",
        "website": "http://nyc.gov",
        "slack_channel": "cpd-shared-tmc",
    },
    {
        "name": "Make the Road New Jersey",
        "google_group_name": "grp-tmc-aff-a_mtrnj@movementcooperative.org",
        "haven_project_name": "proj-tmc-mem-cpd",
        "organization_type": "Affiliate",
        "data_owner_code": "A_MTRNJ",
        "contact_email": "admin@maketheroadnewjersey.org",
        "contact_name": "Admin",
        "contact_phone": "987-654-3210",
        "domain": "maketheroadnewjersey.org",
        "website": "http://nyc.gov",
        "national_member_id": 2,
    },
]


def test_add_organization():
    url = "http://localhost:5000/api/add-organization"

    for record in TEST_RECORDS:
        response = requests.post(url, json=record)

        assert response.status_code == 200
        assert response.json()["message"] == "Success"


if __name__ == "__main__":
    test_add_organization()
