import requests

TEST_RECORDS = [
    {
        "organization_id": 1,
        "email": "brittany@workingfamilies.org",
        "name": "brittany bennett",
    },
    {
        "organization_id": 1,
        "email": "austin@workingfamilies.org",
        "name": "Austin Weisgrau",
    },
    {
        "organization_id": 2,
        "email": "rabia@populardemocracy.org",
        "name": "Rabia Maral",
    },
    {
        "organization_id": 2,
        "email": "mara@populardemocracy.org",
        "name": "Mara Baron",
    },
    {
        "organization_id": 3,
        "email": "admin@maketheroadnewjersey.org",
        "name": "Admin",
    },
]


def test_add_user():
    url = "http://localhost:5000/api/add-user"

    for record in TEST_RECORDS:
        response = requests.post(url, json=record)

        assert response.status_code == 200
        assert response.json()["message"] == "Success"


if __name__ == "__main__":
    test_add_user()
