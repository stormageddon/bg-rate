import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

const CM_APP_ID = '9f16996a04afcd4da039daa5a51d8716';
const CM_API_KEY = 'b776889b290a4e2ca85b97ba7c070a56';

declare var cloudmine: any;
let webService = new cloudmine.WebService({appid: CM_APP_ID, apikey: CM_API_KEY});        

@Injectable()
export class CloudmineService {
    
    constructor() { }
    
    runSnippet(snippetName: string, params: any, opts?: any): Promise<number> {
	/*return Promise.resolve(10);*/
	return new Promise( function( resolve, reject ) {
	    webService.run(snippetName, params, opts).on('result', ( result )=> {
		console.log("Success!", result);
		resolve(result.items.item[0].$.id);
	    }).on('error', function( err ) {
		reject(err);
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
}


	
