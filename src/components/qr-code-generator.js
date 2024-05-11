import React, { useState } from 'react';
import axios from 'axios';
import QRCode from 'qrcode.react';
import MKInput from "./MKInput";
import MKButton from "./MKButton";
import Product from './Product';
import ExcelAdapter from './ExcelAdapter';


function QRCodeForm({EntityID}) {
    const [entityId, setEntityId] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [entityType, setEntityType] = useState('');
    const [elements, setElements] = useState('');
    const [amount, setAmount] = useState('');
    const [submittedData, setSubmittedData] = useState(null);
    const [responseKeys, setResponseKeys] = useState([]);


    const [file, setFile] = useState(null);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        setFile(file);

        if (file) {
            const adapter = new ExcelAdapter(file);
            const productNames = await adapter.getProducts();
            const elements = productNames.join(', ');
            setElements(elements);
        }
    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        const elementsArray = elements.split(',').map(item => item.trim());

        let data = {
            "entity_id": entityId,
            "transaction_id": transactionId,
            "entity_type": entityType,
            "elements": elementsArray,
            "amount": parseFloat(amount),
            "DateTime": new Date().toISOString()
        };

        setSubmittedData(data);

        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/Generate-QR-Code`, data);
            console.log(response.data);

            // Set the response keys
            setResponseKeys(Object.keys(response.data));

            // Add the rating elements to the data object
            data = {
                ...data,
                "Rating_elements": Object.keys(response.data)
            };

            setSubmittedData(data);
            console.log(`${process.env.REACT_APP_CLIENT_URL}/client/RatingPage?data=${encodeURIComponent(JSON.stringify(submittedData))}`);

        } catch (error) {
            console.error(error);
        }
    };



    return (
    <>
        <div className="container mx-auto px-4">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 text-left">
                        Entity ID:
                    </label><br/>
                    <MKInput type="text" value={EntityID} disabled onChange={e => setEntityId(e.target.value)} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 text-left">
                        Transaction ID:
                    </label><br/>
                    <MKInput type="text" value={transactionId} onChange={e => setTransactionId(e.target.value)} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 text-left">
                        Entity Type:
                    </label><br/>
                    <MKInput type="text" value={entityType} onChange={e => setEntityType(e.target.value)} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 text-left">
                        Elements (comma separated):
                    </label><br/>
                    <MKInput type="text" value={elements} onChange={e => setElements(e.target.value)} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 text-left">
                        Or Upload Excel File:
                    </label><br/>
                    <input type="file" onChange={handleFileChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 text-left">
                        Amount:
                    </label><br/>
                    <MKInput type="text" value={amount} onChange={e => setAmount(e.target.value)} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div><br/>
                <div>
                    <MKButton color="secondary" type="submit" value="Submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" >Submit</MKButton>
                </div>
            </form>
        </div>
        {submittedData && (
            <div className="container mx-auto px-4">
                <h2 className="font-bold text-lg text-left">Receipt</h2>
                <p className="text-left">Entity ID: {submittedData.entity_id}</p>
                <p className="text-left">Transaction ID: {submittedData.transaction_id}</p>
                <p className="text-left">Entity Type: {submittedData.entity_type}</p>
                <p className="text-left">Elements: {submittedData.elements.join(', ')}</p>
                <p className="text-left">Amount: {submittedData.amount}</p>
            </div>
        )}
        {responseKeys.length > 0 && (
            <div className="container mx-auto px-4">
                <h2 className="font-bold text-lg text-left">Elements to be rated are:</h2>
                <ul className="list-disc list-inside text-left">
                    {responseKeys.map((key, index) => (
                        <li key={index}>{key}</li>
                    ))}
                </ul>
            </div>
        )}
        {submittedData && (
            <div className="container mx-auto px-4">
                <h2 className="font-bold text-lg text-center">QR Code</h2>
                <div className="flex justify-center items-center border-2 border-gray-300 p-4 rounded-md bg-white">
                    <div style={{ width: '100%' }}>
                        <QRCode
                            value={`${process.env.REACT_APP_CLIENT_URL}/client/RatingPage?data=${encodeURIComponent(JSON.stringify(submittedData))}`}
                            size={window.innerWidth/5}
                        />
                    </div>
                </div>
            </div>
        )}

    </>
    );
}

export default QRCodeForm;