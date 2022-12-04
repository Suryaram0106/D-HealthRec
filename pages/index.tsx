import { useState, useEffect } from 'react';
import { RecordContractAddress } from '../config.js';
import {ethers} from 'ethers';
import Records from '../utils/Records.json'
import Record from './components/Record';




declare var window: any
declare var error: any

function Home () {


  interface records {
    id: string;
    name: string;
    dob: string;
    gender:string;
    ethAddres:string;
    cid:string;
  }

  	const [currentAccount, setCurrentAccount] = useState('')
    const [correctNetwork, setCorrectNetwork] = useState(false)

    const [txError, setTxError] = useState(null)

    const[id,setId]=useState('');
    const [records, setRecords] = useState<Array<records>>([]);
    const [pName, setpName] = useState('');
    const [pGender, setpGender] = useState('');
    const [pDob, setpDob] = useState('');
    const [ethAddres, setEthAddress] = useState('');
    const [cid, setCid] = useState('');
   

    

  // Calls Metamask to connect wallet on clicking Connect Wallet button
	const connectWallet = async () => {
		try {
			const { ethereum } = window

			if (!ethereum) {
				console.log('Metamask not detected')
				return
			}
			let chainId = await ethereum.request({ method: 'eth_chainId'})
			console.log('Connected to chain:' + chainId)

			const polygonChainId = '0x80001'

			if (chainId !== polygonChainId) {
				alert('You are not connected to the Polygon Mumbai Testnet!')
				return
			}

			const accounts = await ethereum.request({ method: 'eth_requestAccounts' })

			console.log('Found account', accounts[0])
			setCurrentAccount(accounts[0])
		} catch (error) {
			console.log('Error connecting to metamask', error)
		}
	}

  // Checks if wallet is connected to the correct network
const checkCorrectNetwork = async () => {
  const { ethereum } = window
  let chainId = await ethereum.request({ method: 'eth_chainId' })
  console.log('Connected to chain:' + chainId)

  const polygonChainId = '0x80001'

  if (chainId !== polygonChainId) {
    setCorrectNetwork(false)
  } else {
    setCorrectNetwork(true)
  }
}

const getRecords = async() => {
    try {
      const { ethereum } = window

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const RecordContract = new ethers.Contract(
          RecordContractAddress,
          Records.abi,
          signer
        )

        let records = await RecordContract.getRecordList()
      
        setRecords(records);

      } else {
        console.log("Ethereum object doesn't exist!")
      }
    } catch (error) {
      console.log(error)
      //setTxError(error.message)
    }
  }

  

const submitRecord = async () => {
  let record = {
      'name': pName,
      'dob': pDob,
      'gender': pGender,
      'ethAddres': ethAddres,
      'cid': cid

  };

  try {
    const { ethereum } = window

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner()
      const RecordContract = new ethers.Contract(
        RecordContractAddress,
        Records.abi,
        signer
      )

      let libraryTx = await RecordContract.addRecord(record.name, record.dob, record.gender, record.ethAddres,record.cid);

      console.log(libraryTx);
    } else {
      console.log("Ethereum object doesn't exist!")
    }
  } catch (error) {
    console.log('Error Submitting new Record', error)
    //setTxError(error.message)
  }
};

  return (
    <div className='flex flex-col items-center bg-[#ffffff] text-[#6a50aa] min-h-screen'>
  <div className='trasition hover:rotate-180 hover:scale-105 transition duration-500 ease-in-out'>
  </div>
  <h2 className='text-3xl font-bold mb-20 mt-12'>
    e - Heath Records
  </h2>
  <h1 className='text-2xl font-bold'>Hi Admin </h1>
  {/*currentAccount === '' ? (
    <button
    className='text-2xl font-bold py-3 px-12 bg-[#b7ddc0] rounded-lg mb-10 hover:scale-105 transition duration-500 ease-in-out'
    onClick={connectWallet}
    >
    Connect Wallet
    </button>
    ) : correctNetwork ? (
      <h4 className='text-3xl font-bold mb-20 mt-12'>
        Wallet Connected
      </h4>
    ) : (
    <div className='flex flex-col justify-center items-center mb-20 font-bold text-2xl gap-y-3'>
    <div>----------------------------------------</div>
    <div>Please connect to the Polygon Mumbai Testnet</div>
    <div>----------------------------------------</div>
    </div>
    )*/}

<div>

  <div className='text-xl font-semibold mb-20 mt-4'>
      <input className='text-xl font-bold mb-2 mt-1' type="text" placeholder="Enter Patient Name" value={pName} onChange={(e) => setpName(e.target.value)} />
      <br/>
      <input className='text-xl font-bold mb-2 mt-1' type="text" placeholder="Enter Patient Gender" value={pGender} onChange={(e) => setpGender(e.target.value)} />
      <br/>
      <input className='text-xl font-bold mb-2 mt-1' type="text" placeholder="Enter DOB" value={pDob} onChange={(e) => setpDob(e.target.value)} />
      <br/>
      <input className='text-xl font-bold mb-2 mt-1' type="text" placeholder="Enter Patient Eth Address" value={ethAddres} onChange={(e) => setEthAddress(e.target.value)} />
      <br/>
      <input className='text-xl font-bold mb-2 mt-1' type="text" placeholder="Enter CID" value={cid} onChange={(e) => setCid(e.target.value)} />
      <br/>
      <br/>
      <button className='text-xl font-bold py-3 px-12 bg-[#ffd75f] rounded-lg mb-10 hover:scale-105 transition duration-500 ease-in-out'
      onClick={submitRecord} >
        Add Record
      </button>
</div>
    <div className='text-xl font-semibold mb-20 mt-4'>
      <br/>
      <input className='text-xl font-bold mb-2 mt-1' type="text" placeholder="Enter Eth Address" value={id} onChange={(e) => setId(e.target.value)} />
      <br/> 
     <button className='text-xl font-bold py-3 px-12 bg-[#ffd75f] rounded-lg mb-10 hover:scale-105 transition duration-500 ease-in-out'
     onClick={getRecords} >
       View Records
     </button>
     
     {records.map((rec) => (
       <Record
         key={rec.id}
         id={parseInt(rec.id)}
         name={rec.name}
         dob={rec.dob}
         gender={rec.gender}
         ethAddres={rec.ethAddres}
         cid={rec.cid}
       
       />
     ))}
   </div>
  </div>
  </div>
  
  )
}

//NextPage();

export default Home