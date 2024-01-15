import { render, screen, cleanup, waitFor, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login, {loginBtn} from '../Login';
import userEvent from '@testing-library/user-event';
import APIServices from '../../services/APIServices';
import OwnerPage from '../Owner-Home';

afterEach(()=>{
    cleanup();
});
test('should render owner home component when logged in with correct credentials and display contents of the owner', async () => {

    jest.fn(APIServices,()=>{
        get:jest.fn(()=>Promise.resolve([
            { restaurant_id: 1, restroName: 'Restaurant 1' },
        ]))
    })
    render(
        <Router> 
          <OwnerPage/>
        </Router>
      );
      
    const restaurants = await screen.findAllByRole('button');

    expect(restaurants.length).toBeGreaterThanOrEqual(1);
});

