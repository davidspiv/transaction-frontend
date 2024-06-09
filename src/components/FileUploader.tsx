import type { BaseSyntheticEvent } from 'react';

const FileUploader = () => {
	const parseCsv = async (fileType: 'DEBIT' | 'CREDIT', inputData: string) => {
		const transactions = [];
		if (inputData) {
			const csvValues = inputData.replace(/[\n]/g, ',').split(',');
			const totalCol = 7;

			for (let i = 1; i < Math.floor(csvValues.length / totalCol); i++) {
				const datePosted = `${new Date(csvValues[i * totalCol])
					.toISOString()
					.slice(0, 10)
					.replace(/[-]/g, '')}120000.000 GMT`;
				const memo = csvValues[i * totalCol + 1];
				const amount = csvValues[i * totalCol + 5];
				transactions.push({
					transType: fileType,
					datePosted,
					amount,
					fitid: null,
					memo,
				});
			}
			return transactions;
		}
		console.log('Error with getData()');
	};

	const parseOfx = async (inputData: string) => {
		const transactions = [];
		const objectify = (ofxData: string) => {
			const transType = ofxData.slice(
				ofxData.indexOf('<TRNTYPE>') + 9,
				ofxData.indexOf('</TRNTYPE'),
			);
			const datePosted = ofxData.slice(
				ofxData.indexOf('<DTPOSTED>') + 10,
				ofxData.indexOf('</DTPOSTED>'),
			);
			const amount = ofxData.slice(
				ofxData.indexOf('<TRNAMT>') + 8,
				ofxData.indexOf('</TRNAMT>'),
			);
			const fitid = ofxData.slice(
				ofxData.indexOf('<FITID>') + 7,
				ofxData.indexOf('</FITID>'),
			);
			const memo = ofxData.slice(
				ofxData.indexOf('<MEMO>') + 6,
				ofxData.indexOf('</MEMO>'),
			);
			return {
				transType,
				datePosted,
				amount,
				fitid,
				memo,
			};
		};
		if (inputData) {
			const ofxDataArr = inputData.split('<STMTTRN>');
			//skip first AND last el
			for (let i = 1; i < ofxDataArr.length - 1; i++) {
				const transaction = objectify(ofxDataArr[i]);
				transactions.push(transaction);
			}
			return transactions;
		}
		console.log('Error with getData()');
	};

	const handleFile = async (e: BaseSyntheticEvent) => {
		const fileData = e.target.files[0];
		const result = await fileData.text();
		const formattedData =
			fileData.type === 'text/csv'
				? await parseCsv('DEBIT', result)
				: await parseOfx(result);

		try {
			const res = await fetch('http://localhost:5000/api/posts/', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formattedData),
			});
			console.log(res.statusText);
		} catch (error) {
			console.log('Error fetching data', error);
		}
	};
	return <input type='file' id='input' onChange={handleFile} />;
};

export default FileUploader;
