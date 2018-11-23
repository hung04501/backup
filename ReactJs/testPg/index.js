const express = require('express');
const app = express();
const pg = require('pg');
const port = 3000;

const config = {
    user: 'postgres',
    database: 'clkdb_20180416',
    password: 'postgres',
    port: 5432
};
const custIds = [];

const pool = new pg.Pool(config);


app.get('/', async(req, res, next) => {
  // async/await - check out a client
	(async () => {
	  const client = await pool.connect()
		const data = [];
	  try {
		const result = await client.query('SELECT cust_id from m_customer');
		 for(let i=0;i<result.rows.length;i++){
			custIds.push(Number(result.rows[i].cust_id));
		}

		const custId_results = await Promise.all(custIds.map(async row =>{
			let branchName = await client.query('SELECT cust_branch_name from m_customer_branch where cust_id = $1',[row]);
					 console.log(branchName.rows);
		}));
		


		//console.log(results);
		
		
		// results.forEach(async item =>{
			// const branchName = await client.query('SELECT cust_branch_name from m_customer_branch where cust_id = $1',[item]);
			// console.log(branchName.rows.cust_branch_name);
		// });
		
		

		
		res.send(branchName.rows.cust_branch_name);
	  } finally {
		client.release()
	  }
	})().catch(e => console.log(e.stack))
	   
   
});

async function getBranchName(array){
	array.forEach(async item=>{
		await client.query('SELECT cust_branch_name from m_customer_branch where cust_id = $1',item);
	});
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`))






