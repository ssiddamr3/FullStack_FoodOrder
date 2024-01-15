import { render, screen, cleanup, waitFor, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login, {loginBtn} from '../Login';
import userEvent from '@testing-library/user-event';
import APIServices from '../../services/APIServices';
import UserHome from '../User-Home';
import { Title } from '@mui/icons-material';

afterEach(()=>{
    cleanup();
});
test('should render user home component when logged in with correct credentials and display more than one restaurants', async () => {

    jest.fn(APIServices,()=>{
        get:jest.fn(()=>Promise.resolve([
            { restaurant_id: 1, restroName: 'Restaurant 1' },
        ]))
    })
    render(
        <Router> 
          <UserHome/>
        </Router>
      );
      
    const restaurants = await screen.findAllByRole('button');

    expect(restaurants.length).toBeGreaterThanOrEqual(1);
});

test('After rendering the user home component, cart icon should be displayed on the screen',async()=>{
    render(
        <Router>
            <UserHome/>
        </Router>
    );
    const viewCart = screen.getByRole('button',
    {Title:'View Cart'})
    expect(viewCart).toBeInTheDocument()
})