/* eslint-disable react/sort-comp */
import React from 'react';
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
    const url = `Employee/UploadListRecruitment`;
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
    return (
      <div className="container-fluid">
        <form onSubmit={(e) => this.submit(e)}>
          <input type="file" onChange={(e) => this.setFile(e)} />
          <button className="btn btn-primary" type="submit">
            Upload
          </button>
        </form>
      </div>
    );
  }
}
export default UploadFile;
