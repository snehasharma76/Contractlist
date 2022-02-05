// pages/api/index.ts

import { NextApiRequest, NextApiResponse } from 'next';
import contracts from '../../public/contracts.json';

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  try {
    const projectName: string = request.query.project as string;
    const chain: string = request.query.chain as string;
    const contractName: string = request.query.contract as string;

    let found = false;

    for (const contractObj of contracts) {
      
      if (contractObj.name.toLowerCase() == projectName.toLowerCase()) {
        const contractsDetails = contractObj.contracts[chain];
        
        for (const contractParams of contractsDetails) {
          const contractParamName: string = contractParams.name as string;

          if (contractParamName.toLowerCase() == contractName.toLowerCase()) {          
            const contractAddress = contractParams.address;    
            
            found = true;
            
            response.status(200).json({
              body: contractAddress,
              query: request.query,
              cookies: request.cookies,
            });
          }
        }
      }
    }
    if (!found) {
      response.status(500).send({ error: 'failed to fetch data' });
    }
  } catch (err) {
    response.status(500).send({ error: 'failed to fetch data' });
  }
}