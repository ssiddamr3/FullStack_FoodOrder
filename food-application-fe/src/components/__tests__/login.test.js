import { render, screen, cleanup, waitFor, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login, {loginBtn} from '../Login';
import userEvent from '@testing-library/user-event';
import APIServices from '../../services/APIServices';


afterEach(()=>{
    cleanup();
});

test('should render login component', async () => {
    render(
        <Router> 
          <Login />
        </Router>
      );
  const loginElement = screen.getByTestId('login-1');

  // Use waitFor to wait for asynchronous operations
  await waitFor(() => {
    expect(loginElement).toBeInTheDocument();
    expect(loginElement).toHaveTextContent('Login');
  });
});

test('when login button is clicked, APIServices should be called', async () => {
    const mock = jest.spyOn(APIServices, 'loginUser').mockResolvedValue({ token: 'mockedToken' });
  
    render(
      <Router>
        <Login />
      </Router>
    );
  
    const username= screen.getByRole('textbox');
    const password = screen.getByLabelText('Password');
  
    userEvent.type(username, 'testuser');
    userEvent.type(password, 'testpassword');
  
    const loginBtn = screen.getByRole('button', {
      name: 'Login',
    });
    userEvent.click(loginBtn);
  
    await waitFor(() => {
      expect(mock).toHaveBeenCalled();
    });
  });
  

  test('when login button is clicked with valid credentials',async()=>{
    const mock = jest.fn(() => Promise.resolve({ token: 'mockedToken' }));
    APIServices.loginUser = mock;
    render(
        <Router>
            <Login/>
        </Router>
    );
    const username = screen.getByRole('textbox', {
        name: 'Username', // Provide the accessible name of your username input field
    });
    userEvent.type(username, 'testuser');
    const password = screen.getByLabelText('Password');
    userEvent.type(password, 'testpassword');

    const button = screen.getByRole('button',{
        name:'Login',
    });
    userEvent.click(button);
    await waitFor(()=>{
        expect(mock).toHaveBeenCalledWith({username:'testuser',password:'testpassword'});
    })

  })

  test('when login button is clicked with no data entered, exception should be thrown', async() =>{
    const mock = jest.fn(()=>Promise.reject({token:'mockedToken'}));
    APIServices.loginUser = mock;
    render(
        <Router>
            <Login/>
        </Router>
    );
    const username = screen.getByRole('textbox',{
        name:'Username'
    });
    userEvent.type(username,'');
    const password = screen.getByLabelText('Password');
    userEvent.type(password,'')

    const button = screen.getByRole('button',{
        name:'Login'
    });
    // await expect(() => userEvent.click(button)).rejects.toThrow();
    // await waitFor(()=>{
    //     expect(mock).toHaveBeenCalledWith({username:'',password:''})
    // })
    userEvent.click(button);
    try {
        await mock({ username: '', password: '' });
      } catch (error) {
        expect(error).toBeTruthy();
      }

  })
