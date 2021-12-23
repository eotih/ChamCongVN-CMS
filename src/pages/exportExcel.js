import React from 'react';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { Button } from '@mui/material';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';

export const ExportExcel = ({ apiData, fileName }) => {
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';
  const exportToCSV = (apiData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <div className="container-fluid">
      <Button
        onClick={() => exportToCSV(apiData, fileName)}
        variant="contained"
        startIcon={<Icon icon={plusFill} />}
      >
        Export to Excel
      </Button>
    </div>
  );
};
