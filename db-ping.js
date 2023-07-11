import pg from 'pg'

const client = new pg.Client({
	host: "localhost",
	user: "root",
	password: "123",
	database: "vaca"
})

await client.connect()

let result = await client.query('SELECT $1::text as message', ['Hello world!'])
console.log(result.rows[0].message)

result = await client.query('SELECT * FROM users')
console.log(result.rows)

await client.end()
