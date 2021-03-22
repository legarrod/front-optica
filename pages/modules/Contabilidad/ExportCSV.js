import React, { useState, useEffect } from 'react'
import Button from "@material-ui/core/Button";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import axios from "axios";


export const ExportCSV = ({fileName}) => {

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
	const [csvData, setCcsvData] =useState();
	const [response, setResponse] =useState(false);
	const url = `${process.env.API_EXPORTAR}`;

	const getFacturas = async (url) => {
		try {
			const data = await axios.get(url, setCcsvData, setResponse);
			if (data.data.status_code === 200) {
			setCcsvData(data.data.data)
			setResponse(true)
			}
		} catch (error) {
			console.log(error);
		}
	}

	const exportData = () => {
		getFacturas(url, setCcsvData, setResponse)
	}

    const exportToCSV = (csvData, fileName) => {
        const ws = XLSX.utils.json_to_sheet(csvData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    }
useEffect(() => {
	if (response) {
		exportToCSV(csvData, fileName)
	}	
}, [response, csvData])
    return (
		<Button
		  variant="contained"
		  color="primary"
		  size="large"
		  className="rounded-sm"
		  style={{marginLeft: 5, marginTop: 4}}
		  onClick={() => exportData()}
		>
			Exportar
		</Button>
      
    )

}