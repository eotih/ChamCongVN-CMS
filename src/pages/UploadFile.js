/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/sort-comp */
import React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from '../functions/Axios';

class UploadFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: ''
    };
  }

  async submit(e) {
    e.preventDefault();
    const url = `Employee/Recruitment`;
    const formData = new FormData();
    formData.append('body', this.state.file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };
    return axios.post(url, formData, config).then((json) => {
      if (json.data === 'The Excel file has been successfully uploaded.') {
        alert('Upload file Thành Công');
        window.location.reload();
      } else {
        alert('Data not Saved');
      }
    });
  }

  setFile(e) {
    this.setState({ file: e.target.files[0] });
  }

  render() {
    const Input = styled('input')({
      display: 'none'
    });
    return (
      <div className="container">
        <form onSubmit={(e) => this.submit(e)}>
          <label htmlFor="contained-button-file">
            <Input type="file" id="contained-button-file" onChange={(e) => this.setFile(e)} />
            <Button variant="contained" component="span">
              Upload Logo
            </Button>
          </label>
        </form>
      </div>
    );
  }
}
export default UploadFile;
