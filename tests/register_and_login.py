from requests import get, post
from random import randint

RANDSTR_CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
def randstr(length: int) -> str:
    res = ''
    for i in range(length):
        res += RANDSTR_CHARS[randint(0, len(RANDSTR_CHARS))]
    return res

hostname = 'http://localhost:8000'

def url(path):
    return f'{hostname}{path}'

res = post(url('/api/supporters/register'), headers={'Content-Type': 'application/json'}, json={
    'email': 'testuser@mail.com',
    'firstName': 'Test',
    'lastName': 'User',
    'password': '1234',
    'permissions': 'default',
    'role': 'level 1',
}).json()
print(res)
if not res['ok']:
    exit(1)

supporterId = res['supporter']['id'];

res = get(url(f'/api/supporters/{supporterId}')).json()
print(res)
if not res['ok']:
    exit(1)

res = post(url('/api/sessions/login'), headers={'Content-Type': 'application/json'}, json={
    'email': 'testuser@mail.com',
    'password': '1234',
}).json()
print(res)
if not res['ok']:
    exit(1)
