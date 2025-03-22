import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {ethers, Wallet} from "ethers";
import {SimpleContract__factory} from "./contracts-types";

function App() {
    const [count, setCount] = useState(0)
    const [contractAddress, setContractAddress] = useState('');

    const setValue = async (value:number) => {
        const contractAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3';
        const provider =  new ethers.JsonRpcProvider('http://localhost:8545')
        const signer = new Wallet('0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80', provider)
        const simpleContract = SimpleContract__factory.connect(contractAddress, signer);

        const tx = await simpleContract.setValue(value);
        await tx.wait();
        await getContractValue();
    }

    const getContractValue = async () => {
        const contractAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3';
        const provider =  new ethers.JsonRpcProvider('http://localhost:8545');
        const simpleContract = SimpleContract__factory.connect(contractAddress, provider);

        const value = await simpleContract.getValue();

        setContractAddress(contractAddress);
        setCount(Number(value));

    }

    useEffect(() => {
        getContractValue();
    }, []);

    return (
        <>
            <div>
                <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <span>{contractAddress}</span>
                <hr/>
                <span>
          Smart contract value is {count}
        </span>
                <hr/>
                <button onClick={() => setValue(count + 1)}>Increment value</button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    )
}

export default App
