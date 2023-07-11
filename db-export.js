import pg from "pg";
import pgCopyStreams from "pg-copy-streams";

const pool = new pg.Pool({ user: "root", password: "123", database: "vaca" });
const client = await pool.connect();
const tables = ["users", "posts"];

await Deno.mkdir("tmp/", { recursive: true });

for (const table of tables) {
	console.log(table);
	const query = `COPY ${table} TO STDOUT CSV HEADER`;
	const stream = client.query(pgCopyStreams.to(query));
	const file = await Deno.create(`tmp/${table}.csv`);
	await new Promise((resolve, reject) => {
		stream.on("data", (chunk) => file.write(chunk));
		stream.on("end", resolve);
		stream.on("error", reject);
	});
	file.close();
	console.log("end of", table);
}

console.log("done");

client.release();
await pool.end();

// import process from "process";

// import { pipeline } from "node:stream/promises";
// import pg from "npm:pg@8.11.1";
// import pgCopyStreams from "npm:pg-copy-streams@6.0.5";

// const pool = new pg.Pool({
// 	hostname: "localhost",
// 	user: "root",
// 	password: "123",
// 	database: "ibasto3_test",
// });

// const client = await pool.connect();

// try {
// 	const stream = client.query(pgCopyStreams.to("COPY users TO STDOUT"));
// 	await pipeline(stream, process.stdout);
// } finally {
// 	client.release();
// }
// await pool.end();

// import pg from 'pg'

// const client = new pg.Client({
// 	host: "localhost",
// 	user: "root",
// 	password: "123",
// 	database: "vaca"
// })

// await client.connect()

// let result = await client.query('SELECT $1::text as message', ['Hello world!'])
// console.log(result.rows[0].message)

// result = await client.query('SELECT * FROM users')
// console.log(result.rows)

// await client.end()
