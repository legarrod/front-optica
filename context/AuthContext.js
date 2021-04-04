import React, {createContext} from 'react';

const AuthContext = createContext({

	auth: undefined,
	login: ()=> null,
	logout: ()=> null,
	setReloaduser: ()=>null
});

export default AuthContext;
