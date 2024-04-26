import {
  useParams,
  Navigate,
} from "react-router-dom";
import { ClientJS } from 'clientjs';
import axios from 'axios';
import {apiUrl} from './Config.js'


const Login = () => {
  const { id } = useParams();
  const client = new ClientJS();
  const fingerprint = client.getFingerprint();

  localStorage.setItem('id', id);

  axios
      .post(
        `${apiUrl}/api/bc-reader/${id}/add-device`, {code: fingerprint}
      )
      .catch(function (error) {
        console.log(error);
      });
  return <Navigate to='/'  />
};

export {Login}