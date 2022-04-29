
# API Specification

## Supporters 

[`Supporter` model](/supporters/Supporter.ts)

### GET

```
/api/supporters/:id
```

#### Request Params

```ts
{
    'id': number,
}
```

#### Response OK

```ts
{
    ok: true,
    supporter: Supporter
}
```

#### Response BadRequst

```ts
{
    ok: false,
    error: 'not found',
}
```

### POST Register

Requires admin persmissions

```
/api/supporters/register
```

#### Request Body

```ts
{
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    permissions: 'default' | 'admin',
    role: 'level 1' | 'level 2',
}
```

#### Response OK

```ts
{
    ok: true,
    supporter: Supporter,
}
```

#### Response BadRequest

```ts
{
    ok: false,
    error: 'email not specified'
        | 'first name not specified'
        | 'last name not specified'
        | 'password not specified'
        | 'invalid value for permissions'
        | 'invalid value for role'
        | 'invalid email'
        | 'email taken',
}
```

## Tickets

[`Ticket` model](/tickets/Ticket.ts)

### GET

```
/api/tickets/:id
```

### GET Categories

```
/api/tickets/categories
```

## Customers

[`Customer` model](/customers/Customer.ts)

### GET

```
/api/tickets/:id
```

## Sessions

[`Session` model](/sessions/Session.ts)

### POST Login

```
/api/sessions/login
```
