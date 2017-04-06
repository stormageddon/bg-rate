import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

//const CM_APP_ID = '9f16996a04afcd4da039daa5a51d8716';
const CM_APP_ID = '946a140d7b0efa4c4cd931cf6b0b0866';
//const CM_API_KEY = 'b776889b290a4e2ca85b97ba7c070a56';
const CM_API_KEY = '72d63a623b3645e5a0548519988f88c0';

declare var cloudmine: any;
let webService = new cloudmine.WebService({appid: CM_APP_ID, apikey: CM_API_KEY});        

@Injectable()
export class CloudmineService {
    
    constructor() { }

    login(username: string, password: string): Promise<any> {
	return new Promise( function( resolve, reject ) {
	    webService.login({username: username, password: password}).on('success', ( result )=> {
		console.log("Logged in:", result);
		/** set session token on success **/
		webService.options.session_token = result.session_token;
		resolve(result);
	    }).on('error', ( err )=> {
		console.log("Failed to login:", err);
		reject(err);
	    });
	});
		
    }

    logout(): Promise<any> {
	return new Promise( function( resolve, reject ) {
	    webService.logout().on('success', ( result )=> {
		resolve(result);
	    }).on('error', ( err )=> {
		reject(err);
	    });
	});
    }
		  
    register(username: string, password: string): Promise<any> {
	return new Promise( ( resolve, reject )=> {
	    webService.createUser({username: username, password: password}).on('success', ( result )=> {
		resolve(this.login(username, password))
	    }).on('409', ( err )=> {
		reject({statusCode: 409, message: 'An account with that name already exists'});
	    }).on('error', ( err )=> {
		reject(err);
	    });
	});
    }
    
    runSnippet(snippetName: string, params: any, opts?: any): Promise<number> {
	return new Promise( function( resolve, reject ) {
	    
	    webService.run(snippetName, params, opts).on('result', ( result )=> {
		console.log("Success!", result);
		if (!result.items || !result.items.item) {
		    return reject(new Error('No game found with the name ' + params.name))
		}
		else {
		    return resolve(result.items.item[0].$.id);
		}
	    }).on('error', function( err ) {
		return reject(err);
	    });

	});
    }

    update(id: number, data: any, opts?: any): Promise<any> {
	if (!opts) {
	    opts = {};
	}
	return new Promise( function( resolve, reject ) {
	    webService.update(id, data, opts).on('success', function( result ) {
		resolve(result);
	    }).on('error', function( err ) {
		reject(err);
	    });
	});
    }

    remove(id: number, opts?: any): Promise<boolean> {
	return new Promise( function( resolve, reject ) {
	    webService.destroy(id, opts).on('success', function( result ) {
		resolve(true);
	    }).on('error', function( err ) {
		reject(err);
	    });
	});
    }

    get(key?: string): Promise<any> {
	return new Promise( function( resolve, reject ) {
	    webService.get(key).on('success', function( result ) {
		resolve(result);
	    }).on('error', function( err ) {
		reject(err);
	    });
	});
    }

}


	
