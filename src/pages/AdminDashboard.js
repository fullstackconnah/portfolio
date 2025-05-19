import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

signOut(auth).then(() => {
  
});

function AdminDashboard() {
    return <h1>Projects Page</h1>;
  }
  
  export default AdminDashboard; 