import Authorisation from "./components/Authorisation/Authorisation";
import Registration from "./components/Registration/Registration";
import UserTable from "./components/Table/Table";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { auth } from "./actions/user";
import { getUsers } from "./actions/users";

function App() {
	const isAuth = useSelector(state => state.user.isAuth);
	const users = useSelector(state => state.user.users);
	const dispatch = useDispatch();
console.log(isAuth);
	useEffect(() => {
		dispatch(auth())
	}, [])

	useEffect(() => {
		dispatch(getUsers())
	}, [])

  return (
    <BrowserRouter>
		<div className="App">
			{!isAuth ?
				<Switch>
					<Route exact path="/login">
						<Authorisation/>
					</Route>
					<Route exact path="/registration">
						<Registration/>
					</Route>
					<Redirect to='/login'/>
				</Switch> :
				<Switch>
					<Route exact path="/">
						{users.length > 0 ? (
							<UserTable users={users} />) : 
							(<div>Loading users...</div>)
						}
					</Route>
					<Redirect to="/"/>
				</Switch>
			}
		</div>
    </BrowserRouter>
  );
}

export default App;
